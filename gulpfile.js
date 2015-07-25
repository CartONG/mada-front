/*eslint-env node*/
'use strict';

var _ = require('lodash');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var plugins = require('gulp-load-plugins')();

var config = {
    currentProject: 'atlas',

    projects: {
        onusida: {
            locales: ['fr-FR']
        },
        atlas: {
            locales: ['fr-FR', 'mg-MG'],
            actionTypes: [
                {
                    'id': '0'
                },
                {
                    'id': '1'
                },
                {
                    'id': '2'
                },
                {
                    'id': '3'
                },
                {
                    'id': '4'
                },
                {
                    'id': '5'
                }
            ]
        }
    }
};

var projectConfig = config.projects[config.currentProject];

function getTranslationsObject(localePath, locale, defaultLocale) {
    var trans = require(localePath + `${locale}.json`);
    var defaultTrans = require(localePath + `${defaultLocale}.json`);
    var merged = _.merge(_.clone(defaultTrans), trans);
    return merged;
}

function getLocalizedTemplateStream(locale, defaultLocale, index) {
    var data = {
        project: config.currentProject,
        trans: getTranslationsObject('./src/i18n/', locale, defaultLocale),
        projectConfig: projectConfig
    };
    data.trans.project = getTranslationsObject(`./src/i18n/${config.currentProject}/`, locale, defaultLocale);

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




gulp.task('serve', ['build'], function() {
    browserSync({
        server: {
            baseDir: './dist'
        },
        open: false,
        port: 3333
    });

    gulp.watch(['./src/i18n/**/*', './src/tpl/**/*'], ['templates']);
    gulp.watch(['./src/static/**/*'], ['static']);

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
    var defaultLocale = projectConfig.locales[0];
    var streams = merge();

    projectConfig.locales.forEach(function(locale, index) {
        streams.add(getLocalizedTemplateStream(locale, defaultLocale, index));
    });

    return streams;
});

gulp.task('static_common', function() {
    return gulp.src('./src/static/_common/**/*')
        .pipe(gulp.dest(path.join('dist', config.currentProject)));
});

gulp.task('static_project', function() {
    return gulp.src(`./src/static/${config.currentProject}/**/*`)
        .pipe(gulp.dest(path.join('dist', config.currentProject)));
});


gulp.task('static', ['static_common', 'static_project']);

gulp.task('build', ['templates', 'static']);

gulp.task('default', ['serve']);


