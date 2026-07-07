export const PRODUCT_CALCULATORS = {
  apparel: {
    title: "Одяг",
    // Компонент форми, який ми створимо для цього типу
    FormComponent: ApparelForm, 
    // Функція розрахунку ціни для цього конкретного типу
    calculatePrice: (selections, basePrice) => {
      let total = basePrice;
      if (selections.size === 'XL') total += 50;
      if (selections.printType === 'custom') total += 150;
      return total * (selections.quantity || 1);
    }
  },

  // 2. Наприклад, вікна чи меблі (де потрібні точні розміри)
  custom_dimensions: {
    title: "За індивідуальними розмірами",
    FormComponent: DimensionsForm,
    calculatePrice: (selections, basePrice) => {
      const { width, height, materialMultiplier = 1 } = selections;
      if (!width || !height) return 0;
      // Ціна за площу + коефіцієнт матеріалу
      const area = (width * height) / 10000; // в кв.м.
      return area * basePrice * materialMultiplier;
    }
  }
};