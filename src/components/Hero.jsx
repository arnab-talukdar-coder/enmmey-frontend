import { motion } from 'framer-motion';
import Canvas3D from './Canvas3D';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-brand-900 z-10">
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
                        Elevating Brand Influence
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
                        Influencer <br /> campaigns, <br />
                        <span className="text-gradient">engineered <br /> for growth.</span>
                    </h1>

                    <p className="text-lg text-white/70 mb-10 max-w-xl leading-relaxed">
                        Performance-led influencer marketing that feels like authentic stories, not paid placements. We scale your reach with precision.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <button className="bg-brand-500 hover:bg-brand-accent text-brand-900 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,214,0,0.4)] flex items-center gap-2">
                            Book a Demo
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </button>
                        <button className="px-8 py-4 rounded-full font-semibold border border-white/10 hover:bg-white/5 transition-colors gap-2 flex items-center text-white">
                            {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l6.5 6.5M19.5 9.5 13 16" /></svg> */}
                            View Cases
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
                    <div className="glass-card p-8 pr-12 lg:pr-16 relative z-20 w-fit">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-16 h-16 rounded-xl bg-brand-800 flex items-center justify-center border border-white/10">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4D600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
                            </div>
                            <div>
                                <h3 className="text-white font-medium text-lg">Guaranteed ROI</h3>
                                <p className="text-brand-accent text-sm">+24% avg increase</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10">
                            <div>
                                <p className="text-white/60 text-sm mb-1">Total Reach</p>
                                <p className="text-3xl font-bold text-white">3.4M+</p>
                            </div>
                            <div>
                                <p className="text-white/60 text-sm mb-1">Engagement</p>
                                <p className="text-3xl font-bold text-white">12.5%</p>
                            </div>
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
                        <span className="block text-2xl font-bold text-white mb-1">45+</span>
                        <span className="text-white/50 text-xs uppercase tracking-wider">Top Tier Brands</span>
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <span className="block text-2xl font-bold text-white mb-1">200+</span>
                        <span className="text-white/50 text-xs uppercase tracking-wider">Influencer Roster</span>
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <span className="block text-2xl font-bold text-white mb-1">8M+</span>
                        <span className="text-white/50 text-xs uppercase tracking-wider">Monthly Views</span>
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <span className="block text-2xl font-bold text-white mb-1">10X</span>
                        <span className="text-white/50 text-xs uppercase tracking-wider">Average ROI</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
