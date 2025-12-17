import { Link } from "react-router-dom";

import { Link } from "react-router-dom";

const CategoryItem = ({ categoryTitle, image, link }) => {
  return (
    <div className="w-[600px] relative ...">
      {/* If 'categoryTitle' is "Bosh kiyim", the link becomes "/shop/Bosh kiyim".
        The filter logic above will now recognize this text.
      */}
      <Link to={`/shop/${categoryTitle}`}>
        <img src={image} className="h-full w-full" />
        <div className="bg-secondaryBrown text-white absolute bottom-0 w-full h-16 flex justify-center items-center">
          <h3 className="text-2xl">{categoryTitle}</h3>
        </div>
      </Link>
    </div>
  );
};
export default CategoryItem;
