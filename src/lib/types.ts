
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  image: string;
  description: string;
  organizer: string;
  seats: number;
  registeredCount: number;
}

export type EventCategory = 
  | "academic"
  | "cultural"
  | "sports"
  | "workshop"
  | "seminar"
  | "conference"
  | "competition";

export interface FilterOptions {
  category: EventCategory | "all";
  searchQuery: string;
}
