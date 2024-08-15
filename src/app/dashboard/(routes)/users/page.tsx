"use client";

import { User, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heading } from "@/components/global/heading";
import { useAccounts } from "@/server/brand/query";
import { Button } from "@/components/ui/button";
import Empty from "@/components/global/empty";

const BrandsPage = () => {
  const { data: users } = useAccounts();
  const totalUsers = users ? users.length : 0;
  return (
    <Sheet>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-start justify-between">
          <Heading
            title={`Users (${totalUsers})`}
            description="Manage all user accounts."
            icon={User}
          />
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add new user
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Create new user account</SheetTitle>
              <SheetDescription>
                Fill in all the information fields below.
              </SheetDescription>
            </SheetHeader>
            {/* <CreateUserForm /> */}
          </SheetContent>
        </div>
        {users === undefined ? (
          <Empty text="No user accounts available." />
        ) : (
          <>Hello</>
          /* <UserTable columns={columns} data={events} /> */
        )}
      </div>
    </Sheet>
  );
};

export default BrandsPage;
