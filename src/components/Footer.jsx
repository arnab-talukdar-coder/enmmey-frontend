export default function Footer() {
    return (
        <footer className="bg-brand-900 pt-24 pb-0 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">

                {/* Main columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16">

                    {/* Brand */}
                    <div className="max-w-sm">
                        <div className="text-2xl font-bold text-white mb-4 lowercase tracking-tight">enmmey</div>
                        <p className="text-white/60 text-sm leading-relaxed mb-2">
                            Influencer marketing for brands that care about what they measure.
                        </p>
                        <p className="text-white/40 text-sm leading-relaxed mb-8">
                            Data-driven campaigns that actually convert.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-accent hover:border-brand-accent/50 transition-all duration-300">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-accent hover:border-brand-accent/50 transition-all duration-300">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                            </a>
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-accent hover:border-brand-accent/50 transition-all duration-300">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-widest">Quick Links</h4>
                        <ul className="space-y-4 text-white/60 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                            <li><a href="#results" className="hover:text-white transition-colors">Case Studies</a></li>
                            <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Get in Touch */}
                    <div>
                        <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-widest">Get in Touch</h4>
                        <ul className="space-y-4 text-white/60 text-sm">
                            <li>
                                <a href="https://wa.me/916290331812" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    WhatsApp: +91-6290331812
                                </a>
                            </li>
                            <li>
                                <a href="mailto:client.servicing@enmmey.com" className="hover:text-white transition-colors">
                                    client.servicing@enmmey.com
                                </a>
                            </li>
                            <li className="leading-relaxed">
                                Uttar Seethi, Kolkata,<br />West Bengal 700125
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Find Us — compact map */}
                <div className="border-t border-white/5 pt-10">
                    <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-widest text-center">Find Us</h4>
                    <div className="rounded-xl overflow-hidden w-full" style={{ height: '200px' }}>
                        <iframe
                            title="Enmmey Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.234!2d88.47!3d22.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89db1d1b4e8a9%3A0x7d2e3b6a0e1c2f5d!2sUttar%20Seethi%2C%20Kolkata%2C%20West%20Bengal%20700125!5e0!3m2!1sen!2sin!4v1"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(30%) contrast(1.05) brightness(0.85)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-8 mt-4 border-t border-white/10 text-xs text-white/40">
                    <p>© {new Date().getFullYear()} Enmmey. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white/70 transition-colors">Refund Policy</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
