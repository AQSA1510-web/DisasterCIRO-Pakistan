'use client';
import { useEffect, useRef } from 'react';

export default function PakistanMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !mapRef.current) return;

        const initMap = async () => {
            const L = (await import('leaflet')).default;

            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }

            const map = L.map(mapRef.current!, {
                center: [30.3753, 69.3451],
                zoom: 5,
                zoomControl: false,
                attributionControl: false,
                scrollWheelZoom: false,
                doubleClickZoom: false,
                dragging: false,
                touchZoom: false,
                keyboard: false,
            });

            L.tileLayer(
                'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
                { maxZoom: 19 }
            ).addTo(map);

            // Major cities markers
            const cities = [
                { name: 'Karachi', lat: 24.8607, lng: 67.0011 },
                { name: 'Lahore', lat: 31.5204, lng: 74.3587 },
                { name: 'Islamabad', lat: 33.6844, lng: 73.0479 },
                { name: 'Peshawar', lat: 34.0151, lng: 71.5249 },
                { name: 'Quetta', lat: 30.1798, lng: 66.9750 },
                { name: 'Multan', lat: 30.1575, lng: 71.5249 },
            ];

            cities.forEach(city => {
                const icon = L.divIcon({
                    className: '',
                    html: `<div style="width:6px;height:6px;background:rgba(255,26,26,0.7);border-radius:50%;border:1px solid rgba(255,26,26,0.4);box-shadow:0 0 6px rgba(255,26,26,0.5);"></div>`,
                    iconSize: [6, 6],
                    iconAnchor: [3, 3],
                });
                L.marker([city.lat, city.lng], { icon })
                    .addTo(map)
                    .bindTooltip(city.name, {
                        permanent: true,
                        direction: 'right',
                        className: 'pk-tooltip',
                        offset: [6, 0],
                    });
            });

            mapInstanceRef.current = map;
        };

        initMap();

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <>
            <style>{`
                .pk-tooltip {
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                    color: rgba(255,255,255,0.35) !important;
                    font-family: monospace !important;
                    font-size: 9px !important;
                    font-weight: 600 !important;
                    letter-spacing: 0.05em !important;
                    padding: 0 !important;
                    text-transform: uppercase !important;
                }
                .pk-tooltip::before { display: none !important; }
            `}</style>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <div ref={mapRef} style={{ width: '100%', height: 220, borderRadius: 8 }} />
        </>
    );
}