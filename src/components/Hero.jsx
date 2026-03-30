import { motion } from 'framer-motion';
import Canvas3D from './Canvas3D';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-40 overflow-hidden bg-brand-900 z-10">
            {/* Subtle radial gradient to highlight center */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,214,0,0.12)_0,rgba(15,16,20,1)_70%)] pointer-events-none z-0"></div>

            {/* 3D Canvas Background */}
            <Canvas3D />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10 w-full">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-500/20 text-brand-accent text-sm font-medium mb-8">
                        <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                        India's Leading Influencer Agency
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
                        Influencer <br /> campaigns, <br />
                        <span className="text-gradient">engineered <br /> for growth.</span>
                    </h1>

                    <p className="text-lg text-white/70 mb-10 max-w-xl leading-relaxed">
                        Enmmey connects your brand with high-intent creators and tracks every click, view, and conversion — so your marketing actually moves the needle.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <a href="https://wa.me/916290331812?text=Hi%20Enmmey!%20I'm%20interested%20in%20influencer%20marketing%20services." target="_blank" rel="noopener noreferrer">
                            <button className="bg-brand-500 hover:bg-brand-accent text-brand-900 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,214,0,0.4)] flex items-center gap-2">
                                Book a Strategy Call
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </button>
                        </a>
                        <button className="px-8 py-4 rounded-full font-semibold border border-white/10 hover:bg-white/5 transition-colors gap-2 flex items-center text-white">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                            Watch Our Story
                        </button>
                    </div>
                </motion.div>

                {/* Hero Illustration / Statistics Cards */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative lg:h-[600px] flex items-center justify-center lg:justify-end"
                >
                    <div className="glass-card p-6 relative z-20 w-full max-w-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Campaign Performance</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                    <span className="text-green-400 text-xs font-medium">Live</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-white/10">
                            <div>
                                <p className="text-2xl font-bold text-white">2.4M</p>
                                <p className="text-white/50 text-xs mt-1">Views</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">48K</p>
                                <p className="text-white/50 text-xs mt-1">Engagement</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-brand-accent">5.2x</p>
                                <p className="text-white/50 text-xs mt-1">ROAS</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="w-8 h-8 rounded-full bg-brand-500/30 border border-brand-500/50 flex items-center justify-center text-xs font-bold text-brand-accent">PS</div>
                            <div className="flex-1">
                                <p className="text-white text-xs font-medium">Priya Sharma</p>
                                <p className="text-white/50 text-xs">1.2M followers · Lifestyle · Beauty</p>
                            </div>
                        </div>

                        <div className="mt-3 p-3 rounded-xl bg-brand-500/10 border border-brand-500/20">
                            <div className="flex items-center justify-between">
                                <p className="text-white/60 text-xs">Campaign ROI</p>
                                <p className="text-brand-accent text-xs font-medium">↑ 23% from last month</p>
                            </div>
                            <p className="text-brand-accent font-bold text-2xl mt-1">+347%</p>
                        </div>
                    </div>

                    {/* Decorative elements behind the card */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[400px] max-h-[400px] bg-brand-500/20 rounded-full blur-[100px] -z-10"></div>
                </motion.div>
            </div>

            {/* Bottom stats banner integrated into hero */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-brand-900/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-between gap-6 text-center text-sm">
                    <div className="flex-1 min-w-[150px]">
                        <span className="block text-2xl font-bold text-white mb-1">5B+</span>
                        <span className="text-white/50 text-xs uppercase tracking-wider">Reach Generated</span>
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <span className="block text-2xl font-bold text-white mb-1">200+</span>
                        <span className="text-white/50 text-xs uppercase tracking-wider">Campaigns Delivered</span>
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <span className="block text-2xl font-bold text-white mb-1">5L+</span>
                        <span className="text-white/50 text-xs uppercase tracking-wider">Vetted Influencers</span>
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <span className="block text-2xl font-bold text-white mb-1">100+</span>
                        <span className="text-white/50 text-xs uppercase tracking-wider">Happy Clients</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
