
var gulp = require('gulp'),
browserify = require('gulp-browserify'),
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

gulp.task('browserify', function () {
	return pipes.browserify();
});

var pipes = {
	browserify: function() {
        return gulp.src([ './src/js/dependencies.js' ])
            .pipe(browserify({
                insertGlobals : false,
                debug : true,
            }))
            .pipe(gulp.dest('./app/'))
    }
}
