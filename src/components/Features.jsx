import { motion } from 'framer-motion';

const features = [
    {
        title: "Data-Driven Influencer Matching",
        description: "We analyze global audiences to find the perfect voices for your brand, ensuring your message reaches the right people.",
        points: ["Audience demographics fit", "Engagement rate analysis", "Brand affinity check"]
    },
    {
        title: "Campaign Management & Optimization",
        description: "End-to-end management from contracting to content approval and performance tracking, optimizing in real-time.",
        points: ["Automated workflows", "Real-time adjustments", "ROI-focused scaling"]
    },
    {
        title: "Creative Strategy & Direction",
        description: "We collaborate with talents to craft compelling narratives that resonate and drive measurable action.",
        points: ["Trend-aligned concepts", "Authentic storytelling", "High-quality production"]
    },
    {
        title: "360° Detailed Performance Reporting",
        description: "Transparent dashboards showing exactly where every dollar goes and what it brings back.",
        points: ["Custom dashboard access", "Attribution tracking", "Actionable insights"]
    }
];

export default function Features() {
    return (
        <section className="py-24 bg-brand-900 border-b border-white/5 relative">
            <div className="absolute left-0 top-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 max-w-2xl">
                    <div className="text-brand-accent text-sm font-semibold tracking-wider uppercase mb-4">Our Expertise</div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                        Performance-led influencer campaigns that feel like products, not placements.
                    </h2>
                    <p className="text-white/60 text-lg">
                        We operate at the intersection of creativity and data science. Our proprietary technology platform ensures every campaign is engineered for maximum return on investment.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="glass-card p-8 hover:bg-white/[0.08] transition-all duration-300 group border-white/5"
                        >
                            <div className="w-12 h-12 rounded-xl bg-brand-800 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-700 transition-all duration-300">
                                <span className="text-brand-accent font-semibold">{idx + 1}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                            <p className="text-white/60 mb-6 leading-relaxed text-sm">{feature.description}</p>

                            <ul className="space-y-3">
                                {feature.points.map((point, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                                        <svg className="w-4 h-4 text-brand-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
