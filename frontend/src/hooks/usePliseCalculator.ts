import { useState, useMemo, useEffect } from 'react';
import { ProductVariation } from '../types/product';

export const usePliseCalculator = (variations: ProductVariation[], classesDescriptions: Record<string, string>) => {
  const [width, setWidth] = useState(1000);  // мм
  const [height, setHeight] = useState(1000); // мм

  // Стан вибраних користувачем параметрів
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
      if (!variations.length) return;
      setSelectedColor(variations[0].attributes.color);
      setSelectedClass(variations[0].attributes.class);
    }, [variations]);

  // ФІЛЬТР ДЛЯ СЕЛЕКТУ "Колір" (які класи доступні для обраного Класу)
  const availableColors = useMemo(() => {
    let filtered = variations;
    if (selectedClass) filtered = filtered.filter(v => v.attributes.class === selectedClass);
    
    const uniqueColors = Array.from(new Set(filtered.map(v => v.attributes.color)));
    
    return uniqueColors.map(color => ({
      id: color,
      label: color 
    }));
  }, [selectedClass, variations]);


  const availableClasses = useMemo(() => {
    const uniqueClasses = Array.from(new Set(variations.map(v => v.attributes.class)));
    
    return uniqueClasses.map(cls => ({
      id: cls,
      label: cls,
      description: classesDescriptions[cls]
    }));
  }, [variations]);

  // Скидання неможливих значень при зміні батьківських параметрів (Каскад)
  useEffect(() => {
    if (selectedColor && !availableColors.some(color => color.id === selectedColor)) {
      setSelectedColor('');
    }
  }, [selectedColor, availableColors]);


  const currentVariation = useMemo(() => {
    if (!selectedColor || !selectedClass) return null;
    
    return variations.find(v => 
      v.attributes.color === selectedColor &&
      v.attributes.class === selectedClass
    ) || null;
  }, [selectedColor, selectedClass, variations]);

  const finalPrice = useMemo(() => {
    if (!currentVariation) return 0;
    
    const area = (width / 1000) * (height / 1000); // Площа в м²
    const pricePerM2 = parseFloat(currentVariation.price);
    
    return Math.round(area * pricePerM2);
  }, [width, height, currentVariation]);

  return {
    width, setWidth,
    height, setHeight,
    selectedColor, setSelectedColor,
    selectedClass, setSelectedClass,
    availableColors,
    availableClasses,
    currentVariation, 
    finalPrice
  };
};