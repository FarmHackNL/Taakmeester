	var mymap = L.map('map').setView([53.0190, 7.018], 15);

	var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 28,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});

	// var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	// 	maxZoom: 17,
	// 	attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
	// });

	var obj = $.get("data/18m_grid.geojson")
		.done(function(data) {
			console.log(data);

			var layer = L.geoJson($.parseJSON(data), {
				onEachFeature: (function(feature, layer) {

					console.log(feature.properties.mean);

					
					layer.bindPopup(feature.properties.mean.toString()); 
										


					if (feature.properties.mean < 0.1) {
						console.log(feature.properties.mean)
						layer.setStyle({
						fillColor: '#a0d3aa',
						fillOpacity: '0.9',
						opacity: '0'

					});

					}

					if (feature.properties.mean < 0.2 && feature.properties.mean > 0.1) {
						layer.setStyle({
						fillColor: '#71bd7f',
						fillOpacity: '0.9',
						opacity: '0'

					});

					}

					if (feature.properties.mean < 0.3 && feature.properties.mean > 0.2) {
						layer.setStyle({
						fillColor: '#42a755',
						fillOpacity: '0.9',
						opacity: '0'

					});

					}

					if (feature.properties.mean < 0.4 && feature.properties.mean > 0.3) {
						layer.setStyle({
						fillColor: '#13912b',
						fillOpacity: '0.9',
						opacity: '0'

					});

					}

					if (feature.properties.mean < 0.6 && feature.properties.mean > 0.4) {
						layer.setStyle({
						Color: '#008000',
						fillColor: '#0d651e',
						fillOpacity: '0.9',
						opacity: '0'

					});

					}

					if (feature.properties.mean < 1 && feature.properties.mean > 0.6) {
						layer.setStyle({
						Color: '#008000',
						fillColor: '#052b0c',
						fillOpacity: '0.9',
						opacity: '0'

					});

					}

					layer.on('click', function() {
						console.log(feature.properties.mean);
					});
				})
			});


			layer.addTo(mymap);
			//console.log(tileLayer)
		})
		


	OpenStreetMap_Mapnik.addTo(mymap);