import { dummyData } from "../_components/brands-list";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BrandIdPageProps {
  params: {
    brandId: string;
  };
}

const fetchBrandDetails = (brandId: any) => {
  return dummyData.find((brand) => brand.id === parseInt(brandId));
};
const BrandIdPage = ({ params: { brandId } }: BrandIdPageProps) => {
  const brand = fetchBrandDetails(brandId);
  if (!brand) {
    return <div>Brand not found</div>;
  }
  return (
    <div className="p-4 flex flex-col gap-4">
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
      <div className="flex items-center mb-4">
        <img
          src={brand.logoUrl}
          alt={brand.name}
          className="w-20 h-20 object-contain mr-4"
        />
        <h1 className="text-2xl font-bold">{brand.name}</h1>
      </div>
    </div>
  );
};

export default BrandIdPage;
