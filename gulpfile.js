
var gulp = require('gulp'),
browserSync = require('browser-sync');

gulp.task('default', function() {
	browserSync({
		server: {
			baseDir: './app',
		},
		open : false,
		port : 3333
	});

	gulp.watch('./app/**.*', function () {
		browserSync.reload();
	});
} );