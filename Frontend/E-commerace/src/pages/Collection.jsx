import React, {  useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/admin_assets/frontend_assets/assets";
import Title from "../components/Title.jsx";
import ProductItem from "../components/ProductItem.jsx";
const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory((prev) => prev.filter((items) => items !== e.target.value));
    } else {
      setcategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory((prev) =>
        prev.filter((items) => items !== e.target.value),
      );
    } else {
      setSubcategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    // CATEGORY FILTER
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    // SUBCATEGORY FILTER
    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subcategory.includes(item.subCategory),
      );
    }

    // SEARCH FILTER
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilterProducts(productsCopy);
  };
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subcategory,search,showSearch,products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t ">
      {/* filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          Filter Options
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Category */}
        <div
          className={`border border-gray-300 rounded-lg pl-2 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="font-medium md-3 text-sm">CATEGORIES</p>
          <div className="flex flex-col gap-2 mt-3 text-gray-600 text-sm">
            <p className="flex gap-2">
              <input
                className="w-3"
                value={"Men"}
                type="checkbox"
                onChange={toggleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                value={"Women"}
                type="checkbox"
                onChange={toggleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                value={"Kids"}
                type="checkbox"
                onChange={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* Sub category */}
        <div
          className={`border border-gray-300 rounded-lg pl-2 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="font-medium md-3 text-sm">TYPE</p>
          <div className="flex flex-col gap-2 mt-3 text-gray-600 text-sm">
            <p className="flex gap-2">
              <input
                className="w-3"
                value={"Topwear"}
                type="checkbox"
                onChange={toggleSubCategory}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                value={"Bottomwear"}
                type="checkbox"
                onChange={toggleSubCategory}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                value={"Winter"}
                type="checkbox"
                onChange={toggleSubCategory}
              />{" "}
              Winter
            </p>
          </div>
        </div>
      </div>
      {/* products grid */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTION"} />
          {/* product sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-3"
          >
            <option value="relavent">sort by Relavent</option>
            <option value="low-high">Sort by price: low to high</option>
            <option value="high-low">Sort by price: high to low</option>
          </select>
        </div>
        {/* Map product */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((items, index) => {
            return (
              <ProductItem
                key={index}
                name={items.name}
                id={items._id}
                price={items.price}
                image={items.image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
