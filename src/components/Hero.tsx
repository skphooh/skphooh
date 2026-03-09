"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Gradient Animation */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[20%] left-[20%] w-[40rem] h-[40rem] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[20%] right-[20%] w-[35rem] h-[35rem] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: "2s" }} />
            </div>

            <div className="container px-4 mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Crafting Digital <br className="hidden md:block" />
                        <span className="text-gradient">Experiences</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        創造性と最新技術を掛け合わせ、美しく、使いやすいWebアプリケーションを構築しています。
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-12 flex justify-center"
                >
                    <a
                        href="#projects"
                        className="group flex flex-col items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        <span className="mb-2 uppercase tracking-widest text-xs">Explore My Work</span>
                        <div className="w-[1px] h-12 bg-gray-700 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-blue-500 origin-top animate-[scale-y_1.5s_ease-in-out_infinite]" />
                        </div>
                    </a>
                </motion.div>
            </div>

            <style jsx>{`
        @keyframes scale-y {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          50.1% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
        </section>
    );
}
