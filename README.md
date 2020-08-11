# Mapping Earthquakes With Leaflet
This project is a part of the Data Analytics Bootcamp at Case Western Reserve University.

![crack](https://github.com/VL14/Mapping-Earthquakes-with-Leaflet/blob/master/images/crack.jpg)

<span>Photo by <a href="https://unsplash.com/@photoart2018?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Andrew Buchanan</a> on <a href="https://unsplash.com/s/photos/earthquake?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

#### --Project Status: Completed

## Project Intro/Objective
The United States Geological Survey, or USGS, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. The purpose of this project is to create a map-based data visualization of worldwide earthquake occurrences over a 7-day period.

### Methods Used
* Mapping
* Data Visualization

### Technologies
* GeoJSON file
* Javascript
* D3.js
* jQuery
* Leaflet
* Mapbox
* HTML/CSS

## Project Description
On this [webpage](https://vl14.github.io/Mapping-Earthquakes-with-Leaflet/), US Geological Survey (USGS) data (http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) wwas used to create a visualization of an earthquake data set. Leaflet and Mapbox were utilized to generate a map that plots all of the earthquakes over a 7-day period with a magnitude of 1.0 and higher based on longitude and latitude.

### Dataset
The chosen dataset, from the USGS live API, included 332 earthquake records. The USGS updates their earthquake data every minute and provides a GeoJSON file of the earthquakes with a specific magnitude and time range.

### Key Features
* The data markers are color coded and sized based on the magnitude of the earthquake
* Clicking on a marker will generate a pop-up with additional information about the earthquake
* A color-coded legend
* Layer control with 2 different basemaps

## Getting Started
In order to view this website, you'll need to enter your Mapbox API key. If you don't have one, go to the [Mapbox site](https://www.mapbox.com/) to create a free account.
1. Clone this repo (for help see this [tutorial](https://help.github.com/articles/cloning-a-repository/)).
2. Create a file called "config.js" in the "Static" folder. Enter your mapbox API as follows.
```python
const API_KEY="your_key"
```

### Link To Site
https://vl14.github.io/Mapping-Earthquakes-with-Leaflet/
