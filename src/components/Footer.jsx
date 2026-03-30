export default function Footer() {
    return (
        <footer className="bg-brand-900 pt-24 pb-12 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8 mb-20 relative z-10">
                    <div className="flex-1 max-w-sm">
                        <div className="text-3xl font-bold tracking-tight text-white mb-4">
                            ENMMEY
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed mb-2">
                            Influencer marketing for brands that care about what they measure.
                        </p>
                        <p className="text-white/40 text-sm leading-relaxed mb-8">
                            Data-driven campaigns that actually convert.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-brand-accent hover:border-brand-accent/50 transition-all duration-300 border border-white/10 text-xs font-bold">
                                in
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-brand-accent hover:border-brand-accent/50 transition-all duration-300 border border-white/10 text-xs font-bold">
                                Ig
                            </a>
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-brand-accent hover:border-brand-accent/50 transition-all duration-300 border border-white/10 text-xs font-bold">
                                𝕏
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full lg:w-auto text-sm">
                        <div>
                            <h4 className="font-semibold text-white mb-6">Quick Links</h4>
                            <ul className="space-y-4 text-white/60">
                                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                                <li><a href="#results" className="hover:text-white transition-colors">Case Studies</a></li>
                                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-6">Legal</h4>
                            <ul className="space-y-4 text-white/60">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-6">Contact</h4>
                            <ul className="space-y-4 text-white/60 text-sm">
                                <li>
                                    <a href="https://wa.me/916290331812" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                                        <span className="text-brand-accent">📱</span> +91-6290331812
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:client.servicing@enmmey.com" className="hover:text-white transition-colors flex items-center gap-2">
                                        <span className="text-brand-accent">✉️</span> client.servicing@enmmey.com
                                    </a>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-accent mt-0.5">📍</span>
                                    <span>Uttar Seethi, Kolkata,<br />West Bengal 700125</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-xs text-white/40">
                    <p>© {new Date().getFullYear()} Enmmey. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span>Influencer marketing, engineered for growth</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
