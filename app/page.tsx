"use client";
import ProductForm from "./Components/ProductForm";

export default function Home() {
  const handleFormSubmit = (data: {
    id: number; // Change id to a number
    name: string;
    description: string;
    category: string;
    expireDate: string;
    price: number;
    quantity: number;
  }) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ProductForm onSubmit={handleFormSubmit} />
    </div>
  );
}
