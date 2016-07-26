var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    }
  })
})

//Convert SASS
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in src/scss and children dirs
    .pipe(sass()) // Passes it through a gulp-sass
    .pipe(gulp.dest('src/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watchers
gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/css/**/*.css', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
})

// Optimizing Images
gulp.task('img', function() {
  return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/img'))
});

//Copy HTML
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'))
})

//Copy CSS
gulp.task('css', function() {
  return gulp.src('src/css/**/*')
    .pipe(gulp.dest('dist/css'))
})

// Copying fonts
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

// Copying Vendor JS
gulp.task('vendor', function() {
  return gulp.src('src/js/vendor/**/*')
    .pipe(gulp.dest('dist/js/vendor'))
})

// Cleaning
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/img', '!dist/img/**/*']);
});

// Build Sequences

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    ['sass', 'img', 'fonts', 'css', 'html', 'scripts', 'vendor'],
    callback
  )
})
