import CategoryItem from "./CategoryItem";
import { useTranslation } from "react-i18next";

const CategoriesSection = () => {
  const { t, i18n } = useTranslation();

  const categories = [
    {
      key: "headwear",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/000/149/170/small/free-headwear-icons-vector.jpg",
      link: "headwear",
    },
    {
      key: "upperwear",
      image: "https://m.media-amazon.com/images/I/71kZS5SY2jL._AC_UY1100_.jpg",
      link: "upperwear",
    },
    {
      key: "bottomwear",
      image:
        "https://jaey.blr1.digitaloceanspaces.com/images/products/Flowy_Back_Elasticated_Trouser-Blue-JA0230-023002-2349.webp",
      link: "bottomwear",
    },
    {
      key: "footwear",
      image:
        "https://img.theloom.in/blog/wp-content/uploads/2024/01/thumb-22.png",
      link: "footwear",
    },
  ];

  return (
    <div className="max-w-screen-2xl px-5 mx-auto mt-24">
      <h2 className="text-black text-5xl font-normal tracking-[1.56px] max-sm:text-2xl mb-12 text-center">
        {t("categories.title")}
      </h2>
      <div
        className="flex justify-between max-sm:justify-center max-xl:justify-start 
        max-xl:gap-5  flex-wrap gap-y-10"
      >
        // Inside your Categories loop
        {categories.map((cat) => (
          <CategoryItem
            key={cat._id}
            image={cat.image}
            // Use the ID or a fixed English slug for the URL
            link={cat.slug || cat._id}
            // Dynamically pick the title based on site language
            categoryTitle={
              i18n.language === "uz"
                ? cat.title_uz
                : i18n.language === "ru"
                ? cat.title_ru
                : cat.title_en
            }
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
