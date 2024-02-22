import { src, series, dest, parallel } from 'gulp';

const fs = require('fs');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const uglifycss = require('gulp-uglifycss');
const jsonMinify = require('gulp-json-minify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');

const scriptSource = './src'
const styleSource = './styles';
const hbsSource = './templates';

const langSource = './lang';

const packageDir = './system';

function clean() {
  // Clean package dir
  if (fs.existsSync(packageDir)) {
    try {
      fs.rmSync(packageDir, { recursive: true, force: true });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return Promise.resolve('Successfully cleaned');
}

function sassBundle() {
  return src(styleSource.concat('/**/*.sass'))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(concat('style.min.css'))
    .pipe(uglifycss())
    .pipe(dest(packageDir));
}

function tsBundle() {
  return browserify({
    baseDir: scriptSource,
    debug: true,
    entries: ['src/system.ts'],
  })
    .plugin(tsify)
    .bundle()
    .pipe(source('system.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(dest(packageDir));
}

function langBundle() {
  return src(langSource.concat('/*.json'))
    .pipe(jsonMinify())
    .pipe(dest(packageDir));
}

function hbsBundle() {
  return src(hbsSource.concat('/**/*.hbs'))
    .pipe(rename({ dirname: '' }))
    .pipe(dest(packageDir));
}

function systemJsonBundle() {
  return src('./system.json')
    .pipe(jsonMinify())
    .pipe(dest(packageDir));
}

function publish() {

}

const buildTask = process.env.NODE_ENV === 'production' ?
  series(
    parallel(
      sassBundle,
      tsBundle,
      langBundle,
      hbsBundle,
      systemJsonBundle,
    ),
    publish,
  ) :
  series(
    clean,
    parallel(
      sassBundle,
      tsBundle,
      langBundle,
      hbsBundle,
      systemJsonBundle,
    ),
  );

exports.build = buildTask;
exports.clean = clean;
exports.default = buildTask;
