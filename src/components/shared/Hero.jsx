import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation('hero'); // namespace kichik harf
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <section className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
                <iframe
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full min-w-full min-h-full object-cover transition-opacity duration-1000"
                    src="https://www.youtube.com/embed/NI7SPDIw0Bg?autoplay=1&mute=1&loop=1&controls=0&playlist=NI7SPDIw0Bg&playsinline=1"
                    title="hero-video"
                    frameBorder="0"
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                    style={{ 
                        width: '100vw',
                        height: '56.25vw', // 16:9 aspect ratio
                        minHeight: '100%',
                        minWidth: '177.77vh' // 16:9 aspect ratio
                    }}
                />
            </div>

            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 pointer-events-none animate-pulse-slow"></div>

            {/* Floating Particles Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute w-2 h-2 bg-white/30 rounded-full top-[20%] left-[10%] animate-float-slow"></div>
                <div className="absolute w-3 h-3 bg-white/20 rounded-full top-[60%] left-[80%] animate-float-medium"></div>
                <div className="absolute w-2 h-2 bg-white/25 rounded-full top-[40%] left-[30%] animate-float-fast"></div>
                <div className="absolute w-1.5 h-1.5 bg-white/30 rounded-full top-[70%] left-[60%] animate-float-slow delay-1000"></div>
                <div className="absolute w-2.5 h-2.5 bg-white/20 rounded-full top-[30%] left-[90%] animate-float-medium delay-500"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full flex items-center justify-center text-center px-4 sm:px-6 md:px-8">
                <div className="max-w-4xl">
                    {/* Animated Heading */}
                    <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white drop-shadow-2xl leading-tight transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t("heroHeading")}
                    </h1>
                    
                    {/* Animated Paragraph */}
                    <p className={`mt-3 sm:mt-4 md:mt-6 text-gray-100 text-sm sm:text-base md:text-lg lg:text-xl drop-shadow-lg max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {t("heroSub")}
                    </p>
                    
                    {/* Animated Button */}
                    <button className={`mt-6 sm:mt-8 md:mt-10 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 bg-white text-black rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 hover:shadow-white/50 relative overflow-hidden group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-500`}>
                        <span className="relative z-10">{t("heroButton")}</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    </button>
                </div>
            </div>

            {/* Bottom Scroll Indicator */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="flex flex-col items-center gap-2 animate-bounce-slow">
                    <span className="text-white/70 text-xs uppercase tracking-wider">{t("scrollText")}</span>
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1">
                        <div className="w-1.5 h-3 bg-white/70 rounded-full animate-scroll"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
                    50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
                }
                @keyframes float-medium {
                    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
                    50% { transform: translateY(-30px) translateX(-15px); opacity: 0.5; }
                }
                @keyframes float-fast {
                    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.25; }
                    50% { transform: translateY(-40px) translateX(20px); opacity: 0.55; }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes scroll {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(20px); opacity: 0; }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
                .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
                .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
                .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
                .animate-scroll { animation: scroll 2s ease-in-out infinite; }
                .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
                .delay-500 { animation-delay: 0.5s; }
                .delay-1000 { animation-delay: 1s; }
            `}</style>
        </section>
    );
};

export default Hero;
