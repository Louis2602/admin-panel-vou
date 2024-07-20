"use client";

import { User } from "lucide-react";
import { Heading } from "@/components/global/heading";
import { useAccounts } from "@/server/brand/query";

const BrandsPage = () => {
  const { data: users } = useAccounts();
  const totalUsers = users ? users.length : 0;
  return (
    <div>
      <Heading
        title={`Users (${totalUsers})`}
        description="Manage all resgistered users."
        icon={User}
      />
      {/* <UsersTable column={column} data={users || []} /> */}
    </div>
  );
};

export default BrandsPage;
