export interface IFilters {
  priceRange: { min: number; max: number };
  rating: number;
  propertyType: string[];
  amenities: string[];
}
