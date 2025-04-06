
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import EventFilter from '../components/EventFilter';
import { Event, EventCategory, FilterOptions } from '../lib/types';
import { events, getEventsByCategory, searchEvents } from '../lib/data';

const Events = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    searchQuery: '',
  });

  useEffect(() => {
    let result = events;
    
    // Apply category filter
    if (filters.category !== 'all') {
      result = getEventsByCategory(filters.category);
    }
    
    // Apply search filter
    if (filters.searchQuery) {
      result = searchEvents(filters.searchQuery);
      // If category is also applied, we need to filter further
      if (filters.category !== 'all') {
        result = result.filter(event => event.category === filters.category);
      }
    }
    
    setFilteredEvents(result);
  }, [filters]);

  const handleCategoryChange = (category: EventCategory | 'all') => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleSearchChange = (searchQuery: string) => {
    setFilters(prev => ({ ...prev, searchQuery }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Events</h1>
          <p className="text-lg opacity-90">Browse and register for upcoming events at KLU</p>
        </div>
      </div>
      
      {/* Events Section */}
      <section className="py-8 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <EventFilter 
            selectedCategory={filters.category}
            searchQuery={filters.searchQuery}
            onCategoryChange={handleCategoryChange}
            onSearchChange={handleSearchChange}
          />
          
          {/* Results */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No events found</h3>
              <p className="text-gray-600 mb-4">Try changing your search or filter criteria</p>
              <button 
                className="text-blue-600 font-medium"
                onClick={() => setFilters({ category: 'all', searchQuery: '' })}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Events;
