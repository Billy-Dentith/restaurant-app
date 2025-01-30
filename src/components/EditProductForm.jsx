"use client";

import React, { useState } from "react";

const EditProductForm = ({ id, product, setIsEditing, setProductData }) => {
  const [inputs, setInputs] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
  });
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => {
      return { ...prev, [name]: name === "price" ? Number(value) : value };
    });
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "restaurant");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/billydev/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const responseData = await response.json();
    return responseData.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        ...inputs,
        options,
      };

      if (file) {
        const url = await uploadImage();
        body.image = url;
      }

      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error(
          `Error: Failed to edit product. Status: ${response.status}`
        );
        throw new Error("Failed to edit product");
      }

      const data = await response.json();

      setProductData(data.product); 

      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form className="flex flex-wrap gap-6 p-4 mt-4" onSubmit={handleSubmit}>
        <h1 className="text-4xl mb-2 font-bold">Edit Product</h1>
        <div className="w-full flex flex-col gap-2">
          <label>Title</label>
          <input
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="text"
            name="title"
            placeholder={product.title}
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Description</label>
          <textarea
            className="ring-1 ring-red-200 p-2 rounded-sm"
            name="description"
            placeholder={product.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Price (In Pence)</label>
          <input
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="number"
            name="price"
            placeholder={product.price}
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Image</label>
          <input
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="file"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="w-full bg-red-500 text-white p-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
