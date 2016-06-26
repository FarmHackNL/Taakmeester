$(document).ready(function() {
	var mymap = L.map('map').setView([53.0190, 7.018], 16);

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

        		feature.bindPopup(object.properties.mean.toString())

        		if (object.properties.mean < 0.1) {
						feature.setStyle({
						fillColor: '#ffffcc',
						fillOpacity: '0.9',
						opacity: '0.5',
						color: '#d6d6c2',
						weight: '1'
					});
					}

					if (object.properties.mean < 0.2 && object.properties.mean > 0.1) {
						feature.setStyle({
						fillColor: '#ffff66',
						fillOpacity: '0.9',
						opacity: '0.5',
						color: '#d6d6c2',
						weight: '1'
					});
					}

					if (object.properties.mean < 0.3 && object.properties.mean > 0.2) {
						feature.setStyle({
						fillColor: '#ffff1a',
						fillOpacity: '0.9',
						opacity: '0.5',
						color: '#d6d6c2',
						weight: '1'
					});
					}

					if (object.properties.mean < 0.4 && object.properties.mean > 0.3) {
						feature.setStyle({
						fillColor: '#c6ffb3',
						fillOpacity: '0.9',
						opacity: '0.5',
						color: '#d6d6c2',
						weight: '1'
					});
					}

					if (object.properties.mean < 0.6 && object.properties.mean > 0.4) {
						feature.setStyle({
						Color: '#008000',
						fillColor: '#47d147',
						fillOpacity: '0.9',
						opacity: '0.5',
						color: '#d6d6c2',
						weight: '1'
					});
					}

					if (object.properties.mean < 1 && object.properties.mean > 0.6) {
						feature.setStyle({
						Color: '#008000',
						fillColor: '#29a329',
						fillOpacity: '0.9',
						opacity: '0.5',
						color: '#d6d6c2',
						weight: '1'
					});
					}

        		feature.addTo(mymap)
        	});
        
        });

	OpenStreetMap_BlackAndWhite.addTo(mymap);
});