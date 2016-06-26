$(document).ready(function() {
	var mymap = L.map('map', {
		center: [53.0190, 7.018],
		zoom: 16,
	});

	var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});

	var perceel_18 = L.layerGroup();
	var perceel_6 = L.layerGroup();

	var overlayMaps = {
		"18m grid": perceel_18,
		"6m grid": perceel_6
	};


	function stylePolygon(feature, object, opacity) {
		if (object.properties.mean < 0.4) {
		feature.setStyle({
		fillColor: '#ebfaeb',
		fillOpacity: '1',
		opacity: '0.5',
		color: '#d6d6c2',
		weight: '1'
		});
		}

		if (object.properties.mean < 0.5 && object.properties.mean > 0.4) {
			feature.setStyle({
			fillColor: '#99e699',
			fillOpacity: '1',
			opacity: '0.5',
			color: '#d6d6c2',
			weight: '1'
		});
		}

		if (object.properties.mean < 0.6 && object.properties.mean > 0.5) {
			feature.setStyle({
			fillColor: '#99e699',
			fillOpacity: '1',
			opacity: '0.5',
			color: '#d6d6c2',
			weight: '1'
		});
		}

		if (object.properties.mean < 0.7 && object.properties.mean > 0.6) {
			feature.setStyle({
			fillColor: '#70db70',
			fillOpacity: '1',
			opacity: '0.5',
			color: '#d6d6c2',
			weight: '1'
		});
		}

		if (object.properties.mean < 0.8 && object.properties.mean > 0.7) {
			feature.setStyle({
			fillColor: '#33cc33',
			fillOpacity: '1',
			opacity: opacity,
			color: '#d6d6c2',
			weight: '1'
		});
		}

		if (object.properties.mean < 1 && object.properties.mean > 0.8) {
			feature.setStyle({
			fillColor: '#145214',
			fillOpacity: '1',
			opacity: '0.5',
			color: '#d6d6c2',
			weight: '1'
		});
		}

	}


	$.ajax({
            dataType: "json",
            url: "https://rony.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT id, mean, the_geom FROM farmhack_perceel_6x6"
        })
        .done(function(data) {
        	console.log(data);


        	$.each(data.features, function(layer, object) {
        		var feature = L.geoJson(object)

        		stylePolygon(feature, object)

        		// console.log(object.properties.mean)

        		feature.bindPopup("Mean NDVI: " + object.properties.mean.toString())

        		// feature.addTo(mymap)
        		perceel_6.addLayer(feature);
        	});
        
        });

        $.ajax({
            dataType: "json",
            url: "https://rony.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT id, mean, the_geom FROM farmhack_perceel_18x18"
        })
        .done(function(data) {
        	console.log(data);

        	$.each(data.features, function(layer, object) {
        		var feature = L.geoJson(object)

        		stylePolygon(feature, object)

        		// console.log(object.properties.mean)

        		feature.bindPopup("Mean NDVI: " + object.properties.mean.toString())

        		perceel_18.addLayer(feature)
        	});
        
        });
     L.control.layers(overlayMaps).addTo(mymap);

	OpenStreetMap_BlackAndWhite.addTo(mymap);
	perceel_18.addTo(mymap);
});