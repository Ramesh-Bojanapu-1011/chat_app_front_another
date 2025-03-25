"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserFriends } from "@/data/details/interfaces/intefaces";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

// Simulated API call to search friends
const searchFriends = async (
  query: string,
  data: UserFriends,
): Promise<typeof data.friends> => {
  await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate network delay
  return data.friends.filter(
    (friend) =>
      friend.fullName.toLowerCase().includes(query.toLowerCase()) ||
      friend.username.toLowerCase().includes(query.toLowerCase()) ||
      friend.email.toLowerCase().includes(query.toLowerCase()),
  );
};

interface AutoCompleteProps {
  value?: string;
  onChange?: (value: string) => void;
  data: UserFriends;
}

export default function FriendSearch({
  value = "",
  onChange,
  data,
}: AutoCompleteProps) {
  const [query, setQuery] = useState(value);
  const [debouncedQuery] = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<typeof data.friends>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchSuggestionsCallback = async (q: string) => {
      if (q.trim() === "") {
        setSuggestions([]);
        return;
      }
      setIsLoading(true);
      const results = await searchFriends(q, data);
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
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      const selected = suggestions[selectedIndex];
      setQuery(selected.email);
      onChange?.(selected.email);
      setSuggestions([]);
      setSelectedIndex(-1);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (friend: (typeof data.friends)[number]) => {
    setQuery(friend.email);
    onChange?.(friend.email);
    // console.log(friend);
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
    <div className="w-full mx-auto">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search friends..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full pr-10"
          aria-label="Search friends"
          aria-autocomplete="list"
          aria-controls="friends-list"
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
          id="friends-list"
          className="absolute z-10 mt-2 border rounded-md shadow-sm bg-background"
          role="listbox"
        >
          {suggestions.map((friend, index) => (
            <li
              key={friend._id}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-muted ${
                index === selectedIndex ? "bg-muted" : ""
              }`}
              onClick={() => handleSuggestionClick(friend)}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <img
                src={friend.image_url}
                alt={friend.fullName}
                className="w-8 h-8 mr-3 rounded-full"
              />
              <div className="flex flex-col justify-center">
                <span>{friend.fullName}</span>
                <span className="text-muted-foreground">{friend.email}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
