"use client";

import React, { useState } from "react";

interface ProductFormProps {
  onSubmit: (data: ProductData) => void;
  initialData?: ProductData;
}

interface ProductData {
  id: number; // Product ID should be a number
  name: string;
  description: string;
  category: string;
  expireDate: string;
  price: number;
  quantity: number;
}

// Define a type for form errors
interface FormErrors {
  id?: string;
  name?: string;
  description?: string;
  category?: string;
  expireDate?: string;
  price?: string;
  quantity?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<ProductData>({
    id: initialData?.id ?? 0, // Default to 0 if no initial data
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    category: initialData?.category ?? "",
    expireDate: initialData?.expireDate ?? "",
    price: initialData?.price ?? 0, // Default to 0 if no initial data
    quantity: initialData?.quantity ?? 0, // Default to 0 if no initial data
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // For price, quantity, and id, ensure they are treated as numbers
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantity" || name === "id"
          ? +value // Convert to number
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation logic
    const errors: FormErrors = {};
    if (!formData.id) errors.id = "Product ID is required.";
    if (!formData.name) errors.name = "Product Name is required.";
    if (!formData.description) errors.description = "Description is required.";
    if (!formData.category) errors.category = "Category is required.";
    if (!formData.expireDate)
      errors.expireDate = "Expiration Date is required.";
    if (formData.price <= 0) errors.price = "Price must be greater than 0.";
    if (formData.quantity < 0) errors.quantity = "Quantity cannot be negative.";

    setFormErrors(errors);

    // If no errors, submit the form
    if (Object.keys(errors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto p-8 bg-white/30 backdrop-blur-lg rounded-lg shadow-lg space-y-6"
    >
      <h1 className="text-3xl font-semibold text-indigo-600 text-center mb-8">
        Add Product
      </h1>

      {/* Product ID */}
      <div className="flex flex-col">
        <label htmlFor="id" className="text-sm text-gray-800 font-medium">
          Product ID <span className="text-red-500">*</span>
        </label>
        <input
          placeholder="Enter Product ID"
          type="number"
          id="id"
          name="id"
          value={formData.id || ""} // Ensure the value is an empty string if the id is 0
          onChange={handleChange}
          className={`mt-2 p-3 border ${
            formErrors.id ? "border-red-500" : "border-gray-300"
          } rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out hover:border-indigo-500 bg-white/40`}
          required
        />
        {formErrors.id && (
          <p className="text-red-500 text-sm mt-1">{formErrors.id}</p>
        )}
      </div>

      {/* Product Name */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm text-gray-800 font-medium">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-2 p-3 border ${
            formErrors.name ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 text-gray-500 focus:ring-indigo-500 transition-all duration-200 ease-in-out hover:border-indigo-500 bg-white/40`}
          required
          placeholder="Enter Product Name"
        />
        {formErrors.name && (
          <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label
          htmlFor="description"
          className="text-sm text-gray-800 font-medium"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`mt-2 p-3 border ${
            formErrors.description ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 text-gray-500 focus:ring-indigo-500 transition-all duration-200 ease-in-out hover:border-indigo-500 bg-white/40`}
          rows={4}
          required
          placeholder="Enter Product Description"
        />
        {formErrors.description && (
          <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
        )}
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <label htmlFor="category" className="text-sm text-gray-800 font-medium">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`mt-2 p-3 border ${
            formErrors.category ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 text-gray-500 focus:ring-indigo-500 transition-all duration-200 ease-in-out hover:border-indigo-500 bg-white/40`}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
          <option value="books">Books</option>
          <option value="books">Foods</option>
        </select>
        {formErrors.category && (
          <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>
        )}
      </div>

      {/* Expiration Date */}
      <div className="flex flex-col">
        <label
          htmlFor="expireDate"
          className="text-sm text-gray-800 font-medium "
        >
          Expiration Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="expireDate"
          name="expireDate"
          value={formData.expireDate}
          onChange={handleChange}
          className={`mt-2 p-3 border ${
            formErrors.expireDate ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 text-gray-500 focus:ring-indigo-500 transition-all duration-200 ease-in-out hover:border-indigo-500 bg-white/40`}
          required
        />
        {formErrors.expireDate && (
          <p className="text-red-500 text-sm mt-1">{formErrors.expireDate}</p>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col">
        <label htmlFor="price" className="text-sm text-gray-800 font-medium">
          Price <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price || ""} // Ensure the value is an empty string if the price is 0
          onChange={handleChange}
          className={`mt-2 p-3 border ${
            formErrors.price ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 text-gray-500 focus:ring-indigo-500 transition-all duration-200 ease-in-out hover:border-indigo-500 bg-white/40`}
          required
          min="0"
          placeholder="Enter Product Price"
        />
        {formErrors.price && (
          <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
        )}
      </div>

      {/* Quantity */}
      <div className="flex flex-col">
        <label htmlFor="quantity" className="text-sm text-gray-800 font-medium">
          Quantity <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity || ""} // Ensure the value is an empty string if the quantity is 0
          onChange={handleChange}
          className={`mt-2 p-3 border ${
            formErrors.quantity ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-2 text-gray-500 focus:ring-indigo-500 transition-all duration-200 ease-in-out hover:border-indigo-500 bg-white/40`}
          required
          min="0"
          placeholder="Enter Product Quantity"
        />
        {formErrors.quantity && (
          <p className="text-red-500 text-sm mt-1">{formErrors.quantity}</p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 transition-all duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
