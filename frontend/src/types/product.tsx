
export interface ProductVariation {
  id: number;
  price: string; // Базова ціна за 1 м² для ЦІЄЇ конкретної комбінації
  attributes: {
    color: string;
    type: string;
    class: string;
  };
}

export interface TransformedVariableProduct {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: string;
  category: string;
  variations: ProductVariation[]; // Список усіх можливих комбінацій
  // Списки унікальних значень для первинних селектів
  allColors: string[];
  allTypes: string[];
  allClasses: string[];
  classesDescriptionDict: Record<string, string>;
}