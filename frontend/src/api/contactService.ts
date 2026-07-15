import { apiClient } from "./client";

export const contactService = async (contactData: any) =>{
    try {
        const response = await apiClient.post('/contact', contactData, {timeout: 60000 });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
  }
}