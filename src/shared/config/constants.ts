export const APP_CONFIG = {
  name: 'FeedCreator',
  description: 'Create beautiful summary cards from your content',
  maxSummaryLength: 300,
  maxHookLength: 60,
};

export const ROUTES = {
  home: '/',
  studio: '/studio',
  dashboard: '/dashboard',
  login: '/auth/login',
  register: '/auth/register',
  card: (id: string) => `/cards/${id}`,
};

export const API_ROUTES = {
  generateStats: '/api/generate',
};
