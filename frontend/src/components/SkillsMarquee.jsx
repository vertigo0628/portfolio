import React from 'react';
import Marquee from 'react-fast-marquee';
import { Badge } from './ui/badge';
import './SkillsMarquee.css';

const SkillsMarquee = ({ skills, direction = "left", speed = 40 }) => {
    return (
        <div className="skills-marquee-container">
            <Marquee gradient={true} gradientColor={[10, 14, 26]} speed={speed} direction={direction}>
                <div className="marquee-content">
                    {skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="marquee-badge">
                            {skill}
                        </Badge>
                    ))}
                </div>
            </Marquee>
        </div>
    );
};

export default SkillsMarquee;
