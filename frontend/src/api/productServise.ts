import { apiClient } from './client';
import { TransformedVariableProduct, ProductVariation } from '../types/product';

export const productService = {
  getVariableProductBySlug: async (slug: string): Promise<TransformedVariableProduct | null> => {
    try {
            // 1. Отримуємо сам батьківський товар
      const productResponse = await apiClient.get('/products', { params: { slug } });
      const product = productResponse.data[0];
      if (!product) return null;


      const metaList = product?.meta_data || [];
      
      const classesDescriptionDict = metaList.find((meta: any) => meta.key === '_headless_attributes_descriptions')?.value["Класс системи"];

      // 2. Отримуємо всі варіації цього товару (WooCommerce віддає їх через окремий ендпоінт)
      const variationsResponse = await apiClient.get(`/products/${product.id}/variations`, {
        params: { per_page: 100 } // беремо із запасом, щоб зчитати всі комбінації
      });
      console.log(variationsResponse);
      // 3. Трансформуємо варіації у зручний формат
      const variations: ProductVariation[] = variationsResponse.data.map((v: any) => {
        // Витягуємо значення атрибутів (парсер мав записати їх у pa_color, pa_type тощо)
        const color = v.attributes.find((a: any) => a.name === 'pa_color' || a.name === 'color')?.option || '';
        const type = v.attributes.find((a: any) => a.name === 'pa_type' || a.name === 'type')?.option || '';
        const sysClass = v.attributes.find((a: any) => a.name === 'pa_class' || a.name === 'class')?.option || '';

        return {
          id: v.id,
          price: v.regular_price || v.price || '0',
          attributes: { color, type, class: sysClass },
          in_stock: v.in_stock
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
        description: product.description || '',
        classesDescriptionDict,
        images: product.images?.map((img: any) => img.src) || [],
        variations,
        allColors,
        allTypes,
        allClasses
      };
    } catch (error) {
      console.error("Помилка завантаження варіативного товару:", error);
      return null;
    }
  },
  // get
  // TODO: добавити звернення щоб отримати каталог


};