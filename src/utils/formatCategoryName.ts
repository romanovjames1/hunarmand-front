export const formatCategoryName = (category: any): string => {
  if (!category) return "";

  if (typeof category === "object") {
    return category.title
      ? category.title
          .split("-")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";
  }
  if (typeof category === "string") {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return "";
};
