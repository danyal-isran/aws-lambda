/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

export enum EyeColor {
  Blue = 'blue',
  Brown = 'brown',
  Green = 'green',
}

export enum FavoriteFruit {
  Apple = 'apple',
  Banana = 'banana',
  Strawberry = 'strawberry',
}

export interface Friend {
  id: number;
  name: string;
}

export enum Gender {
  Female = 'female',
  Male = 'male',
}

export interface User {
  _id: string;
  index: number;
  guid: string;
  isActive: boolean;
  balance: string;
  picture: string;
  age: number;
  eyeColor: EyeColor;
  name: string;
  gender: Gender;
  company: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  registered: string;
  latitude: number;
  longitude: number;
  tags: string[];
  friends: Friend[];
  greeting: string;
  favoriteFruit: FavoriteFruit;
}
