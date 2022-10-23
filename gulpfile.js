const gulpBrowserify = require("gulp-browserify");
const GulpBuilder = require("./lib/GulpBuilder");
const { task, watch, series } = require("gulp");

const html = {
        in: "./app/html/**/*.html",
        out: "./dest",
    },
    js = {
        in: "./app/js/**/*.js",
        out: "./dest/js",
        name: "main.min.js",
    },
    css = {
        in: "./app/css/**/*.css",
        out: "./dest",
        name: "main.min.css",
    },
    img = {
        in: "./app/img/**/*.*",
        out: "./dest/img",
    },
    jade = {
        in: "./app/jade/**/*.jade",
        out: "./dest",
    };

const gb = new GulpBuilder();

/**
 * Минимизация html
 * @returns
 */
let minhtml = async () => {
    return gb
        .addSrc(html.in)
        .addPlumberNotify()
        .addHtmlmin({
            collapseWhitespace: true,
            removeComments: true,
        })
        .addDest(html.out);
};

let jadeToHtml = async () => {
    return new GulpBuilder(jade.in)
        .addPlumberNotify()
        .addJade()
        .addDest(jade.out);
};

let mincss = async () => {
    return new GulpBuilder(css.in)
        .addPlumberNotify()
        .addAutoprefixer()
        .addCsso()
        .addRename(css.name)
        .addDest(css.out);
};

let minjs = async () => {
    return gb
        .addSrc(js.in, { read: false })
        .addPlumberNotify()
        .addbrowserify()
        .addUglify()
        .addRename(js.name)
        .addDest(js.out);
};

let imagemin = async () => {
    return new GulpBuilder(img.in)
        .addPlumberNotify()
        .addImagemin()
        .addDest(img.out);
};

let watchTasks = async () => {
    watch(html.in, minhtml);
    watch(jade.in, jadeToHtml);
    watch(css.in, mincss);
    watch(js.in, minjs);
    watch(img.in, imagemin);
};

exports.default = series(jadeToHtml, mincss, minjs, imagemin, watchTasks);
exports.html = series(minhtml);
exports.js = series(minjs);
exports.jade = series(jadeToHtml);
exports.css = series(mincss);
exports.img = series(imagemin);
