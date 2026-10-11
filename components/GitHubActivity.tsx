import React, { useEffect, useState } from 'react';
import { Github, ExternalLink, GitCommit, GitPullRequest, Star, GitFork, CircleDot, Activity } from 'lucide-react';

type GitHubEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: {
    action?: string;
    ref?: string;
    commits?: { message?: string }[];
    issue?: { title?: string; number?: number };
    pull_request?: { title?: string; number?: number };
  };
};

const eventLabel = (event: GitHubEvent) => {
  const repo = event.repo.name.split('/').pop() || event.repo.name;
  switch (event.type) {
    case 'PushEvent': return { icon: GitCommit, label: `Pushed updates to ${repo}`, detail: event.payload?.commits?.[0]?.message || 'Code updates' };
    case 'PullRequestEvent': return { icon: GitPullRequest, label: `${event.payload?.action || 'Updated'} pull request in ${repo}`, detail: event.payload?.pull_request?.title || 'Pull request activity' };
    case 'IssuesEvent': return { icon: CircleDot, label: `${event.payload?.action || 'Updated'} an issue in ${repo}`, detail: event.payload?.issue?.title || 'Issue activity' };
    case 'WatchEvent': return { icon: Star, label: `Starred ${repo}`, detail: 'Repository starred' };
    case 'ForkEvent': return { icon: GitFork, label: `Forked ${repo}`, detail: 'Repository forked' };
    case 'CreateEvent': return { icon: Github, label: `Created a branch or repository in ${repo}`, detail: event.payload?.ref || 'New GitHub resource' };
    default: return { icon: Activity, label: `Activity in ${repo}`, detail: event.type.replace(/Event$/, '') };
  }
};

export const GitHubActivity: React.FC = () => {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty' | 'error'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://api.github.com/users/Ayush9791/events/public?per_page=8', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error('GitHub activity is temporarily unavailable');
        return response.json() as Promise<GitHubEvent[]>;
      })
      .then((data) => {
        const recent = data.filter((event) => event.type !== 'PublicEvent').slice(0, 6);
        setEvents(recent);
        setStatus(recent.length ? 'ready' : 'empty');
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === 'AbortError') return;
        setStatus('error');
      });
    return () => controller.abort();
  }, []);

  if (status === 'loading') return <p className="text-center text-xl text-gray-200" aria-live="polite">Loading recent GitHub activity…</p>;
  if (status !== 'ready') return (
    <div className="bg-[#292929] text-white border-4 border-black p-6 text-center">
      <p className="text-xl mb-3">{status === 'empty' ? 'No recent public events are available.' : 'Live activity could not be loaded right now.'}</p>
      <a href="https://github.com/Ayush9791?tab=activity" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-yellow-300 underline text-xl">Check GitHub activity <ExternalLink size={18} /></a>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {events.map((event) => {
        const item = eventLabel(event);
        const Icon = item.icon;
        return (
          <article key={event.id} className="bg-[#c6c6c6] text-black border-4 border-black p-4 shadow-[5px_5px_0_rgba(0,0,0,0.5)]">
            <div className="flex items-start gap-3">
              <div className="bg-[#333] text-yellow-300 p-2 border-2 border-black"><Icon size={22} /></div>
              <div className="min-w-0 flex-1">
                <p className="text-2xl font-bold leading-tight">{item.label}</p>
                <p className="text-lg text-[#444] mt-1 line-clamp-2 break-words">{item.detail}</p>
                <p className="text-base text-[#555] mt-2">{new Date(event.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
            <a href={`https://github.com/${event.repo.name}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-900 underline text-lg mt-3">Open repository <ExternalLink size={16} /></a>
          </article>
        );
      })}
    </div>
  );
};
