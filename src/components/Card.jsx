import { useEffect, useState } from "react";
import "../Card.css";

const Card = ({ card, onClick, isFlipped, isMatched }) => {
  const flipped = isFlipped || isMatched;
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    let timer;
    if (isMatched) {
      timer = setTimeout(() => setShouldHide(true), 700);
    } else {
      setShouldHide(false);
    }
    return () => clearTimeout(timer);
  }, [isMatched]);

  return (
    <div
      className={`aspect-square w-[72px] sm:w-24 cursor-pointer perspective transition-all duration-500 
        ${
          shouldHide
            ? "scale-0 opacity-0 pointer-events-none"
            : "scale-100 opacity-100"
        }`}
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="card-face front absolute w-full h-full rounded-xl bg-blue-500 text-white text-2xl flex items-center justify-center shadow-md backface-hidden">
          ❓
        </div>

        <div className="card-face p-2 back absolute w-full h-full rounded-xl bg-white overflow-hidden flex items-center justify-center backface-hidden rotate-y-180">
          <img
            src={`images/${card.value}`}
            alt="card"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;