// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { CircleLoader } from "react-spinners";

// type Category = {
//   _id: string;
//   title: string;
//   language: string;
// };

// interface Props {
//   token: string;
// }

// const AdminCategory: React.FC<Props> = ({ token }) => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState<Partial<Category>>({
//     title: "",
//     language: "UZ",
//   });
//   const [editingId, setEditingId] = useState<string | null>(null);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("https://hunarmand.qaxramonov.uz/category", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCategories(res.data.data);
//     } catch {
//       toast.error("Failed to fetch categories");
//     }
//     setLoading(false);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (editingId) {
//         await axios.put(
//           `https://hunarmand.qaxramonov.uz/category/${editingId}`,
//           form,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         toast.success("Category updated");
//       } else {
//         await axios.post("https://hunarmand.qaxramonov.uz/category", form, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         toast.success("Category added");
//       }
//       setForm({ title: "", language: "UZ" });
//       setEditingId(null);
//       fetchCategories();
//     } catch {
//       toast.error("Failed to save category");
//     }
//     setLoading(false);
//   };

//   const handleEdit = (cat: Category) => {
//     setForm(cat);
//     setEditingId(cat._id);
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this category?")) return;
//     try {
//       await axios.delete(`https://hunarmand.qaxramonov.uz/category/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCategories(categories.filter((c) => c._id !== id));
//       toast.success("Category deleted");
//     } catch {
//       toast.error("Failed to delete category");
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-3">Category Management</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-2 mb-5 max-w-md"
//       >
//         <input
//           type="text"
//           placeholder="Category Title *"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           required
//           className="border p-2"
//         />
//         <select
//           value={form.language}
//           onChange={(e) => setForm({ ...form, language: e.target.value })}
//           className="border p-2"
//         >
//           <option value="UZ">Uzbek</option>
//           <option value="RU">Russian</option>
//           <option value="EN">English</option>
//         </select>
//         <button type="submit" className="bg-blue-500 text-white py-2">
//           {editingId ? "Update Category" : "Add Category"}
//         </button>
//       </form>

//       {loading ? (
//         <CircleLoader size={70} color="#8B5E3C" speedMultiplier={1.2} />
//       ) : (
//         <table className="w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Title</th>
//               <th className="border p-2">Language</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((cat) => (
//               <tr key={cat._id}>
//                 <td className="border p-2">{cat.title}</td>
//                 <td className="border p-2">{cat.language}</td>
//                 <td className="border p-2 flex gap-2">
//                   <button
//                     onClick={() => handleEdit(cat)}
//                     className="bg-blue-500 text-white px-2 py-1"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(cat._id)}
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

// export default AdminCategory;
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CircleLoader } from "react-spinners";

type Category = {
  _id: string;
  title_uz: string; // Updated key
  title_ru: string; // Updated key
  title_en: string; // Updated key
  language: string;
};

interface Props {
  token: string;
}

const AdminCategory: React.FC<Props> = ({ token }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Partial<Category>>({
    title_uz: "",
    title_ru: "",
    title_en: "",
    language: "UZ",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://hunarmand.qaxramonov.uz/category", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data.data);
    } catch {
      toast.error("Failed to fetch categories");
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(
          `https://hunarmand.qaxramonov.uz/category/${editingId}`,
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Category updated");
      } else {
        await axios.post("https://hunarmand.qaxramonov.uz/category", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Category added");
      }
      // Reset using the specific snake_case keys
      setForm({ title_uz: "", title_ru: "", title_en: "", language: "UZ" });
      setEditingId(null);
      fetchCategories();
    } catch {
      toast.error("Failed to save category");
    }
    setLoading(false);
  };

  const handleEdit = (cat: Category) => {
    setForm({
      title_uz: cat.title_uz,
      title_ru: cat.title_ru,
      title_en: cat.title_en,
      language: cat.language,
    });
    setEditingId(cat._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`https://hunarmand.qaxramonov.uz/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categories.filter((c) => c._id !== id));
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Category Management</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mb-5 max-w-md"
      >
        <input
          type="text"
          placeholder="Uzbek Title (title_uz) *"
          value={form.title_uz}
          onChange={(e) => setForm({ ...form, title_uz: e.target.value })}
          required
          className="border p-2"
        />

        <input
          type="text"
          placeholder="Russian Title (title_ru) *"
          value={form.title_ru}
          onChange={(e) => setForm({ ...form, title_ru: e.target.value })}
          required
          className="border p-2"
        />

        <input
          type="text"
          placeholder="English Title (title_en) *"
          value={form.title_en}
          onChange={(e) => setForm({ ...form, title_en: e.target.value })}
          required
          className="border p-2"
        />

        <select
          value={form.language}
          onChange={(e) => setForm({ ...form, language: e.target.value })}
          className="border p-2"
        >
          <option value="UZ">Uzbek</option>
          <option value="RU">Russian</option>
          <option value="EN">English</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white py-2">
          {editingId ? "Update Category" : "Add Category"}
        </button>
      </form>

      {loading ? (
        <CircleLoader size={70} color="#8B5E3C" speedMultiplier={1.2} />
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Title (UZ)</th>
              <th className="border p-2">Language</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td className="border p-2">{cat.title_uz}</td>
                <td className="border p-2">{cat.language}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-blue-500 text-white px-2 py-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-500 text-white px-2 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminCategory;
