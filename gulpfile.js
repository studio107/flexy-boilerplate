var path = require('path'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    flatten = require('gulp-flatten'),
    csso = require('gulp-csso'),
    sass = require('gulp-sass'),
    config = require('./flexyconfig.json'),
    browserSync = require('browser-sync').create();

var settings = {
    scsso: {
        comments: false,
        restructure: false
    },
    sass: {
        includePaths: [
            'flexy-framework'
        ]
    },
    paths: {
        images: './images/**/*{.jpg,.png}',
        fonts: './fonts/**/*{.eot,.otf,.woff,.woff2,.ttf,.svg}',
        css: [
            './scss/**/*.scss',
            './fonts/**/*.css'
        ]
    },
    dst: {
        css: path.join(config.dst, 'css'),
        images: path.join(config.dst, 'images'),
        fonts: path.join(config.dst, 'fonts')
    }
};

gulp.task('fonts', function () {
    gulp.src(settings.paths.fonts)
        .pipe(flatten())
        .pipe(gulp.dest(settings.dst.fonts));
});

gulp.task('images', function () {
    gulp.src(settings.paths.images)
        .pipe(gulp.dest(settings.dst.images))
        .pipe(browserSync.stream());
});

gulp.task('css', function () {
    return gulp.src(settings.paths.css)
        .pipe(sass(settings.sass).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('bundle.css'))
        .pipe(csso(settings.scsso))
        .pipe(gulp.dest(settings.dst.css))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    browserSync.init({
        open: false,
        proxy: "localhost:8000"
    });

    gulp.watch('../public/js/**/*.js').on('change', browserSync.reload);
    gulp.watch([
        'scss/**/*.scss',
        'flexy-framework/flexy/**/*.scss'
    ], ['css']);
    gulp.watch(settings.paths.fonts, ['fonts']);
});

gulp.task('default', function () {
    return gulp.start('css', 'images', 'fonts');
});