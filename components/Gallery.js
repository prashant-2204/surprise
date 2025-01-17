import React, { useState, useEffect } from "react";
import { Howl } from "howler";

export default function Gallery() {
  const [currentSong, setCurrentSong] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [newComment, setNewComment] = useState("");
  const [imagesWithSongs, setImagesWithSongs] = useState([]);

  // Fetch metadata (images and songs) from the server
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/uploads/metadata.json");
      const data = await res.json();
      setImagesWithSongs(data); // Set images and songs from metadata
    }
    fetchData();
  }, []);

  // Fetch gallery data (likes and comments)
  useEffect(() => {
    async function fetchGalleryData() {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setComments(data.comments || {});
      setLikes(data.likes || {});
    }

    fetchGalleryData();
  }, []);

  const playSong = (song) => {
    if (currentSong) currentSong.stop(); // Stop any currently playing song
    const newSong = new Howl({ src: [song], loop: false });
    setCurrentSong(newSong);
    newSong.play();
  };

  const stopSong = () => {
    if (currentSong) {
      currentSong.stop();
      setCurrentSong(null);
    }
  };

  const openModal = (img) => {
    setModalData({ img });
  };

  const closeModal = () => {
    setModalData(null);
    setNewComment("");
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const updatedComments = { ...comments };
    if (!updatedComments[modalData.img]) {
      updatedComments[modalData.img] = [];
    }
    updatedComments[modalData.img].push(newComment);

    setComments(updatedComments);
    setNewComment("");

    // Send new comment to the server
    await fetch("/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ img: modalData.img, comment: newComment }),
    });
  };

  const handleLike = async (img) => {
    const updatedLikes = { ...likes };
    updatedLikes[img] = (updatedLikes[img] || 0) + 1;

    setLikes(updatedLikes);

    // Send like to the server
    await fetch("/api/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ img }),
    });
  };

  return (
    <div className="p-5 md:p-10 bg-gradient-to-r from-slate-200 to-pink-300 rounded-xl shadow-xl">
      <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
        Our Memory Gallery
      </h2>
      <div className="columns-1 sm:columns-2  lg:columns-3 gap-5 lg:gap-8 xl:columns-4
      [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">
        {imagesWithSongs.map((item, index) => (
          <div
            key={index}
            className="relative group lg:mt-8 mt-5 rounded-xl transition-all duration-500 "
            onMouseEnter={() => playSong(item.song)}
            onMouseLeave={stopSong}
            onClick={() => openModal(item.img)}
          >
            {/* Image */}
            <img
              src={item.img}
              alt={`Memory ${index + 1}`}
              className="w-full h-full object-cover cursor-pointer shadow-lg hover:shadow-[0_0_15px_3px_rgba(255,105,180,0.7)] transition-shadow duration-300"
            />
            {/* Like Button and Count */}
            <div className="absolute top-2 right-2 flex items-center space-x-1 bg-white bg-opacity-70 px-2 py-1 rounded-full shadow">
              <button
                className="bg-pink-500 text-white font-bold rounded-full shadow-md w-8 h-8 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(item.img);
                }}
              >
                ❤️
              </button>
              <span className="text-black font-semibold">{likes[item.img] || 0}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 flex">
            {/* Previewed Image */}
            <div className="w-2/3 relative">
              <img
                src={modalData.img}
                alt="Preview"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Comments Section */}
            <div className="w-[71%] pl-4 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Comments
              </h3>
              <button
                className="absolute top-4 right-4 text-black text-2xl font-bold bg-white rounded-full shadow-md p-2 hover:bg-gray-200 z-50"
                onClick={closeModal}
              >
                ❌
              </button>
              <div className="flex-1 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner space-y-4">
                {(comments[modalData.img] || []).map((comment, idx) => (
                  <div key={idx} className="flex justify-start">
                    <div className="relative p-4 rounded-lg shadow bg-white text-black max-w-[70%]">
                      {comment}
                      <span className="absolute w-4 h-4 bg-white transform rotate-45 -left-1 top-2"></span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 p-2 text-black border rounded-lg shadow"
                />
                <button
                  onClick={handleAddComment}
                  className="ml-2 bg-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
