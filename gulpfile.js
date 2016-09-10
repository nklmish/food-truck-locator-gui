var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('styles', function() {
    log('Compiling Less');
     return gulp
         .src(config.less)
         .pipe($.plumber())
         .pipe($.less())
         .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
         .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function(done) {
    var files = config.temp + '**/*.css';
    clean(files, done);
});

gulp.task('less-watcher', function() {
    gulp.watch([config.less], ['styles']);
});

gulp.task('wiredep', function() {
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles'], function() {
    log('Wiring up. ');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

gulp.task('clean', function () {
    return clean();
});

gulp.task('default', ['inject'], function() {
    var options = {
        files: [
            config.client + '**/*.*',
            '!' + config.less,
            config.temp + '**/*.css'
        ]
    };

    browserSync.init({
        files : options.files,
        server: {
            baseDir: config.client,
            routes: {
                "/bower_components": config.bower.directory,
                "/src": config.src
            }
        }
    });
});

function clean(path, done) {
    log('clean up: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
