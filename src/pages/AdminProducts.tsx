// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { CircleLoader } from "react-spinners";

// type Category = {
//   _id: string;
//   title: string;
//   language: string;
// };

// type Product = {
//   _id?: string;
//   title: string;
//   description: string;
//   price: number;
//   thumbnail: string;
//   images: string[];
//   color: string;
//   size: string;
//   stockQuantity: number;
//   category: Category;
//   language: string;
// };

// interface Props {
//   token: string;
// }

// const AdminProducts: React.FC<Props> = ({ token }) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState<Partial<Product>>({
//     title: "",
//     description: "",
//     price: 0,
//     thumbnail: "",
//     images: [],
//     color: "black",
//     size: "XL",
//     stockQuantity: 0,
//     category: {} as Category,
//     language: "UZ",
//   });
//   const [editingId, setEditingId] = useState<string | null>(null);

//   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
//   const [imageFiles, setImageFiles] = useState<File[]>([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const prodRes = await axios.get(
//         "https://hunarmand.qaxramonov.uz/product",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setProducts(prodRes.data.data);

//       const catRes = await axios.get(
//         "https://hunarmand.qaxramonov.uz/category",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setCategories(catRes.data.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch data");
//     }
//     setLoading(false);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: name === "price" || name === "stockQuantity" ? +value : value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("title", form.title || "");
//       formData.append("description", form.description || "");
//       formData.append("price", (form.price || 0).toString());
//       formData.append("color", form.color || "");
//       formData.append("size", form.size || "");
//       formData.append("stockQuantity", (form.stockQuantity || 0).toString());
//       formData.append("categoryId", form.category?._id || "");
//       formData.append("language", form.language || "UZ");

//       if (thumbnailFile) {
//         formData.append("thumbnail", thumbnailFile);
//       }

//       if (imageFiles.length > 0) {
//         imageFiles.forEach((file) => formData.append("images", file));
//       }

//       if (editingId) {
//         await axios.put(
//           `https://hunarmand.qaxramonov.uz/product/${editingId}`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         toast.success("Product updated");
//       } else {
//         await axios.post("https://hunarmand.qaxramonov.uz/product", formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success("Product added");
//       }

//       fetchData();
//       setForm({
//         title: "",
//         description: "",
//         price: 0,
//         thumbnail: "",
//         images: [],
//         color: "black",
//         size: "XL",
//         stockQuantity: 0,
//         category: {} as Category,
//         language: "UZ",
//       });
//       setEditingId(null);
//       setThumbnailFile(null);
//       setImageFiles([]);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to save product");
//     }
//     setLoading(false);
//   };

