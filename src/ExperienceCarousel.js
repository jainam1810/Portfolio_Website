import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Play, MessageCircle, User, Send, Languages, ChevronRight, ChevronLeft, Video, Volume2, Instagram, Building2, Calendar, MapPin, Download, Code, GraduationCap, Award, ChevronDown, Pause } from 'lucide-react';
import emailjs from '@emailjs/browser'
import ExperienceCarousel from "./ExperienceCarousel";

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
    const [current, setCurrent] = useState(0);

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
}