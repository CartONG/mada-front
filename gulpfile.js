/*eslint-env node*/
'use strict';

var gulp = require('gulp'),
browserify = require('gulp-browserify'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync');

var pipes = {
	browserify: function() {
        return gulp.src([ './src/js/dependencies.js' ])
            .pipe(browserify({
                insertGlobals: false,
                debug: true
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./app/'));
    }
};

gulp.task('default', function() {
    browserSync({
        server: {
            baseDir: './app'
        },
        open: false,
        port: 3333
    });

    gulp.watch('./app/**.*', function () {
        browserSync.reload();
    });
} );

gulp.task('browserify', function () {
    return pipes.browserify();
});

