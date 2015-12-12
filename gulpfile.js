var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var less = require('gulp-less');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

var production = process.env.NODE_ENV === 'production';

var dependenciesJS = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/bootstrap/dist/js/bootstrap.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-route/angular-route.js',
  'bower_components/underscore/underscore.js'
];

var appSourcesJS = [
  'app/main.js',
  'app/controllers/MainQuizController.js',
  'app/controllers/NavbarController.js',
  'app/controllers/Step1Controller.js',
  'app/controllers/Step2Controller.js',
  'app/controllers/Step3Controller.js',
  'app/controllers/Step4Controller.js',
  'app/directives/AnsweredDirective.js',
  'app/directives/HasValueDirective.js',
  'app/directives/NavbarDirective.js',
  'app/services/QuizService.js',
];
var appSourcesLESS = [
  'app/stylesheets/main.less'
];

// Combine all JS libraries into a single file for fewer HTTP requests.
gulp.task('vendor', function() {
  return gulp.src(dependenciesJS)
    .pipe(concat('vendor.js'))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest('public/js'));
});

// Build all JS sources to one file
gulp.task('build-js', function() {
    return gulp.src(appSourcesJS)
      .pipe(concat('bundle.js'))
      .pipe(ngAnnotate())
      .pipe(gulpif(production, streamify(uglify({
        mangle: true,
          compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
          }
      }))))
      .pipe(gulp.dest('public/js/'));
});

// Compile LESS stylesheets.
gulp.task('styles', function() {
  return gulp.src(appSourcesLESS)
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulpif(production, cssmin()))
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
  gulp.watch('app/stylesheets/**/*.less', ['styles']);
  gulp.watch("app/**/*.js", ["build-js"]);
});

gulp.task('default', ['styles', 'vendor', 'build-js', 'watch']);
gulp.task('build', ['styles', 'vendor', 'build-js']);
