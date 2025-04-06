
import { Event } from "./types";

export const events: Event[] = [
  {
    id: "1",
    title: "AI Workshop 2025",
    date: "2025-05-15",
    time: "10:00 AM - 4:00 PM",
    location: "KLU Main Auditorium",
    category: "workshop",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1470&auto=format&fit=crop",
    description: "Join us for an intensive workshop on artificial intelligence and machine learning. Learn from industry experts and get hands-on experience with the latest AI technologies.",
    organizer: "Department of Computer Science",
    seats: 100,
    registeredCount: 65,
  },
  {
    id: "2",
    title: "Annual Technical Symposium",
    date: "2025-06-10",
    time: "9:00 AM - 5:00 PM",
    location: "KLU Convention Center",
    category: "conference",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop",
    description: "The flagship technical event of KLU featuring paper presentations, technical quizzes, and innovative project showcases from students across departments.",
    organizer: "Student Technical Council",
    seats: 500,
    registeredCount: 320,
  },
  {
    id: "3",
    title: "Cultural Night 2025",
    date: "2025-04-20",
    time: "6:00 PM - 10:00 PM",
    location: "KLU Open Air Theatre",
    category: "cultural",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1470&auto=format&fit=crop",
    description: "Experience the vibrant cultural diversity through music, dance, and theatrical performances by talented students.",
    organizer: "Cultural Committee",
    seats: 1000,
    registeredCount: 750,
  },
  {
    id: "4",
    title: "Entrepreneurship Summit",
    date: "2025-07-05",
    time: "11:00 AM - 3:00 PM",
    location: "Business School, KLU",
    category: "seminar",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1470&auto=format&fit=crop",
    description: "Connect with successful entrepreneurs, venture capitalists, and industry leaders to learn about building successful startups and business ventures.",
    organizer: "E-Cell KLU",
    seats: 200,
    registeredCount: 120,
  },
  {
    id: "5",
    title: "Inter-College Sports Tournament",
    date: "2025-08-10",
    time: "8:00 AM - 6:00 PM",
    location: "KLU Sports Complex",
    category: "sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1470&auto=format&fit=crop",
    description: "Annual sports competition featuring cricket, football, basketball, and athletics events with participation from colleges across the region.",
    organizer: "Sports Department",
    seats: 300,
    registeredCount: 250,
  },
  {
    id: "6",
    title: "Research Conference 2025",
    date: "2025-09-15",
    time: "9:00 AM - 5:00 PM",
    location: "Research Block, KLU",
    category: "academic",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop",
    description: "International conference showcasing cutting-edge research work from faculty and research scholars across various disciplines.",
    organizer: "Research & Development Cell",
    seats: 400,
    registeredCount: 280,
  },
  {
    id: "7",
    title: "Coding Competition",
    date: "2025-05-30",
    time: "2:00 PM - 8:00 PM",
    location: "Computer Lab Complex",
    category: "competition",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop",
    description: "Test your programming skills in this high-intensity coding competition with challenging problems and attractive prizes.",
    organizer: "Coding Club",
    seats: 150,
    registeredCount: 135,
  },
  {
    id: "8",
    title: "Campus Recruitment Drive",
    date: "2025-10-10",
    time: "9:00 AM - 4:00 PM",
    location: "KLU Placement Cell",
    category: "academic",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1470&auto=format&fit=crop",
    description: "Major companies visiting campus for recruitment of final year students across engineering and management disciplines.",
    organizer: "Training & Placement Office",
    seats: 600,
    registeredCount: 580,
  }
];

export function getEventById(id: string): Event | undefined {
  return events.find(event => event.id === id);
}

export function getUpcomingEvents(count = 4): Event[] {
  return [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, count);
}

export function getEventsByCategory(category: string): Event[] {
  if (category === "all") return [...events];
  return events.filter(event => event.category === category);
}

export function searchEvents(query: string): Event[] {
  const lowercaseQuery = query.toLowerCase();
  return events.filter(
    event => 
      event.title.toLowerCase().includes(lowercaseQuery) ||
      event.description.toLowerCase().includes(lowercaseQuery) ||
      event.organizer.toLowerCase().includes(lowercaseQuery) ||
      event.location.toLowerCase().includes(lowercaseQuery)
  );
}
