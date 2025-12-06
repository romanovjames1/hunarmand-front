import { HiChevronUp } from "react-icons/hi2";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { useTranslation } from "react-i18next";

const ShowingSearchPagination = ({
  page,
  setCurrentPage,
}: {
  page: number;
  setCurrentPage: (page: number) => void;
}) => {
  const { totalProducts, showingProducts } = useAppSelector(
    (state) => state.shop
  );

  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="px-5 max-[400px]:px-3 mt-12 mb-24">
      <div className="flex flex-col gap-6 justify-center items-center w-1/2 mx-auto max-sm:w-3/4 max-sm:gap-5">
        <p className="text-xl max-sm:text-lg">
          {t("pagination.showing")} {showingProducts} {t("pagination.of")}{" "}
          {totalProducts}
        </p>

        <Button
          text={t("pagination.viewMore")}
          mode="white"
          onClick={() => {
            setCurrentPage(page + 1);
            navigate(`/search?page=${page + 1}`);
          }}
        />

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

export default ShowingSearchPagination;
