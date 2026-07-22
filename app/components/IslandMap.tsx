"use client";

import { useEffect, useRef, useState } from "react";
import type { Language, Place } from "../data";

type GeoJsonSource = { setData: (data: object) => void };

type MapLibreMap = {
  addControl: (control: object, position?: string) => void;
  addLayer: (layer: object) => void;
  addSource: (id: string, source: object) => void;
  fitBounds: (bounds: [[number, number], [number, number]], options?: object) => void;
  getCanvas: () => HTMLElement;
  getLayer: (id: string) => object | undefined;
  getSource: (id: string) => GeoJsonSource | undefined;
  getStyle: () => { layers?: Array<{ id: string; type: string }> };
  on: {
    (event: string, handler: () => void): void;
    (event: string, layer: string, handler: (event: { features?: Array<{ properties?: { id?: string } }> }) => void): void;
  };
  remove: () => void;
  setFilter: (id: string, filter: unknown[]) => void;
  setPaintProperty: (id: string, property: string, value: unknown) => void;
};

type MapLibreNamespace = {
  Map: new (options: object) => MapLibreMap;
  NavigationControl: new (options?: object) => object;
};

declare global {
  interface Window {
    maplibregl?: MapLibreNamespace;
  }
}
const home: [number, number] = [-43.30632, -23.00934];
let mapLibreLoader: Promise<MapLibreNamespace> | null = null;

function loadMapLibre() {
  if (window.maplibregl) return Promise.resolve(window.maplibregl);
  if (mapLibreLoader) return mapLibreLoader;

  mapLibreLoader = new Promise<MapLibreNamespace>((resolve, reject) => {
    if (!document.querySelector("link[data-maplibre-css]")) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "https://unpkg.com/maplibre-gl@5.6.0/dist/maplibre-gl.css";
      stylesheet.dataset.maplibreCss = "true";
      document.head.appendChild(stylesheet);
    }

    const existing = document.querySelector<HTMLScriptElement>("script[data-maplibre-script]");
    if (existing) {
      existing.addEventListener("load", () => window.maplibregl && resolve(window.maplibregl));
      existing.addEventListener("error", () => reject(new Error("MapLibre failed to load")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/maplibre-gl@5.6.0/dist/maplibre-gl.js";
    script.async = true;
    script.dataset.maplibreScript = "true";
    script.onload = () => window.maplibregl ? resolve(window.maplibregl) : reject(new Error("MapLibre unavailable"));
    script.onerror = () => reject(new Error("MapLibre failed to load"));
    document.head.appendChild(script);
  });

  return mapLibreLoader;
}

function pointCollection(places: Place[], language: Language) {
  return {
    type: "FeatureCollection",
    features: places.map((place) => ({
      type: "Feature",
      properties: { id: place.id, category: place.category, label: place.name[language] },
      geometry: { type: "Point", coordinates: place.position },
    })),
  };
}

function routeFeature(place: Place) {
  return {
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      properties: { mode: place.routeMode, status: "prototype" },
      geometry: { type: "LineString", coordinates: place.route },
    }],
  };
}

function routeBounds(place: Place): [[number, number], [number, number]] {
  const coordinates = [home, ...place.route, place.position];
  const lngs = coordinates.map(([lng]) => lng);
  const lats = coordinates.map(([, lat]) => lat);
  return [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]];
}

function tintBaseStyle(map: MapLibreMap) {
  for (const layer of map.getStyle().layers ?? []) {
    try {
      const id = layer.id.toLowerCase();
      if (layer.type === "background") map.setPaintProperty(layer.id, "background-color", "#f2ebdd");
      if (layer.type === "fill" && id.includes("water")) map.setPaintProperty(layer.id, "fill-color", "#b7d7d0");
      if (layer.type === "line" && id.includes("water")) map.setPaintProperty(layer.id, "line-color", "#77aaa1");
      if (layer.type === "fill" && (id.includes("park") || id.includes("landcover"))) map.setPaintProperty(layer.id, "fill-color", "#dfe7d5");
    } catch {
      // External vector styles can expose immutable or expression-backed paint values.
    }
  }
}

