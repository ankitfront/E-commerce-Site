import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import ProductItem from "./ProductItem.jsx";
import Title from "./Title.jsx";
import Product from "../pages/Product.jsx"

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [LatestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0,10));
  },[products]);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our latest collection of premium products designed to elevate
          your style and comfort.
        </p>
      </div>
      {/* Rendering produts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols5 gap-10 gap-y-6 w-11/12 m-auto">
        {LatestProducts.map((item) => (
          <ProductItem
            // onClick={Product()}
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
