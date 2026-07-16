import { useState } from "react";
export const UserCard = ({ user, repos }) => {
  const [copied, setCopied] = useState(false);
  const joined = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const handleCopy = async () => {
    await navigator.clipboard.writeText(`https://github.com/${user.login}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-sm mx-auto mt-6 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900">
      <div className="flex items-center gap-4 p-5 border-b border-zinc-800">
        <img
          className="w-16 h-16 rounded-full border border-zinc-700 shrink-0"
          src={user.avatar_url}
          alt={user.login}
        />

        <div>
          <h3 className="text-base font-semibold text-white">
            {user.name || user.login}
          </h3>

          <p className="font-mono text-xs text-zinc-500 mt-0.5">
            @{user.login}
          </p>

          {user.bio && (
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 border-b border-zinc-800">
        <div className="py-4 text-center border-r border-zinc-800">
          <span className="block font-mono text-lg font-semibold text-white">
            {user.public_repos}
          </span>
          <span className="block text-xs text-zinc-500 uppercase tracking-wide mt-0.5">
            Repos
          </span>
        </div>

        <div className="py-4 text-center border-r border-zinc-800">
          <span className="block font-mono text-lg font-semibold text-white">
            {user.followers}
          </span>
          <span className="block text-xs text-zinc-500 uppercase tracking-wide mt-0.5">
            Followers
          </span>
        </div>

        <div className="py-4 text-center">
          <span className="block font-mono text-lg font-semibold text-white">
            {user.following}
          </span>
          <span className="block text-xs text-zinc-500 uppercase tracking-wide mt-0.5">
            Following
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800">
        <span className="text-xs text-zinc-500">
          {user.location || "No location"}
        </span>

        <div className="flex flex-col items-end gap-1">
          <a
            href={`https://github.com/${user.login}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            View Profile →
          </a>
          {
            <button
              onClick={handleCopy}
              className="font-mono text-xs text-zinc-500 hover:text-white transition-colors"
            >
              {copied ? "✓ copied!" : "copy url"}
            </button>
          }

          <span className="font-mono text-xs text-zinc-600">
            since {joined}
          </span>
        </div>
      </div>

      {repos.length > 0 && (
        <div className="px-5 py-4">
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
            // top repos
          </p>

          <ul className="space-y-2">
            {repos.map((repo) => (
              <li key={repo.id} className="flex items-center justify-between">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-zinc-300 hover:text-white transition-colors truncate max-w-[180px]"
                >
                  {repo.name}
                </a>

                <span className="font-mono text-xs text-zinc-500 flex items-center gap-1">
                  ⭐ {repo.stargazers_count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
