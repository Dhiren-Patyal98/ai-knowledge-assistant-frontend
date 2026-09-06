import api from './api';

export const chatService = {
  askQuestion: async (question) => {
    const response = await api.post('/chat/ask', { question });
    return response.data;
  },
};
