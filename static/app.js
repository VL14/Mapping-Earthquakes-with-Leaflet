// Store our API endpoints
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson";
//var platesUrl = "https://github.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

// Functions to set color and radius according to earthquake magnitude
function markerColor(mag) {
    let color = "";
    
    switch (true) {
        case mag >= 5:
            return color = "#810f7c";
        case mag >= 4:
            return color = "#8856a7";
        case mag >= 3:
            return color = "#8c96c6";
        case mag >= 2:
            return color = "#b3cde3";
        case mag >= 1:
            return color = "#edf8fb";
    }
}

function markerRadius(mag) {
    let radius = "";

    switch (true) {
        case mag >= 5:
            return radius = 30;
        case mag >= 4:
            return radius = 25;
        case mag >= 3:
            return radius = 20;
        case mag >= 2:
            return radius = 15;
        case mag >= 1:
            return radius = 10;
    }
}

// Perform a GET request for earthquake data
d3.json(queryUrl, function(data) {

  // Once we get a response, call createFeatures function
  eqFeatures(data.features);
});

function eqFeatures(earthquakeData) {
  // Create a popup for each location
  function onEachFeature(feature, layer) {
    layer.bindPopup("<p><b>Location:</b> " + feature.properties.place +
      "</p><br><p><b>Magnitude:</b> " + feature.properties.mag + "</p><br><p><b>Date:</b> " + (new Date(feature.properties.time).toJSON().split("T")[0]) + "</p>");
  }

    var earthquakes = L.geoJson(earthquakeData, {
        pointToLayer: function(feature, latlng) {
            return new L.CircleMarker(latlng, {
                fillColor: markerColor(feature.properties.mag),
                weight: 1,
                opacity: 1,
                color: 'gray',
                fillOpacity: 0.7,
                radius: markerRadius(feature.properties.mag)
            });
        },
        onEachFeature: onEachFeature
    });

  // Call createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define two basemap layers
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Light Map": lightmap,
    "Satellite Map": satellitemap
  };

  var overlayMaps = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
    center: [35.75, -42.54],
    zoom: 2,
    layers: [lightmap, earthquakes]
  });

  // Create the layer control
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


// Add color-coded legend to map
var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    var grades = [1, 2, 3, 4, 5];
    var labels = ['#edf8fb','#b3cde3', '#8c96c6', '#8856a7', '#810f7c'];
    var from, to;

    // loop through the data to generate a label with a colored square for the legend
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = (grades[i+1])-0.1;
            
        div.innerHTML +=
        '<i style="background:' + labels[i] + '"></i> ' + from + (to ? '&ndash;' + to + '<br>':'+');
        }
    return div;
    };
    
    legend.addTo(myMap);

    $(".leaflet-control-layers").prepend("<h3><label>Layer Control</label></h3>");
    $("div.info.legend").prepend("<h3><label>Earthquake <br> Magnitude</label></h3>");

}