export default function IslandMap({
  places,
  selected,
  language,
  onSelect,
}: {
  places: Place[];
  selected: Place;
  language: Language;
  onSelect: (place: Place) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const placesRef = useRef(places);
  const selectRef = useRef(onSelect);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => { placesRef.current = places; }, [places]);
  useEffect(() => { selectRef.current = onSelect; }, [onSelect]);

  useEffect(() => {
    if (!containerRef.current) return;
    let active = true;

    loadMapLibre().then((maplibre) => {
      if (!active || !containerRef.current) return;

      const map = new maplibre.Map({
        container: containerRef.current,
        style: "https://tiles.openfreemap.org/styles/liberty",
        center: home,
        zoom: 15.7,
        minZoom: 13,
        maxZoom: 19,
        attributionControl: true,
      });

      mapRef.current = map;
      map.addControl(new maplibre.NavigationControl({ showCompass: false }), "top-right");

      map.on("load", () => {
        if (!active) return;
        tintBaseStyle(map);

        map.addSource("gigoia-home", { type: "geojson", data: { type: "Feature", properties: {}, geometry: { type: "Point", coordinates: home } } });
        map.addSource("gigoia-places", { type: "geojson", data: pointCollection(placesRef.current, language) });
        map.addSource("gigoia-route", { type: "geojson", data: routeFeature(selected) });

        map.addLayer({ id: "route-casing", type: "line", source: "gigoia-route", paint: { "line-color": "#f2ebdd", "line-width": 8, "line-opacity": 0.95 } });
        map.addLayer({ id: "route-active", type: "line", source: "gigoia-route", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": selected.routeMode === "boat" ? "#006b60" : "#f6c945", "line-width": 4, "line-dasharray": selected.routeMode === "boat" ? [1.2, 1.2] : [1, 0], "line-opacity": 0.98 } });
        map.addLayer({ id: "place-points", type: "circle", source: "gigoia-places", paint: { "circle-radius": 8, "circle-color": ["match", ["get", "category"], "restaurant", "#e65d4f", "cafe", "#8e6039", "market", "#557648", "pharmacy", "#2c62a8", "#006b60"], "circle-stroke-color": "#f2ebdd", "circle-stroke-width": 3 } });
        map.addLayer({ id: "selected-place", type: "circle", source: "gigoia-places", filter: ["==", ["get", "id"], selected.id], paint: { "circle-radius": 15, "circle-color": "rgba(0,0,0,0)", "circle-stroke-color": "#f6c945", "circle-stroke-width": 5 } });
        map.addLayer({ id: "home-point", type: "circle", source: "gigoia-home", paint: { "circle-radius": 12, "circle-color": "#162622", "circle-stroke-color": "#f6c945", "circle-stroke-width": 5 } });

        map.on("click", "place-points", (event) => {
          const id = event.features?.[0]?.properties?.id;
          const place = placesRef.current.find((candidate) => candidate.id === id);
          if (place) selectRef.current(place);
        });
        map.on("mouseenter", "place-points", () => { map.getCanvas().style.cursor = "pointer"; });
        map.on("mouseleave", "place-points", () => { map.getCanvas().style.cursor = ""; });
        setStatus("ready");
      });
    }).catch(() => active && setStatus("error"));

    return () => {
      active = false;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || status !== "ready") return;
    map.getSource("gigoia-places")?.setData(pointCollection(places, language));
  }, [language, places, status]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || status !== "ready") return;
    map.getSource("gigoia-route")?.setData(routeFeature(selected));
    map.setFilter("selected-place", ["==", ["get", "id"], selected.id]);
    map.setPaintProperty("route-active", "line-color", selected.routeMode === "boat" ? "#006b60" : "#f6c945");
    map.setPaintProperty("route-active", "line-dasharray", selected.routeMode === "boat" ? [1.2, 1.2] : [1, 0]);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    map.fitBounds(routeBounds(selected), { padding: 78, maxZoom: 17.2, duration: reduceMotion ? 0 : 900 });
  }, [selected, status]);

  return (
    <div className="atlas-map-shell">
      <div ref={containerRef} className="atlas-map" aria-label="Interactive prototype map of Ilha da Gigóia" />
      {status === "loading" && <div className="map-status">Loading MapLibre atlas…</div>}
      {status === "error" && <div className="map-status map-error">Map unavailable. The place list remains available below.</div>}
    </div>
  );
}
