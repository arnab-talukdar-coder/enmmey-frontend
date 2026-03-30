import { motion } from 'framer-motion';

const features = [
    {
        title: "Influencer Strategy & Matching",
        description: "Data-backed creator selection ensuring the right voices amplify your brand to the most relevant audiences.",
        points: ["Data-backed creator selection", "Audience & interest fit analysis", "Multi-platform mapping"]
    },
    {
        title: "Campaign Creation & Management",
        description: "End-to-end management from creative briefs to timeline tracking and brand safety compliance.",
        points: ["Creative briefs & scripts", "Timeline & deliverables tracking", "Brand safety & compliance"]
    },
    {
        title: "Content & UGC Studio",
        description: "High-quality content production from Reels and Shorts to long-form collaborations, repurposed across ads and socials.",
        points: ["Reels & shorts production", "Long-form collaborations", "Repurposing across ads & socials"]
    },
    {
        title: "Measurement & Optimization",
        description: "Transparent dashboards with conversion tracking, cohort analysis, and iterative optimization to maximize ROI.",
        points: ["Conversion tracking & attribution", "Cohort analysis", "Iterative campaign optimization"]
    }
];

export default function Features() {
    return (
        <section id="services" className="py-24 bg-brand-900 border-b border-white/5 relative">
            <div className="absolute left-0 top-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 max-w-2xl">
                    <div className="text-brand-accent text-sm font-semibold tracking-wider uppercase mb-4">Our Expertise</div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                        Performance-led influencer campaigns that feel like products, not placements.
                    </h2>
                    <div className="flex flex-wrap gap-6 mt-6 text-sm text-white/60">
                        <span className="flex items-center gap-2"><span className="text-brand-accent font-semibold">⚡</span> Campaigns live in 3 days</span>
                        <span className="flex items-center gap-2"><span className="text-brand-accent font-semibold">📊</span> Performance dashboards & QA</span>
                        <span className="flex items-center gap-2"><span className="text-brand-accent font-semibold">▶</span> YouTube · Instagram · LinkedIn</span>
                    </div>
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
                            {/* <div className="w-12 h-12 rounded-xl bg-brand-800 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-700 transition-all duration-300">
                                <span className="text-brand-accent font-semibold">{idx + 1}</span>
                            </div> */}
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
