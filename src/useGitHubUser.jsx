import { useState } from "react";

export const useGitHubUser = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchUser = async (username) => {
    if (!username.trim()) return;
    setUser(null);
    setRepos([]);
    setError("");
    setLoading(true);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username.trim()}`),
        fetch(
          `https://api.github.com/users/${username.trim()}/repos?per_page=100`,
        ),
      ]);

      const userData = await userRes.json();
      const reposData = await reposRes.json();

      if (!userRes.ok) {
        setError(`User "${username}" not found`);
      } else {
        setUser(userData);
        const top5 = reposData
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5);
        setRepos(top5);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { user, repos, loading, error, searchUser };
};
