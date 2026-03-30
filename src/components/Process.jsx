import { motion } from 'framer-motion';

const steps = [
    {
        number: "01",
        title: "Discover",
        description: "We understand your goals, audience, and budget to craft the perfect strategy. Audience DNA, creator scoring, and offer packaging.",
        tag: "Strategy"
    },
    {
        number: "02",
        title: "Match & Create",
        description: "We handpick creators and craft the content strategy that resonates. Creative pairings, scripts, approvals, and go-live QA.",
        tag: "Execution"
    },
    {
        number: "03",
        title: "Launch & Optimize",
        description: "We run, track, and iterate until your KPIs are hit and exceeded. Cohort readouts, creative swaps, and retargeting loops.",
        tag: "Growth"
    }
];

export default function Process() {
    return (
        <section id="process" className="py-24 bg-brand-900 border-b border-white/5 relative overflow-hidden">

            {/* Decorative gradient matching design */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(196,214,0,0.05)_0,transparent_70%)] pointer-events-none -z-10"></div>

            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="text-brand-500 text-sm font-semibold tracking-wider uppercase mb-4">Methodology</div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-20">
                    Simple process, powerful results
                </h2>

                <div className="grid md:grid-cols-3 gap-8 relative">

                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-[28px] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-brand-500/30 to-transparent -z-10"></div>

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.6 }}
                            className="relative pt-12 md:pt-0 flex flex-col items-center"
                        >
                            <div className="w-14 h-14 rounded-full bg-brand-900 border-2 border-brand-500 flex items-center justify-center mb-8 relative z-10 shadow-[0_0_15px_rgba(196,214,0,0.3)]">
                                <div className="w-3 h-3 rounded-full bg-brand-500"></div>
                            </div>

                            <div className="glass-card p-8 w-full border-t border-brand-500/20 shadow-[0_-5px_20px_rgba(0,0,0,0.4)]">
                                <div className="text-brand-accent/60 text-xs font-bold uppercase tracking-widest mb-2">{step.number}</div>
                                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                                <div className="mt-4 inline-block px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-accent text-xs font-medium">{step.tag}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
