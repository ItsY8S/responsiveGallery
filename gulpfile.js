var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('build-css', function() {
  return gulp.src('./scss/*.scss') // Get source files with gulp.src
    .pipe(sass()) // Sends it through a gulp plugin
    .pipe(gulp.dest('./css')) // Outputs the file in the destination folder
    .pipe(browserSync.reload({
      stream:true
    }))
})

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
})

gulp.task('watch', ['browser-sync', 'build-css'], function() {
  gulp.watch('./scss/*.scss', ['build-css']);
})
