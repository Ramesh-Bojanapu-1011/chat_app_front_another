'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserDetails } from '@/data/details/interfaces/intefaces';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

// Assume this is the currently logged-in user

// Function to search users excluding the current user
const searchUsers = async (
  query: string,
  data: UserDetails[],
  currentUserId: string
): Promise<UserDetails[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate network delay
  return data
    .filter((user) => user.clerkId !== currentUserId) // Exclude logged-in user
    .filter(
      (user) =>
        user.fullName.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
};

interface AutoCompleteProps {
  value?: string;
  onChange?: (value: string) => void;
  data: UserDetails[];
  currentUserId: string;
}

export default function UserSearch({
  value = '',
  onChange,
  data,
  currentUserId,
}: AutoCompleteProps) {
  const [query, setQuery] = useState(value);
  const [debouncedQuery] = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<typeof data>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchSuggestionsCallback = async (q: string) => {
      if (q.trim() === '') {
        setSuggestions([]);
        return;
      }
      setIsLoading(true);
      const results = await searchUsers(q, data, currentUserId);
      setSuggestions(results);
      setIsLoading(false);
    };
    if (debouncedQuery && isFocused) {
      fetchSuggestionsCallback(debouncedQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange?.(newValue);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      const selected = suggestions[selectedIndex];
      setQuery(selected.email);
      onChange?.(selected.email);
      setSuggestions([]);
      setSelectedIndex(-1);
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (user: (typeof data)[number]) => {
    setQuery(user.email);
    onChange?.(user.email);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      setSuggestions([]);
      setSelectedIndex(-1);
    }, 200);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="pr-10"
          aria-label="Search users"
          aria-autocomplete="list"
          aria-controls="user-list"
          aria-expanded={suggestions.length > 0}
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-0 right-0 h-full"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
      {isLoading && isFocused && (
        <div
          className="absolute z-10 p-2 mt-2 border rounded-md shadow-sm bg-background"
          aria-live="polite"
        >
          Loading...
        </div>
      )}
      {suggestions.length > 0 && !isLoading && isFocused && (
        <ul
          id="user-list"
          className="absolute z-10 mt-2 border rounded-md shadow-sm bg-background"
          role="listbox"
        >
          {suggestions.map((user, index) => (
            <li
              key={user._id}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-muted ${index === selectedIndex ? 'bg-muted' : ''}`}
              onClick={() => handleSuggestionClick(user)}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <img
                src={user.image_url}
                alt={user.fullName}
                className="w-8 h-8 mr-3 rounded-full"
              />
              <span>{user.fullName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
