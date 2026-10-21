import { useState, useRef } from "react";

export const useGitHubUser = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Counts searches so an older, slower response can't overwrite a newer one
  const latestRequest = useRef(0);

  // Returns true if the user was found, false otherwise
  const searchUser = async (username) => {
    const name = username.trim();
    if (!name) return false;

    const requestId = ++latestRequest.current;
    setUser(null);
    setRepos([]);
    setError("");
    setLoading(true);

    try {
      const encoded = encodeURIComponent(name);
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${encoded}`),
        fetch(`https://api.github.com/users/${encoded}/repos?per_page=100`),
      ]);

      // A newer search started while we were waiting, so ignore this one
      if (requestId !== latestRequest.current) return false;

      if (userRes.status === 404) {
        setError(`User "${name}" not found`);
        return false;
      }
      if (userRes.status === 403 || userRes.status === 429) {
        setError(
          "GitHub rate limit reached. Please try again in a few minutes.",
        );
        return false;
      }
      if (!userRes.ok) {
        setError("Something went wrong. Please try again.");
        return false;
      }

      const userData = await userRes.json();
      // If the repos request failed, show the profile with no repos
      const reposData = reposRes.ok ? await reposRes.json() : [];

      if (requestId !== latestRequest.current) return false;

      const top5 = reposData
        .filter((r) => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5);

      setUser(userData);
      setRepos(top5);
      return true;
    } catch {
      if (requestId === latestRequest.current) {
        setError("Network error. Please try again.");
      }
      return false;
    } finally {
      if (requestId === latestRequest.current) {
        setLoading(false);
      }
    }
  };

  return { user, repos, loading, error, searchUser };
};
