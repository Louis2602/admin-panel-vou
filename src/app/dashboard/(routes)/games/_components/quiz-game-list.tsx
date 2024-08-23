"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGames } from "@/server/game/query";
import { Loader } from "@/components/global/loader";
import { useUpdateGameStatus } from "@/server/game/mutation";
import Link from "next/link";

export const QuizGameList = () => {
  const { data: quizGames } = useGames("quiz");
  const gamesArray = Array.isArray(quizGames)
    ? quizGames
    : [quizGames].filter(Boolean);
  const approveGame = useUpdateGameStatus();
  const onApprove = async (gameId: string) => {
    approveGame.mutate({
      id: gameId,
      status: true,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-bold">Quiz Games</h1>
      </div>
      {quizGames === undefined ? (
        <Loader />
      ) : gamesArray.length === 0 ? (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-lg mb-4">No quiz games have been created yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gamesArray.map(
            (game) =>
              game && (
                <Card key={game.id} className="w-full">
                  <CardHeader>
                    <CardTitle>{game.name}</CardTitle>
                    <CardDescription>{game.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Questions: {game.gamePlay.length}</p>
                    {game.allowItemExchange && (
                      <p className="text-sm text-green-600">
                        Allows item exchange
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Link href={`/dashboard/games/quiz/${game.id}`}>
                      <Button variant="default">View Game</Button>
                    </Link>
                    {game.status ? (
                      <Button variant="secondary" disabled>
                        Already Approved
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() => onApprove(game.id!)}
                      >
                        Approve
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ),
          )}
        </div>
      )}
    </div>
  );
};
