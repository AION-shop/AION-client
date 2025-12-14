import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // <-- to'g'ri import

const Hero = () => {
    const { t } = useTranslation('hero'); 
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate(); // <-- hook ishlatildi

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
                        height: '56.25vw',
                        minHeight: '100%',
                        minWidth: '177.77vh'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full flex items-center justify-center text-center px-4 sm:px-6 md:px-8">
                <div className="max-w-4xl">
                    <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        {t("heroHeading")}
                    </h1>
                    <p className={`mt-4 text-gray-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {t("heroSub")}
                    </p>
                  
                </div>
            </div>
        </section>
    );
};

export default Hero;
