import { useEffect, useState } from "react";
import Card from "./Card";

const imageList = [
  "img1.png",
  "img2.png",
  "img3.png",
  "img4.png",
  "img5.png",
  "img6.png",
  "img7.png",
  "img8.png",
  "img9.png",
  "img10.png",
  "img11.png",
  "img12.png",
  "img13.png",
  "img14.png",
  "img15.png",
];
const generateCards = (size) => {
  const totalCards = size * size;
  const pairCount = totalCards / 2;

  const selectedImages = imageList.slice(0, pairCount);
  const paired = [...selectedImages, ...selectedImages]; // أزواج الصور
  return paired
    .sort(() => Math.random() - 0.5)
    .map((value, index) => ({ id: index, value, key: index }));
};

const GameBoard = ({ size }) => {
  const [cards, setCards] = useState(() => generateCards(size));
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (matched.length === (size * size) / 2) {
      setIsRunning(false);
    }
  }, [matched, size]);

  const handleCardClick = (card) => {
    if (
      selected.length === 2 ||
      selected.find((c) => c.key === card.key) ||
      matched.includes(card.value)
    )
      return;

    setSelected([...selected, card]);
  };

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      if (first.value === second.value) {
        setMatched((prev) => [...prev, first.value]);
      }

      setTimeout(() => setSelected([]), 1000);
    }
  }, [selected]);

  useEffect(() => {
    setCards(generateCards(size));
    setSelected([]);
    setMatched([]);
    setSeconds(0);
    setIsRunning(true);
  }, [size]);

  return (
    <>
      <div className="text-center mt-4 text-xl font-bold text-[#58fa27]">
        Time: {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
      </div>
      <div className={`grid mx-auto mt-10 ${"grid-cols-" + size} gap-4`}>
        {cards.map((card) => (
          <Card
            key={card.key}
            card={card}
            onClick={() => handleCardClick(card)}
            isFlipped={selected.some((c) => c.key === card.key)}
            isMatched={matched.includes(card.value)}
          />
        ))}
      </div>
    </>
  );
};

export default GameBoard;
