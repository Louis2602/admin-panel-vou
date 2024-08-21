"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { format } from "date-fns";
import { User } from "@/types/user";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "role",
    header: "ROLE",
    cell: ({ renderValue, ...props }) => {
      const value = renderValue() as string;
      return <Badge variant="default">{value}</Badge>;
    },
  },
  {
    accessorKey: "username",
    header: "USERNAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "gender",
    header: "GENDER",
  },
  {
    accessorKey: "countryCode",
    header: "COUNTRY CODE",
  },
  {
    accessorKey: "phone",
    header: "PHONE",
  },
  {
    accessorKey: "createdAt",
    header: "CREATED AT",
    cell: ({ renderValue, ...props }) => {
      const value = renderValue() as string;
      const formattedDate = format(new Date(value), "MMMM d, yyyy - HH:mm:ss");
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "isActive",
    header: "STATUS",
    cell: ({ renderValue, ...props }) => {
      const value = renderValue() as string;
      return (
        <Badge variant={value ? "success" : "destructive"}>
          {value ? "active" : "inactive"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
