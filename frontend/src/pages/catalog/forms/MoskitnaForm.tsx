import { useMoskitnaCalculator } from "../../../hooks/useMoskitnaCalculator";
import { TransformedVariableProduct } from "../../../types/product";
import { SystemClasses } from "../../../types/systemClasses";
import DimensionsInput from "./CustomDimentions";

const colorMap: Record<string, string> = {
  "Білий": "#FFFFFF",
  "Чорний": "#000000",
  "Сірий": "#808080",
  "Коричневий": "#6B4423",
  "Антрацит": "#3A3A3A",
  "Золотий дуб": "#B8860B",
  "Горіх": "#7B4A2A",
};

export function MoskitnaForm({ product, classesDescription, onClose }: { product: TransformedVariableProduct; classesDescription: Record<string, string>; onClose: () => void; SYSTEM_CLASSES:SystemClasses[]; PRODUCT_TYPES: string[] }) {
  
  const {
    width, setWidth,
    height, setHeight,
    currentVariation,
    finalPrice
  } = useMoskitnaCalculator(product.variations);
  
  return(
    
    <div className="flex flex-col gap-8">
      <DimensionsInput width={width} height={height} setWidth={setWidth} setHeight={setHeight} finalPrice = {finalPrice} basePrice={0} />
    </div>);
}