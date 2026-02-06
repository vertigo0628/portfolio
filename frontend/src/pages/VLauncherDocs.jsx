import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioData } from '../mock';
import VLauncherCaseStudy from '../components/VLauncherCaseStudy';
import Background3D from '../components/Background3D';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import '../pages/Home.css'; // Reuse main styles for consistency

const VLauncherDocs = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="portfolio-container">
            <Background3D />

            <div className="section-content" style={{ paddingTop: '100px', minHeight: '100vh' }}>
                <div className="max-w-4xl mx-auto">
                    <Button
                        onClick={() => navigate('/')}
                        className="mb-8 hover:bg-white/10 text-white border border-white/20 bg-transparent"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Portfolio
                    </Button>

                    <div className="docs-intro mb-8 text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">V-Launcher Architecture</h1>
                        <p className="text-slate-400">Technical deep dive into the engineering challenges and solutions.</p>
                    </div>

                    <VLauncherCaseStudy data={portfolioData.vLauncherCaseStudy} />
                </div>
            </div>
        </div>
    );
};

export default VLauncherDocs;
