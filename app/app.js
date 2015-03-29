(function () {
	var map = L.map('map', {
		center: [51.505, -0.09],
		zoom: 13
	});

	L.tileLayer('https://{s}.tiles.mapbox.com/v3/{key}/{z}/{x}/{y}.png', {
		key: 'lrqdo.2c2d7d96',
	}).addTo(map);

})()