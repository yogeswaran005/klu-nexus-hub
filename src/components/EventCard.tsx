
import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../lib/types';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import { formatDate } from '../lib/utils';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const EventCard = ({ event, featured = false }: EventCardProps) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  
  const availableSeats = event.seats - event.registeredCount;
  const progressPercentage = (event.registeredCount / event.seats) * 100;

  return (
    <Link 
      to={`/events/${event.id}`}
      className={`block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-md text-sm font-medium">
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{event.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <span className="text-sm">{formattedDate} | {event.time}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPinIcon className="h-4 w-4 mr-2" />
          <span className="text-sm">{event.location}</span>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium flex items-center">
              <UsersIcon className="h-4 w-4 mr-1" />
              {availableSeats} seats left
            </span>
            <span className="text-gray-500">{event.registeredCount}/{event.seats}</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
