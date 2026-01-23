import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Server, Activity, Code2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

const DuetCastCaseStudy = ({ data }) => {
    if (!data) return null;

    return (
        <div className="duetcast-casestudy mt-8">
            <ScrollAnimation delay={0.1}>
                <div className="casestudy-header mb-6">
                    <Badge variant="outline" className="mb-2 bg-blue-500/10 text-blue-400 border-blue-500/20">
                        Technical Deep Dive
                    </Badge>
                    <h3 className="text-2xl font-bold text-white mb-2">{data.title}</h3>
                    <p className="text-slate-400 max-w-3xl">{data.introduction}</p>
                </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Architecture Section */}
                <ScrollAnimation delay={0.2} className="h-full">
                    <Card className="bg-[#0D1117] border-slate-800 h-full">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-blue-500/10">
                                    <Server className="text-blue-400" size={24} />
                                </div>
                                <h4 className="text-lg font-semibold text-white">{data.architecture.title}</h4>
                            </div>
                            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                {data.architecture.description}
                            </p>
                            <ul className="space-y-3">
                                {data.architecture.points.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                        <CheckCircle2 size={16} className="text-green-500 mt-1 shrink-0" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </ScrollAnimation>

                {/* Sync Logic Section with Code */}
                <ScrollAnimation delay={0.3} className="h-full">
                    <Card className="bg-[#0D1117] border-slate-800 h-full overflow-hidden">
                        <CardContent className="p-0 flex flex-col h-full">
                            <div className="p-6 pb-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-purple-500/10">
                                        <Activity className="text-purple-400" size={24} />
                                    </div>
                                    <h4 className="text-lg font-semibold text-white">{data.syncLogic.title}</h4>
                                </div>
                                <p className="text-slate-400 text-sm mb-4">
                                    {data.syncLogic.description}
                                </p>
                            </div>

                            <div className="mt-auto bg-[#161b22] border-t border-slate-800 p-4 font-mono text-xs overflow-x-auto">
                                <div className="flex items-center gap-2 mb-2 text-slate-500">
                                    <Code2 size={14} />
                                    <span>sync-hook.ts</span>
                                </div>
                                <pre className="text-slate-300">
                                    <code dangerouslySetInnerHTML={{
                                        __html: data.syncLogic.codeSnippet
                                            .replace(/const/g, '<span class="text-red-400">const</span>')
                                            .replace(/if/g, '<span class="text-red-400">if</span>')
                                            .replace(/return/g, '<span class="text-red-400">return</span>')
                                            .replace(/\/\/.*/g, match => `<span class="text-slate-500">${match}</span>`)
                                    }} />
                                </pre>
                            </div>
                        </CardContent>
                    </Card>
                </ScrollAnimation>
            </div>

            {/* Challenges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.challenges.map((challenge, idx) => (
                    <ScrollAnimation key={idx} delay={0.4 + (idx * 0.1)}>
                        <Card className="bg-[#0D1117]/50 border-slate-800/50 hover:bg-[#0D1117] transition-colors">
                            <CardContent className="p-4 flex gap-4">
                                <AlertTriangle className="text-yellow-500 shrink-0 mt-1" size={20} />
                                <div>
                                    <h5 className="text-slate-200 font-medium mb-1">{challenge.title}</h5>
                                    <p className="text-slate-400 text-sm">{challenge.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </ScrollAnimation>
                ))}
            </div>
        </div>
    );
};

export default DuetCastCaseStudy;
