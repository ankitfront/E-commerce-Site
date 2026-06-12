import axios from "axios";
import React, { useState, useEffect } from "react";
import { backend_URL } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  // ✅ Always resolve token safely
  const finalToken = token || localStorage.getItem("token");

  // ✅ Common config (no repetition)
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${finalToken}`,
    },
  };

  const fetchList = async () => {
    try {
      if (!finalToken) {
        toast.error("No token found. Please login again.");
        return;
      }

      console.log("FETCH TOKEN:", finalToken);

      const response = await axios.get(
        backend_URL + "/api/product/list",
        axiosConfig,
      );

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("FETCH ERROR:", error);
      toast.error("Error fetching product list");
    }
  };

  const deleteProduct = async (id) => {
    try {
      if (!finalToken) {
        toast.error("No token found. Please login again.");
        return;
      }

      console.log("DELETE TOKEN:", finalToken);

      const response = await axios.post(
        backend_URL + "/api/product/remove",
        { id },
        axiosConfig,
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // refresh list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("DELETE ERROR:", error);
      toast.error("Error deleting product");
    }
  };

  // ✅ Wait for token before calling API
  useEffect(() => {
    if (finalToken) {
      fetchList();
    }
  }, [finalToken]);

  return (
    <>
      <p className="mb-2 text-lg font-semibold">All Products List</p>

      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_2fr] items-center py-2 px-2 border bg-gray-100 text-sm font-semibold">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b>Actions</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_2fr] items-center gap-2 py-2 px-2 border text-sm"
          >
            <img className="w-12" src={item.image[0]} alt={item.name} />

            <p>{item.name}</p>

            <p>${item.price}</p>

            <p>{item.category}</p>

            <p
              onClick={() => deleteProduct(item._id)}
              className="cursor-pointer text-red-500"
            >
              Delete
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
