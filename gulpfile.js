const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const shell = require('gulp-shell')

function style(){
  // 1. Find sass files
  return gulp.src('./source/stylesheets/**/*.sass')
  // 2. Compile sass files
    .pipe(sass().on('error', sass.logError))
  // 3. Destination of CSS
    .pipe(gulp.dest('./build'))
  // 4. Sync to browsers
    .pipe(browserSync.stream())
  // 5. Remove trash from failed Middleman build of SASS
    .pipe(shell(['rm ./build/stylesheets/style']))
}

function build(){
  return gulp.src('./build')
  .pipe(shell(['middleman build']))
}

function watch(){
  browserSync.init({
    server: {
      baseDir: './build'
    }
  })
  gulp.watch('./source/stylesheets/**/*.sass', style)
  gulp.watch('./source/**/*haml').on('change', browserSync.reload)
}


exports.style = style
exports.build = build
exports.watch = watch
