import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Github, Star, GitFork, ExternalLink, Code2 } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';
import axios from 'axios';

const GithubProjects = ({ username }) => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`);
                // Filter out forks if desired, or keep them. Sorting by updated suggests showing recent work.
                // Let's sort by stars then updated to show best work first? Or just updated.
                // User said "projects that i have", implying ownership.
                const sortedRepos = response.data
                    .filter(repo => !repo.fork) // Optional: filter out forks to show original work
                    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)); // Sort by most recently updated

                setRepos(sortedRepos.slice(0, 6)); // Top 6 recent non-fork repos
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch Github repos:", err);
                setError("Could not load projects.");
                setLoading(false);
            }
        };

        if (username) {
            fetchRepos();
        }
    }, [username]);

    if (loading || error || repos.length === 0) return null;

    return (
        <section className="github-projects-section mt-12">
            <ScrollAnimation>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="section-title text-2xl font-bold text-white flex items-center gap-2">
                        <Github className="text-white" size={24} />
                        <span>Open Source Repositories</span>
                    </h3>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-muted-foreground hover:text-white border-slate-700"
                        onClick={() => window.open(`https://github.com/${username}?tab=repositories`, '_blank')}
                    >
                        View All
                        <ExternalLink size={14} className="ml-2" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {repos.map((repo) => (
                        <Card key={repo.id} className="bg-[#0D1117] border-slate-800 hover:border-slate-600 transition-all duration-300 group cursor-pointer"
                            onClick={() => window.open(repo.html_url, '_blank')}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-base font-medium text-blue-400 group-hover:underline flex items-center gap-2">
                                        <Code2 size={16} className="shrink-0" />
                                        <span className="truncate">{repo.name}</span>
                                    </CardTitle>
                                    <div className="flex items-center gap-3 text-slate-500 text-xs">
                                        {repo.stargazers_count > 0 && (
                                            <span className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
                                                <Star size={12} /> {repo.stargazers_count}
                                            </span>
                                        )}
                                        {repo.forks_count > 0 && (
                                            <span className="flex items-center gap-1 hover:text-white transition-colors">
                                                <GitFork size={12} /> {repo.forks_count}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <CardDescription className="text-slate-400 text-sm line-clamp-2 h-10">
                                    {repo.description || "No description available."}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        {repo.language && (
                                            <Badge variant="secondary" className="bg-slate-800 text-slate-300 text-xs font-normal">
                                                <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1.5 inline-block"></span>
                                                {repo.language}
                                            </Badge>
                                        )}
                                    </div>
                                    <span className="text-xs text-slate-600">
                                        {new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollAnimation>
        </section>
    );
};

export default GithubProjects;
