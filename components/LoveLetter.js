import React, { useState } from "react";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-500 to-red-500 text-white px-[3rem] py-[3rem] rounded-full shadow-lg hover:scale-105 transition-all duration-100 text-4xl"
        onClick={() => setIsOpen(true)}
      >
        Read this 💌
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full animate__fadeIn">
            <h2 className="text-3xl font-bold text-pink-500">To My Forever Love ❤️</h2>
            <p className="mt-4 text-lg text-gray-800">
              You are the best thing that has ever happened to me. This gallery
              is just a small token of my endless love for you. 💕
            </p>
            <button
              className="mt-6 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition-all duration-100"
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
