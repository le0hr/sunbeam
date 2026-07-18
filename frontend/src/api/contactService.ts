import { PurchaseData } from "../types/product";
import { apiClient } from "./client";

export const contactService ={
    consultationRequest: async (contactData: any) =>{
        try {
            const response = await apiClient.post('/contact/consultation', contactData, {timeout: 60000 });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    purchaseRequest: async (purchaseData: PurchaseData) =>{
        try {
            const response = await apiClient.post('/contact/purchase', purchaseData, {timeout: 60000 });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}