import { useState, useMemo, useEffect } from 'react';
import { ProductVariation } from '../types/product';

export const useMoskitnaCalculator = (variations: ProductVariation[], setCalculatedPrice: (v: number) => void) => {
  const [width, setWidth] = useState(1000);  // мм
  const [height, setHeight] = useState(1000); // мм

  const currentVariation = variations[0];
  const finalPrice = useMemo(() => {
    
    const area = (width / 1000) * (height / 1000); // Площа в м²
    const pricePerM2 = parseFloat(currentVariation.price);
    
    return Math.round(area * pricePerM2);
  }, [width, height]);

  setCalculatedPrice(finalPrice);
  return {
    width, setWidth,
    height, setHeight,

    currentVariation, // віддаємо назовні, щоб знати id варіації для кошика
    finalPrice
  };
};