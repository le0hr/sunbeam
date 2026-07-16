import { useMoskitnaCalculator } from "../../../hooks/useMoskitnaCalculator";
import { TransformedVariableProduct } from "../../../types/product";
import { SystemClasses } from "../../../types/systemClasses";
import DimensionsInput from "./CustomDimentions";


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