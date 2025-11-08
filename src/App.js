import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MessageCircle, Video, Instagram, Download, Code, GraduationCap, Award, ChevronDown } from 'lucide-react';


export default function Portfolio() {
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const skills = {
        'Programming': ['Python', 'R', 'Java', 'HTML', 'CSS', 'JavaScript', 'C++', 'SQL'],
        'Tools & Frameworks': ['React', 'Node.js', 'Express.js', 'AWS (S3, DynamoDB)', 'TensorFlow', 'Pandas', 'NumPy', 'Matplotlib', 'PyTorch', 'Sci-kit learn', 'Streamlit', 'Git', 'Docker', 'Figma', 'Notion', 'Scrum', 'Agile', 'PowerBI', 'Tableau',],
        'AI & Machine Learning': ['Linear Regression', 'Logistic Regression', 'SVR', 'SVM', 'XG Boost', 'Random Forest', 'Gradient Boosting', 'Autoencoders', 'RBM', 'Decision Tree', 'GMMs', 'CNNs',
            'RNNs', 'LSTMs', 'LLMs', 'NLP'],
        'Blockchain Development': ['Solidity', 'Hardhat', 'Ethereum', 'Smart Contracts', 'DApps', 'ECDSA', 'Web3.js']
    };

    const education = [
        {
            degree: 'MSc Financial Technology',
            institution: 'University of Exeter',
            year: '2025 - Present',
            location: 'Exeter, Devon, United Kingdom',
            description: 'Specializing in the intersection of finance and technology, focusing on blockchain, AI in finance, and quantitative analysis'
        },
        {
            degree: 'B.Tech Computer Engineering',
            institution: 'K.J. Somaiya Institute of Technology',
            year: '2021 - 2025',
            location: 'Mumbai, Maharashtra, India',
            description: 'Strong foundation in Computer Engineering with specialization in AI/ML & Blockchain principles'
        }
    ];

    const scrollToSection = (section) => {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(section);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-8">
                            {['home', 'about', 'education', 'skills', 'projects', 'contact'].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className={`capitalize hover:text-purple-400 transition-colors ${activeSection === section ? 'text-purple-400' : ''}`}
                                >
                                    {section}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
                <div className="text-center z-10 px-6">
                    <div className="mb-8">
                        <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-1 hover:scale-105 transition-transform">
                            {!imgError ? (
                                <img
                                    src="/profile.jpg"
                                    alt="Jainam Varia"
                                    className="w-full h-full rounded-full object-cover bg-slate-900"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-6xl font-bold">
                                    JV
                                </div>
                            )}
                        </div>
                    </div>
                    <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                        Jainam Varia
                    </h1>
                    <p className="text-2xl text-purple-300 mb-2">AI/ML & Blockchain Enthusiast</p>
                    <p className="text-xl text-gray-400 mb-8">B.Tech Computer Engineer | MSc Financial Technology @ University of Exeter</p>

                    <div className="flex gap-4 justify-center mb-8">
                        <a href="https://drive.google.com/file/d/1dK8Y9fE3lZKAspmf7n5YVlES4c-9znax/view?usp=sharing" download
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-500 hover:to-purple-500 transition-all hover:scale-105 font-semibold shadow-lg">
                            <Download size={20} />
                            Download CV
                        </a>
                    </div>

                    <div className="flex gap-6 justify-center mb-12">
                        <a href="https://www.linkedin.com/in/jainamvaria/" target="_blank" rel="noopener noreferrer"
                            className="p-3 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition-all hover:scale-110">
                            <Linkedin size={24} />
                        </a>
                        <a href="https://github.com/jainamvaria" target="_blank" rel="noopener noreferrer"
                            className="p-3 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition-all hover:scale-110">
                            <Github size={24} />
                        </a>
                        <a href="mailto:jainamvaria1010@gmail.com"
                            className="p-3 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition-all hover:scale-110">
                            <Mail size={24} />
                        </a>
                        <a href="https://wa.me/447544504854" target="_blank" rel="noopener noreferrer"
                            className="p-3 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition-all hover:scale-110"
                            title="WhatsApp">
                            <MessageCircle size={24} />
                        </a>
                        <a href="https://www.instagram.com/jai_varia_19/" target="_blank" rel="noopener noreferrer"
                            className="p-3 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition-all hover:scale-110"
                            title="Instagram">
                            <Instagram size={24} />
                        </a>
                    </div>
                    <button onClick={() => scrollToSection('about')} className="animate-bounce">
                        <ChevronDown size={32} className="text-purple-400" />
                    </button>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        About Me
                    </h2>
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                            I'm a 21-year-old tech enthusiast passionate about the intersection of finance and technology.
                            Currently living in Exeter, United Kingdom, pursuing my Master of Science in Financial Technology at
                            the University of Exeter, I bring a strong foundation in computer engineering from my B.Tech at
                            K.J. Somaiya Institute of Technology.
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                            My journey combines technical expertise with financial acumen, positioning me to drive innovation
                            in the rapidly evolving FinTech landscape. I'm committed to leveraging technology to solve complex
                            financial challenges and create impactful solutions.
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            With expertise spanning AI/ML, blockchain development, and quantitative analysis, I've developed
                            projects ranging from fraud detection systems to decentralized applications. I am actively exploring
                            opportunities in AI/ML, quantitative finance, and blockchain-driven roles across the United Kingdom.
                        </p>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section id="education" className="py-20 px-6 bg-slate-900/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Education
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {education.map((edu, index) => (
                            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-105">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-purple-600/20 rounded-lg">
                                        <GraduationCap size={24} className="text-purple-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-purple-300 mb-2">{edu.degree}</h3>
                                        <p className="text-xl text-gray-300 mb-1">{edu.institution}</p>
                                        <p className="text-gray-400 mb-1">{edu.location}</p>
                                        <p className="text-purple-400 mb-3">{edu.year}</p>
                                        <p className="text-gray-300">{edu.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Skills & Expertise
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(skills).map(([category, items]) => (
                            <div key={category} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                                <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                                    <Code size={20} />
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((skill) => (
                                        <span key={skill} className="px-4 py-2 bg-purple-600/20 rounded-full text-sm hover:bg-purple-600/40 transition-colors">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 px-6 bg-slate-900/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Projects
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Project 1 - Add your first project here */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-105">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-2xl font-bold text-purple-300">Faucet-dapp</h3>
                                <div className="flex gap-3">
                                    <a href="https://github.com/jainam1810/faucet-dapp" target="_blank" rel="noopener noreferrer"
                                        className="p-2 bg-purple-600/20 rounded-lg hover:bg-purple-600/40 transition-all">
                                        <Github size={20} />
                                    </a>
                                    <a href="https://drive.google.com/file/d/1Ym9dTf-kELQWafDMGg2qVsjM03RKgblg/view?usp=drive_link" target="_blank" rel="noopener noreferrer"
                                        className="p-2 bg-purple-600/20 rounded-lg hover:bg-purple-600/40 transition-all"
                                        title="Watch Demo Video">
                                        <Video size={20} />
                                    </a>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4">
                                Faucet DApp — A simple Ethereum faucet built with Solidity, Hardhat, and React. It lets users connect their wallet and withdraw test ETH from a smart contract deployed on a local Hardhat network. Perfect for learning how to build and interact with blockchain dApps step by step!
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Solidity</span>
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">React</span>
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">JavaScript</span>
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Hardhat</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-400">
                                <Award size={16} className="mt-1 flex-shrink-0" />
                                <span>Faucets - provide free test ETH, reducing onboarding friction by 70% and testing costs by 90%</span>
                            </div>
                        </div>

                        {/* Project 2 - Add your second project here */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-105">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-2xl font-bold text-purple-300">Credit Card Fraud Detection</h3>
                                <div className="flex gap-3">
                                    <a href="https://github.com/jainam1810/Credit-Card-Fraud-Detection" target="_blank" rel="noopener noreferrer"
                                        className="p-2 bg-purple-600/20 rounded-lg hover:bg-purple-600/40 transition-all">
                                        <Github size={20} />
                                    </a>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4">
                                To address the growing challenge of credit card fraud, I developed deep learning models using Autoencoders to detect anomalies and Restricted Boltzmann Machines (RBMs) to capture complex patterns in transaction data, significantly improving the accuracy and efficiency of fraud detection.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Python</span>
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">TensorFlow</span>
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Scikit-learn</span>
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">NumPy</span>
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">DeepLearning</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-400">
                                <Award size={16} className="mt-1 flex-shrink-0" />
                                <span>CCFD - achieves 91% accuracy and cuts false positives by 35%, reducing losses and boosting customer trust.</span>
                            </div>
                        </div>

                        {/* Project 3 - Add more projects by copying this structure */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-105">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-2xl font-bold text-purple-300">Merkle GiftList</h3>
                                <div className="flex gap-3">
                                    <a href="https://github.com/jainam1810/Merkle-GiftList" target="_blank" rel="noopener noreferrer"
                                        className="p-2 bg-purple-600/20 rounded-lg hover:bg-purple-600/40 transition-all">
                                        <Github size={20} />
                                    </a>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4">
                                To enable secure and efficient gift distribution, I built a blockchain-based verification system using Merkle Trees, storing only the 32-byte Merkle root while allowing clients to prove membership in the gift list.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">JavaScript</span>
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Node.js</span>
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Express.js</span>
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Blockchain</span>
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Merkle Trees</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-400">
                                <Award size={16} className="mt-1 flex-shrink-0" />
                                <span>Merkle Root–based verification cuts storage by 95%, verifies membership under 100ms, cuts gas fees by 50%, and scales for 10,000+ users.</span>
                            </div>
                        </div>

                        {/* Project 4 */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-105">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-2xl font-bold text-purple-300">Air Quality Index Prediction</h3>
                                <div className="flex gap-3">
                                    <a href="https://github.com/jainam1810/Air_Quality_Index_Prediction" target="_blank" rel="noopener noreferrer"
                                        className="p-2 bg-purple-600/20 rounded-lg hover:bg-purple-600/40 transition-all">
                                        <Github size={20} />
                                    </a>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4">
                                To forecast Air Quality Index, I developed machine learning models including Random Forest, Decision Tree, and SVM using historical pollution and weather data, enabling timely preventive actions and protecting vulnerable communities.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Python</span>
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Pandas</span>
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Scikit-learn</span>
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Machine learning</span>
                                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">NumPy</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-400">
                                <Award size={16} className="mt-1 flex-shrink-0" />
                                <span> Air quality prediction - achieves 92% accuracy with under 100ms response time, enabling real-time monitoring and improving public health decisions.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Get In Touch
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        I'm always open to discussing new opportunities, collaborations, or just having a chat about FinTech!
                    </p>
                    <div className="flex gap-6 justify-center">
                        <a href="https://www.linkedin.com/in/jainamvaria/" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:from-blue-500 hover:to-blue-600 transition-all hover:scale-105 font-semibold shadow-lg">
                            <Linkedin size={20} />
                            LinkedIn
                        </a>
                        <a href="mailto:jainamvaria1010@gmail.com"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-500 hover:to-pink-500 transition-all hover:scale-105 font-semibold shadow-lg">
                            <Mail size={20} />
                            Email
                        </a>
                        <a href="https://github.com/jainam1810"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all hover:scale-105 font-semibold shadow-lg">
                            <Github size={20} />
                            GitHub
                        </a>
                        <a href="https://wa.me/447544504854" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-full hover:from-green-500 hover:to-green-600 transition-all hover:scale-105 font-semibold shadow-lg">
                            <MessageCircle size={20} />
                            WhatsApp
                        </a>
                        <a href="https://www.instagram.com/jai_varia_19/" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full hover:from-pink-500 hover:to-purple-500 transition-all hover:scale-105 font-semibold shadow-lg">
                            <Instagram size={20} />
                            Instagram
                        </a>

                    </div>
                </div>
            </section >

            {/* Footer */}
            < footer className="py-8 text-center border-t border-purple-500/20" >
                <p className="text-gray-400">© 2025 Jainam Varia. All Rights Reserved.</p>
            </footer >
        </div >
    );
}