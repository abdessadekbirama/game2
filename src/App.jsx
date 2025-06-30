import { useState } from "react";
import GameBoard from "./components/GameBoard";

const App = () => {
  const [playing, setPlaying] = useState(false);
  const [size, setSize] = useState(3);
  const [difficulty, setDifficulty] = useState("easy");

  const handleStart = () => {
    // تحديد حجم الشبكة بناءً على الصعوبة
    const gridSize = difficulty === "easy" ? 2 : difficulty === "medium" ? 4 : 6;
    setSize(gridSize);
    setPlaying(true);
  };

  const handleBack = () => {
    setPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700/20 via-gray-900 to-gray-900"></div>

      {!playing ? (
        <div className="relative text-center space-y-8 max-w-md">
          <div className="space-y-4">
            <div className="text-6xl animate-bounce">🧩</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Puzzle Game
            </h1>
            <p className="text-gray-400 text-lg">
              Challenge your mind with this classic puzzle game
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Select Difficulty</h3>
              <div className="flex justify-center space-x-3">
                {["easy", "medium", "hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all duration-200 ${
                      difficulty === level
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStart}
              className="group relative w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95"
            >
              <div className="flex items-center justify-center space-x-3">
                <span className="text-xl group-hover:translate-x-1 transition-transform duration-200">
                  ▶️
                </span>
                <span>Start Playing</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
            </button>
          </div>
        </div>
      ) : (
        <div className="relative space-y-6">
          <div className="flex justify-between items-center w-full">
            <button
              onClick={handleBack}
              className="group px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <div className="flex items-center space-x-2">
                <span className="group-hover:-translate-x-1 transition-transform duration-200">
                  ←
                </span>
                <span>Back</span>
              </div>
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">
               Puzzle Game
              </h2>
            </div>
            <div className="w-20"></div>
          </div>

          <GameBoard size={size} />
        </div>
      )}
    </div>
  );
};

export default App;
