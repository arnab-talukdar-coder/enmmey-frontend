import { motion } from 'framer-motion';

const steps = [
    {
        title: "1. Match",
        description: "Identify the perfect creators for your brand using our AI-driven matching engine and audience insights."
    },
    {
        title: "2. Launch & Optimize",
        description: "seamless execution and real-time campaign optimization to maximize reach and drive conversions."
    },
    {
        title: "3. Scale & Repeat",
        description: "Analyze performance data to double down on winning strategies and scale your influencer program."
    }
];

export default function Process() {
    return (
        <section className="py-24 bg-brand-900 border-b border-white/5 relative overflow-hidden">

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
                                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
