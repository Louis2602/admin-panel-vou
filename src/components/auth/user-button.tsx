import Link from "next/link";
import { generateFallback } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";
import { Loader } from "../global/loader";

interface UserButtonProps {
  currentUser: User;
}

export const UserButton = ({ currentUser }: UserButtonProps) => {
  if (!currentUser) {
    return <Loader className="h-4 w-4" />;
  }
  return (
    <Link href="/dashboard/settings">
      <Avatar className="cursor-pointer">
        <AvatarImage src={""} alt={`${currentUser.name}`} />
        <AvatarFallback>{generateFallback(currentUser.name)}</AvatarFallback>
      </Avatar>
    </Link>
  );
};
