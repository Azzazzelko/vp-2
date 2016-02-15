var gulp = require("gulp"),
	jade = require("gulp-jade"),
	plumber = require("gulp-plumber"),
	browserSync = require("browser-sync");

var jadePath = 'app/_myJade/*.jade';

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
			"app/_myJade/*.jade",
			"app/css/**/*.css"
		]).on("change", browserSync.reload);
	});

//========= Берем файлы JADE и компим их в хмтл в дирректорию .dest... ===
	gulp.task('jade', function(){
		var YOUR_LOCALS = {};

		gulp.src('app/_myJade/*.jade')
			.pipe(plumber())
			.pipe(jade({
				locals: YOUR_LOCALS,
				pretty: '\t',
			}))
			.pipe(gulp.dest('app/pages/'))
	});

//============== При изменении файлов JADE запускаем таск JADE =====
	gulp.task("jadeReSave", function(){
		gulp.watch(jadePath, ['jade'])
	});

	gulp.task("default", ["server", "jade", "jadeReSave", "watch"]);

	