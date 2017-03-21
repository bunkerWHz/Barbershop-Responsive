var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var csscomb     = require('gulp-csscomb');


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

	browserSync.init({
		server: "./"
	});

	gulp.watch("sass/*.scss", ['sass']);
	gulp.watch("index.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("sass/*.scss")
		.pipe(sass())
		.pipe(csscomb())
		.pipe(gulp.dest("css/"))
		.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
