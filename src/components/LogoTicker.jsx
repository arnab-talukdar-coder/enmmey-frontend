import { motion } from 'framer-motion';

const brands = [
    "Microsoft", "Airbnb", "Google", "Stripe", "Spotify", "Netflix"
]; // Dummy brand names for the banner

export default function LogoTicker() {
    return (
        <div className="py-12 bg-brand-900 border-b border-white/5 overflow-hidden">
            <div className="relative flex whitespace-nowrap overflow-hidden">
                {/* Subtle fade effect on edges */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-brand-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-brand-900 to-transparent z-10 pointer-events-none"></div>

                <motion.div
                    className="flex gap-16 lg:gap-32 items-center min-w-max px-8"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20
                    }}
                >
                    {[...brands, ...brands, ...brands].map((brand, i) => (
                        <div key={i} className="text-white/40 font-bold text-2xl tracking-widest uppercase hover:text-white/70 transition-colors cursor-default">
                            {brand}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
