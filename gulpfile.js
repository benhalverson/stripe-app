'use strict';

const gulp = require('gulp');
const copy = require('gulp-copy');
const rimraf = require('rimraf');
const run = require('gulp-run');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const addsrc = require('gulp-add-src');
const async = require('async');

const paths = {
  filesrc: 'source/**/*',
  filepath: 'public',
  cleanedfiles: [
    'public/templates',
    'public/css',
    'public/js'
  ]

}

gulp.task('watch', function(){
  gulp.watch('source/**/*', ['build'])
});

gulp.task('build', function(){
  return gulp.src(['source/**/*.js', 'source/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(addsrc('source/**/*.html'))
    .pipe(addsrc('source/**/*.css'))
    .pipe(gulp.dest(paths.filepath))
    .on('error', gutil.log)
});

gulp.task('default', ['build', 'watch']);
