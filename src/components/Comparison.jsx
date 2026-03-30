import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const whyFeatures = [
    {
        icon: "",
        title: "Green by Design",
        description: "Sustainable, clutter-free campaigns that respect user attention and deliver real value."
    },
    {
        icon: "",
        title: "Transparent Pricing",
        description: "No hidden markups. Clear creator, media, and management fees — always."
    },
    {
        icon: "",
        title: "Pan-India Reach",
        description: "Creators and niche communities across Tier 1–3 cities for maximum coverage."
    },
    {
        icon: "",
        title: "Conversion-first Mindset",
        description: "Every campaign mapped to funnel metrics — not vanity numbers."
    }
];

export default function Comparison() {
    return (
        <section id="why" className="py-24 bg-brand-900 relative">
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

                {/* Why features grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {whyFeatures.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="glass-card p-6 hover:bg-white/[0.08] transition-all duration-300"
                        >
                            <div className="text-3xl mb-4">{feature.icon}</div>
                            <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* For Brands / For Creators split */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-8 border-brand-500/30 bg-brand-500/5 relative overflow-hidden shadow-[0_0_30px_rgba(196,214,0,0.1)]"
                    >
                        <h3 className="text-2xl font-bold text-white mb-2">For Brands</h3>
                        <p className="text-brand-accent text-sm mb-6">Scale your marketing, not your team</p>
                        <ul className="space-y-4">
                            {["Scale your influencer marketing without scaling your team", "Brand safety & compliance built in", "Measurable outcomes tied to real KPIs"].map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-white items-start font-medium">
                                    <Check className="text-brand-500 shrink-0 mt-1" size={18} strokeWidth={3} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-8 border-white/10 relative overflow-hidden"
                    >
                        <h3 className="text-2xl font-bold text-white mb-2">For Creators</h3>
                        <p className="text-white/60 text-sm mb-6">Fair payouts with transparent compensation</p>
                        <ul className="space-y-4">
                            {["Fair payouts with transparent compensation", "Clear briefs so you always know what's needed", "Long-term partnerships with top brands"].map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-white/70 items-start">
                                    <Check className="text-brand-500 shrink-0 mt-1" size={18} strokeWidth={3} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* CTA Banner */}
                <motion.div
                    id="contact"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-8 text-center glass-card p-12 max-w-4xl mx-auto relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-gradient-to-b from-white/[0.04] to-transparent border-t-brand-500/40"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-brand-500/20 blur-[60px] pointer-events-none rounded-full"></div>

                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 relative z-10">
                        Ready to launch your next influencer campaign?
                    </h2>
                    <p className="text-lg text-white/70 mb-4 max-w-2xl mx-auto relative z-10">
                        Tell us about your brand and we'll send you a custom strategy outline within 24 hours. No commitment required.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50 mb-10 relative z-10">
                        <span className="flex items-center gap-2"><span className="text-brand-accent">✓</span> Response within 24 hours</span>
                        <span className="flex items-center gap-2"><span className="text-brand-accent">✓</span> No spam ever</span>
                        <span className="flex items-center gap-2"><span className="text-brand-accent">✓</span> Free strategy outline</span>
                    </div>
                    <p className="mt-6 text-white/40 text-sm relative z-10">or email us at <a href="mailto:client.servicing@enmmey.com" className="text-brand-accent hover:underline">client.servicing@enmmey.com</a></p>
                </motion.div>

            </div>
        </section>
    );
}
