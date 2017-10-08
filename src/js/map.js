mapboxgl.accessToken = MB_ACCESS_TOKEN;
const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
  center: [-84.388, 33.749], // starting position [lng, lat]
  zoom: 9 // starting zoom
});
export default map;
