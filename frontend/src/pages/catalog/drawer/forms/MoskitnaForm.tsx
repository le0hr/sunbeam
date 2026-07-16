import { useMoskitnaCalculator } from "../../../../hooks/useMoskitnaCalculator";
import { TransformedVariableProduct } from "../../../../types/product";
import DimensionsInput from "./CustomDimentions";


export function MoskitnaForm({ product, classesDescription, calculatedPrice, setCalculatedPrice }: { product: TransformedVariableProduct; classesDescription: Record<string, string>; calculatedPrice: number; setCalculatedPrice: (v: number) => void; }) {
  
  const {
    width, setWidth,
    height, setHeight,
    currentVariation,
    finalPrice
  } = useMoskitnaCalculator(product.variations, setCalculatedPrice);
  
  return(
    
    <div className="flex flex-col gap-8">
      <DimensionsInput width={width} height={height} setWidth={setWidth} setHeight={setHeight} finalPrice = {finalPrice} basePrice={0} />
    </div>);
}