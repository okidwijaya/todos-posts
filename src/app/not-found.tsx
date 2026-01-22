'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#D4D4D4] via-[#121212] to-[#000000] flex items-center justify-center">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-md animate-float" />
                <div className="absolute -bottom-12 right-24 w-48 h-48 bg-white/10 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-float-delayed" />
                <div className="absolute top-1/2 -right-16 w-36 h-36 bg-white/10 rounded-md animate-float-slow" />
            </div>

            <div className="relative z-10 text-center px-8 max-w-2xl">
                <div className="text-8xl md:text-[10rem] font-black text-white leading-none mb-4 animate-glitch drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                    404
                </div>

                <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                    Oops! Page Not Found
                </h1>

                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-10">
                    The page you&apos;re looking for seems to have wandered off.
                    Don&apos;t worry, even the best ideas sometimes take unexpected turns!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-8 py-4 bg-white text-[#121212] rounded-md font-semibold text-base shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300"
                    >
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-8 py-4 bg-white/20 text-white rounded-md font-semibold text-base backdrop-blur-md border-2 border-white/30 hover:bg-white/30 hover:-translate-y-1 transition-all duration-300"
                    >
                        Go Back
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                0%, 100% {
                    transform: translateY(0) rotate(0deg);
                }
                50% {
                    transform: translateY(-30px) rotate(180deg);
                }
                }

                @keyframes glitch {
                0%, 90%, 100% {
                    transform: translate(0);
                }
                92% {
                    transform: translate(-2px, 2px);
                }
                94% {
                    transform: translate(2px, -2px);
                }
                96% {
                    transform: translate(-2px, -2px);
                }
                }

                .animate-float {
                animation: float 20s infinite ease-in-out;
                }

                .animate-float-delayed {
                animation: float 20s infinite ease-in-out 3s;
                }

                .animate-float-slow {
                animation: float 20s infinite ease-in-out 5s;
                }

                .animate-glitch {
                animation: glitch 3s infinite;
                }

                .animate-bounce-slow {
                animation: bounce 2s infinite;
                }

                .animate-bounce-delayed {
                animation: bounce 2s infinite 0.5s;
                }

                @keyframes bounce {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-20px);
                }
            }
        `}</style>
        </div>
    );
}