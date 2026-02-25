import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const newWay = [
    "Performance-based compensation models",
    "Automated tracking and attribution",
    "Data-driven talent selection",
    "Real-time campaign optimization"
];

const oldWay = [
    "Flat fees with no guaranteed results",
    "Manual reporting via spreadsheets",
    "Gut-feeling talent choices",
    "Post-campaign recap only"
];

export default function Comparison() {
    return (
        <section className="py-24 bg-brand-900 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="text-brand-accent text-sm font-semibold tracking-wider uppercase mb-4">The Enmmey Difference</div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                        Built different, on purpose
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Traditional influencer marketing is broken. We rebuilt it from the ground up for measurable performance.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Old Way */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-8 border-red-500/20 bg-red-500/5 relative overflow-hidden"
                    >
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 blur-[40px] pointer-events-none rounded-full"></div>
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                                <X size={16} strokeWidth={3} />
                            </span>
                            The Old Way
                        </h3>
                        <ul className="space-y-4">
                            {oldWay.map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-white/70 items-start">
                                    <X className="text-red-500 shrink-0 mt-1" size={16} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* New Way */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-8 border-brand-500/30 bg-brand-500/5 relative overflow-hidden shadow-[0_0_30px_rgba(196,214,0,0.15)]"
                    >
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-500/20 blur-[40px] pointer-events-none rounded-full"></div>
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-brand-900">
                                <Check size={16} strokeWidth={3} />
                            </span>
                            The Enmmey Way
                        </h3>
                        <ul className="space-y-4">
                            {newWay.map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-white items-start font-medium">
                                    <Check className="text-brand-500 shrink-0 mt-1" size={18} strokeWidth={3} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-24 text-center glass-card p-12 max-w-4xl mx-auto relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-gradient-to-b from-white/[0.04] to-transparent border-t-brand-500/40"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-brand-500/20 blur-[60px] pointer-events-none rounded-full"></div>

                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 relative z-10">
                        Ready to launch your next influencer campaign?
                    </h2>
                    <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto relative z-10">
                        Join leading brands scaling their growth through data-driven influencer partnerships.
                    </p>
                    <button className="bg-brand-500 hover:bg-brand-accent text-brand-900 px-10 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,214,0,0.4)] flex items-center gap-2 mx-auto relative z-10 text-lg">
                        Start Your Campaign
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
