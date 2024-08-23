"use client";

import { QuizGameList } from "./quiz-game-list";
import { ShakeGameList } from "./shake-game-list";

export const GamesListPage = () => {
  return (
    <div className="container">
      <QuizGameList />
      <ShakeGameList />
    </div>
  );
};
