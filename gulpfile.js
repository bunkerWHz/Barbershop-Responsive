var gulp        = require('gulp');
var server = require('browser-sync');
var sass        = require('gulp-sass');
var del = require("del");
var plumber = require("gulp-plumber");
var minify = require("gulp-csso");
var postcss = require("gulp-postcss");
var autoprefixer = require('autoprefixer');
var mqpacker = require("css-mqpacker");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var imagemin = require("gulp-imagemin");
var rename = require("gulp-rename");
var run = require("run-sequence");
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
	var spriteData = gulp.src('img/icons/*.png')
		.pipe(spritesmith({
			/* this whole image path is used in css background declarations */
			imgName: '../img/icons/sprite.png',
			cssName: '../sass/sprite.scss',
			padding: 50,
			algorithm: 'top-down'
		}));
	spriteData.img.pipe(gulp.dest('img'));
	spriteData.css.pipe(gulp.dest('css'));
});

gulp.task("copy", function() {
	return gulp.src(["fonts/**/*.{woff,woff2}","img/**","js/**","*.html"], {base: "."})
		.pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
	return del("build");
});

gulp.task("style", function() {
	gulp.src("sass/style.scss")
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss([autoprefixer({browsers: ["last 1 version","last 2 Chrome versions", "last 2 Firefox versions","last 2 Opera versions", "last 2 Edge versions"]}),
			mqpacker({ sort: false})]))
		.pipe(gulp.dest("build/css"))
		.pipe(minify())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest("build/css"));
});

gulp.task("images", function() {
	return gulp.src("build/img/**/*.{png,jpg,gif}")
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true})
		]))
		.pipe(gulp.dest("build/img"));
});

gulp.task("symbols", function() {
	return gulp.src("build/img/icons/*.svg")
		.pipe(svgmin())
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(rename("symbols.svg"))
		.pipe(gulp.dest("build/img"));
});

gulp.task("build", function(fn) {
	run(
		"clean",
		"images",
		"sprite",
		"style",
		"copy",
		"symbols",
		fn
	);
});

gulp.task("serve", function() {
	server.init({
		host: "192.168.31.166",
		port: 8080,
		server: "build"
	});
	gulp.watch("sass/**/*.scss", ["style"]);
	gulp.watch("*.html").on("change", server.reload);
	gulp.watch("build/css/*.css").on('change', server.reload);
});
