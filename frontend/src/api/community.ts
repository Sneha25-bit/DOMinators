import apiClient from './index';

export const getDiscussions = () => apiClient.get('community/discussions/');
export const createPost = (postData: any) => apiClient.post('community/discussions/', postData);
export const likePost = (id: number) => apiClient.post(`community/discussions/${id}/like/`);