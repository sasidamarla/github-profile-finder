import "./App.css";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { UserCard } from "./UserCard";
import { useGitHubUser } from "./useGitHubUser";

function App() {
  const [username, setUsername] = useState("");
  const [history, setHistory] = useState([]);
  const { user, repos, loading, error, searchUser } = useGitHubUser();

  const handleSearch = async (name = username) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const found = await searchUser(trimmed);
    // Only remember searches that actually found a user
    if (!found) return;
    setHistory((prev) => {
      const filtered = prev.filter(
        (h) => h.toLowerCase() !== trimmed.toLowerCase(),
      );
      return [trimmed, ...filtered].slice(0, 5);
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-16 px-4">
      <div className="text-center mb-8">
        <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-1">
          // dev lookup
        </p>
        <h1 className="text-2xl font-semibold text-white">
          GitHub Profile Finder
        </h1>
      </div>

      <SearchBar
        username={username}
        setUsername={setUsername}
        onSearch={handleSearch}
        loading={loading}
        history={history}
      />

      {loading && (
        <p className="text-center mt-4 font-mono text-sm text-zinc-500">
          // fetching...
        </p>
      )}

      {error && (
        <p className="text-center mt-4 font-mono text-sm text-red-400">
          // error: {error}
        </p>
      )}

      {user && <UserCard user={user} repos={repos} />}
    </div>
  );
}

export default App;
