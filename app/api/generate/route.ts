import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import * as cheerio from "cheerio";

// Initialize Gemini with new SDK
const apiKey =
  process.env.NEXT_PUBLIC_GOOGLE_AI_STUDIO_API_KEY ||
  process.env.GOOGLE_AI_STUDIO_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey! });

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // 1. Fetch content
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // 2. Extract meaningful text
    $("script").remove();
    $("style").remove();
    $("nav").remove();
    $("footer").remove();
    $("header").remove();

    const title = $("title").text().trim() || "Untitled Page";
    const domain = new URL(url).hostname.replace("www.", "");

    // 여러 단계로 콘텐츠 추출 시도
    let content = "";

    // 1단계: 주요 콘텐츠 영역에서 추출
    const mainSelectors = [
      "article",
      "main",
      ".content",
      "#content",
      ".article",
      ".post",
      ".entry",
      "[role='main']",
    ];

    for (const selector of mainSelectors) {
      const extracted = $(selector)
        .find("p, h1, h2, h3, h4, h5, h6, li, blockquote, div")
        .map((_, el) => {
          const text = $(el).text().trim();
          return text.length > 20 ? text : "";
        })
        .get()
        .filter((text) => text.length > 0)
        .join("\n");

      if (extracted.length > content.length) {
        content = extracted;
      }
    }

    // 2단계: body에서 직접 텍스트 추출 (중복 제거)
    if (content.length < 200) {
      const bodyText = $("body").text();
      // 줄바꿈과 공백 정리
      const cleanedBody = bodyText
        .split(/\n|\r/)
        .map((line) => line.trim())
        .filter((line) => line.length > 20)
        .filter((line, index, arr) => {
          // 중복 제거 (유사한 텍스트 제거)
          return !arr.slice(0, index).some((prev) => {
            const similarity =
              line.length > 0
                ? (line.split("").filter((c, i) => prev[i] === c).length /
                    Math.max(line.length, prev.length)) *
                  100
                : 0;
            return similarity > 80;
          });
        })
        .join("\n")
        .slice(0, 15000);

      if (cleanedBody.length > content.length) {
        content = cleanedBody;
      }
    }

    // 3단계: 최소한의 콘텐츠라도 있으면 진행 (제목만 있어도)
    if (content.length < 50) {
      // 제목과 메타 정보라도 사용
      const metaDescription =
        $('meta[name="description"]').attr("content") || "";
      const ogDescription =
        $('meta[property="og:description"]').attr("content") || "";

      content = [title, metaDescription, ogDescription]
        .filter((text) => text && text.length > 0)
        .join("\n");

      // 그래도 부족하면 body의 첫 500자라도 사용
      if (content.length < 50) {
        const fallbackText = $("body").text().trim().slice(0, 500);
        content = fallbackText || title;
      }
    }

    // 최종 검증: 최소한 제목은 있어야 함
    if (!content || content.trim().length < 10) {
      console.error("Content extraction failed:", {
        url,
        title,
        contentLength: content.length,
        bodyText: $("body").text().slice(0, 500),
      });
      return NextResponse.json(
        {
          error:
            "Could not extract enough content from this URL. The page might be dynamically loaded, require login, or have insufficient text content.",
          details: `Extracted ${content.length} characters. Please try a different URL or ensure the page is publicly accessible.`,
        },
        { status: 422 }
      );
    }

    // 3. Generate Summary (LLM)
    const prompt = `
      당신은 소셜 미디어(Instagram, Thresads, Twitter) 전문 에디터입니다.
      제공된 콘텐츠("${title}")를 읽고, 한국어로 JSON 응답을 생성하세요.
      
      반드시 다음 형식을 준수하세요:
      {
        "title": "콘텐츠의 제목을 SNS 감성에 맞게, 더 임팩트 있고 짧게(20자 이내) 다시 작성하세요. 원래 제목 그대로 쓰지 마세요.",
        "summary": "핵심 내용을 3~4문장으로 요약하세요. 문장 사이에는 줄바꿈(\\n)을 자주 사용하여 가독성을 높이세요. 이모지를 적절히 사용하여 시각적으로 지루하지 않게 하세요.",
        "hook": "사람들이 클릭할 수밖에 없는, 매우 자극적이고 본질을 꿰뚫는 한 줄 카피(Hook)를 작성하세요. (최대 50자)",
        "imagePrompt": "A creative, abstract art prompt describing the core theme of this content. Suitable for a background image. Do not mention text."
      }

      Content:
      ${content}
    `;

    const llmResponse = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    // For @google/genai, the response text is accessed differently or directly
    // For @google/genai, previous logic suggests text might be a property or needs safe access
    const text = llmResponse.text;
    const cleanText =
      text
        ?.replace(/```json/g, "")
        .replace(/```/g, "")
        .trim() || "{}";
    const data = JSON.parse(cleanText);

    // 4. Generate Background Image (Imagen)
    let backgroundImage = null;
    try {
      if (data.imagePrompt) {
        // 사실적이고 전문가 사진 느낌의 프롬프트 생성
        const enhancedPrompt = `Professional editorial photography of ${data.imagePrompt}, 
photorealistic, realistic and authentic, high-end magazine photography style, 
cinematic lighting with dramatic shadows, shallow depth of field, 
shot with professional DSLR camera, 85mm lens, f/1.8 aperture, 
natural colors with subtle enhancement, sophisticated composition, 
dark moody atmosphere, content-related subject matter, 
high quality, sharp focus, professional grade, vertical portrait orientation 9:16 aspect ratio, 
editorial photography, professional camera work`;

        const imageResponse = await ai.models.generateImages({
          model: "imagen-4.0-generate-001",
          prompt: enhancedPrompt.replace(/\s+/g, " ").trim(),
          config: {
            numberOfImages: 1,
            aspectRatio: "9:16",
          },
        });

        // Check if generatedImages exists and has items
        if (
          imageResponse.generatedImages &&
          imageResponse.generatedImages.length > 0
        ) {
          const firstImage = imageResponse.generatedImages[0];
          if (firstImage.image && firstImage.image.imageBytes) {
            const imgBytes = firstImage.image.imageBytes;
            backgroundImage = `data:image/png;base64,${imgBytes}`;
          }
        }
      }
    } catch (imgError) {
      console.error("Image Generation Failed:", imgError);
      // Continue without image
    }

    return NextResponse.json({
      title: data.title || title,
      domain,
      summary: data.summary,
      hook: data.hook,
      backgroundImage,
    });
  } catch (error: unknown) {
    console.error("Generation Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    const statusCode = (error as { status?: number })?.status || 500;

    // 422 에러인 경우 더 자세한 정보 제공
    if (statusCode === 422) {
      return NextResponse.json(
        {
          error: errorMessage,
          details:
            "The URL might not contain enough text content or the page structure is not supported.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: "An unexpected error occurred while generating the card.",
      },
      { status: statusCode }
    );
  }
}
