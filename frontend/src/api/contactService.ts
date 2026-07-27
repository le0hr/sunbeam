import { PurchaseData } from "../types/product";
import { backendClient } from "./clients";

export const contactService ={
    consultationRequest: async (contactData: any) =>{
        try {
            const response = await backendClient.post('/contact/consultation', contactData, {timeout: 60000 });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    purchaseRequest: async (purchaseData: PurchaseData) =>{
        try {
            const response = await backendClient.post('/contact/purchase', purchaseData, {timeout: 60000 });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}