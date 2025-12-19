import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import WeatherAnimation from "../../pages/WeatherAnimation";

const Hero = () => {
    const { t } = useTranslation("hero");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => setIsLoaded(true), []);

    return (
        <section className="relative w-full h-[700px] overflow-hidden bg-black">

            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <iframe
                    className="w-full h-full object-cover"
                    src="https://www.youtube.com/embed/QOLUgCc_94Q?autoplay=1&mute=1&loop=1&playlist=QOLUgCc_94Q&controls=0&playsinline=1"
                    title="DriveVision POV 2023 GAC AION Y Plus"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>


            {/* Weather Animations (overlay) */}
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                <WeatherAnimation locationId="YOUR_LOCATION_ID" />
            </div>

            {/* Hero Content */}
           
        </section>
    );
};

export default Hero;
