## My gulp expirience

Проект создан в качестве шаблона для работы с gulp

## HOW TO USE

```js
// imports
const { GulpBuilder, watch, series } = require("gulp-pipe-builder");
const html = {
    in: "./app/html/**/*.html",
    out: "./dest",
};
// initialization new object
const gpb = new GulpBuilder();
// creating a function to minimize html
const minhtml = async () => {
    return gpb
        .addSrc(html.in)
        .addPlumberNotify()
        .addHtmlmin({
            collapseWhitespace: true,
            removeComments: true,
        })
        .addDest(html.out);
};
// creating watcher function
const watcher = async () => {
    watch(html.in, minhtml);
};

// export task
module.exports.default = series(minhtml, watcher);
```

## gulp plugin

### Функциональные

-   gulp-concat - объединение файлов в один
-   gulp-rename - переименовать файл
-   gulp-clean - удалить указанные файлы
-   gulp-tap - позволяет подключиться к пайплайну
-   gulplog - логирование на всех уровнях
-   gulp-buffer - работа с потоком если плагины не поддерживают потоки

### Опциональные

-   gulp-plumber - выводит ошибку не прерывая работу gulp
-   gulp-notify - оповещение в систему
-   gulp-filesize - размер файлов

#### HTML

-   gulp-htmlmin - минификация html файла

### CSS

-   gulp-csso - минификация css кода
-   gulp-autoprefixer - добавляет автоматически префиксы под браузеры

### JS

-   gulp-uglify - компрессор кода
-   gulp-browserify - позволяет использовать require в js
-   gulp-babel - позволяет использовать es6 в js

### Компиляция

-   gulp-jade - компиляция .jade кода в .html

### Документация и инфогрфика

-   gulp-jsdoc3 - создание из jsdoc документации html файл'
-   gulp-plato - создание инфографики кода

### Графика

-   gulp-imagemin - минификатор картинок
