import React, { useState } from "react";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-500 to-red-500 text-white px-10 py-5 rounded-full shadow-lg hover:scale-105 transition-all duration-100 text-4xl sm:px-6 sm:py-3 sm:text-xl xs:px-4 xs:py-2 xs:text-lg "
        onClick={() => setIsOpen(true)}
      >
        Read this 💌
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full animate__fadeIn sm:p-6 xs:p-4">
            <h2 className="text-4xl font-bold text-pink-500 sm:text-3xl xs:text-2xl">
              To My Forever Love ❤️
            </h2>
            <p className="mt-4 text-xl text-gray-800 sm:text-lg xs:text-base">
              You are the best thing that has ever happened to me. I will always be by your side, no matter what. I can't stop thinking about you—even at my lowest, I always think of how I can bring a smile to your face. I started loving you more and more, and I want to be with you forever. You are the best. 💕
            </p>
            <button
              className="mt-6 bg-red-500 text-white px-8 py-4 rounded-full shadow-lg hover:bg-red-600 transition-all duration-100 sm:px-6 sm:py-3 sm:text-lg xs:px-4 xs:py-2 xs:text-base"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
