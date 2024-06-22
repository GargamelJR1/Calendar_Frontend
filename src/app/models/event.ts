export interface Event {
    id: number;
    name: string;
    description: string;
    tags?: string[];
    startDate: Date;
    endDate: Date;
    image?: string;
    latitude : number;
    longitude: number;
    address: string;
    color: string;
}