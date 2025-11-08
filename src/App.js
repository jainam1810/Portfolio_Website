import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Play, MessageCircle, User, Send, Languages, Video, Instagram, Building2, Calendar, MapPin, Download, Code, GraduationCap, Award, ChevronDown, Pause } from 'lucide-react';
import emailjs from '@emailjs/browser'

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const playAudio = () => {
        const audio = document.getElementById('captainAudio');
        if (audio) {
            if (isPlaying) {
                audio.pause();
                audio.currentTime = 0;
                setIsPlaying(false);
            } else {
                audio.play();
                setIsPlaying(true);
                audio.onended = () => setIsPlaying(false);
            }
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('Sending...');

        //EmailJS Configuration - REPLACE THESE WITH YOUR ACTUAL IDs
        const serviceId = 'service_wvng7kc';
        const templateId = 'template_033ifqk';
        const publicKey = '4OnjEDlHEmzam9O6m';

        // Prepare template parameters
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: 'jainamvaria1010@gmail.com' // Your email
        };

        // Send email using EmailJS
        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setFormStatus('✅ Message sent successfully! I\'ll get back to you soon.');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setFormStatus(''), 5000);
            })
            .catch((error) => {
                console.error('FAILED...', error);
                setFormStatus('❌ Failed to send message. Please try email directly.');
                setTimeout(() => setFormStatus(''), 5000);
            });
    };

    const skills = {
        'Programming': ['Python', 'R', 'Java', 'HTML', 'CSS', 'JavaScript', 'C++', 'SQL'],
        'Tools & Frameworks': ['React', 'Node.js', 'Express.js', 'AWS (S3, DynamoDB)', 'TensorFlow', 'Pandas', 'NumPy', 'Matplotlib', 'PyTorch', 'Sci-kit learn', 'Streamlit', 'Git', 'Docker', 'Figma', 'Notion', 'Scrum', 'Agile', 'PowerBI', 'Tableau',],
        'AI & Machine Learning': ['Linear Regression', 'Logistic Regression', 'SVR', 'SVM', 'XG Boost', 'Random Forest', 'Gradient Boosting', 'Autoencoders', 'RBM', 'Decision Tree', 'GMMs', 'CNNs',
            'RNNs', 'LSTMs', 'LLMs', 'NLP'],
        'Blockchain Development': ['Solidity', 'Hardhat', 'Ethereum', 'Smart Contracts', 'DApps', 'ECDSA', 'Web3.js']
    };

    const languages = [
        { name: 'English', proficiency: 'Fluent', level: 100 },
        { name: 'Hindi', proficiency: 'Native', level: 100 },
        { name: 'Gujarati', proficiency: 'Native', level: 100 },
        { name: 'Marathi', proficiency: 'Fluent', level: 100 },
        { name: 'Punjabi', proficiency: 'Intermediate', level: 75 },
        { name: 'French', proficiency: 'Basic', level: 30 }
    ];

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
                            Jainam CV
                        </a>
                    </div>

                    <div className="flex gap-6 justify-center mb-12">
                        <a href="https://www.linkedin.com/in/jainamvaria/" target="_blank" rel="noopener noreferrer"
                            className="p-3 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition-all hover:scale-110">
                            <Linkedin size={24} />
                        </a>
                        <a href="https://github.com/jainam1810" target="_blank" rel="noopener noreferrer"
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

            {/* Experience Section */}
            <section id="experience" className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Professional Experience
                    </h2>
                    <div className="space-y-8">
                        {/* Experience 1 - Amazon */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                            <div className="flex items-start gap-6">
                                {/* Company Logo */}
                                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center flex-shrink-0 p-3">
                                    <img
                                        src="/amazon-logo.png"
                                        alt="Oron Trade Ltd Logo"
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = '<div class="text-purple-600 font-bold text-xl">OT</div>';
                                        }}
                                    />
                                </div>
                                {/* Experience Details */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-2xl font-bold text-purple-300 mb-1">Sortation Associate (Part-time)</h3>
                                            <p className="text-xl text-gray-300 flex items-center gap-2">
                                                <Building2 size={18} className="text-purple-400" />
                                                Amazon Warehouse
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-purple-400 flex items-center gap-2 justify-end">
                                                <Calendar size={16} />
                                                Nov 2025 - Present
                                            </p>
                                            <p className="text-gray-400 flex items-center gap-2 justify-end mt-1">
                                                <MapPin size={16} />
                                                Exeter, United Kingdom
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>Sort, scan, and divert packages to their final destinations using RF scanners and conveyor systems, consistently meeting productivity and accuracy targets.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>Handle physical tasks such as unloading, lifting, and relocating goods up to 23 kg across multiple shifts while following safety and quality standards.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>Collaborate with team members to resolve sorting bottlenecks and improve workflow efficiency, maintaining flexibility and a positive attitude toward new tasks</span>
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Operational & Technical Skills</span>
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Teamwork & Collaboration</span>
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Productivity & Efficiency</span>
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Attention-to-Detail & Accuracy</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Experience 2 - KIFS */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                            <div className="flex items-start gap-6">
                                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center flex-shrink-0 p-3">
                                    <img
                                        src="/Kifs-logo.PNG"
                                        alt="Company Logo"
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = '<div class="text-purple-600 font-bold text-xl">C2</div>';
                                        }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-2xl font-bold text-purple-300 mb-1">Blockchain Research Intern (Operational Risk)</h3>
                                            <p className="text-xl text-gray-300 flex items-center gap-2">
                                                <Building2 size={18} className="text-purple-400" />
                                                KIFS Housing Finance Ltd
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-purple-400 flex items-center gap-2 justify-end">
                                                <Calendar size={16} />
                                                Jun 2025 - Jul 2025
                                            </p>
                                            <p className="text-gray-400 flex items-center gap-2 justify-end mt-1">
                                                <MapPin size={16} />
                                                Mumbai, India
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>Researched and proposed an AI + Blockchain-based ledger for loan risk and fraud detection, improving processing speed by 30–40% and reducing manual intervention by 50%.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>Designed a strategic implementation plan inspired by Figure Technologies (USA) to enhance system efficiency.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>Projected improvements included 20% higher fraud detection accuracy and 15–20% cost savings, demonstrating measurable impact.</span>
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">XG Boost & Autoencoders</span>
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Python & Golang</span>
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Scikit-learn & PyTorch</span>
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Hyperledger Fabric & Corda</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Experience 3 - Template */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                            <div className="flex items-start gap-6">
                                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center flex-shrink-0 p-3">
                                    <img
                                        src="/Sorneshia-Logo.jpg"
                                        alt="Company Logo"
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = '<div class="text-purple-600 font-bold text-xl">C3</div>';
                                        }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-2xl font-bold text-purple-300 mb-1">Founder</h3>
                                            <p className="text-xl text-gray-300 flex items-center gap-2">
                                                <Building2 size={18} className="text-purple-400" />
                                                Sorneshia
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-purple-400 flex items-center gap-2 justify-end">
                                                <Calendar size={16} />
                                                Jun 2024 - May 2025
                                            </p>
                                            <p className="text-gray-400 flex items-center gap-2 justify-end mt-1">
                                                <MapPin size={16} />
                                                Mumbai, India (Remote)
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>Founded Sorneshia - a print-on-demand clothing brand, achieving 80+ sales, £830 revenue, £10 average order value, and a 23% profit margin within 8 months.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>Designed and managed a Shopify e-commerce store, ensuring efficient 2–7 day delivery across India and enhancing customer satisfaction.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>Executed targeted marketing campaigns by collaborating with influencer and social media agencies, while managing self-run Meta and influencer campaigns to reduce costs, increase visibility, and drive sales growth</span>
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">HTML</span>
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">CSS</span>
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">JavaScript</span>
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Excel & PowerBI</span>
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Google Analytics</span>
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Meta & Google Ads</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Experience 4 - Template */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                            <div className="flex items-start gap-6">
                                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center flex-shrink-0 p-3">
                                    <img
                                        src="/Oron_logo.png"
                                        alt="Company Logo"
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = '<div class="text-purple-600 font-bold text-xl">C4</div>';
                                        }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-2xl font-bold text-purple-300 mb-1">Introducing Broker & Trader</h3>
                                            <p className="text-xl text-gray-300 flex items-center gap-2">
                                                <Building2 size={18} className="text-purple-400" />
                                                Oron Trade Ltd
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-purple-400 flex items-center gap-2 justify-end">
                                                <Calendar size={16} />
                                                Aug 2023 - May 2025
                                            </p>
                                            <p className="text-gray-400 flex items-center gap-2 justify-end mt-1">
                                                <MapPin size={16} />
                                                Mumbai, India
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>Engaged with 120+ clients and delivered seminars to over 1,000 attendees, explaining the global foreign exchange market and guiding them on investment and trading opportunities.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>Conducted in-depth market analysis across forex, equities, and cryptocurrency, developing algorithmic trading strategies based on order blocks, liquidity sweeps, and market structure — achieving a 65% win ratio</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>Applied institutional trading insights, risk management techniques, and strong communication skills to deliver actionable trading signals and build lasting client relationships.</span>
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Quantitative & Analytical Thinking</span>
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Statistical & Market Analysis</span>
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Risk Management & Forex</span>
                                        <span className="px-3 py-1 bg-purple-600/20 rounded-full text-sm">Financial Modeling & Technical Communication</span>
                                    </div>
                                </div>
                            </div>
                        </div>
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
            <section id="Projects" className="py-20 px-8 bg-slate-900/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center leading-relaxed bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
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

            {/* Languages Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 pb-3 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Languages
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {languages.map((lang, index) => (
                            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-3">
                                        <Languages size={20} className="text-purple-400" />
                                        <h3 className="text-xl font-bold text-purple-300">{lang.name}</h3>
                                    </div>
                                    <span className="text-gray-400 text-sm">{lang.proficiency}</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                                        style={{ width: `${lang.level}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Contact Section */}
            <section id="contact" className="py-20 px-6 bg-slate-900/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Get In Touch
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl mx-auto">
                        I'm always open to discussing new opportunities, collaborations, or just having a chat about AI/ML & Blockchain.
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
                    <div className="flex justify-center items-center px-30 py-12">
                        <div className="max-w-6xl mx-auto">
                            {/* Contact Form */}
                            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
                                <h3 className="text-3xl font-bold text-purple-300 mb-6">Send Me a Message</h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Input */}
                                    <div>
                                        <div className="relative">
                                            <User className="absolute left-4 top-4 text-cyan-400" size={20} />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Your Name"
                                                required
                                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Email Input */}
                                    <div>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-4 text-cyan-400" size={20} />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Your Email"
                                                required
                                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Message Input */}
                                    <div>
                                        <div className="relative">
                                            <MessageCircle className="absolute left-4 top-4 text-cyan-400" size={20} />
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                placeholder="Your Message"
                                                required
                                                rows="5"
                                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                                            ></textarea>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-4 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <Send size={20} />
                                        Send Message
                                    </button>

                                    {/* Status Message */}
                                    {formStatus && (
                                        <div className="text-center text-green-400 font-semibold">
                                            {formStatus}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col text-center justify-center items-center px-4">
                        <p className="text-3xl font-bold mb-4 italic leading relaxed bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent pb-2">
                            "So no matter what, I promise you, If you need us, if you need me, I'll be there"
                        </p>

                        {/* Play/Pause Button */}
                        <button
                            onClick={playAudio}
                            className="p-1 mb-4 bg-blue-600 hover:bg-blue-500 rounded-full text-white shadow-md"
                            aria-label="Play quote"
                        >
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>

                        {/* Hidden Audio Element */}
                        <audio id="captainAudio" src="/Captain_audio.mp3" preload="auto" />
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