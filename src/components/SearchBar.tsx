import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationRequest: () => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, onLocationRequest, isLoading }: SearchBarProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
      <div className="relative flex items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="w-full px-4 py-2 pr-24 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <div className="absolute right-2 flex space-x-2">
          <button
            type="button"
            onClick={onLocationRequest}
            className="p-2 text-gray-600 hover:text-blue-500 transition-colors"
            disabled={isLoading}
            title="Use current location"
          >
            <MapPin className="w-5 h-5" />
          </button>
          <button
            type="submit"
            className="p-2 text-gray-600 hover:text-blue-500 transition-colors"
            disabled={isLoading || !city.trim()}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}