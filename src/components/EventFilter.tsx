
import React from 'react';
import { EventCategory } from '../lib/types';
import { Search } from 'lucide-react';

interface EventFilterProps {
  selectedCategory: EventCategory | 'all';
  searchQuery: string;
  onCategoryChange: (category: EventCategory | 'all') => void;
  onSearchChange: (query: string) => void;
}

const EventFilter = ({
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: EventFilterProps) => {
  const categories: Array<{ value: EventCategory | 'all'; label: string }> = [
    { value: 'all', label: 'All Events' },
    { value: 'academic', label: 'Academic' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'sports', label: 'Sports' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'seminar', label: 'Seminars' },
    { value: 'conference', label: 'Conferences' },
    { value: 'competition', label: 'Competitions' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category.value}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => onCategoryChange(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
