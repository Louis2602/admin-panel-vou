type BrandStatus = "ACTIVE" | "INACTIVE";

export type Brand = {
  id?: string;
  name: string;
  logoUrl?: string;
  brandName: string;
  industry: string;
  address: string;
  latitude: number;
  longitude: number;
  status: BrandStatus;
};
