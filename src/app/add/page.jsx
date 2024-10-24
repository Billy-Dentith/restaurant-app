"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    price: 0,
    catSlug: 0,
  });
  const [option, setOption] = useState({
    title: "",
    additionalPrice: 0,
  });
  const [options, setOptions] = useState([]);
  const [file, setFile] = useState();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session.is_admin) {
    router.push("/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => {
      return { ...prev, [name]: name === "price" ? Number(value) : value };
    });
  };

  const handleOptionChange = (e) => {    
    const { name, value } = e.target;

    setOption((prev) => {
      return { ...prev, [name]: name === "additionalPrice" ? Number(value) : value };
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
      const url = await uploadImage();
      const body = {
        ...inputs,
        image: url,
        options,
      }

      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error(`Error: Failed to add product. Status: ${response.status}`);
        throw new Error("Failed to add products");
      }

      const data = await response.json();

      router.push(`/products/${data.product.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form className="flex flex-wrap gap-6 p-8" onSubmit={handleSubmit}>
        <h1 className="text-4xl mb-2 font-bold">Add New Product</h1>
        <div className="w-full flex flex-col gap-2">
          <label>Title</label>
          <input
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="text"
            name="title"
            placeholder="Bella Napoli"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Description</label>
          <textarea
            className="ring-1 ring-red-200 p-2 rounded-sm"
            name="description"
            placeholder="A timeless favourite with a twist, showcasing a thin crust topped with sweet tomato, fresh basil and creamy mozzarella."
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Price (In Pence)</label>
          <input
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="number"
            name="price"
            placeholder="1499"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Category</label>
          <input
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="text"
            name="catSlug"
            placeholder="pizzas"
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
        <div className="w-full flex flex-col gap-2">
          <label>Options</label>
          <div className="flex flex-col gap-2">
            <input
              className="ring-1 ring-red-200 p-2 rounded-sm"
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleOptionChange}
            />
            <input
              className="ring-1 ring-red-200 p-2 rounded-sm"
              type="number"
              placeholder="Additional Price (In pence)"
              name="additionalPrice"
              onChange={handleOptionChange}
            />
            <button
              type="button"
              className="w-52 bg-red-500 text-white p-2"
              onClick={() => setOptions((prev) => [...prev, option])}
            >
              Add Options
            </button>
          </div>
          <div>
            {options.map((option) => (
              <div
                key={option.title}
                className="ring-1 ring-red-500 p-2 rounded-md cursor-pointer"
                onClick={() =>
                  setOptions(
                    options.filter((item) => item.title !== option.title)
                  )
                }
              >
                <span>{option.title} </span>
                <span>(+ £{option.additionalPrice / 100})</span>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="w-full bg-red-500 text-white p-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPage;
