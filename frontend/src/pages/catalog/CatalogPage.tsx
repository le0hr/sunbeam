import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Sun, ArrowLeft, Search, SlidersHorizontal, X, Star,
  ChevronDown, Phone, ArrowRight, Check
} from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductDrawer } from "./drawer/ProductDrawer";
import { productService } from "../../api/productServise";
import { TransformedVariableProduct } from "../../types/product";
import { Pagination } from "./Pagination";

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
    slug: "zhalyuzi",
    name: "Жалюзі"
  },
  {
    slug: "moskitna",
    name: "Москітна сітка"
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
  
  const [totalPages, setTotalPages] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const requestIdRef = useRef(0);
  const catalogTopRef = useRef<HTMLDivElement | null>(null);

  const activeCategory = CATEGORIES.find((v) => v.slug === params.category) ?? CATEGORIES[0];
  const activeProductSlug = params.productSlug ?? null;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const isSnap =
    typeof navigator !== "undefined" &&
    navigator.userAgent.includes("ReactSnap");
  const updateCatalogPath = ({
    category,
    page,
    product,
  }: {
    category?: string | null;
    page?: number | null;
    product?: string | null;
  }) => {
    const categorySlug = category ?? activeCategory.slug;
    const normalizedPage = page === undefined ? currentPage : Math.max(1, Number(page) || 1);
    const productSlug = product === undefined ? activeProductSlug : product;

    const segments = ["/catalog", categorySlug];

    if (normalizedPage > 1 || productSlug) {
      segments.push(String(normalizedPage));
    }

    if (productSlug) {
      segments.push(productSlug);
    }

    navigate(segments.join("/"));
  };

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    setIsLoading(true);

    const startedAt = Date.now();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const finishLoading = (callback: () => void) => {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, 280 - elapsed);

      timeoutId = setTimeout(() => {
        if (requestId !== requestIdRef.current) {
          return;
        }

        callback();
        setIsLoading(false);
      }, remaining);
    };

    productService.getProductList(activeCategory.slug, currentPage)
      .then((data) => {
        if (requestId !== requestIdRef.current) {
          return;
        }

        finishLoading(() => {
          setProducts(data.products);
          setTotalPages(data.totalPages);
          setTotalProducts(data.total);
        });
      })
      .catch(() => {
        if (requestId !== requestIdRef.current) {
          return;
        }

        finishLoading(() => {
          setProducts([]);
          setTotalPages(0);
          setTotalProducts(0);
        });
      });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [activeCategory.slug, currentPage]);

  useEffect(() => {
    if (!activeProductSlug) {
      setSelectedProduct(null);
      return;
    }

    const productFromList = products.find((product) => product.slug === activeProductSlug);
    setSelectedProduct(productFromList ?? null);
  }, [activeProductSlug, products]);


  useEffect(() => {
    setSelectedProduct(null);
  }, [activeCategory.slug]);

  useEffect(() => {
  const timer = setTimeout(() => {
    catalogTopRef.current?.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
  }, 50);

  return () => clearTimeout(timer);
}, []);

  useEffect(() => {
    if (currentPage >= 1) {
      catalogTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

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
  const productForDrawer = isSnap
    ? products.find(
        (p) => p.slug === params.slug
      )
    : selectedProduct;


  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Hero band */}
      {!isSnap && (<>
        <div className="hidden sm:block relative overflow-hidden bg-gradient-to-b from-[#1C1C1C] to-[#121212] py-14">
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
              className="hidden sm:block text-white/60 max-w-xl mx-auto"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {products.length} моделей рулонних штор та жалюзі — від класики до преміум автоматики
            </motion.p>
          </div>
        </div>

        {/* Filters bar */}
        <div className="sticky top-[72px] sm:top-[65px] z-30 bg-[#121212]/95 backdrop-blur-md border-b border-white/5">
          <div className="container mx-auto px-4 sm:px-6 py-2.5 sm:py-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">

              {/* Category tabs */}
              <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => updateCatalogPath({ category: cat.slug, page: 1, product: null })}
                    className={`shrink-0 px-3.5 py-2 rounded-xl text-sm transition-all whitespace-nowrap ${
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
              {/* <div className="flex items-center gap-3 ml-auto"> */}
                {/* Sort */}
                {/* <div className="relative">
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
                </div> */}
              {/* </div>  */}
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div ref={catalogTopRef} className="container mx-auto px-4 scroll-mt-20 sm:px-6 py-8 sm:py-10">
          <div className="flex items-center justify-between mb-8">
            <p className="text-white/40 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              {isLoading && products.length > 0
                ? "Оновлюємо каталог..."
                : `${products.length} товарів`}
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-[#1C1C1C] animate-pulse"
                >
                  {/* Image */}
                  <div className="aspect-square bg-white/10" />

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2">
                      <div className="h-3 w-3/4 rounded bg-white/10" />
                    </div>

                    <div className="mt-auto flex flex-col items-start gap-2">
                      <div className="h-5 w-28 rounded bg-white/10" />
                      <div className="h-4 w-20 rounded bg-white/10" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
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
            <motion.div
              key={`${activeCategory.slug}-${currentPage}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className="relative"
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={() => updateCatalogPath({ category: activeCategory.slug, page: currentPage, product: product.slug })}
                  />
                ))}
              </div>
            </motion.div>
          )}
          <Pagination
                current={currentPage}
                total={totalPages}
                perPage={12}
                totalProducts={totalProducts}
                onChange={(page) =>
                updateCatalogPath({
                  category: activeCategory.slug,
                  page,
                  product: null,
                })}
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
              <Link
                to = "/#contact"
                className="px-8 py-3.5 bg-[#FFCC00] text-[#121212] font-semibold rounded-xl hover:bg-[#F2B705] transition-all shadow-[0_0_24px_rgba(255,204,0,0.3)] hover:shadow-[0_0_40px_rgba(255,204,0,0.5)]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Замовити консультацію
              </Link>
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
      </>)}

      {/* Product detail drawer */}
      <AnimatePresence>
        {productForDrawer && (
          <div id="product">
            <ProductDrawer 
              product={productForDrawer} 
              onClose={() => {
                updateCatalogPath({ category: activeCategory.slug, page: currentPage, product: null });
                setSelectedProduct(null);
              }}
              classesDescription={productForDrawer.classesDescriptionDict} 
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
