import axios from 'axios';

const API_BASE_URL = 'https://siyad-bare-website-backend.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface BiographyEntry {
  id: number;
  year: string;
  title: string;
  description: string;
  media?: string;
  category?: string;
}

export interface Achievement {
  id: number;
  category: string;
  title: string;
  description: string;
  year?: string;
}

export interface Speech {
  id: number;
  title: string;
  year: string;
  transcript: string;
  audio?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  year: string;
  category: string;
  image?: string; // Make optional since it might be missing
}

// Helper function to construct full image URLs
const getFullImageUrl = (imagePath: string | undefined | null): string => {
  if (!imagePath) {
    return ''; // Return empty string if image path is missing
  }
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${API_BASE_URL}${imagePath}`;
};

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct_answer: number;
}

export interface CommunityPost {
  id: number;
  name: string;
  email: string;
  message: string;
  photo?: string;
  created_at: string;
}

export const apiService = {
  // Biography
  getBiography: async (): Promise<BiographyEntry[]> => {
    const response = await api.get('/api/biography/');
    return response.data;
  },

  // Achievements
  getAchievements: async (): Promise<Achievement[]> => {
    const response = await api.get('/api/achievements/');
    return response.data;
  },

  // Speeches
  getSpeeches: async (): Promise<Speech[]> => {
    const response = await api.get('/api/speeches/');
    return response.data;
  },

  // Gallery
  getGallery: async (): Promise<GalleryItem[]> => {
    const response = await api.get('/api/gallery/');
    return response.data.map((item: GalleryItem) => ({
      ...item,
      image: item.image ? getFullImageUrl(item.image) : undefined
    }));
  },

  // Quiz
  getQuiz: async (): Promise<QuizQuestion[]> => {
    const response = await api.get('/api/quiz/');
    return response.data;
  },

  // Community
  getCommunityPosts: async (): Promise<CommunityPost[]> => {
    const response = await api.get('/api/community/');
    return response.data.map((post: CommunityPost) => ({
      ...post,
      photo: post.photo ? getFullImageUrl(post.photo) : undefined
    }));
  },

  submitCommunityPost: async (formData: FormData): Promise<CommunityPost> => {
    const response = await api.post('/api/community/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default api;
