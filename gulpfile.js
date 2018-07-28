let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync').create();
let useref = require('gulp-useref');
let gulpIf = require('gulp-if');
let cssnano = require('gulp-cssnano');
let del = require('del');
let runSequence = require('run-sequence');
let gutil = require('gulp-util');
let concat = require('gulp-concat');
let babili = require('gulp-babili');



gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('sass', () => {
  return gulp.src('app/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('fonts', () => {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('watch', ['browserSync', 'sass'], () => {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('useref', () => {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('scripts', () => {
  return gulp.src(['app/js/*.js'])
    .pipe(concat('main.min.js'))
    .pipe(babili({
      mangle: {
        keepClassNames: true
      }
    }))
  .on('error', function (err) {
     gutil.log(gutil.colors.red('[Error]'), err.toString());
   })
  .pipe(gulp.dest('dist/js'));
})

gulp.task('clean:dist', () => {
  return del.sync('dist');
})

gulp.task('default', function (callback) {
  runSequence(['watch', 'sass', 'browserSync'],
    callback
  )
})

gulp.task('build', function (callback) {
  runSequence('clean:dist', ['default', 'fonts'], 'useref', 'scripts',
    callback)
})
