var gulp         = require('gulp');
var express      = require('express');
var browsersync  = require('browser-sync');
var gutil        = require('gulp-util');
var jasmine      = require('gulp-jasmine');
var uglify       = require('gulp-uglify');
var shell        = require('gulp-shell');
var istanbul     = require('gulp-istanbul');
const reporters  = require('jasmine-reporters');
var server;
var dist = 'dist';


var jasmine = require('gulp-jasmine-phantom');

gulp.task('jasmine', function() {
    return gulp.src('jasmine/spec/feedreader.js')
        .pipe(jasmine({
	    integration: true
	}));
});


//-------------------------------------------------------------
// Jasmine JS unit testing
//-------------------------------------------------------------
gulp.task('unit-test', function () {
  return gulp.src('./src/js/specs/*.js')
	.pipe(jasmine({
	    verbose:true,
	    includeStackTrace: true,
	    reporter: new reporters.JUnitXmlReporter()
	}))
	.pipe(istanbul.writeReports({
	    dir: 'docs/unit-test-coverage',
	    reporters: [ 'lcov' ],
	    reportOpts: { dir: './docs/unit-test-coverage'}
	}));
});


//-------------------------------------------------------------
// jsDoc
//-------------------------------------------------------------
gulp.task('js-doc', shell.task(['jsdoc -d docs/jsdoc/ -r src/js/']));

//-------------------------------------------------------------
// BrowserSync
//-------------------------------------------------------------
function reload() {
    if (server){
	return browsersync.reload({stream: true});
    }
    return gutil.noop();
}

//-------------------------------------------------------------
// Copy html to the dist folder
//-------------------------------------------------------------
gulp.task('cp-html', function(){

    return gulp.src(['src/index.html',
		     'src/html/**/*.html'])
	.pipe(gulp.dest('dist'))
	.pipe(reload());
});

gulp.task('cp-jasmine', function(){
    return gulp.src(['src/jasmine/**/*'])
	.pipe(gulp.dest('dist/jasmine'))
	.pipe(reload());
});

gulp.task('cp-fonts', function(){
    return gulp.src(['src/fonts/**/*'])
	.pipe(gulp.dest('dist/fonts'))
	.pipe(reload());
});



//-------------------------------------------------------------
// Copy bower components folder to the dist folder
//-------------------------------------------------------------
gulp.task('cp-bower', function(){
    gulp.src("./src/bower_components/**").pipe(gulp.dest('dist/bower_components/'))
});

//-------------------------------------------------------------
gulp.task('cp-css', function(){
    return gulp
    .src(['./src/css/**/*.css'])
	.pipe(gulp.dest('dist/css'))
    	.pipe(reload());
});

//-------------------------------------------------------------
gulp.task('cp-js', function(){
    return gulp
	.src(['./src/js/**/*.js'])
	.pipe(gulp.dest('dist/js'))
    	.pipe(reload());
});

//-------------------------------------------------------------
gulp.task('cp-images', function(){
    return gulp
    .src(['src/img/**/*.{jpg,jpeg,png,svg}'])
	  .pipe(gulp.dest('dist/img'))
    .pipe(reload());
});

//-------------------------------------------------------------
gulp.task('build', ['cp-html','cp-fonts','cp-jasmine', 'cp-bower','cp-images','cp-css','cp-js']);


//-------------------------------------------------------------
// Watch task; which tasks to be called when specifc types of files change on disk
//-------------------------------------------------------------
gulp.task('watch', function(){
    gulp.watch('src/**/*.html',['cp-html'])
    gulp.watch('src/img/**/*.{jpg,jpeg,png,svg}',['cp-images'])
    gulp.watch('src/css/**/*.css',['cp-css'])
    gulp.watch('src/js/**/*.js',['cp-js'])
    gulp.watch('src/jasmine/**/*.js',['cp-jasmine'])
});

//-------------------------------------------------------------
// Node Express development webserver
//-------------------------------------------------------------
gulp.task('server', function(){
    server = express();
    server.use(express.static('dist'));
    server.listen(8000);
    browsersync({proxy: 'localhost:8000',
		 open : false}
	       );
});

//-------------------------------------------------------------
// Default Gulp job
//-------------------------------------------------------------
gulp.task('default', ['build','watch','server'])


