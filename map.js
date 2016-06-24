var mymap = L.map('map').setView([53.0159, 7.018], 15);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
//     id: 'your.mapbox.project.id',
//     accessToken: 'your.mapbox.public.access.token'
// }).addTo(mymap);

var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var obj = $.get("data/18m_grid.geojson")
	.done(function(data) {
		console.log(data);

		var layer = L.geoJson($.parseJSON(data), {
			onEachFeature: (function(feature, layer) {
				layer.on('click', function() {
					console.log(feature.properties.mean);
				});
			})
		});
		layer.addTo(mymap);
		//console.log(tileLayer)
	})
	


OpenStreetMap_Mapnik.addTo(mymap);