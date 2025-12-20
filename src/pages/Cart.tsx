import { HiXMark as XMarkIcon } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
import {
  removeProductFromTheCart,
  updateProductQuantity,
} from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t, i18n } = useTranslation();
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white mx-auto max-w-screen-2xl px-5 max-[400px]:px-3">
      <div className="pb-24 pt-16">
        <h1 className="text-3xl tracking-tight text-gray-900 sm:text-4xl">
          {t("cart.shoppingCart")}
        </h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              {t("cart.itemsInCart")}
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {productsInCart.map((product) => {
                // FIX 1: Extract title from translations array
                const activeTitle =
                  product.translations?.find(
                    (trans: any) =>
                      trans.language === i18n.language.toUpperCase()
                  )?.title ||
                  product.translations?.[0]?.title ||
                  "No Title";

                // FIX 2: Correct price fallback
                const displayPrice = product.price || 0;

                return (
                  <li key={product.id} className="flex py-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={activeTitle}
                        className="h-24 w-24 object-cover sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                to={`/product/${product.id}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.title}
                              </Link>
                            </h3>
                          </div>

                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ${product.price}
                          </p>

                          {/* INSERT STATIC SIZE AND COLOR LOGIC HERE */}
                          <div className="mt-1 flex flex-col gap-1">
                            {product.size && (
                              <p className="text-xs text-gray-500">
                                <span className="font-bold">
                                  {t("product.size")}:
                                </span>{" "}
                                {product.size}
                              </p>
                            )}
                            {product.color && (
                              <p className="text-xs text-gray-500">
                                <span className="font-bold">
                                  {t("product.color")}:
                                </span>{" "}
                                {product.color}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label
                            htmlFor={`quantity-${product.id}`}
                            className="sr-only"
                          >
                            {t("cart.quantity")}
                          </label>
                          <input
                            type="number"
                            id={`quantity-${product.id}`}
                            className="w-16 h-8 border rounded text-center"
                            value={product.quantity}
                            onChange={(e) =>
                              dispatch(
                                updateProductQuantity({
                                  id: product.id,
                                  quantity: parseInt(e.target.value),
                                })
                              )
                            }
                          />
                          <div className="absolute right-0 top-0">
                            <button
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => {
                                dispatch(
                                  removeProductFromTheCart({ id: product.id })
                                );
                                toast.error(t("cart.remove"));
                              }}
                            >
                              <XMarkIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* FIX 3: Check stockQuantity instead of stock */}
                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        {product.stockQuantity > 0 ? (
                          <span className="text-green-600">
                            {t("cart.inStock")}
                          </span>
                        ) : (
                          <span className="text-red-600">
                            {t("cart.outOfStock")}
                          </span>
                        )}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Order Summary */}
          <section className="mt-16 bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900">
              {t("cart.orderSummary")}
            </h2>
            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">{t("cart.subtotal")}</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${subtotal}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm text-gray-600">
                  {t("cart.shippingEstimate")}
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${subtotal === 0 ? 0 : 5}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm text-gray-600">
                  {t("cart.taxEstimate")}
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${(subtotal * 0.2).toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  {t("cart.orderTotal")}
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  $
                  {subtotal === 0
                    ? 0
                    : (subtotal + subtotal * 0.2 + 5).toFixed(2)}
                </dd>
              </div>
            </dl>

            {productsInCart.length > 0 && (
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="text-white bg-secondaryBrown hover:bg-opacity-90 transition-all text-center text-xl font-normal tracking-wide w-full h-12 flex items-center justify-center rounded shadow-sm"
                >
                  {t("cart.checkout")}
                </Link>
              </div>
            )}
          </section>
        </form>
      </div>
    </div>
  );
};

export default Cart;
