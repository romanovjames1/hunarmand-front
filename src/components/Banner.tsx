import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t } = useTranslation();

  return (
    <div className="banner w-full flex flex-col justify-end items-center max-sm:h-[550px] max-sm:gap-2">
      {/* Title */}
      <h2 className="text-white text-center font-bold tracking-[1.86px] max-sm:text-4xl max-[400px]:text-3xl text-4xl md:text-6xl leading-tight">
        {t("banner.title1")} {t("banner.title2")}
      </h2>

      {/* Subtitle */}
      <h3 className="text-white text-center font-normal tracking-[0.9px] max-sm:text-lg max-[400px]:text-base text-xl md:text-3xl leading-tight mt-2">
        {t("banner.subtitle")}
      </h3>

      {/* Buttons */}
      <div className="flex justify-center items-center gap-3 pb-10 max-[400px]:flex-col max-[400px]:gap-1 w-[560px] max-sm:w-[350px] max-[400px]:w-[300px]">
        <Link
          to="/shop"
          className="bg-white text-black text-center text-base md:text-xl border border-[rgba(0, 0, 0, 0.40)] font-normal tracking-[0.6px] px-4 py-2 w-full flex items-center justify-center"
        >
          {t("banner.shopNow")}
        </Link>

        <Link
          to="/shop"
          className="text-white border-white border-2 text-center text-base md:text-xl font-normal tracking-[0.6px] px-4 py-2 w-full flex items-center justify-center"
        >
          {t("banner.seeCollection")}
        </Link>
      </div>
    </div>
  );
};

export default Banner;
