(function () {
	var map = L.map('map', {
		center: [-18.766947, 49],
		zoom: 6
	});

	L.tileLayer('https://{s}.tiles.mapbox.com/v3/{key}/{z}/{x}/{y}.png', {
		key: 'lrqdo.2c2d7d96',
	}).addTo(map);

})()