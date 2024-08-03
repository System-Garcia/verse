"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import useResponsive from '../../hooks/useResponsive';

const DesktopView = dynamic(() => import('./Desktop/DesktopView'), { ssr: false });
const MobileView = dynamic(() => import('./Mobile/MobileView'), { ssr: false });

const HeroSection = () => {
    const isMobile = useResponsive();

    return (
        <>
            {isMobile ? <MobileView /> : <DesktopView />}
        </>
    );
};

export default HeroSection;
