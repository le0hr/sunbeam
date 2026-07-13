import { apiClient } from './client';
import { TransformedVariableProduct, ProductVariation } from '../types/product';

export const productService = {
  getProductList: async (page:number): Promise<TransformedVariableProduct[] | []> => {
    try {
      const productsResponse = await apiClient.get('/products', { params: { page }, timeout: 60000 });
      const productsData = productsResponse.data;
      console.log(productsData);
      if (!productsData) return [];

      const products: TransformedVariableProduct[] = productsData.map((product: any) =>{

        const metaList = product?.meta_data || [];
        
        const raw = metaList.find(
            (m: any) => m.key === "_headless_attributes_descriptions"
        )?.value;

        const classesDescriptionDict = raw
          ? JSON.parse(raw)["Класс системи"]
          : undefined;
  
        // 3. Трансформуємо варіації у зручний формат
        const variations: ProductVariation[] = product.variations.map((v: any) => {
          const color = v.attributes.find((a: any) => a.name === 'Колір')?.option || '';
          const type = v.attributes.find((a: any) =>  a.name === 'Тип системи')?.option || '';
          const sysClass = v.attributes.find((a: any) =>  a.name === 'Класс системи')?.option || '';
  
          return {
            id: v.id,
            price: v.regular_price || v.price || '0',
            attributes: { color, type, class: sysClass },
          };
        });
  
        // 4. Збираємо унікальні списки для селектів (щоб не було дублів в інтерфейсі)
        const allColors = Array.from(new Set(variations.map(v => v.attributes.color))).filter(Boolean);
        const allTypes = Array.from(new Set(variations.map(v => v.attributes.type))).filter(Boolean);
        const allClasses = Array.from(new Set(variations.map(v => v.attributes.class))).filter(Boolean);
  
        return {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          description: product.description || '',
          classesDescriptionDict,
          images: product.images?.map((img: any) => img.src) || [],
          variations,
          allColors,
          allTypes,
          allClasses
        };
      }) 

    return products;


    } catch (error) {
      console.error("Помилка завантаження варіативного товару:", error);
      return [];
    }
  },


};