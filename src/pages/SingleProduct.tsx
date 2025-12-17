import { useTranslation } from "react-i18next"; // Added for language support

// 1. Update the Product Type to match the new structure
type Product = {
  _id: string;
  translations: {
    language: string;
    title: string;
    description: string;
  }[];
  price: number;
  thumbnail: string;
  images: string[];
  category: {
    _id: string;
    title_uz: string; // Updated field names
    title_ru: string;
    title_en: string;
  };
  stockQuantity: number;
  popularity?: number;
};

const SingleProduct = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.toUpperCase(); // e.g., "UZ"

  const [products, setProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [size, setSize] = useState<string>("XS");
  const [color, setColor] = useState<string>("black");
  const [quantity, setQuantity] = useState<number>(1);

  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  // 2. Helper to get the correct translated text
  const activeTranslation =
    singleProduct?.translations?.find(
      (trans) => trans.language === currentLang
    ) || singleProduct?.translations?.[0];

  const categoryTitle = singleProduct?.category
    ? currentLang === "UZ"
      ? singleProduct.category.title_uz
      : currentLang === "RU"
      ? singleProduct.category.title_ru
      : singleProduct.category.title_en
    : "";

  const handleAddToCart = () => {
    if (singleProduct && activeTranslation) {
      dispatch(
        addProductToTheCart({
          id: singleProduct._id + size + color,
          image: singleProduct.thumbnail || singleProduct.images?.[0] || "",
          // FIX: Send the translations array so the Cart can read it
          translations: singleProduct.translations,
          title: activeTranslation.title, // Also send a flat title for safety
          price: singleProduct.price,
          quantity,
          size,
          color,
          stockQuantity: singleProduct.stockQuantity, // Corrected field name
        })
      );
      toast.success(t("cart.addedSuccess"));
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-5">
      <div className="grid grid-cols-3 gap-x-8 max-lg:grid-cols-1">
        <div className="lg:col-span-2">
          <img
            src={singleProduct?.thumbnail || singleProduct?.images?.[0] || ""}
            alt={activeTranslation?.title}
          />
        </div>
        <div className="w-full flex flex-col gap-5 mt-9">
          <div className="flex flex-col gap-2">
            {/* FIX: Use Translated Title */}
            <h1 className="text-4xl">
              {activeTranslation?.title || "Loading..."}
            </h1>
            <div className="flex justify-between items-center">
              <p className="text-base text-secondaryBrown">{categoryTitle}</p>
              <p className="text-base font-bold">${singleProduct?.price}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              mode="brown"
              text={t("cart.addToCart")}
              onClick={handleAddToCart}
            />
          </div>

          {/* FIX: Use Translated Description */}
          <Dropdown dropdownTitle={t("product.description")}>
            {activeTranslation?.description}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