//   const handleEdit = (product: Product) => {
//     setForm(product);
//     setEditingId(product._id || null);
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await axios.delete(`https://hunarmand.qaxramonov.uz/product/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(products.filter((p) => p._id !== id));
//       toast.success("Product deleted");
//     } catch {
//       toast.error("Failed to delete product");
//     }
//   };

//   return (
//     <div className="p-5">
//       <h1 className="text-3xl font-bold mb-5">Admin Product Panel</h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow p-5 mb-10 flex flex-col gap-3 max-w-xl"
//       >
//         <input
//           type="text"
//           name="title"
//           placeholder="Product Title *"
//           value={form.title}
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />
//         <textarea
//           name="description"
//           placeholder="Description *"
//           value={form.description}
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price *"
//           value={form.price}
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />
//         <input
//           type="number"
//           name="stockQuantity"
//           placeholder="Stock Quantity *"
//           value={form.stockQuantity}
//           onChange={handleChange}
//           required
//           className="border p-2"
//         />
//         <select
//           name="category"
//           value={form.category?._id || ""}
//           onChange={(e) => {
//             const cat = categories.find((c) => c._id === e.target.value);
//             setForm((prev) => ({ ...prev, category: cat }));
//           }}
//           required
//           className="border p-2"
//         >
//           <option value="">Select Category *</option>
//           {categories.map((cat) => (
//             <option key={cat._id} value={cat._id}>
//               {cat.title} ({cat.language})
//             </option>
//           ))}
//         </select>
//         <select
//           name="language"
//           value={form.language}
//           onChange={handleChange}
//           className="border p-2"
//         >
//           <option value="UZ">Uzbek</option>
//           <option value="RU">Russian</option>
//           <option value="EN">English</option>
//         </select>
//         <input
//           type="text"
//           name="color"
//           placeholder="Color *"
//           value={form.color}
//           onChange={handleChange}
//           className="border p-2"
//           required
//         />
//         <input
//           type="text"
//           name="size"
//           placeholder="Size *"
//           value={form.size}
//           onChange={handleChange}
//           className="border p-2"
//           required
//         />
//         <label className="mt-2 font-medium">Thumbnail Image *</label>
//         <input
//           type="file"
//           onChange={(e) =>
//             e.target.files && setThumbnailFile(e.target.files[0])
//           }
//           required={!editingId}
//         />
//         <label className="mt-2 font-medium">Additional Images</label>
//         <input
//           type="file"
//           multiple
//           onChange={(e) =>
//             e.target.files && setImageFiles(Array.from(e.target.files))
//           }
//         />
//         <button type="submit" className="bg-green-500 text-white py-2 mt-2">
//           {editingId ? "Update Product" : "Add Product"}
//         </button>
//       </form>

//       {loading ? (
//         <CircleLoader size={70} color="#8B5E3C" speedMultiplier={1.2} />
//       ) : (
//         <table className="w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Thumbnail</th>
//               <th className="border p-2">Title</th>
//               <th className="border p-2">Price</th>
//               <th className="border p-2">Stock</th>
//               <th className="border p-2">Category</th>
//               <th className="border p-2">Language</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id}>
//                 <td className="border p-2">
//                   <img
//                     src={product.thumbnail}
//                     alt={product.title}
//                     className="w-20 h-20 object-cover"
//                   />
//                 </td>
//                 <td className="border p-2">{product.title}</td>
//                 <td className="border p-2">${product.price}</td>
//                 <td className="border p-2">{product.stockQuantity}</td>
//                 <td className="border p-2">{product.category?.title}</td>
//                 <td className="border p-2">{product.language}</td>
//                 <td className="border p-2 flex gap-2">
//                   <button
//                     onClick={() => handleEdit(product)}
//                     className="bg-blue-500 text-white px-2 py-1"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(product._id!)}
//                     className="bg-red-500 text-white px-2 py-1"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminProducts;

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CircleLoader } from "react-spinners";

type Category = {
  _id: string;
  title: string;
  language: string;
};

type Product = {
  _id?: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  desc_uz: string;
  desc_ru: string;
  desc_en: string;
  price: number;
  thumbnail: string;
  images: string[];
  color: string;
  size: string;
  stockQuantity: number;
  category: Category;
};

interface Props {
  token: string;
}

const AdminProducts: React.FC<Props> = ({ token }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Partial<Product>>({
    title_uz: "",
    title_ru: "",
    title_en: "",
    desc_uz: "",
    desc_ru: "",
    desc_en: "",
    price: 0,
    color: "black",
    size: "XL",
    stockQuantity: 0,
    category: {} as Category,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const prodRes = await axios.get(
        "https://hunarmand.qaxramonov.uz/product",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(prodRes.data.data);

      const catRes = await axios.get(
        "https://hunarmand.qaxramonov.uz/category",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(catRes.data.data);
    } catch (err) {
      toast.error("Failed to fetch data");
    }
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stockQuantity" ? +value : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Package translations into the array format the backend expects
      const translations = [
        { language: "UZ", title: form.title_uz, description: form.desc_uz },
        { language: "RU", title: form.title_ru, description: form.desc_ru },
        { language: "EN", title: form.title_en, description: form.desc_en },
      ];

      // Append translations as a string (standard for multipart/form-data)
      formData.append("translations", JSON.stringify(translations));

      formData.append("price", (form.price || 0).toString());
      formData.append("color", form.color || "");
      formData.append("size", form.size || "");
      formData.append("stockQuantity", (form.stockQuantity || 0).toString());
      formData.append("categoryId", form.category?._id || "");

      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
      if (imageFiles.length > 0) {
        imageFiles.forEach((file) => formData.append("images", file));
      }

      if (editingId) {
        await axios.put(
          `https://hunarmand.qaxramonov.uz/product/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Product updated");
      } else {
        await axios.post("https://hunarmand.qaxramonov.uz/product", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Product added");
      }

      resetForm();
      fetchData();
    } catch (err) {
      toast.error("Failed to save product");
    }
    setLoading(false);
  };

  const resetForm = () => {
    setForm({
      title_uz: "",
      title_ru: "",
      title_en: "",
      desc_uz: "",
      desc_ru: "",
      desc_en: "",
      price: 0,
      color: "black",
      size: "XL",
      stockQuantity: 0,
      category: {} as Category,
    });
    setEditingId(null);
    setThumbnailFile(null);
    setImageFiles([]);
  };

  const handleEdit = (product: any) => {
    // When editing, we map the translations array back to our form inputs
    const uz =
      product.translations?.find((t: any) => t.language === "UZ") || {};
    const ru =
      product.translations?.find((t: any) => t.language === "RU") || {};
    const en =
      product.translations?.find((t: any) => t.language === "EN") || {};

    setForm({
      ...product,
      title_uz: uz.title || "",
      title_ru: ru.title || "",
      title_en: en.title || "",
      desc_uz: uz.description || "",
      desc_ru: ru.description || "",
      desc_en: en.description || "",
      category: product.category,
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await axios.delete(`https://hunarmand.qaxramonov.uz/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Admin Product Panel</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-5 mb-10 flex flex-col gap-3 max-w-2xl"
      >
        {/* Title Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input
            type="text"
            name="title_uz"
            placeholder="Title UZ *"
            value={form.title_uz}
            onChange={handleChange}
            required
            className="border p-2"
          />
          <input
            type="text"
            name="title_ru"
            placeholder="Title RU *"
            value={form.title_ru}
            onChange={handleChange}
            required
            className="border p-2"
          />
          <input
            type="text"
            name="title_en"
            placeholder="Title EN *"
            value={form.title_en}
            onChange={handleChange}
            required
            className="border p-2"
          />
        </div>

        {/* Description Textareas */}
        <div className="grid grid-cols-1 gap-2">
          <textarea
            name="desc_uz"
            placeholder="Description UZ *"
            value={form.desc_uz}
            onChange={handleChange}
            required
            className="border p-2 h-20"
          />
          <textarea
            name="desc_ru"
            placeholder="Description RU *"
            value={form.desc_ru}
            onChange={handleChange}
            required
            className="border p-2 h-20"
          />
          <textarea
            name="desc_en"
            placeholder="Description EN *"
            value={form.desc_en}
            onChange={handleChange}
            required
            className="border p-2 h-20"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            name="price"
            placeholder="Price *"
            value={form.price}
            onChange={handleChange}
            required
            className="border p-2"
          />
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock *"
            value={form.stockQuantity}
            onChange={handleChange}
            required
            className="border p-2"
          />
        </div>

        <select
          value={form.category?._id || ""}
          onChange={(e) =>
            setForm({
              ...form,
              category: categories.find((c) => c._id === e.target.value),
            })
          }
          required
          className="border p-2"
        >
          <option value="">Select Category *</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={form.color}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="text"
            name="size"
            placeholder="Size"
            value={form.size}
            onChange={handleChange}
            className="border p-2"
          />
        </div>

        <label className="font-medium">Thumbnail *</label>
        <input
          type="file"
          onChange={(e) =>
            e.target.files && setThumbnailFile(e.target.files[0])
          }
          required={!editingId}
        />

        <label className="font-medium">Additional Images</label>
        <input
          type="file"
          multiple
          onChange={(e) =>
            e.target.files && setImageFiles(Array.from(e.target.files))
          }
        />

        <button
          type="submit"
          className="bg-green-500 text-white py-3 font-bold rounded"
        >
          {editingId ? "UPDATE PRODUCT" : "ADD PRODUCT"}
        </button>
      </form>
      /* ... existing imports and types ... */ // Replace the table section in
      your code with this:
      {loading ? (
        <CircleLoader size={70} color="#8B5E3C" />
      ) : (
        <table className="w-full border border-gray-300 bg-white mt-5">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border p-2 text-center">Image</th>
              <th className="border p-2">Title (UZ)</th>
              <th className="border p-2">Title (RU)</th>
              <th className="border p-2">Title (EN)</th>
              <th className="border p-2 text-center">Price</th>
              <th className="border p-2">Category</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              // Helper to find titles quickly
              const getTitle = (lang: string) =>
                p.translations?.find((t: any) => t.language === lang)?.title ||
                "---";

              return (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    <img
                      src={p.thumbnail}
                      alt=""
                      className="w-16 h-16 object-cover mx-auto rounded shadow-sm"
                    />
                  </td>
                  <td className="border p-2 font-medium">{getTitle("UZ")}</td>
                  <td className="border p-2 text-gray-600">{getTitle("RU")}</td>
                  <td className="border p-2 text-gray-600">{getTitle("EN")}</td>
                  <td className="border p-2 text-center font-bold text-green-600">
                    ${p.price}
                  </td>
                  <td className="border p-2">
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {p.category?.title || "Uncategorized"}
                    </span>
                  </td>
                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProducts;
