export class CreateHallDTO {
    name: string;
    location: string;
    capacity: string;
    price: number;
    amenities: string[];
    tags: string[];
    images: string[];
    description?: string;
}