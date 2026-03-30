import { motion } from 'framer-motion';

const results = [
    {
        brand: "D2C Skincare Brand",
        metric1: "3.8M",
        label1: "Views",
        metric2: "4.2x",
        label2: "ROAS",
        extra: "1.5x repeat customers"
    },
    {
        brand: "FinTech Startup",
        metric1: "2.1M",
        label1: "Reach",
        metric2: "52K",
        label2: "App Installs",
        extra: "₹48 CAC"
    },
    {
        brand: "Lifestyle Brand",
        metric1: "5.2M",
        label1: "Impressions",
        metric2: "320K",
        label2: "Engagements",
        extra: "28% brand recall"
    },
    {
        brand: "SaaS Platform",
        metric1: "1.8M",
        label1: "Reach",
        metric2: "2,400",
        label2: "Sign-ups",
        extra: "3.8x pipeline"
    }
];

export default function Results() {
    return (
        <section id="results" className="py-24 bg-brand-900 overflow-hidden relative border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="text-brand-accent text-sm font-semibold tracking-wider uppercase mb-4">Case Studies</div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                        Results that speak for themselves
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Check out the numbers behind some of our most successful influencer-led growth campaigns.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {results.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="glass-card p-8 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-[40px] group-hover:bg-brand-500/10 transition-all duration-300"></div>

                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-brand-800 border border-brand-700 flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-brand-500"></div>
                                </div>
                                <h3 className="text-xl font-bold text-white">{item.brand}</h3>
                            </div>

                            <div className="flex gap-8 border-t border-brand-700 pt-6 relative z-10">
                                <div>
                                    <div className="text-brand-500 font-bold text-3xl mb-1 group-hover:text-brand-accent transition-colors">
                                        {item.metric1}
                                    </div>
                                    <div className="text-white/60 text-sm font-medium">{item.label1}</div>
                                </div>
                                <div>
                                    <div className="text-brand-500 font-bold text-3xl mb-1 group-hover:text-brand-accent transition-colors">
                                        {item.metric2}
                                    </div>
                                    <div className="text-white/60 text-sm font-medium">{item.label2}</div>
                                </div>
                                <div className="ml-auto self-end">
                                    <span className="inline-block px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-accent text-xs font-medium">{item.extra}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
