var gulp = require('gulp');

var del            = require('del');
var browserSync    = require('browser-sync');
var less           = require('gulp-less');
var autoprefixer   = require('gulp-autoprefixer');
var cleanCSS       = require('gulp-clean-css');

var jshint         = require('gulp-jshint');
var concat         = require('gulp-concat');
var uglify         = require('gulp-uglify');
var imagemin       = require('gulp-imagemin');

// ====================
// structure
// ====================

var bases = {
	app: './',
	dist: 'dist/',
};

var paths = {
	scripts: ['assets/js/floaty-color-clock.js'],
	styles:  ['assets/css/*.css'],
	html:    ['index.html'],
	images:  ['assets/img/*'],
	fonts:   ['assets/font/*'],
	extras:  ['robots.txt', 'favicon.ico',],
};

// ====================
// preview
// ====================

gulp.task('serve', ['less', 'scripts'],function() {
	browserSync.init({server: "./"});
	gulp.watch('less/*.less', ['less']);
	gulp.watch('assets/js/*.js', ['scripts']);
	gulp.watch(['*.html','assets/js/*.js']).on('change',browserSync.reload);
});

gulp.task('less', function() {
	return gulp.src('less/[^_]*.less')
	.pipe(less())
	.pipe(autoprefixer({browers:['last 2 versions'], cascade: false}))
	.pipe(gulp.dest('assets/css'))
	.pipe(browserSync.stream());
});

// ====================
// distribution
// ====================

gulp.task('clean', function() {
	return del(bases.dist);
});

// Process scripts and concatenate them into one output file
gulp.task('scripts', ['clean'], function() {
	gulp.src(paths.scripts, {cwd: bases.app})
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(uglify())
	// .pipe(concat('floaty-color-clock.min.js'))
	.pipe(gulp.dest(bases.dist + 'assets/js/'));
});

// Imagemin images and ouput them in dist
gulp.task('imagemin', ['clean'], function() {
	gulp.src(paths.images, {cwd: bases.app})
	.pipe(imagemin())
	.pipe(gulp.dest(bases.dist + 'assets/img/'));
});

// Copy all other files to dist directly
gulp.task('copy', ['clean'], function() {
 // Copy html
 gulp.src(paths.html, {cwd: bases.app})
 .pipe(gulp.dest(bases.dist));

 // Copy styles
 gulp.src(paths.styles, {cwd: bases.app})
 .pipe(gulp.dest(bases.dist + 'assets/css/'));

 gulp.src(paths.extras, {cwd: bases.app})
 .pipe(gulp.dest(bases.dist));

 gulp.src(paths.fonts, {cwd: bases.app})
 .pipe(gulp.dest(bases.dist + 'assets/font/'));

 gulp.src('assets/js/jp-prefecture.min.js')
  .pipe(gulp.dest(bases.dist + 'assets/js/'));
});

// ====================
// execution
// ====================

gulp.task('default',['serve']);
gulp.task('dest', ['clean', 'scripts', 'imagemin', 'copy']);