"use client";
import { useState, useEffect } from "react";
import Mole from "./Components/Mole";

const EASY_MODE = 2000;
const MEDIUM_MODE = 1000;
const HARD_MODE = 500;
const IMPOSSIBLE_MODE = 100;

export default function Home() {
  const [currentScore, setCurrentScore] = useState(0);
  const [timerDifficulty, setTimerDifficulty] = useState(EASY_MODE);
  const [arrayMoles, setArrayMoles] = useState(
    Array.from({ length: 9 }, (_, index) => {
      return {
        id: index,
        showMole: false,
      };
    })
  );

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const changeMolePosition = () => {
    const idToChange = randomIntFromInterval(0, 8);
    setArrayMoles((prevArrayMoles) => {
      return prevArrayMoles.map((mole) => {
        return {
          ...mole,
          showMole: mole.id === idToChange,
        };
      });
    });
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      changeMolePosition();
    }, timerDifficulty);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayMoles]);

  return (
    <div className="flex flex-col gap-3 text-center mt-[200px]">
      <h1 className="text-3xl font-bold">Current Score: {currentScore}</h1>{" "}
      <button
        className="bg-green-300 hover:bg-green-400 w-[150px] self-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => setCurrentScore(0)}
      >
        Reset Score
      </button>
      <div className="flex gap-3 items-center justify-center">
        <label htmlFor="select_difficulty">Select Difficulty</label>
        <select
          id="select_difficulty"
          className="self-center appearance-none w-[150px] bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={(e) => {
            setTimerDifficulty(Number(e.target.value));
          }}
        >
          <option value={EASY_MODE}>Easy</option>
          <option value={MEDIUM_MODE}>Medium</option>
          <option value={HARD_MODE}>Hard</option>
          <option value={IMPOSSIBLE_MODE}>Impossible</option>
        </select>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-3">
          {arrayMoles.map((mole) => (
            <div
              key={mole.id}
              onClick={() => {
                if (mole.showMole) {
                  setCurrentScore(currentScore + 1);
                  changeMolePosition();
                }
              }}
            >
              <Mole showMole={mole.showMole} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
