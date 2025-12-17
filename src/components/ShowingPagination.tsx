import { HiChevronUp } from "react-icons/hi2";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { useTranslation } from "react-i18next"; // 1. Added i18next import

const ShowingPagination = ({
  page,
  category,
  setCurrentPage,
}: {
  page: number;
  category: string;
  setCurrentPage: (page: number) => void;
}) => {
  const { totalProducts, showingProducts } = useAppSelector(
    (state) => state.shop
  );
  const { t } = useTranslation(); // 2. Initialize translation hook
  const navigate = useNavigate();

  return (
    <div className="px-5 max-[400px]:px-3 mt-12 mb-24">
      <div className="flex flex-col gap-6 justify-center items-center w-1/2 mx-auto max-sm:w-3/4 max-sm:gap-5">
        {/* 3. Fixed the pagination text typo */}
        <p className="text-xl max-sm:text-lg">
          {t("pagination.showing")} {showingProducts} {t("pagination.of")}{" "}
          {totalProducts}
        </p>

        <Button
          /* 4. Fixed the button text typo */
          text={t("pagination.viewMore")}
          mode="white"
          onClick={() => {
            setCurrentPage(page + 1);
            navigate(`/shop${category ? `/${category}` : ""}?page=${page + 1}`);
          }}
        />

        {/* 5. Fixed the back to top link typo */}
        <a
          href="#gridTop"
          className="flex justify-center items-center text-xl gap-2 max-sm:text-lg"
        >
          {t("pagination.backToTop")} <HiChevronUp />
        </a>
      </div>
    </div>
  );
};

export default ShowingPagination;
