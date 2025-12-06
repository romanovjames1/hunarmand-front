import { useAppSelector } from "../hooks";
import { useTranslation } from "react-i18next";

const ShopFilterAndSort = ({
  sortCriteria,
  setSortCriteria,
}: {
  sortCriteria: string;
  setSortCriteria: (value: string) => void;
}) => {
  const { showingProducts, totalProducts } = useAppSelector(
    (state) => state.shop
  );
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center px-5 max-sm:flex-col max-sm:gap-5">
      <p className="text-lg">
        {t("shopFilter.showingResults", {
          from: 1,
          to: showingProducts,
          total: totalProducts,
        })}
      </p>

      <div className="flex gap-3 items-center">
        <p>{t("shopFilter.sortBy")}:</p>
        <div className="relative">
          <select
            className="border border-[rgba(0,0,0,0.40)] px-2 py-1"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortCriteria(e.target.value)
            }
            value={sortCriteria}
          >
            <option value="default">{t("shopFilter.options.default")}</option>
            <option value="popularity">
              {t("shopFilter.options.popularity")}
            </option>
            <option value="price-asc">
              {t("shopFilter.options.priceAsc")}
            </option>
            <option value="price-desc">
              {t("shopFilter.options.priceDesc")}
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ShopFilterAndSort;
