import { useEffect, useRef } from 'react';
import type { Store } from '../types';

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (container: HTMLElement, options: { center: unknown; level: number }) => {
          setCenter: (latlng: unknown) => void;
          setLevel: (level: number) => void;
        };
        Marker: new (options: { position: unknown; map: unknown }) => {
          setMap: (map: unknown | null) => void;
        };
        InfoWindow: new (options: { content: string }) => {
          open: (map: unknown, marker: unknown) => void;
          close: () => void;
        };
        event: {
          addListener: (target: unknown, type: string, handler: () => void) => void;
        };
      };
    };
  }
}

export function useKakaoMap(stores: Store[], selectedStore?: Store | null) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<ReturnType<typeof createMapInstance> | null>(null);

  type MapInstance = {
    setCenter: (latlng: unknown) => void;
    setLevel: (level: number) => void;
  };

  function createMapInstance(): MapInstance | null {
    return null;
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY || 'DEMO_KEY'}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (!window.kakao?.maps) return;
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const center = new window.kakao.maps.LatLng(36.5, 127.5);
        const map = new window.kakao.maps.Map(mapRef.current, {
          center,
          level: 13,
        });

        mapInstanceRef.current = map;

        stores.forEach((store) => {
          const position = new window.kakao.maps.LatLng(store.lat, store.lng);
          const marker = new window.kakao.maps.Marker({ position, map });
          const infoWindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:8px 12px;font-size:13px;font-family:'Noto Sans KR',sans-serif;white-space:nowrap;">${store.name}</div>`,
          });

          window.kakao.maps.event.addListener(marker, 'mouseover', () => {
            infoWindow.open(map, marker);
          });
          window.kakao.maps.event.addListener(marker, 'mouseout', () => {
            infoWindow.close();
          });
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [stores]);

  useEffect(() => {
    if (selectedStore && mapInstanceRef.current && window.kakao?.maps) {
      const position = new window.kakao.maps.LatLng(selectedStore.lat, selectedStore.lng);
      mapInstanceRef.current.setCenter(position);
      mapInstanceRef.current.setLevel(3);
    }
  }, [selectedStore]);

  return mapRef;
}
