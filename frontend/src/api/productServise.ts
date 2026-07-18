import { apiClient } from './client';
import { TransformedVariableProduct, ProductVariation } from '../types/product';

type ProductListResponse = {
  products: TransformedVariableProduct[];
  total: number;
  totalPages: number;
};

export const productService = {
  getProductList: async (categorySlug: string, page:number): Promise<ProductListResponse > => {
    try {
      const productsResponse = await apiClient.get('/products', { params: { page, categorySlug }, timeout: 60000 });
      
      console.log(productsResponse.headers["x-total"]);
      console.log(productsResponse.headers["x-total-pages"]);
      
      
      const productsData = productsResponse.data;
      console.log(productsData);
      if (!productsData) return {products: [],
            total: 0,
            totalPages: 0,}

      const products: TransformedVariableProduct[] = productsData.map((product: any) =>{

        const metaList = product?.meta_data || [];
        
        const raw = metaList.find(
            (m: any) => m.key === "_headless_attributes_descriptions"
        )?.value ?? [];

        console.log(raw);
        console.log(typeof raw);
        const classesDescriptionDict = raw.reduce(
          (acc: Record<string, string>, item: any) => {
            acc[item.value] = item.description;
            return acc;
          },
          {}
        );

        // 3. Трансформуємо варіації у зручний формат
        const variations: ProductVariation[] = product.variations.map((v: any) => {
          const color = v.attributes.find((a: any) => a.name === 'Колір')?.option || '';
          const type = v.attributes.find((a: any) =>  a.name === 'Тип системи')?.option || '';
          const sysClass = v.attributes.find((a: any) =>  a.name === 'Класс системи')?.option || '';
  
          return {
            id: v.id,
            parent_id: product.id,
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
          images: product.images?.map((img: any) => img.src) || [],
          categories: product.categories,
          classesDescriptionDict,
          variations,
          allColors,
          allTypes,
          allClasses
        };
      }) 

    return {products,
          total: Number(productsResponse.headers["x-total"] ?? 0),
          totalPages: Number(productsResponse.headers["x-total-pages"] ?? 0),
    };


    } catch (error) {
      console.error("Помилка завантаження варіативного товару:", error);
      return {products: [],
            total: 0,
            totalPages: 0,};
    }
  },


};