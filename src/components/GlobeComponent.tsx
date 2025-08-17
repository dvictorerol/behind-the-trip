import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';

// Type definition for a route
interface Route {
  from: string;
  to: string;
  trip: string;
}

// Map trip categories to colors
const tripColors: Record<string, string> = {
  main: '#F400A1',
  lapland: '#A020F0',
  baltic: '#00FFFF',
  easter: '#00FF00'
};

// Countries you've visited
const visitedCountries = [
  'Chile', 'France', 'Finland', 'Estonia', 'Norway',
  'Italy', 'Slovenia', 'Hungary', 'Czech Republic', 'Latvia'
];

const GlobeComponent: React.FC = () => {
  const globeRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<ReturnType<typeof Globe> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Load all datasets in parallel
      const [countriesRes, citiesRes, routesRes] = await Promise.all([
        fetch('/datasets/ne_110m_admin_0_countries.geojson'),
        fetch('/datasets/visited_cities.json'),
        fetch('/datasets/routes.json')
      ]);

      const countries = await countriesRes.json();
      const cities = await citiesRes.json();
      const routes: Route[] = await routesRes.json();

      // Transform routes into arc data with color
      const arcs = routes.map(route => ({
        startLat: cities[route.from].lat,
        startLng: cities[route.from].lng,
        endLat: cities[route.to].lat,
        endLng: cities[route.to].lng,
        color: tripColors[route.trip] || '#ffffff'
      }));

      if (!globeRef.current) return;

      const world = Globe()(globeRef.current)
        .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg')
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.3)
        .hexPolygonUseDots(true)
        .hexPolygonColor(({ properties: d }) =>
          visitedCountries.includes(d.ADMIN) ? '#F400A1' : 'white'
        )
        .hexPolygonLabel(({ properties: d }) => `<b>${d.ADMIN}</b>`)
        .backgroundColor('rgba(0,0,0,0)')
        .showAtmosphere(true)
        .globeOffset([-100, -80])
        .width(800)
        .height(650)
        .pointAltitude(0.012)
        .pointRadius(0.5)
        .atmosphereColor('#ffffff')
        .atmosphereAltitude(0.20)
        .polygonAltitude(0.01)
        .polygonCapColor(() => '#ff00ff')
        .polygonSideColor(() => 'rgba(255, 0, 255, 0.3)')
        .onHexPolygonClick(polygon => {
          if (!worldRef.current || !polygon.geometry) return;

          const geometry = polygon.geometry;
          let coordsArray: any[] = [];

          if (geometry.type === 'Polygon') {
            coordsArray = geometry.coordinates;
          } else if (geometry.type === 'MultiPolygon') {
            coordsArray = geometry.coordinates.flat(1);
          } else {
            return;
          }

          const flatCoords = coordsArray.flat(1);
          if (flatCoords.length === 0) return;

          const { lat, lng } = flatCoords.reduce(
            (acc, coord) => {
              acc.lat += coord[1];
              acc.lng += coord[0];
              return acc;
            },
            { lat: 0, lng: 0 }
          );

          const n = flatCoords.length;
          worldRef.current.controls().autoRotate = false;

          worldRef.current.pointOfView(
            { lat: lat / n, lng: lng / n, altitude: 1 },
            1000
          );
        });

      // Add animated arcs
      world
        .arcsData(arcs)
        .arcColor('color')
        .arcStroke(0.5)
        .arcAltitude(0.2)
        .arcDashLength(0.4)
        .arcDashGap(1)
        .arcDashInitialGap(() => Math.random())
        .arcDashAnimateTime(4000);

      // Final setup
      world.renderer().setClearColor(0x000000, 0);
      world.controls().enableZoom = false;
      world.controls().autoRotate = true;
      world.controls().autoRotateSpeed = 0.4;

      worldRef.current = world;
    };

    fetchData();
  }, []);

  return <div ref={globeRef} />;
};

export default GlobeComponent;
