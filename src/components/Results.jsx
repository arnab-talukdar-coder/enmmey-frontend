import { motion } from 'framer-motion';

const results = [
    { brand: "Tech Innovators", metric1: "+145k", label1: "New Followers", metric2: "4.2M", label2: "Impressions" },
    { brand: "Lifestyle Co.", metric1: "12x", label1: "ROAS", metric2: "85%", label2: "Conversion Rate" },
    { brand: "Fitness Plus", metric1: "3.5M", label1: "Video Views", metric2: "18%", label2: "Engagement" },
    { brand: "Beauty Essentials", metric1: "+80k", label1: "App Installs", metric2: "$2.1M", label2: "Revenue Match" }
];

export default function Results() {
    return (
        <section className="py-24 bg-brand-900 overflow-hidden relative border-b border-white/5">
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
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
