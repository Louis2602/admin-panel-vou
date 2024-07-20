"use client";

import { Tag } from "lucide-react";
import { Heading } from "@/components/global/heading";
import { useBrands } from "@/server/brand/query";
import { BrandsList } from "./_components/brands-list";

const BrandsPage = () => {
  const { data: brands } = useBrands();
  const totalBrands = brands ? brands.length : 0;
  return (
    <div>
      <Heading
        title={`Brands (${totalBrands})`}
        description="Manage all resgistered brands."
        icon={Tag}
      />
      <BrandsList data={brands || []} />
    </div>
  );
};

export default BrandsPage;
