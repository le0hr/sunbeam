export interface Product{
    id: number,
    name: string,
    category: string,
    material: string,
    price: number,
    rating: number,
    reviews: number,
    popular: boolean,
    new: boolean
    description: string,
    colors: string[],
    image: string,
    features: string[],
}


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
  slug: string;
  description: string;
  images: string[];
  variations: ProductVariation[]; // Список усіх можливих комбінацій
  // Списки унікальних значень для первинних селектів
  allColors: string[];
  allTypes: string[];
  allClasses: string[];
  classesDescriptionDict: Record<string, string>;
}