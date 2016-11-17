var gulp=require('gulp')
var postcss=require('gulp-postcss')
var cssnext=require('postcss-cssnext')
var browserSync=require('browser-sync').create()
var cssnested=require('postcss-nested')
var lost=require('lost')
var csswring=require('csswring')
var mqpacker=require('css-mqpacker')
var plumber=require('gulp-plumber')
var uglify=require('gulp-uglify')
var uncss=require('gulp-uncss')
var imagemin=require('gulp-imagemin')

//Servidor de desarrollo
gulp.task('serve', function(){
	browserSync.init({
		server:{
			baseDir:'./dist'
		}
		})
	})

//Procesar CSS
gulp.task('css', function(){
	var processor=[
		cssnested,
		lost,
		cssnext,
		mqpacker,
		//csswring()
	]

	return gulp.src('./src/css/*.css')
		//Evita caida de gulp ante ciertos errores
		.pipe(plumber())
		//ejecuta lista de procesos postcss
		.pipe(postcss(processor))
		//Elimina el css no usado en html
		//.pipe(uncss({html:['dist/*.html']}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream())
	})

//Procesar JS
gulp.task('js', ['img'],function(){
	gulp.src('./src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.stream())	
	})

//Procesar Imagenes
gulp.task('img', function(){
	return gulp.src('./src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/img/'))
	})

//Vigilar Cambios
gulp.task('watch', function(){
	gulp.watch('./src/js/*.js',['js'])
	gulp.watch('./src/css/*.css',['css'])
	gulp.watch('./dist/*.html').on('change', browserSync.reload)
	})

//accion por default
gulp.task('default', ['watch', 'serve'])