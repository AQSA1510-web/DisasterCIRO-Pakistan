'use client';
import { useEffect, useRef } from 'react';

interface Props {
    lat: number;
    lng: number;
    label: string;
}

export default function CrisisMap({ lat, lng, label }: Props) {
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
                center: [lat, lng],
                zoom: 13,
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

            // Pulsing red crisis marker
            const crisisIcon = L.divIcon({
                className: '',
                html: `
                    <div style="position:relative;width:40px;height:40px;display:flex;align-items:center;justify-content:center;">
                        <div style="position:absolute;width:40px;height:40px;background:rgba(255,26,26,0.12);border-radius:50%;animation:crisisPulse 1.8s ease-in-out infinite;"></div>
                        <div style="position:absolute;width:22px;height:22px;background:rgba(255,26,26,0.2);border-radius:50%;animation:crisisPulse 1.8s ease-in-out infinite 0.3s;"></div>
                        <div style="position:relative;width:13px;height:13px;background:#ff1a1a;border-radius:50%;border:2px solid #fff;box-shadow:0 0 14px rgba(255,26,26,1);z-index:10;"></div>
                    </div>
                `,
                iconSize: [40, 40],
                iconAnchor: [20, 20],
            });

            L.marker([lat, lng], { icon: crisisIcon })
                .addTo(map)
                .bindPopup(
                    `<div style="background:#0a0404;color:#e2e8f0;padding:8px 12px;font-family:monospace;font-size:11px;border-radius:6px;">
                        <span style="color:#ff1a1a;font-weight:700;">⚠ CRISIS ZONE</span><br/>
                        <span style="color:rgba(255,255,255,0.5);font-size:10px;">${label}</span>
                    </div>`,
                    { className: 'crisis-popup' }
                )
                .openPopup();

            mapInstanceRef.current = map;
        };

        initMap();

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [lat, lng, label]);

    return (
        <>
            <style>{`
                @keyframes crisisPulse {
                    0%,100% { transform:scale(1); opacity:0.6; }
                    50% { transform:scale(1.5); opacity:0.15; }
                }
                .crisis-popup .leaflet-popup-content-wrapper {
                    background:transparent !important;
                    border:none !important;
                    box-shadow:none !important;
                    padding:0 !important;
                }
                .crisis-popup .leaflet-popup-tip { background:#0a0404 !important; }
                .crisis-popup .leaflet-popup-content { margin:0 !important; }
            `}</style>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <div ref={mapRef} style={{ width: '100%', height: 200, borderRadius: 8 }} />
        </>
    );
}