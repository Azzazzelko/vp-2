var gulp = require("gulp"),
	jade = require("gulp-jade"),
	plumber = require("gulp-plumber"),
	compass = require('gulp-compass'),
	browserSync = require("browser-sync");

var jadePath = 'app/_myJade/_pages/*.jade';
var SCSSPath = 'app/_mySCSS/**/*.scss';

	gulp.task("server", function() {
		browserSync({
			port: 9000,
			server: {
				baseDir: "app"
			}
		});
	});

	gulp.task("watch", function(){
		gulp.watch([
			"app/*.html",
			"app/js/**/*.js",
			jadePath,
			"app/css/**/*.css"
		]).on("change", browserSync.reload);
	});

//========= Берем файлы JADE и компим их в хмтл в дирректорию .dest... ===
	gulp.task('jade', function(){
		var YOUR_LOCALS = {};

		gulp.src(jadePath)
			.pipe(plumber())
			.pipe(jade({
				locals: YOUR_LOCALS,
				pretty: '\t',
			}))
			.pipe(gulp.dest('app/pages/'))
	});

//============== Настраиваем КОМПАС =====================
	gulp.task('compass', function() {
		gulp.src('app/_mySCSS/main.scss')
			.pipe(plumber())
			.pipe(compass({
				sourcemap: true,
				config_file: 'config.rb',
				css: 'app/css/',
				sass: 'app/_mySCSS/'
			}))
	});
//============== При изменении файлов JADE запускаем таск JADE =====
	gulp.task("watch2", function(){
		gulp.watch(jadePath, ['jade']);
		gulp.watch('app/_mySCSS/**/*.scss', ['compass'])
	});

	gulp.task("default", ["server", "jade", "compass", "watch2", "watch"]);

	