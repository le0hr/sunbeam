import { useState, useMemo, useEffect } from 'react';
import { ProductVariation } from '../types/product';

export const useRoletyCalculator = (variations: ProductVariation[], classesDescriptions: Record<string, string>) => {
  const [width, setWidth] = useState(1000);  // мм
  const [height, setHeight] = useState(1000); // мм

  // Стан вибраних користувачем параметрів
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  // ФІЛЬТР ДЛЯ СЕЛЕКТУ "КЛАС" (які класи доступні для обраного Типц)
  const availableClasses = useMemo(() => {
    const filteredVariations = selectedType
      ? variations.filter(v => v.attributes.type === selectedType)
      : variations;

    const uniqueClassNames = Array.from(new Set(filteredVariations.map(v => v.attributes.class)));
    return uniqueClassNames.map((cls) => ({
      id: cls,
      label: cls, 
      description: classesDescriptions[cls] || 'Опис системи відсутній', 
    }));
  }, [selectedType, variations, classesDescriptions]);

  const availableColors = useMemo(() => {
    let filtered = variations;
    if (selectedType) filtered = filtered.filter(v => v.attributes.type === selectedType);
    if (selectedClass) filtered = filtered.filter(v => v.attributes.class === selectedClass);
    
    const uniqueColors = Array.from(new Set(filtered.map(v => v.attributes.color)));
    
    return uniqueColors.map(color => ({
      id: color,
      label: color 
    }));
  }, [selectedClass, selectedType, variations]);

const availableTypes = useMemo(() => {
  const uniqueTypes = Array.from(new Set(variations.map(v => v.attributes.type)));
  
  return uniqueTypes.map(type => ({
    id: type,
    label: type
  }));
}, [variations]);

  // Скидання неможливих значень при зміні батьківських параметрів (Каскад)
  useEffect(() => {
    if (selectedColor && !availableColors.some(color => color.id === selectedColor )) {
      setSelectedColor('');
    }
  }, [selectedColor, availableColors]);

  useEffect(() => {
    if (selectedClass && !availableClasses.some(cls => cls.id === selectedClass )) {
      setSelectedClass('');
    }
  }, [selectedClass, availableClasses]);

  // 3. ПОШУК ПОТОЧНОЇ ВАРІАЦІЇ ТА РОЗРАХУНОК ЦІНИ
  const currentVariation = useMemo(() => {
    if (!selectedColor || !selectedType || !selectedClass) return null;
    
    return variations.find(v => 
      v.attributes.color === selectedColor &&
      v.attributes.type === selectedType &&
      v.attributes.class === selectedClass
    ) || null;
  }, [selectedColor, selectedType, selectedClass, variations]);

  const finalPrice = useMemo(() => {
    if (!currentVariation) return 0;
    
    const area = (width / 1000) * (height / 1000); // Площа в м²
    const pricePerM2 = parseFloat(currentVariation.price);
    
    return Math.round(area * pricePerM2);
  }, [width, height, currentVariation]);

  return {
    width, setWidth,
    height, setHeight,
    selectedType, setSelectedType,
    selectedColor, setSelectedColor,
    selectedClass, setSelectedClass,
    availableColors,
    availableClasses,
    availableTypes,

    currentVariation, // віддаємо назовні, щоб знати id варіації для кошика
    finalPrice
  };
};