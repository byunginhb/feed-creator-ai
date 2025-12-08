import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import * as cheerio from 'cheerio';

// Initialize Gemini with new SDK
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_STUDIO_API_KEY || process.env.GOOGLE_AI_STUDIO_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey! });

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // 1. Fetch content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // 2. Extract meaningful text
    $('script').remove();
    $('style').remove();
    $('nav').remove();
    $('footer').remove();
    $('header').remove();

    const title = $('title').text().trim() || 'Untitled Page';
    const domain = new URL(url).hostname.replace('www.', '');
    
    const content = $('article, main, .content, #content, body')
      .find('p, h1, h2, h3')
      .map((_, el) => $(el).text().trim())
      .get()
      .join('\n')
      .slice(0, 15000);

    if (content.length < 100) {
       return NextResponse.json({ error: 'Could not extract enough content from this URL' }, { status: 422 });
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
            parts: [
                { text: prompt }
            ]
        }
      ]
    });

    // For @google/genai, the response text is accessed differently or directly
    // For @google/genai, previous logic suggests text might be a property or needs safe access
    const text = llmResponse.text;
    const cleanText = text?.replace(/```json/g, '').replace(/```/g, '').trim() || '{}';
    const data = JSON.parse(cleanText);

    // 4. Generate Background Image (Imagen)
    let backgroundImage = null;
    try {
        if (data.imagePrompt) {
            const imageResponse = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: `${data.imagePrompt}, abstract, dark mode, high quality, 2k, subtle gradient style`,
                config: {
                    numberOfImages: 1,
                    aspectRatio: '9:16', 
                }
            });
            
            // Check if generatedImages exists and has items
            if (imageResponse.generatedImages && imageResponse.generatedImages.length > 0) {
                 const firstImage = imageResponse.generatedImages[0];
                 if (firstImage.image && firstImage.image.imageBytes) {
                      const imgBytes = firstImage.image.imageBytes;
                      backgroundImage = `data:image/png;base64,${imgBytes}`;
                 }
            }
        }
    } catch (imgError) {
        console.error('Image Generation Failed:', imgError);
        // Continue without image
    }

    return NextResponse.json({
      title: data.title || title,
      domain,
      summary: data.summary,
      hook: data.hook,
      backgroundImage
    });

  } catch (error: any) {
    console.error('Generation Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
