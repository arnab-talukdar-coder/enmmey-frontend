import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/enmmey-logo.png';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                <div className="flex items-center gap-2 cursor-pointer z-50">
                    <img src={logo} alt="Enmmey Logo" className="h-8 md:h-10 object-contain" />
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
                    <a href="#" className="hover:text-white transition-colors duration-200">Work</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Creator Hub</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Platform</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">About</a>
                </div>

                {/* Action Button */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="bg-brand-500 hover:bg-brand-accent text-brand-900 px-6 py-2.5 rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,214,0,0.4)]">
                        Book a Demo
                    </button>
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
                            <a href="#" className="text-white/80 hover:text-white pb-2 border-b border-white/5">Work</a>
                            <a href="#" className="text-white/80 hover:text-white pb-2 border-b border-white/5">Creator Hub</a>
                            <a href="#" className="text-white/80 hover:text-white pb-2 border-b border-white/5">Platform</a>
                            <a href="#" className="text-white/80 hover:text-white pb-2 border-b border-white/5">About</a>
                            <button className="bg-brand-500 text-white px-6 py-3 rounded-xl font-medium mt-2 w-full">
                                Book a Demo
                            </button>
                        </div>
                    </motion.div>
                )
                }
            </AnimatePresence >
        </motion.nav >
    );
}
