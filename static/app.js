// Link to USGS earthquake data = earthquakes from the past day with magnitude 1.0+
let earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson";

// Link to data on tectonic plate locatioins
let plates_url = "https://github.com/fraxen/tectonicplates";

// Create map object
let myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 3
});

// Add tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Function to set color and radius according to earthquake magnitude
function markerChar(mag) {
    let color = "";
    let radius = "";

    switch (true) {
        case mag >= 5:
            return color = "red", radius = 30;
        case mag >= 4:
            color = "orange", radius = 25;
        case mag >= 3:
            color = "yellow", radius = 20;
        case mag >= 2:
            color = "lightgreen", radius = 15;
        case mag >= 1:
            color = "green", radius = 10;
    }
}

// Visualize earthquake data
d3.json(earthquake_url, function(response) {
    console.log(response);

    L.geoJson(response, {
        style: function(feature) {
            return {
                color: "white",
                fillColor: markerChar(feature.properties.mag),
                fillOpacity: 0.6,
                weight: 1,
                radius: markerChar(feature.properties.mag)
            };
        },
        onEachFeature: function(feature, layer) {
            layer.on({
                mouseover: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.9
                    });
                },
                mouseout: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.6
                    });
                },
                click: function(event) {
                    map.fitBounds(event.target.getBounds());
                }
            });
            layer.bindPopup("<h3>Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "</h3>");
        }
    }).addTo(myMap)
    });
    
    
//     let eqArray = [];

//     for (let i=0; i<response.length; i++) {
//         let eq_location = response[i].geometry;

//         if (location) {
//             eqArray.push([eq_location.coordinates[1], eq_location.coordinates[0]]);
//         }
//     }

// });