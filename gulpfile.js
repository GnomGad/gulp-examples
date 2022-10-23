// server

// gulp
const browserSync = require("browser-sync").create(),
    gulp = require("gulp"),
    clean = require("gulp-clean"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    plumber = require("gulp-plumber"),
    notify = require("gulp-notify"),
    htmlmin = require("gulp-htmlmin"),
    jade = require("gulp-jade"),
    csso = require("gulp-csso"),
    autoprefixer = require("gulp-autoprefixer"),
    imagemin = require("gulp-imagemin"),
    uglify = require("gulp-uglify"),
    browserify = require("gulp-browserify");
