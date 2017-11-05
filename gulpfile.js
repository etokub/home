var gulp 			= require('gulp'),
	minifyCSS 		= require('gulp-minify-css'),
	merge 			= require('merge-stream'),
	imagemin 		= require('gulp-imagemin'),
	concat 			= require('gulp-concat'),
	sass 			= require('gulp-sass'),
	autoprefixer 	= require('gulp-autoprefixer'),
	sourcemaps 		= require('gulp-sourcemaps'),
	uglify			= require('gulp-uglifyjs'),
	browserSync 	= require('browser-sync'),
	spritesmith 	= require('gulp.spritesmith'),
	imagemin 		= require('gulp-imagemin'),
	cache			= require('gulp-cache'),
	ghPages 		= require('gulp-gh-pages'),
	del 			= require('del');



gulp.task('sass', function(){
	return gulp.src(['./sass/**/*.scss', './sass/**/*.sass'])
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions'], {cascade: false}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./css/'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('styles', function() {
	return gulp.src('./css/*.css')
	.pipe(concat('style.min.css'))
	.pipe(minifyCSS())
	.pipe(gulp.dest('./css/'))
	.pipe(browserSync.reload({stream: true}))
});
gulp.task('app-styles', function() {
	return gulp.src('./app/*.css')
	.pipe(concat('app.min.css'))
	.pipe(minifyCSS())
	.pipe(gulp.dest('./css/'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function(){
	return gulp.src([
		'js/jquery-3.2.1.js', 
		'js/masonry.pkgd.js',
		])
	.pipe(concat('plugins.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./js/'))
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: './'
		},
		notify: false
	});
});


gulp.task('sprite', () => {
    let spriteData = gulp.src('./pic/sprite/*.png').pipe(
        spritesmith({
            imgName: 'sprite.png',
            cssName: '_icon-mixin.scss',
            cssVarMap: (sprite) => {sprite.name = 'icon-' + sprite.name}
        })
    );

    let imgStream = spriteData.img.pipe(gulp.dest('./pic/'));
    let cssStream = spriteData.css.pipe(gulp.dest('./sass/'));

    return merge(imgStream, cssStream);
});
// зтиснення svg, png, jpeg
gulp.task('imgmin', function(){
    // беремо всі картинки крім папки де лежать картинки для спрайту
    // картинки зі спрайту упаковуються в окрему картинку
    return gulp.src(['./img/**/*', '!./pic/*'])
        .pipe(cache(imagemin({

        })))
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('clean', function(){
	return del.sync('./dist/**/*');
});

gulp.task('watch', ['browser-sync', 'sass'], function(){
	gulp.watch('./sass/**/*', ['sass']);
	// gulp.watch('templates/css/**/*', ['styles']);
	gulp.watch('./*.html', browserSync.reload);
});


gulp.task('build', ['clean', 'sass', 'styles', 'scripts', 'imgmin'], function(){
	var buildCss = gulp.src([
		'css/style.min.css'
	])
		.pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'js/plugins.min.css'
	])
		.pipe(gulp.dest('dist/css'));	

	var buildHTML = gulp.src('./*.html')
		.pipe(gulp.dest('dist/'));

	var buildPic= gulp.src('./pic/**/*')
		.pipe(gulp.dest('dist/pic'));	
});

gulp.task('deploy', () => gulp.src('./dist/**/*').pipe(ghPages()));

// gulp.task('css', function() {
//   return gulp.src(['./templates/css/reset.css', './templates/css/base.css', './templates/css/heder.css', './templates/css/why.css', './templates/css/latest-projects.css', 'templates/css/footer.css'])
//     .pipe(concat('main.css'))
//     .pipe(gulp.dest('./css/'));
// });
