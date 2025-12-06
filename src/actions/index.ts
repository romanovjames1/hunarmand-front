import { redirect } from "react-router-dom";
import customFetch from "../axios/custom";

interface SearchActionRequest {
  request: {
    formData: () => Promise<FormData>;
  };
}

interface CheckoutFormAction {
  request: {
    formData: () => Promise<FormData>;
  };
}

export const searchAction = async ({ request }: SearchActionRequest) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  return redirect(`/search?query=${data?.searchInput || ""}`);
};

export const checkoutAction = async ({ request }: CheckoutFormAction) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await customFetch.post("/orders", data);
  return redirect("/");
};
