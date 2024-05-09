export interface Hotel {
    userCreatedId: string;
    name: string;
    location: Location;
    capacity: number;
    rating: number;
    image: string;
    roomPrice: RoomPrice;
    reviews: Review[];
    isAvailable: boolean;
}

export interface Review {
    userName: string;
    comment: string;
    rating: number;
}

export class User {
    id?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    reservations: Reservation[] = [];
    isAdmin?: boolean;

    constructor(id?: string, username?: string, firstname?: string, lastname?: string, email?: string, password?: string, isAdmin?: boolean) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}

export class Reservation {
    id: string;
    user: User;
    hotel: string;
    guests: Guest[];
    startingDate: Date;
    endDate: Date;
    rooms: Room[] = [];
    totalPrice: number = 0;
    isActive: boolean = false;

    constructor(user: User, hotel: string, guests: Guest[] = [], startingDate: Date = new Date(), endDate: Date = new Date()) {
        this.id = Math.floor(100000 + Math.random() * 900000).toString();
        this.user = user;
        this.hotel = hotel;
        this.guests = guests;
        this.startingDate = startingDate;
        this.endDate = endDate;
    }
}

export class Guest {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
    isAdult: boolean;

    constructor(id: string, firstname: string, lastname: string, age: number) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.isAdult = this.age > 12;
    }
}

export class Room {
    roomType: RoomType = RoomType.regular;
    capacity: number = 0;
    guests: Guest[] = [];
    price?: RoomPrice;
}

export class Location {
    country: string;
    city: string;
    street: string;
    number: number;
    title: string;

    constructor(country: string, city: string, street: string, number: number) {
        this.country = country;
        this.city = city;
        this.street = street;
        this.number = number;
        this.title = `${this.number} ${this.street}, ${this.city}, ${this.country}`;
    }
}

export class RoomPrice {
    regularRoom = { type: RoomType.regular, prices: {} };
    bigRoom = { type: RoomType.big, prices: {} };
    suite = { type: RoomType.suite, prices: {} };

    constructor(regularPrice: AgePrices, bigPrice: AgePrices, suitePrice: AgePrices) {
        this.regularRoom.prices = regularPrice;
        this.bigRoom.prices = bigPrice;
        this.suite.prices = suitePrice;
    }
}

export class AgePrices {
    childPrice: number = 0;
    adultPrice: number = 0;

    constructor(childPrice: number, adultPrice: number) {
        this.childPrice = childPrice;
        this.adultPrice = adultPrice;
    }
}

export enum RoomType {
    regular,
    big,
    suite
}