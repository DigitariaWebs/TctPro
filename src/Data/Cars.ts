interface Vehicle {
  id: number;
  name: string;
  year: number;
  price: string;
  mileage: string;
  transmission: string;
  fuel: string;
  image: string;
  badge: string;
  isAvailable: boolean;
  features: string[];
}

export const featuredVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Audi RS7 Carbon Optic Audi Exclusive",
    year: 2018,
    price: "88 900 CAD $",
    mileage: "82,323 km",
    transmission: "Automatique",
    fuel: "gasoline",
    image: "/Cars/AudiRS7/IMG-20250720-WA0029.jpg",
    badge: "Disponible",
    isAvailable: true,
    features: ["Carbon Optic", "Audi Exclusive", "4.0L V8", "Quattro"],
  },
  {
    id: 2,
    name: "Mercedes C63 P31 Package",
    year: 2013,
    price: "41 099 CAD $",
    mileage: "73,000 km",
    transmission: "Automatique",
    fuel: "gasoline",
    image: "/Cars/MercedesC63/IMG-20250814-WA0022.jpg",
    badge: "Vendu",
    isAvailable: false,
    features: ["P31 Package"],
  },
  {
    id: 3,
    name: "Ford Edge",
    year: 2014,
    price: "11 500 CAD $",
    mileage: "147,000 km",
    transmission: "Automatique",
    fuel: "gasoline",
    image: "/Cars/FordEdge/IMG-20250914-WA0038.jpg",
    badge: "Disponible",
    isAvailable: true,
    features: ["SUV"],
  },
];
