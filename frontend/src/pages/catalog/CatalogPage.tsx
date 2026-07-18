import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Sun, ArrowLeft, Search, SlidersHorizontal, X, Star,
  ChevronDown, Phone, ArrowRight, Check
} from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductDrawer } from "./drawer/ProductDrawer";
import { productService } from "../../api/productServise";
import { TransformedVariableProduct } from "../../types/product";
import { useEffect } from "react";
import { Pagination } from "./Pagination";
import { useSearchParams } from "react-router";

// ─── Data ─────────────────────────────────────────────────────────────────────


const MATERIALS = ["All Materials", "Fabric", "PVC", "Aluminium", "Wood", "Composite"];

// ─── Sub-components ────────────────────────────────────────────────────────────

type Category = {
  slug: string;
  name: string;
};

const CATEGORIES: Category[] = [
  {
    slug: "rolety",
    name: "Ролети"
  },
  {
    slug: "plise",
    name: "Плісе"
  },
  {
    slug: "moskitna",
    name: "Москітна сітка"
  },
  {
    slug: "zhalyuzi",
    name: "Жалюзі"
  },
]



const PRODUCT_TYPES = ["Рулонна", "День-Ніч", "Жорстка"];

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CatalogPage() {

  const [products, setProducts] = useState<TransformedVariableProduct[] | []>([]);

  const [activeMaterial, setActiveMaterial] = useState("All Materials");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<TransformedVariableProduct | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = CATEGORIES.find((v) => v.slug === searchParams.get("category")) ?? CATEGORIES[0];
  const activeProductSlug = searchParams.get("product");

  const updateSearchParams = (params: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });

    setSearchParams(nextParams);
  };

  useEffect(() => {
    productService.getProductList(activeCategory.slug, currentPage)
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalProducts(data.total);
      });
  }, [activeCategory, currentPage]);

  useEffect(() => {
    if (!activeProductSlug) {
      setSelectedProduct(null);
      return;
    }

    const productFromList = products.find((product) => product.slug === activeProductSlug);
    setSelectedProduct(productFromList ?? null);
  }, [activeProductSlug, products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory.slug]);

  // const{
  //   id,
  //   name,
  //   slug,
  //   description,
  //   classesDescriptionDict,
  //   images,
  //   variations,
  //   allColors,
  //   allTypes,
  //   allClasses
  //   } = product



  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Hero band */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#1C1C1C] to-[#121212] py-14">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 50% -10%, rgba(255,204,0,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#FFCC00] text-sm uppercase tracking-[0.2em] mb-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Колекція 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl lg:text-6xl mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Весь <span className="text-[#FFCC00]">асортимент</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white/60 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {products.length} моделей рулонних штор та жалюзі — від класики до преміум автоматики
          </motion.p>
        </div>
      </div>

      {/* Filters bar */}
      <div className="sticky top-[65px] z-30 bg-[#121212]/95 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">

            {/* Category tabs */}
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => updateSearchParams({ category: cat.slug, product: null })}
                  className={`px-4 py-2 rounded-xl text-sm transition-all ${
                    activeCategory === cat
                      ? "bg-[#FFCC00] text-[#121212] font-semibold shadow-[0_0_12px_rgba(255,204,0,0.3)]"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Material filter */}
              <div className="relative">
                <select
                  value={activeMaterial}
                  onChange={(e) => setActiveMaterial(e.target.value)}
                  className="appearance-none bg-white/5 border border-white/10 rounded-xl pl-4 pr-8 py-2.5 text-sm text-white/70 focus:outline-none focus:border-[#FFCC00]/50 transition-colors cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {MATERIALS.map((m) => (
                    <option key={m} value={m} className="bg-[#1C1C1C]">{m}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white/5 border border-white/10 rounded-xl pl-4 pr-8 py-2.5 text-sm text-white/70 focus:outline-none focus:border-[#FFCC00]/50 transition-colors cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <option value="popular" className="bg-[#1C1C1C]">За популярністю</option>
                  <option value="rating" className="bg-[#1C1C1C]">За рейтингом</option>
                  <option value="price-asc" className="bg-[#1C1C1C]">Ціна: дешевше</option>
                  <option value="price-desc" className="bg-[#1C1C1C]">Ціна: дорожче</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </div> 
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-white/40 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            {products.length === products.length
              ? `${products.length} товарів`
              : `${products.length} з ${products.length} товарів`}
          </p>
        </div>

        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white/20" />
            </div>
            <p className="text-white/40 text-lg" style={{ fontFamily: "Playfair Display, serif" }}>Нічого не знайдено</p>
            <p className="text-white/30 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>Спробуйте змінити фільтри або пошуковий запит</p>
          </motion.div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={() => updateSearchParams({ category: activeCategory.slug, product: product.slug })}
                />
              ))}
            </AnimatePresence>
          </motion.div>
          
        )}

        <Pagination
              current={currentPage}
              total={totalPages}
              perPage={12}
              totalProducts={totalProducts}
              onChange={setCurrentPage}
            />

        {/* CTA band */}
        {currentPage === totalPages && (<motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-3xl bg-[#1C1C1C] border border-white/5 p-10 md:p-14 text-center relative overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(255,204,0,0.1) 0%, transparent 60%)",
            }}
          />
          <h2 className="text-3xl lg:text-4xl mb-3 relative z-10" style={{ fontFamily: "Playfair Display, serif" }}>
            Не знайшли підходящий варіант?
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto relative z-10" style={{ fontFamily: "Inter, sans-serif" }}>
            Наші дизайнери розроблять індивідуальне рішення для будь-якого вікна та інтер'єру
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button
              className="px-8 py-3.5 bg-[#FFCC00] text-[#121212] font-semibold rounded-xl hover:bg-[#F2B705] transition-all shadow-[0_0_24px_rgba(255,204,0,0.3)] hover:shadow-[0_0_40px_rgba(255,204,0,0.5)]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Замовити консультацію
            </button>
            <Link
              to="/"
              className="px-8 py-3.5 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors border border-white/10 text-center"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              На головну
            </Link>
          </div>
        </motion.div>
      )}
      </div>

      {/* Product detail drawer */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDrawer 
            product={selectedProduct} 
            onClose={() => {
              updateSearchParams({ product: null });
              setSelectedProduct(null);
            }}
            classesDescription={selectedProduct.classesDescriptionDict} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
