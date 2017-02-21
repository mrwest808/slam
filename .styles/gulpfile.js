const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

gulp.task('styles', () => {
  return gulp.src('src/index.sass')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      indentedSyntax: true,
      includePaths: [
        'node_modules'
      ]
    }).on('error', $.sass.logError))
    .pipe($.sourcemaps.write('.'))
    .pipe($.rename('compiled.css'))
    .pipe(gulp.dest('.'))
})

gulp.task('watch', ['styles'], () => {
  gulp.watch('src/**/*', ['styles'])
})

gulp.task('build', ['styles'])
gulp.task('default', ['build'])
