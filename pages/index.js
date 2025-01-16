import React from "react";
import Gallery from "../components/Gallery";
import MusicPlayer from "../components/MusicPlayer";
import LoveLetter from "../components/LoveLetter";
import "../app/styles/globals.css"; // Ensure the path is correct
import "animate.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section with Custom Background Image and Low Opacity */}
      <section
        className="relative flex items-center justify-center h-screen bg-cover bg-center text-center overflow-hidden"
        style={{
          backgroundImage: "url('/static/bg.jpg')", // Replace with your custom image path
        }}
      >
        {/* Overlay with low opacity */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Heartbeat Animation for a single heart in the center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-pink-200 animate-pulse text-[30rem]">
            ❤️
          </div>
        </div>

        {/* Text Content */}
        <div className="relative z-10 px-8 py-16 text-center">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-yellow-300 animate__animated animate__fadeIn animate__delay-1s">
            Hi, Palak
          </h1>
          <p className="text-4xl text-white mt-6 max-w-2xl mx-auto animate__animated animate__fadeIn animate__delay-2s">
            This is a small gift for you 🫶
          </p>
        </div>
      </section>

      {/* Gallery Section with Soft Hover Effects */}
      <section className="py-16 px-8 bg-red rounded-xl shadow-xl mx-4 text-center">
        <Gallery />
      </section>

      
          <MusicPlayer />
       

      
      
        <LoveLetter />
      

      {/* Footer */}
      <div className=" top-0 left-0 w-full h-full">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-200 animate-heartbeat"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDuration: `${Math.random() * 1 + 0.5}s`,
                animationDelay: `${Math.random() * 0.8}s`,
                transform: `scale(${Math.random() * 6 + 3}) rotate(0deg)`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
        <div className=" top-0 left-0 w-full h-full">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-200 animate-heartbeat"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDuration: `${Math.random() * 1 + 0.5}s`,
                animationDelay: `${Math.random() * 0.8}s`,
                transform: `scale(${Math.random() * 6 + 3}) rotate(0deg)`,
              }}
            >
              ✨✨
            </div>
          ))}
        </div>
      <footer className="text-center py-6 mt-12 text-lg text-gray-300 bg-gradient-to-r from-peach-400 to-rose-500">
        <p className="font-semibold text-white">I love you so so much cutuu always and foreverr, My one and Only ❤️ .</p>
      </footer>
      <div className=" top-0 left-0 w-full h-full">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-200 animate-heartbeat"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDuration: `${Math.random() * 1 + 0.5}s`,
                animationDelay: `${Math.random() * 0.8}s`,
                transform: `scale(${Math.random() * 6 + 3}) rotate(0deg)`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      
    </div>
  );
}
