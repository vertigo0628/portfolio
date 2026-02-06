import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import {
    Home, User, Briefcase, Mail, FileDown,
    Github, Linkedin, ExternalLink, Moon, Sun,
    Code, Search, Phone, Video, Smartphone
} from 'lucide-react';
import { portfolioData } from '../mock';
import './CommandPalette.css';

const CommandPalette = () => {
    const [open, setOpen] = useState(false);

    // Toggle with Ctrl+K or Cmd+K
    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = (command) => {
        setOpen(false);
        command();
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const openLink = (url) => {
        window.open(url, '_blank');
    };

    const downloadCV = () => {
        // Trigger the existing download logic or a simpler version
        const link = document.createElement('a');
        link.href = '#'; // Placeholder - ideally link to actual CV file if available
        // For now re-use vcard logic manually if needed, or just scroll to contact
        scrollToSection('contact');
    };

    if (!open) return null;

    return (
        <div className="command-palette-overlay" onClick={() => setOpen(false)}>
            <div className="command-palette-container" onClick={(e) => e.stopPropagation()}>
                <Command label="Command Menu" className="command-menu">
                    <div className="command-search-wrapper">
                        <Search className="command-search-icon" size={18} />
                        <Command.Input placeholder="Type a command or search..." className="command-input" />
                    </div>

                    <Command.List className="command-list">
                        <Command.Empty>No results found.</Command.Empty>

                        <Command.Group heading="Navigation">
                            <Command.Item onSelect={() => runCommand(() => scrollToSection('about'))}>
                                <User className="mr-2" size={16} />
                                <span>About Me</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => scrollToSection('vlauncher'))}>
                                <Smartphone className="mr-2" size={16} />
                                <span>V-Launcher</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => scrollToSection('vtexter'))}>
                                <Code className="mr-2" size={16} />
                                <span>VTexter App</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => scrollToSection('duetcast'))}>
                                <Video className="mr-2" size={16} /> {/* Using Video icon for consistency */}
                                <span>DuetCast Platform</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => scrollToSection('security'))}>
                                <Briefcase className="mr-2" size={16} />
                                <span>Services</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => scrollToSection('blog'))}>
                                <FileDown className="mr-2" size={16} />
                                <span>Blog</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => scrollToSection('contact'))}>
                                <Mail className="mr-2" size={16} />
                                <span>Contact</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Social & Links">
                            <Command.Item onSelect={() => runCommand(() => openLink(`https://github.com/${portfolioData.contact.github}`))}>
                                <Github className="mr-2" size={16} />
                                <span>GitHub</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => openLink(portfolioData.contact.linkedin))}>
                                <Linkedin className="mr-2" size={16} />
                                <span>LinkedIn</span>
                            </Command.Item>
                            <Command.Item onSelect={() => runCommand(() => openLink(`https://wa.me/${portfolioData.contact.whatsapp}`))}>
                                <Phone className="mr-2" size={16} /> {/* Assuming Phone is imported or I should import it */}
                                <span>WhatsApp</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Theme">
                            {/* Placeholder for theme switching */}
                            <Command.Item onSelect={() => runCommand(() => console.log('Toggle Theme'))}>
                                <Moon className="mr-2" size={16} />
                                <span>Toggle Dark/Light Mode (Coming Soon)</span>
                            </Command.Item>
                        </Command.Group>

                    </Command.List>
                </Command>
            </div>
        </div>
    );
};

// Need to make sure Phone and Video are imported, I used them above.
// React-icons or Lucide-react: I'm using lucide-react in home.jsx.
// Imports checked: Home, User, Briefcase, Mail, FileDown, Github, Linkedin, ExternalLink, Moon, Sun, Code, Search
// I need: Video, Phone. Adding them to imports.

export default CommandPalette;
