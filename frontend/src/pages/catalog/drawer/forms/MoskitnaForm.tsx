import { useMoskitnaCalculator } from "../../../../hooks/useMoskitnaCalculator";
import { TransformedVariableProduct } from "../../../../types/product";
import DimensionsInput from "./CustomDimentions";


export function MoskitnaForm({ 
  product, 
  classesDescription, 
  calculatedPrice, 
  setCalculatedPrice,
  setCurrentVariation,
  width,
  height,
  setWidth,
  setHeight
}: { 
    product: TransformedVariableProduct; 
    classesDescription: Record<string, string>; 
    calculatedPrice: number; 
    setCalculatedPrice: (v: number) => void; 
    setCurrentVariation:(v: any) => void;
    width: number;
    height: number;
    setWidth: (v:any) => void;
    setHeight: (v:any) => void;
  }) {
  
  const {
    currentVariation,
    finalPrice
  } = useMoskitnaCalculator(product.variations, setCalculatedPrice, width, height);
  
  setCurrentVariation(currentVariation);

  return(
    
    <div className="flex flex-col gap-8">
      <DimensionsInput width={width} height={height} setWidth={setWidth} setHeight={setHeight} finalPrice = {finalPrice} basePrice={0} />
    </div>);
}