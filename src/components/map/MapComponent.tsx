"use client";

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapComponentProps {
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  showHeatmap?: boolean;
}

const mockCrimeData: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: { intensity: 0.8 }, geometry: { type: 'Point', coordinates: [-118.267, 34.087] } },
    { type: 'Feature', properties: { intensity: 0.6 }, geometry: { type: 'Point', coordinates: [-118.275, 34.092] } },
    { type: 'Feature', properties: { intensity: 0.9 }, geometry: { type: 'Point', coordinates: [-118.260, 34.080] } },
    { type: 'Feature', properties: { intensity: 0.4 }, geometry: { type: 'Point', coordinates: [-118.280, 34.085] } },
    { type: 'Feature', properties: { intensity: 0.7 }, geometry: { type: 'Point', coordinates: [-118.255, 34.095] } },
  ]
};

const mockPermitData: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: { type: 'Commercial' }, geometry: { type: 'Point', coordinates: [-118.270, 34.090] } },
    { type: 'Feature', properties: { type: 'Residential' }, geometry: { type: 'Point', coordinates: [-118.262, 34.088] } },
    { type: 'Feature', properties: { type: 'Renovation' }, geometry: { type: 'Point', coordinates: [-118.278, 34.082] } },
  ]
};

export function MapComponent({ 
  center = [-118.267, 34.087], 
  zoom = 13,
  showHeatmap = true 
}: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: 'https://demotiles.maplibre.org/style.json', // Basic open style
      center: center,
      zoom: zoom,
      attributionControl: false
    });

    map.current.on('load', () => {
      if (!map.current) return;

      // Add Crime Heatmap Source
      map.current.addSource('crime-data', {
        type: 'geojson',
        data: mockCrimeData
      });

      // Add Crime Heatmap Layer
      map.current.addLayer({
        id: 'crime-heatmap',
        type: 'heatmap',
        source: 'crime-data',
        maxzoom: 15,
        paint: {
          'heatmap-weight': ['get', 'intensity'],
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 15, 3],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(255,255,255,0)',
            0.2, 'rgba(255,237,160,0.5)',
            0.4, 'rgba(254,178,76,0.6)',
            0.6, 'rgba(253,141,60,0.7)',
            0.8, 'rgba(240,59,32,0.8)',
            1, 'rgba(189,0,38,0.9)'
          ],
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 15, 20],
          'heatmap-opacity': 0.7
        }
      });

      // Add Permit Source
      map.current.addSource('permit-data', {
        type: 'geojson',
        data: mockPermitData
      });

      // Add Permit Circle Layer
      map.current.addLayer({
        id: 'permit-points',
        type: 'circle',
        source: 'permit-data',
        paint: {
          'circle-radius': 6,
          'circle-color': '#76c7c0', // Mint color from theme
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });

      setIsLoaded(true);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [center, zoom]);

  return (
    <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-sage-200/50 shadow-inner">
      <div ref={mapContainer} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-sage-50/50 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-mint-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-bold text-sage-600 uppercase tracking-widest">Loading Analytics Engine...</p>
          </div>
        </div>
      )}
    </div>
  );
}
