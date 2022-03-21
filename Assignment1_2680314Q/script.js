mapboxgl.accessToken = 'pk.eyJ1IjoiMjY4MDMxNHEiLCJhIjoiY2t6eTcwOWM0MDhjdzJ2bzZjb2cyZTF0byJ9.iSy5CQspj657XO-X1VmUfA'; 
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/2680314q/cl0znauxs003e14p9sux3udyl', 
      center: [108.32, 34.5072],
      zoom: 3.5
    });
    
map.on('click', (event) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ['Airport'] // replace with your layer name
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];
/* 
   
   Create a popup, specify its options 
    and properties, and add it to the map.
  */
  const popup = new mapboxgl.Popup({ offset: [0, -15] ,className:"my-popup"})
  .setLngLat(feature.geometry.coordinates)
  .setHTML(`<h3>Location/Local name: ${feature.properties.Name}</h3>
  <p>IATA: ${feature.properties.IATA}</p>
  <p>Level of the airport: ${feature.properties.飞行区等级}</p>
  <p>Number of Runways: ${feature.properties.跑道数}</p>`
  )
  .addTo(map);

 //Fly to the point when click.
  map.flyTo({
    center: feature.geometry.coordinates, //keep this
    zoom: 9 //change fly to zoom level
  });

  //Create a new pop up with the style defined in the CSS as my-popup. // Code from the next step will go here.
 });

const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in China", // Placeholder text for the search bar
  proximity: {
    longitude: 55.8642,
    latitude: 4.2518
  } // Coordinates of Glasgow center
});

map.addControl(geocoder, "top-left");
map.addControl(new mapboxgl.NavigationControl(), "top-left");
map.addControl(new mapboxgl.GeolocateControl({positionOptions:{enableHighAccuracy:true},trackUserLocation:true,showUserHeading:true}),"top-left");
//To add a scale.
const scale = new mapboxgl.ScaleControl({
  maxWidth: 100, //size of the scale bar
  unit: "metric"
});
map.addControl(scale);

const layers = [
    "Airport"
  ];
  const colors = [
    "#f9720b"
  ];
 const legend = document.getElementById("legend");

  layers.forEach((layer, i) => {
    const color = colors[i];
    const key = document.createElement("div");
    if (i <= 1 || i >= 8) {
      key.style.color = "white";
    }

    key.className = "legend-key";
    key.style.backgroundColor = color;
    key.innerHTML = `${layer}`;

    legend.appendChild(key);
  });