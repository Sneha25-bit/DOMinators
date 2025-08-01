import apiClient from './index';

export const getDiscussions = () => apiClient.get('community/discussions/');
export const createPost = (postData: any) => apiClient.post('community/discussions/', postData);
export const likePost = (id: number) => apiClient.post(`community/discussions/${id}/like/`);
export const getComments = (discussionId: number) => 
    apiClient.get(`community/discussions/${discussionId}/comments/`);

export const addComment = (discussionId: number, content: string) => 
    apiClient.post(`community/discussions/${discussionId}/comments/`, { content });