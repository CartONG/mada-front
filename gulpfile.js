/*eslint-env node*/
'use strict';

var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var plugins = require('gulp-load-plugins')();

var config = {
    currentProject: 'onusida',

    projects: {
        onusida: {
            locales: ['fr-FR']
        },
        atlas: {
            locales: ['fr-FR', 'mg-MG']
        }
    }
};

function getLocalizedTemplateStream(locale, index) {
    console.log(locale)
    var data = {
        trans: require(`./src/i18n/${locale}.json`)
    };
    data.trans.project = require(`./src/i18n/${config.currentProject}/${locale}.json`);

    return gulp.src(`src/tpl/${config.currentProject}.tpl.html`)
        .pipe(plugins.fileInclude())
        .pipe(plugins.template(data, {
            interpolate: /{{([\s\S]+?)}}/g,
            evaluate: /{\?([\s\S]+?)\?}/g
            // escape: /XXX/g
        }))
        .pipe(plugins.rename(function (renamePath) {
            renamePath.basename = 'index';
            if (index > 0) {
                renamePath.basename += `.${locale}`;
            }
        }))
        .pipe(gulp.dest(path.join('dist', config.currentProject)));
}


gulp.task('default', function() {
    browserSync({
        server: {
            baseDir: './dist'
        },
        open: false,
        port: 3333
    });

    gulp.watch('./src/**/*', ['build'], function() {
        console.log('pouet');
    });

    gulp.watch('./dist/**/*', function () {
        browserSync.reload();
    });
} );

gulp.task('browserify', function () {
    return gulp.src([ './src/js/dependencies.js' ])
        .pipe(plugins.browserify({
            insertGlobals: false,
            debug: true
        }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('./app/'));
});

gulp.task('templates', function() {
    var projectConfig = config.projects[config.currentProject];
    var streams = merge();

    projectConfig.locales.forEach(function(locale, index) {
        streams.add(getLocalizedTemplateStream(locale, index));
    });

    return streams;
});

gulp.task('static', function() {
    return gulp.src('./src/static/**/*')
        .pipe(gulp.dest(path.join('dist', config.currentProject)));
});


gulp.task('build', ['templates', 'static']);


