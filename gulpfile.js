var gulp        = require('gulp');
var browserSync = require('browser-sync');
var less        = require('gulp-less');

gulp.task('serve', ['less'],function() {
	browserSync.init({server: "./"});
	gulp.watch('less/*.less', ['less']);
	gulp.watch('*.html').on('change',browserSync.reload);
});

gulp.task('less', function() {
    return gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
});

// gulp.task('watch', function(){
// 	gulp.watch('less/*.less', ['less']);
// 	gulp.watch('*.html', ['serve']);
// 	console.log('hoge');
// });

gulp.task('default',['serve']);