import { HiTrash as TrashIcon } from "react-icons/hi2";
import { Button } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeProductFromTheCart } from "../features/cart/cartSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const { t } = useTranslation();
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendToTelegram = async () => {
    const BOT_TOKEN = "7593832619:AAEzJTWrnVQ3TJASFuAxptdIpsTV_E1Ks5U";
    const CHAT_ID = "@aSdajsdasdasd";

    let message = `🛒 New Order\n\n`;
    message += `Name: ${formData.firstName} ${formData.lastName}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}, Apt: ${formData.apartment}, City: ${formData.city}, State: ${formData.state}, Postal: ${formData.postalCode}\n\n`;
    message += `Products:\n`;

    productsInCart.forEach((p) => {
      message += `- ${p.title}\n`;
      // --- NEW LOGIC ADDED BELOW ---
      message += `  🎨 Color: ${p.color || "N/A"}\n`; //
      message += `  📏 Size: ${p.size || "N/A"}\n`; //
      // --- END OF NEW LOGIC ---
      message += `  Qty: ${p.quantity} | Price: $${p.price} | Total: $${
        p.price * p.quantity
      }\n\n`;
    });

    message += `Subtotal: $${subtotal}`;
    message += `\nShipping: $${subtotal ? 5 : 0}`;
    message += `\nTax: $${subtotal ? subtotal / 5 : 0}`;
    message += `\nTotal: $${subtotal ? subtotal + 5 + subtotal / 5 : 0}`;

    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(
        message
      )}`;
      await fetch(url);
      toast.success("Order sent to Telegram!");
      navigate("/order-confirmation");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send order");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendToTelegram();
  };

  const paymentMethods = [
    { id: "credit-card", title: t("checkout.paymentMethods.creditCard") },
    { id: "paypal", title: t("checkout.paymentMethods.paypal") },
    { id: "etransfer", title: t("checkout.paymentMethods.etransfer") },
  ];

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="pb-24 pt-16 px-5 max-[400px]:px-3">
        <h2 className="sr-only">{t("checkout.checkout")}</h2>

        <form
          onSubmit={handleSubmit}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          {/* Left Column - Contact & Shipping */}
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              {t("checkout.contactInformation")}
            </h2>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                {t("checkout.emailAddress")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                required
              />
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                {t("checkout.shippingInformation")}
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("checkout.firstName")}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("checkout.lastName")}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t("checkout.address")}
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t("checkout.apartment")}
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("checkout.city")}
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("checkout.region")}
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("checkout.postalCode")}
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t("checkout.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border shadow-sm sm:text-sm"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">
              {t("cart.orderSummary")}
            </h2>
            <div className="mt-4 border border-gray-200 bg-white shadow-sm">
              <ul role="list" className="divide-y divide-gray-200">
                {productsInCart.map((product) => (
                  <li key={product.id} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-20 rounded-md"
                      />
                    </div>
                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          {product.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              removeProductFromTheCart({ id: product.id })
                            )
                          }
                        >
                          <TrashIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                          <span className="sr-only">{t("cart.remove")}</span>
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.size}
                      </p>
                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${product.price}
                        </p>
                        <p className="text-base">
                          {t("cart.quantity")}: {product.quantity}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">{t("cart.subtotal")}</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${subtotal}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">{t("cart.shippingEstimate")}</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${subtotal ? 5 : 0}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">{t("cart.taxEstimate")}</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${subtotal ? subtotal / 5 : 0}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">
                    {t("cart.orderTotal")}
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${subtotal ? subtotal + 5 + subtotal / 5 : 0}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <Button
                  text={t("checkout.confirmOrder")}
                  mode="brown"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
