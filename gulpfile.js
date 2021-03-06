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
const { gulpSassError } = require('gulp-sass-error');
const throwError = true;


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
    .pipe(sass({outputStyle: 'compressed'}).on('error', gulpSassError(throwError)))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('scss-lint', function() {
    return gulp.src('app/scss/*.scss')
        .pipe(scsslint())
        .pipe(scsslint.failReporter('E'))
});

gulp.task('fonts', () => {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('docs/fonts'))
})

gulp.task('watch', ['browserSync', 'sass'], () => {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('images', () => {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(gulp.dest('docs/images'))
});
gulp.task('svg', ()=>{
    return gulp.src('app/svg/**/*.svg')
    .pipe(gulp.dest('docs/svg'))
});

gulp.task('useref', () => {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('docs'))
});

gulp.task('scripts', () => {
  return gulp.src(['app/js/*.js'])
    .pipe(concat('script.min.js'))
    .pipe(babili({
      mangle: {
        keepClassNames: true
      }
    }))
  .on('error', function (err) {
     gutil.log(gutil.colors.red('[Error]'), err.toString());
   })
  .pipe(gulp.dest('docs/js'));
})

gulp.task('clean:docs', () => {
  return del.sync('docs');
})

gulp.task('default', function (callback) {
  runSequence(['watch', 'sass', 'browserSync'],
    callback
  )
})

gulp.task('build', function (callback) {
  runSequence('clean:docs', ['default', 'fonts', 'images', 'svg'], 'useref', 'scripts',
    callback)
})
