import { useState } from "react";

export const SearchBar = ({
  username,
  setUsername,
  onSearch,
  loading,
  history,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowDropdown(false);
      onSearch();
    }
  };

  const handleHistoryClick = (name) => {
    setUsername(name);
    setShowDropdown(false);
    onSearch(name);
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <div className="flex gap-2 relative">
        <div className="relative">
          <input
            className="bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 px-4 py-2 rounded-lg outline-none focus:border-zinc-400 font-mono text-sm w-64"
            type="text"
            aria-label="GitHub username"
            maxLength={39}
            placeholder="Enter username..."
            value={username}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          />

          {showDropdown && history.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden z-10">
              {history.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleHistoryClick(name)}
                  className="w-full text-left px-4 py-2 font-mono text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="bg-white text-zinc-950 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50"
          disabled={loading}
          onClick={() => onSearch()}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
};
