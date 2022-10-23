// dependities
const browserSync = require("browser-sync").create(),
    { series, src, dest, watch, parallel } = require("gulp"),
    tap = require("gulp-tap"),
    log = require("gulplog"),
    buffer = require("gulp-buffer"),
    sourcemaps = require("gulp-sourcemaps"),
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
    jsdoc = require("gulp-jsdoc3"),
    browserify = require("browserify");

class GulpBuilder {
    /**
     * Инициализирует объекта для работы с gulp
     * @param {*} path путь к файлу
     */
    constructor(path) {
        this.gulp = path ? src(path) : null;
    }

    /**
     * Создает jsdoc документацию
     * Файлы нужно использовать через свойство read:false в addSrc
     * @param {*} options
     * @returns {GulpBuilder} this
     */
    addJsdoc(options) {
        this.gulp = this.gulp.pipe(jsdoc(options));
        return this;
    }
    /**
     * Сжимает картинки
     * @param {*} options
     * @returns {GulpBuilder} this
     */
    addImagemin(options) {
        this.gulp = this.gulp.pipe(imagemin(options));
        return this;
    }
    /**
     * Добавляет автоматически префиксы под браузеры
     * @param {*} options
     * @returns {GulpBuilder} this
     */
    addAutoprefixer(options) {
        this.gulp = this.gulp.pipe(autoprefixer(options));
        return this;
    }
    /**
     * Функция для сжатия css
     * @param {*} options опции
     * @returns {GulpBuilder} this
     */
    addCsso(options) {
        this.gulp = this.gulp.pipe(csso(options));
        return this;
    }

    /**
     * Функция для компиляции jade в html
     * @param  {} options опции
     * @returns {GulpBuilder} this
     */
    addJade(options) {
        this.gulp = this.gulp.pipe(jade(options));
        return this;
    }

    /**
     * Используется что бы не оставливат поток
     * @param  {} options опции
     * @returns {GulpBuilder} this
     */
    addPlumber(options) {
        this.gulp = this.gulp.pipe(plumber(options));
        return this;
    }
    /**
     * Позволяет не останавливать поток и выводить ошибки через errorHandler
     * @param  {} options опции
     * @returns {GulpBuilder} this
     */
    addPlumberNotify(options) {
        this.gulp = this.gulp.pipe(
            plumber({
                errorHandler: notify.onError("Error: <%= error.message %>"),
            })
        );
        return this;
    }
    /**
     * Функция для сжатия js кода
     * @param {object} опции
     * @returns {GulpBuilder} this
     */
    addUglify(options) {
        this.gulp = this.gulp.pipe(uglify(options));
        return this;
    }

    /**
     * Функция для обработк require в js
     * @param  {} options опции
     * @returns {GulpBuilder} this
     */
    addbrowserify(options) {
        this.gulp = this.gulp
            .pipe(
                tap(function (file) {
                    log.info("bundling " + file.path);

                    // replace file contents with browserify's bundle stream
                    file.contents = browserify(file.path, {
                        debug: true,
                    }).bundle();
                })
            )
            .pipe(buffer());
        return this;
    }

    /**
     * Функция добавляет точку init соурсмапа
     * @param {*} options
     * @returns {GulpBuilder} this
     */
    addSourceMapsInit(options) {
        this.gulp = this.gulp.pipe(sourcemaps.init(options));
        return this;
    }
    /**
     * Функция добавляет write точку соурсмапа
     * @param {*} options
     * @returns {GulpBuilder} this
     */
    addSourceMapsWrite(options) {
        this.gulp = this.gulp.pipe(sourcemaps.write(options));
        return this;
    }
    /**
     * Функция для минификации html
     * @param {*} options  опции
     * @returns {GulpBuilder} this
     */
    addHtmlmin(options) {
        this.gulp = this.gulp.pipe(htmlmin(options));
        return this;
    }
    addRename(path) {
        this.gulp = this.gulp.pipe(rename(path));
        return this;
    }
    /**
     * функция для получения нового пути
     * @param {string} path
     * @param {object} options
     * @returns {GulpBuilder} this
     */
    addSrc(path, options) {
        this.gulp = src(path, options);
        return this;
    }
    /**
     * функция для вывода файлов
     * @param  {} path путь
     * @param  {} options опции
     * @returns {GulpBuilder} this
     */
    addDest(path, options) {
        this.gulp = this.gulp.pipe(dest(path, options));
        return this;
    }
}

module.exports = {
    GulpBuilder: GulpBuilder,
    src: src,
    dest: dest,
    watch: watch,
    series: series,
    parallel: parallel,
};
