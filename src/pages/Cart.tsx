// import {
//   HiCheck as CheckIcon,
//   HiXMark as XMarkIcon,
//   HiQuestionMarkCircle as QuestionMarkCircleIcon,
// } from "react-icons/hi2";
// import { useAppDispatch, useAppSelector } from "../hooks";
// import { Link } from "react-router-dom";
// import {
//   removeProductFromTheCart,
//   updateProductQuantity,
// } from "../features/cart/cartSlice";
// import toast from "react-hot-toast";
// import { useTranslation } from "react-i18next";

// const Cart = () => {
//   const { t } = useTranslation();
//   const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
//   const dispatch = useAppDispatch();

//   return (
//     <div className="bg-white mx-auto max-w-screen-2xl px-5 max-[400px]:px-3">
//       <div className="pb-24 pt-16">
//         <h1 className="text-3xl tracking-tight text-gray-900 sm:text-4xl">
//           {t("cart.shoppingCart")}
//         </h1>

//         <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
//           <section aria-labelledby="cart-heading" className="lg:col-span-7">
//             <h2 id="cart-heading" className="sr-only">
//               {t("cart.itemsInCart")}
//             </h2>

//             <ul
//               role="list"
//               className="divide-y divide-gray-200 border-b border-t border-gray-200"
//             >
//               {productsInCart.map((product) => (
//                 <li key={product.id} className="flex py-6 sm:py-10">
//                   <div className="flex-shrink-0">
//                     <img
//                       src={product.image}
//                       alt={product.title}
//                       className="h-24 w-24 object-cover object-center sm:h-48 sm:w-48"
//                     />
//                   </div>

//                   <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
//                     <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
//                       <div>
//                         <div className="flex justify-between">
//                           <h3 className="text-sm">
//                             <Link
//                               to={`/product/${product.id}`}
//                               className="font-medium text-gray-700 hover:text-gray-800"
//                             >
//                               {product.title}
//                             </Link>
//                           </h3>
//                         </div>

//                         <p className="mt-1 text-sm font-medium text-gray-900">
//                           ${product.price}
//                         </p>
//                       </div>

//                       <div className="mt-4 sm:mt-0 sm:pr-9">
//                         <label htmlFor="quantity mr-5">
//                           {t("cart.quantity")}:
//                         </label>

//                         <input
//                           type="number"
//                           id="quantity"
//                           className="w-16 h-7 indent-1 bg-white border"
//                           value={product.quantity}
//                           onChange={(e) =>
//                             dispatch(
//                               updateProductQuantity({
//                                 id: product.id,
//                                 quantity: parseInt(e.target.value),
//                               })
//                             )
//                           }
//                         />

//                         <div className="absolute right-0 top-0">
//                           <button
//                             type="button"
//                             className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
//                             onClick={() => {
//                               dispatch(
//                                 removeProductFromTheCart({ id: product.id })
//                               );
//                               toast.error(t("cart.remove"));
//                             }}
//                           >
//                             <span className="sr-only">{t("cart.remove")}</span>
//                             <XMarkIcon className="h-5 w-5" aria-hidden="true" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <p className="mt-4 flex space-x-2 text-sm text-gray-700">
//                       {product.stock ? (
//                         <>
//                           <CheckIcon className="h-5 w-5 text-green-500" />
//                           <span>{t("cart.inStock")}</span>
//                         </>
//                       ) : (
//                         <>
//                           <XMarkIcon className="h-5 w-5 text-red-600" />
//                           <span>{t("cart.outOfStock")}</span>
//                         </>
//                       )}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           {/* Order Summary */}
//           <section className="mt-16 bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
//             <h2 className="text-lg font-medium text-gray-900">
//               {t("cart.orderSummary")}
//             </h2>

//             <dl className="mt-6 space-y-4">
//               <div className="flex items-center justify-between">
//                 <dt className="text-sm text-gray-600">{t("cart.subtotal")}</dt>
//                 <dd className="text-sm font-medium text-gray-900">
//                   ${subtotal}
//                 </dd>
//               </div>

//               <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                 <dt className="text-sm text-gray-600">
//                   {t("cart.shippingEstimate")}
//                 </dt>
//                 <dd className="text-sm font-medium text-gray-900">
//                   ${subtotal === 0 ? 0 : 5}
//                 </dd>
//               </div>

//               <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                 <dt className="text-sm text-gray-600">
//                   {t("cart.taxEstimate")}
//                 </dt>
//                 <dd className="text-sm font-medium text-gray-900">
//                   ${subtotal / 5}
//                 </dd>
//               </div>

//               <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                 <dt className="text-base font-medium text-gray-900">
//                   {t("cart.orderTotal")}
//                 </dt>
//                 <dd className="text-base font-medium text-gray-900">
//                   ${subtotal === 0 ? 0 : subtotal + subtotal / 5 + 5}
//                 </dd>
//               </div>
//             </dl>

//             {productsInCart.length > 0 && (
//               <div className="mt-6">
//                 <Link
//                   to="/checkout"
//                   className="text-white bg-secondaryBrown text-center text-xl font-normal tracking-wide w-full h-12 flex items-center justify-center"
//                 >
//                   {t("cart.checkout")}
//                 </Link>
//               </div>
//             )}
//           </section>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import { HiCheck as CheckIcon, HiXMark as XMarkIcon } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
import {
  removeProductFromTheCart,
  updateProductQuantity,
} from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t, i18n } = useTranslation(); // Added i18n to track language
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // Normalize current language (UZ, RU, EN)
  const currentLang = i18n.language.toUpperCase();

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
                // 1. Get the title based on current language
                const activeTitle =
                  product.translations?.find(
                    (t: any) => t.language === currentLang
                  )?.title ||
                  product.title ||
                  "No Title";

                // 2. Ensure price is pulled correctly
                const displayPrice = product.price || 0;

                return (
                  <li key={product.id} className="flex py-6">
                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={activeTitle}
                      className="h-24 w-24 object-cover"
                    />

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        {/* Display the Translated Title */}
                        <h3 className="text-sm font-medium">{activeTitle}</h3>
                        <p className="mt-1 text-sm text-gray-900">
                          ${displayPrice}
                        </p>
                      </div>

                      {/* Check stockQuantity instead of stock */}
                      <p className="mt-4 text-sm">
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
            <h2 className="text-lg font-medium text-gray-900 border-b pb-4">
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
