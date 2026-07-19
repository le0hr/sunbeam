import { useState, useMemo, useEffect } from 'react';
import { ProductVariation } from '../types/product';

export const useZhalyuziCalculator = (
  variations: ProductVariation[], 
  classesDescriptions: Record<string, string>,
  setCalculatedPrice: (v: number) => void,
  width: number,
  height: number,
) => {

  // Стан вибраних користувачем параметрів
  const [selectedType, setSelectedType] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    if (!variations.length) return;

    setSelectedType(variations[0].attributes.type);
    setSelectedClass(variations[0].attributes.class);
  }, [variations]);

  // ФІЛЬТР ДЛЯ СЕЛЕКТУ "Тип" (які типи доступні для обраного Класу )
  const availableTypes = useMemo(() => {
    let filtered = variations;
    if (selectedClass) {
      filtered = filtered.filter(v => v.attributes.class === selectedClass);
    }
    
    const uniqueTypes = Array.from(new Set(filtered.map(v => v.attributes.type)));
    setSelectedType(uniqueTypes[0]);
    return uniqueTypes.map(type => ({
      id: type,
      label: type
    }));
  }, [selectedClass, variations]);

  const availableClasses = useMemo(() => {
    const uniqueClasses = Array.from(new Set(variations.map(v => v.attributes.class)));
    setSelectedClass(uniqueClasses[0]);
    return uniqueClasses.map(cls => ({
      id: cls,
      label: cls,
      description: classesDescriptions[cls]
    }));
  }, [variations]);

  useEffect(() => {
    if (selectedType && !availableTypes.some(type => type.id === selectedType)) {
      setSelectedType(availableTypes[0]?.id);
    }
  }, [selectedType, availableTypes]);

  // 3. ПОШУК ПОТОЧНОЇ ВАРІАЦІЇ ТА РОЗРАХУНОК ЦІНИ
  const currentVariation = useMemo(() => {
    if (!selectedType || !selectedClass) return null;
    
    return variations.find(v => 
      v.attributes.type === selectedType &&
      v.attributes.class === selectedClass
    ) || null;
  }, [selectedType, selectedClass, variations]);

  const finalPrice = useMemo(() => {
    if (!currentVariation) return 0;
    
    const area = (width / 1000) * (height / 1000); // Площа в м²
    const pricePerM2 = parseFloat(currentVariation.price);
    
    return Math.round(area * pricePerM2);
  }, [width, height, currentVariation]);

  setCalculatedPrice(finalPrice);
  
  return {
    selectedType, setSelectedType,
    selectedClass, setSelectedClass,
    availableTypes,
    availableClasses,
    
    currentVariation, // віддаємо назовні, щоб знати id варіації для кошика
    finalPrice
  };
};