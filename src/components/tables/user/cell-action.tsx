"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "@/types/user";
import { CreateUserForm } from "@/app/dashboard/(routes)/users/_components/create-user-form";

interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const onDelete = async () => {
    try {
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Error deleting account:");
    }
  };

  return (
    <Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <SheetTrigger asChild>
              <div className="flex transition-all hover:bg-muted items-center gap-2 w-full rounded-md">
                <Edit className="h-4 w-4" /> Update
              </div>
            </SheetTrigger>
          </DropdownMenuItem>
          <ConfirmModal
            header="Delete this event?"
            description="This will delete this event completely"
            disabled={false}
            onConfirm={onDelete}
          >
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </ConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Update user account</SheetTitle>
          <SheetDescription>
            Fill in all the information fields below.
          </SheetDescription>
        </SheetHeader>
        <CreateUserForm update={true} user={data} />
      </SheetContent>
    </Sheet>
  );
};
