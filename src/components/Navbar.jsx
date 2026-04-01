import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/enmmey-logo.png';

export default function Navbar() {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const checkAuth = () => setIsLoggedIn(!!localStorage.getItem('token'));
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const scrollTo = (id) => {
        setIsMobileMenuOpen(false);
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
                const offset = 80;
                const top = el.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }, 300); // wait for mobile menu exit animation
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-900/95 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="Enmmey Logo"
                        className="w-28 sm:w-32 md:w-40 object-contain my-2"
                    />
                </div>
                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
                    {[
                        { label: 'Services', id: 'services' },
                        { label: 'Process', id: 'process' },
                        { label: 'Case Studies', id: 'results' },
                        { label: 'Why Enmmey', id: 'why' },
                        { label: 'Contact', id: 'contact' },
                    ].map(({ label, id }) => (
                        <button
                            key={id}
                            onClick={() => scrollTo(id)}
                            className="hover:text-white transition-colors duration-200 cursor-pointer"
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Action Button */}
                <div className="hidden md:flex items-center gap-4">
                    {isLoggedIn ? (
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 bg-brand-500 hover:bg-brand-accent text-brand-900 px-6 py-2.5 rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,214,0,0.4)]"
                        >
                            <LayoutDashboard size={16} /> Dashboard
                        </button>
                    ) : (
                        <Link to="/login">
                            <button className="bg-brand-500 hover:bg-brand-accent text-brand-900 px-6 py-2.5 rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,214,0,0.4)]">
                                Login
                            </button>
                        </Link>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div >

            {/* Mobile Menu */}
            < AnimatePresence >
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-brand-800 border-b border-white/5 overflow-hidden"
                    >
                        <div className="flex flex-col px-6 py-4 gap-4">
                            {[
                                { label: 'Services', id: 'services' },
                                { label: 'Process', id: 'process' },
                                { label: 'Case Studies', id: 'results' },
                                { label: 'Why Enmmey', id: 'why' },
                                { label: 'Contact', id: 'contact' },
                            ].map(({ label, id }) => (
                                <button
                                    key={id}
                                    onClick={() => scrollTo(id)}
                                    className="text-white/80 hover:text-white pb-2 border-b border-white/5 text-left"
                                >
                                    {label}
                                </button>
                            ))}
                            {isLoggedIn ? (
                                <button
                                    onClick={() => { setIsMobileMenuOpen(false); navigate('/dashboard'); }}
                                    className="flex items-center justify-center gap-2 bg-brand-500 text-brand-900 px-6 py-3 rounded-xl font-bold mt-2 w-full"
                                >
                                    <LayoutDashboard size={16} /> Dashboard
                                </button>
                            ) : (
                                <Link to="/login">
                                    <button className="bg-brand-500 text-white px-6 py-3 rounded-xl font-medium mt-2 w-full">
                                        Login
                                    </button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )
                }
            </AnimatePresence >
        </motion.nav >
    );
}
