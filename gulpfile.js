var gulp           = require('gulp');
var browserSync    = require('browser-sync');
var less           = require('gulp-less');
var autoprefixer   = require('gulp-autoprefixer');

gulp.task('serve', ['less'],function() {
	browserSync.init({server: "./"});
	gulp.watch('less/*.less', ['less']);
	gulp.watch(['*.html','assets/js/*.js']).on('change',browserSync.reload);
});

gulp.task('less', function() {
    return gulp.src('less/[^_]*.less')
    .pipe(less())
    .pipe(autoprefixer({browers:['last 2 versions'], cascade: false}))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('default',['serve']);