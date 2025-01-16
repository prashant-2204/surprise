import React, { useState } from 'react';
import "../app/styles/globals.css"; // Ensure the path is correct

export default function AdminUpload() {
  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);

  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleSongChange = (e) => setSong(e.target.files[0]);

  const handleSubmit = async (e, isImageOnly) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image!');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', image);

    if (!isImageOnly && song) {
      formData.append('song', song);
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.message === 'Upload successful.') {
        setUploadSuccess(true);
      } else {
        setUploadSuccess(false);
      }
    } catch (error) {
      setUploadSuccess(false);
      alert('Error uploading files');
    } finally {
      setUploading(false);
    }
  };

  const handleGoHome = () => {
    window.location.href = '/'; // Navigate to home route
  };

  return (
    <div className="p-8 bg-gradient-to-r h-screen flex items-center justify-center from-slate-200 to-pink-300 rounded-xl shadow-xl">
      <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
        Upload Media (Admin)
      </h2>
      <div className="flex gap-8">
        {/* Only Image Form */}
        <form
          onSubmit={(e) => handleSubmit(e, true)}
          className="flex flex-col items-center space-y-6 w-[45%] max-w-md"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Only Image</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 bg-white border border-gray-300 rounded-lg shadow-md text-gray-700 w-full"
          />
          <button
            type="submit"
            className="bg-pink-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-pink-600 transition-all duration-300 w-full"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>

        {/* Image and Song Form */}
        <form
          onSubmit={(e) => handleSubmit(e, false)}
          className="flex flex-col items-center space-y-6 w-[45%] max-w-md"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Image & Song</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 bg-white border border-gray-300 rounded-lg shadow-md text-gray-700 w-full"
          />
          <input
            type="file"
            accept="audio/*"
            onChange={handleSongChange}
            className="p-2 bg-white border border-gray-300 rounded-lg shadow-md text-gray-700 w-full"
          />
          <button
            type="submit"
            className="bg-pink-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-pink-600 transition-all duration-300 w-full"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Image & Song'}
          </button>
        </form>
      </div>

      {/* Success or Failure Dialog */}
      {uploadSuccess !== null && (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}>
          <div
            className={`relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center ${
              uploadSuccess ? 'border-green-500 border-2' : 'border-red-500 border-2'
            }`}
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              {uploadSuccess ? 'Upload Successful!' : 'Upload Failed!'}
            </h3>
            <p className="text-lg mb-4 text-gray-700">
              {uploadSuccess
                ? 'Your image and song have been successfully uploaded.'
                : 'There was an error uploading the files. Please try again.'}
            </p>
            <button
              onClick={handleGoHome}
              className="bg-pink-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-pink-600 transition-all duration-300"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
