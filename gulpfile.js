var gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    flatten = require('gulp-flatten'),
    csso = require('gulp-csso'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'),
    gulpif = require('gulp-if'),
    browserSync = require('browser-sync').create();

var settings = {
    imagemin: {
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [
            { removeViewBox: true }
        ]
    },
    scsso: {
        comments: false,
        restructure: false
    },
    sass: {
        includePaths: [
            'node_modules/flexy-framework'
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
        css: './dist/css',
        images: './dist/images',
        fonts: './dist/fonts'
    }
};

gulp.task('fonts', function () {
    return gulp.src(settings.paths.fonts)
        .pipe(flatten())
        .pipe(gulp.dest(settings.dst.fonts));
});

gulp.task('images', function () {
    return gulp.src(settings.paths.images)
        .pipe(gulpif(process.env.NODE_ENV == 'production', imagemin(settings.imagemin)))
        .pipe(gulp.dest(settings.dst.images))
        .pipe(browserSync.stream());
});

gulp.task('css', function () {
    return gulp.src(settings.paths.css)
        .pipe(plumber())
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

    watch('./dist/js/**/*.js', function () {
        browserSync.reload();
    });
    watch('scss/**/*.scss', function () {
        gulp.start(['css']);
    });
    watch(settings.paths.fonts, function () {
        gulp.start(['fonts']);
    });
});

gulp.task('default', function () {
    return gulp.start('css', 'images', 'fonts');
});