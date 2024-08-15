"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const GameManagement = () => {
  const [games, setGames] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGame, setEditingGame] = useState(null);

  useEffect(() => {
    // Fetch games from API
    fetchGames();
  }, []);

  const fetchGames = async () => {
    // Implement API call to fetch games
    // setGames(fetchedGames);
  };

  const handleEditGame = (game) => {
    setEditingGame(game);
    setIsEditDialogOpen(true);
  };

  const handleUpdateGame = async () => {
    // Implement API call to update game
    // Close dialog and refresh game list
    setIsEditDialogOpen(false);
    fetchGames();
  };

  const handleToggleItemExchange = async (gameId, allowItemExchange) => {
    // Implement API call to toggle item exchange
    // Update the game in the list
    setGames(
      games.map((game) =>
        game.id === gameId ? { ...game, allowItemExchange } : game,
      ),
    );
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Quản lý Trò chơi</h1>

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Tên</TableHead>
            <TableHead>Loại</TableHead>
            <TableHead>Cho phép trao đổi vật phẩm</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.id}>
              <TableCell>{game.name}</TableCell>
              <TableCell>{game.type}</TableCell>
              <TableCell>
                <Switch
                  checked={game.allowItemExchange}
                  onCheckedChange={(checked) =>
                    handleToggleItemExchange(game.id, checked)
                  }
                />
              </TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => handleEditGame(game)}>
                  Cập nhật
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cập nhật thông tin trò chơi</DialogTitle>
          </DialogHeader>
          {editingGame && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Tên
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={editingGame.name}
                  onChange={(e) =>
                    setEditingGame({ ...editingGame, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Loại
                </Label>
                <Select
                  value={editingGame.type}
                  onValueChange={(value) =>
                    setEditingGame({ ...editingGame, type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Chọn loại trò chơi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quiz">Realtime Quiz</SelectItem>
                    <SelectItem value="shake">Lắc điện thoại</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="allowItemExchange" className="text-right">
                  Cho phép trao đổi vật phẩm
                </Label>
                <Switch
                  id="allowItemExchange"
                  checked={editingGame.allowItemExchange}
                  onCheckedChange={(checked) =>
                    setEditingGame({
                      ...editingGame,
                      allowItemExchange: checked,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Hình ảnh URL
                </Label>
                <Input
                  id="image"
                  className="col-span-3"
                  value={editingGame.image}
                  onChange={(e) =>
                    setEditingGame({ ...editingGame, image: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="instructions" className="text-right">
                  Hướng dẫn chơi
                </Label>
                <Textarea
                  id="instructions"
                  className="col-span-3"
                  value={editingGame.instructions}
                  onChange={(e) =>
                    setEditingGame({
                      ...editingGame,
                      instructions: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <Button onClick={handleUpdateGame}>Cập nhật trò chơi</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GameManagement;
