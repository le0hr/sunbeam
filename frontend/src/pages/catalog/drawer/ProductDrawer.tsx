import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";
import { ProductVariation, TransformedVariableProduct } from "../../../types/product";
import { ProductConfig } from "./ProductConfig";
import { ArrowLeft } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { OrderStep } from "./OrderStep";
import { PurchaseData } from "../../../types/product";


export function ProductDrawer({ product, classesDescription, onClose }: { product: TransformedVariableProduct; onClose: () => void; classesDescription: Record<string, string> }) {
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [step, setStep] = useState<string>("config");
  const [measureOption, setMeasureOption] = useState("measure-service");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [currentVariation, setCurrentVariation] = useState<ProductVariation>();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);


  return (
    <AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex justify-end"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-lg bg-[#181818] h-full overflow-y-auto border-l border-white/10 flex flex-col"
        >
          {/* Header */}
          <AnimatePresence>
              {step !== "config" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 bg-[#181818]/95 backdrop-blur-sm border-b border-white/5 px-6 py-4 flex items-center justify-between"
                >
                  {step === "order" ? (
                    <button
                      onClick={() => setStep("config")}
                      className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Назад
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    onClick={handleClose}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-white/60" />
                  </button>
                </motion.div>
              )}
          </AnimatePresence>
          <motion.div
                animate={{
                  height:  step === "config" ? 288 : 0,
                  opacity: step === "config" ? 1   : 0,
                }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className="relative flex-shrink-0 overflow-hidden"
          >

            {/* Image */}
            <div className="relative h-72 flex-shrink-0 overflow-hidden">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/10 to-transparent" />
            </div>

              {/* Close button */}
            <button
              onClick={handleClose}
              className="fixed top-4 right-4 z-50 w-10 h-10 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </motion.div>
          
          <AnimatePresence mode = "wait">
            {step === "config" && (
                  <motion.div
                    key="config"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22 }}
                  >
                    <ProductConfig
                      product={product}
                      classesDescription={classesDescription}
                      calculatedPrice={calculatedPrice}
                      setCalculatedPrice={setCalculatedPrice}
                      onShowOrder={() => setStep("order")}
                      setCurrentVariation={setCurrentVariation}
                      width={width}
                      height={height}
                      setWidth={setWidth}
                      setHeight={setHeight}
                    />
                  </motion.div>
                )}
            {step === "order" && (
                  <motion.div
                    key="order"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 18 }}
                    transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <OrderStep
                      product={product}
                      width=""
                      height=""
                      hasDimensions={false}
                      calculatedPrice={calculatedPrice}
                      measureOption={measureOption}
                      setMeasureOption={setMeasureOption}
                      name={name}
                      setName={setName}
                      nameError={nameError}
                      setNameError={setNameError}
                      phone={phone}
                      setPhone={setPhone}
                      phoneError={phoneError}
                      setPhoneError={setPhoneError}
                      onSubmit={handleConfirmOrder}
                      currentVariation={currentVariation}
                    />
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                    className="flex flex-col items-center justify-center text-center px-8 py-20 gap-5"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#FFCC00]/10 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-[#FFCC00]" />
                    </div>
                    <div>
                      <h3 className="text-2xl mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                        Заявку отримано!
                      </h3>
                      <p className="text-white/55 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                        Наш менеджер зателефонує на
                        <span className="text-white/80"> {phone}</span>
                        протягом 30 хвилин
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="mt-2 px-6 py-2.5 bg-white/8 hover:bg-white/12 border border-white/10 rounded-xl text-sm text-white/70 transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Закрити
                    </button>
                  </motion.div>
                )}
          </AnimatePresence>
          
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  function handleClose() {
    setStep("config");
    setMeasureOption("measure-service");
    setName("");
    setNameError("");
    setPhone("");
    setPhoneError("");
    onClose();
  }

  function handleConfirmOrder() {
    if (!name.trim()) {
      setNameError("Вкажіть ваше ім'я");
      return;
    }
    if (!currentVariation) {
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (!digits || digits.length < 9) {
      setPhoneError("Вкажіть коректний номер телефону");
      return;
    }
    const purchaseData: PurchaseData = {
      id: currentVariation.id,
      parent_id: currentVariation.parent_id,
      price: calculatedPrice,
      width: width,
      height: height,
      name: name,
      phone: phone,
    }
    console.log(purchaseData);
    

    setPhoneError("");
    setNameError("");
    setStep("success");
  }
}
