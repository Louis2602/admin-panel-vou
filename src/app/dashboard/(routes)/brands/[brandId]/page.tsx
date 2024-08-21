"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBrand } from "@/server/brand/query";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon } from "lucide-react";
import { useActivateBrand, useDeactivateBrand } from "@/server/brand/mutation";
import { Button } from "@/components/ui/button";
interface BrandIdPageProps {
  params: {
    brandId: string;
  };
}

const BrandIdPage = ({ params: { brandId } }: BrandIdPageProps) => {
  const { data: brand } = useBrand(brandId);
  const activateBrandMutation = useActivateBrand();
  const deactivateBrandMutation = useDeactivateBrand();

  if (!brand) {
    return <div>Brand not found</div>;
  }

  const onActivate = async () => {
    await activateBrandMutation.mutateAsync(brandId);
  };

  const onDeactivate = async () => {
    await deactivateBrandMutation.mutateAsync(brandId);
  };

  return (
    <div className="p-8 flex flex-col gap-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/brands">Brands</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{brand.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div className="flex items-center gap-4">
            {brand.logoUrl && (
              <Image
                src={brand.logoUrl}
                alt={brand.name}
                width={48}
                height={48}
                className="object-contain mr-6"
              />
            )}
            <CardTitle className="text-2xl font-bold">{brand.name}</CardTitle>
            <Badge
              variant={brand.status === "ACTIVE" ? "success" : "destructive"}
            >
              {brand.status}
            </Badge>
          </div>
          <div>
            {brand.status === "ACTIVE" ? (
              <Button variant="destructive" onClick={onDeactivate}>
                Deactivate
              </Button>
            ) : (
              <Button variant="success" onClick={onActivate}>
                Activate
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div className="border-r border-slate-200 pr-8">
              <h3 className="font-bold">Industry</h3>
              <p className="text-sm mt-2">{brand.industry}</p>
            </div>
            <div className="border-r border-slate-200 pr-8">
              <h3 className="font-bold">Address</h3>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5" />
                <p className="text-sm mt-2">{brand.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandIdPage;
