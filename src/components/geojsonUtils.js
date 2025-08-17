export function ensureClockwisePolygons(features) {
    return features.map(feature => {
      const geom = feature.geometry;
  
      if (geom.type === 'Polygon') {
        geom.coordinates = geom.coordinates.map(ring => [...ring].reverse());
      } else if (geom.type === 'MultiPolygon') {
        geom.coordinates = geom.coordinates.map(polygon =>
          polygon.map(ring => [...ring].reverse())
        );
      }
  
      return feature;
    });
  }
  