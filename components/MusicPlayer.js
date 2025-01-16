import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { Howl } from "howler";

export default function MusicPlayer() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const dragRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/uploads/metadata.json");
        const data = await res.json();
        setTracks(data);
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
      }
    }
    fetchData();
  }, []);

  const playMusic = (track) => {
    if (currentTrack) {
      currentTrack.stop();
    }
    const newTrack = new Howl({ src: [track.song], loop: true });
    newTrack.play();
    setCurrentTrack(newTrack);
    setIsPlaying(true);
  };

  const stopMusic = () => {
    if (currentTrack) {
      currentTrack.stop();
    }
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <Draggable nodeRef={dragRef}>
      <div
        ref={dragRef}
        className={`fixed bottom-6 left-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg p-6 shadow-xl cursor-move text-xl text-semibold md:w-80 lg:w-96 ${
          isCollapsed ? "w-40 h-28 flex items-center justify-center" : "w-72"
        }`}
      >
        {isCollapsed ? "Music Player" : null}
        <button
          onClick={toggleCollapse}
          className="absolute top-2 right-2 text-lg bg-white text-black rounded-full px-2"
        >
          {isCollapsed ? "+" : "-"}
        </button>

        {!isCollapsed && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center md:text-2xl sm:text-lg">
              Music Player
            </h3>
            <div className="space-y-4">
              {tracks.map((track, index) => (
                <div key={index} className="flex items-center gap-4 md:gap-6 sm:gap-2">
                  <img
                    src={track.img}
                    alt="Track Thumbnail"
                    className="w-16 h-16 rounded-lg shadow-md md:w-20 md:h-20 sm:w-12 sm:h-12"
                  />
                  <button
                    className="text-lg hover:text-yellow-200 transition-all duration-300 md:text-xl sm:text-sm"
                    onClick={() => playMusic(track)}
                  >
                    Play: {track.song.split("/").pop()}
                  </button>
                </div>
              ))}
            </div>

            {isPlaying && (
              <button
                onClick={stopMusic}
                className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-600 transition md:px-4 md:py-2 md:text-lg sm:px-3 sm:py-1 sm:text-sm"
              >
                Stop Music
              </button>
            )}
          </div>
        )}
      </div>
    </Draggable>
  );
}
