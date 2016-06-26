$(document).ready(function() {
	var mymap = L.map('map').setView([53.0190, 7.018], 15);

	var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});

	$.ajax({
            dataType: "json",
            url: "https://rony.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT id, mean, the_geom FROM farmhack_perceel"
        })
        .done(function(data) {
        	console.log(data);

        	$.each(data.features, function(layer, object) {
        		var feature = L.geoJson(object)

        		console.log(object.properties.mean)

        		if (object.properties.mean < 0.1) {
						feature.setStyle({
						fillColor: '#a0d3aa',
						fillOpacity: '0.9',
						opacity: '0'
					});
					}

					if (object.properties.mean < 0.2 && object.properties.mean > 0.1) {
						feature.setStyle({
						fillColor: '#71bd7f',
						fillOpacity: '0.9',
						opacity: '0'
					});
					}

					if (object.properties.mean < 0.3 && object.properties.mean > 0.2) {
						feature.setStyle({
						fillColor: '#42a755',
						fillOpacity: '0.9',
						opacity: '0'
					});
					}

					if (object.properties.mean < 0.4 && object.properties.mean > 0.3) {
						feature.setStyle({
						fillColor: '#13912b',
						fillOpacity: '0.9',
						opacity: '0'
					});
					}

					if (object.properties.mean < 0.6 && object.properties.mean > 0.4) {
						feature.setStyle({
						Color: '#008000',
						fillColor: '#0d651e',
						fillOpacity: '0.9',
						opacity: '0'
					});
					}

					if (object.properties.mean < 1 && object.properties.mean > 0.6) {
						feature.setStyle({
						Color: '#008000',
						fillColor: '#052b0c',
						fillOpacity: '0.9',
						opacity: '0'
					});
					}

        		feature.addTo(mymap)
        	});
        
        });

	OpenStreetMap_BlackAndWhite.addTo(mymap);
});