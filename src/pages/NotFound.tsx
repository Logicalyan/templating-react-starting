// src/pages/NotFound.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-2xl font-semibold mt-4">Page Not Found</p>
      <p className="text-gray-600 mt-2 mb-6 text-center">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Button onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </div>
  );
};

export default NotFound;
