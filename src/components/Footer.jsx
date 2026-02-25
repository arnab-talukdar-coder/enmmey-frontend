export default function Footer() {
    return (
        <footer className="bg-brand-900 pt-24 pb-12 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8 mb-20 relative z-10">
                    <div className="flex-1 max-w-sm">
                        <div className="text-3xl font-bold tracking-tight text-white mb-6">
                            ENMMEY
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed mb-8">
                            Performance-led influencer marketing that feels like products, not placements.
                        </p>
                        <div className="flex gap-4">
                            {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                                <a key={social} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-brand-accent hover:border-brand-accent/50 transition-all duration-300">
                                    <span className="sr-only">{social}</span>
                                    <div className="w-4 h-4 bg-current opacity-80" style={{ maskImage: `url(https://unpkg.com/lucide-static@0.292.0/icons/arrow-up-right.svg)`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}></div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full lg:w-auto text-sm">
                        <div>
                            <h4 className="font-semibold text-white mb-6">Company</h4>
                            <ul className="space-y-4 text-white/60">
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-6">Resources</h4>
                            <ul className="space-y-4 text-white/60">
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-6">Legal</h4>
                            <ul className="space-y-4 text-white/60">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-xs text-white/40">
                    <p>© {new Date().getFullYear()} Enmmey. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span>Powered by Premium Web</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
