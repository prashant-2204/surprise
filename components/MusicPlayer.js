import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { Howl } from "howler";

export default function MusicPlayer() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Collapsible state
  const dragRef = useRef(null); // Ref for Draggable

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

  const toggleCollapse = () => setIsCollapsed(!isCollapsed); // Toggle collapse

  return (
    <Draggable nodeRef={dragRef}>
      <div
        ref={dragRef}
        className={`fixed bottom-6 left-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg p-4 shadow-xl cursor-move text-xl text-semibold ${
          isCollapsed ? "w-40 h-28 flex items-center justify-center" : "w-72"
        }`}
      >
        {/* Collapse Button */}
        {isCollapsed?"Music Player":null}
        <button
          onClick={toggleCollapse}
          className="absolute top-2 right-2 text-lg bg-white text-black rounded-full px-2"
        >
        {isCollapsed ? "+" : "-"}
        </button>

        {/* Collapsed State */}
        {isCollapsed ? null : (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">Music Player</h3>
            <div className="space-y-4">
              {tracks.map((track, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={track.img}
                    alt="Track Thumbnail"
                    className="w-12 h-12 rounded-lg shadow-md"
                  />
                  <button
                    className="text-lg hover:text-yellow-200 transition-all duration-300"
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
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
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
