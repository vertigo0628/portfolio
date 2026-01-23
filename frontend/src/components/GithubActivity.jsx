import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Card, CardContent } from './ui/card';
import ScrollAnimation from './ScrollAnimation';

const GithubActivity = ({ username }) => {
    return (
        <ScrollAnimation className="github-activity-section" delay={0.2}>
            <h3 className="skills-title" style={{ marginTop: '40px', marginBottom: '20px' }}>
                Coding Activity
            </h3>
            <Card className="github-card" style={{ background: '#0D1117', border: '1px solid #30363D', padding: '24px' }}>
                <CardContent style={{ display: 'flex', justifyContent: 'center', padding: 0 }}>
                    <GitHubCalendar
                        username={username}
                        colorScheme="dark"
                        fontSize={12}
                        blockSize={12}
                        blockMargin={5}
                        theme={{
                            dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                        }}
                        labels={{
                            totalCount: '{{count}} contributions in the last year',
                        }}
                    />
                </CardContent>
            </Card>
        </ScrollAnimation>
    );
};

export default GithubActivity;
