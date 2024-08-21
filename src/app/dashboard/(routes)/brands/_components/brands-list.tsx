import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Brand } from "@/types/brand";
import Image from "next/image";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BrandsListProps {
  data: Brand[];
}

export const BrandsList = ({ data }: BrandsListProps) => {
  const onDelete = () => {};
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {data.map((brand) => (
        <div
          key={brand.id}
          className="relative flex flex-col items-center justify-center p-4 bg-white border rounded-lg shadow-md"
        >
          <Image
            src={brand.logoUrl!}
            alt={brand.name}
            width={80}
            height={40}
            className="object-contain mb-2"
          />
          <span className="text-sm font-medium text-center">{brand.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/brands/${brand.id}`}>
                  <div className="flex items-center gap-2">
                    <Pencil className="h-4 w-4" />
                    Edit
                  </div>
                </Link>
              </DropdownMenuItem>
              <ConfirmModal
                header="Delete this brand?"
                description="This action will delete this brand out of the entire system."
                // disabled={pending}
                onConfirm={onDelete}
              >
                <DropdownMenuItem
                  className="cursor-pointer text-sm w-full justify-start font-normal text-red-500 focus:text-red-500"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </ConfirmModal>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
};
