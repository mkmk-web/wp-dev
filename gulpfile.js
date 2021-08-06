var gulp = require("gulp"),
  pug = require("gulp-pug"),
  sass = require("gulp-sass"),
  cssMin = require("gulp-clean-css"),
  sassGlob = require("gulp-sass-glob"),
  automale = require("gulp-plumber"),
  rename = require("gulp-rename"),
  notify = require("gulp-notify"),
  runSequence = require("run-sequence"),
  packageImporter = require("node-sass-package-importer");

var errorHandler = {
  function(err) {
    console.log(err.messageFormatted);
    this.emit("end");
  },
};

var viewsSrcPath = "./src/views";
var styleSrcPath = "./src/assets/sass";
var wordpressThemes = "./themes/test";

// DEVELOPMENT
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
gulp.task("pug:dev", () => {
  return gulp
    .src([`${viewsSrcPath}/**/*.pug`, `!${viewsSrcPath}/**/_*.pug`])
    .pipe(
      automale({
        errorHandler: notify.onError("<%= error.message %>"),
      })
    )
    .pipe(
      pug({
        pretty: true,
        basedir: "./src/views/",
      })
    )
    .pipe(
      rename({
        extname: ".php",
      })
    )
    .pipe(gulp.dest(`${wordpressThemes}`));
});

gulp.task("sass:dev", () => {
  return gulp
    .src(`${styleSrcPath}/**/*.sass`, ["sass"])
    .pipe(sassGlob())
    .pipe(
      automale({
        errorHandler: notify.onError("<%= error.message %>"),
      })
    )
    .pipe(sass())
    .pipe(rename("style.css"))
    .pipe(gulp.dest(`${wordpressThemes}`));
});

gulp.task("observer", () => {
  gulp.watch(`${viewsSrcPath}/**/*.pug`, gulp.task("pug:dev"));
  gulp.watch(`${styleSrcPath}/**/*.sass`, gulp.task("sass:dev"));
});

gulp.task("dev", gulp.task("observer"));

// PRODUCT
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
gulp.task("pug:prod", () => {
  return gulp
    .src([`${viewsSrcPath}/**/*.pug`, `!${viewsSrcPath}/**/_*.pug`])
    .pipe(automale(errorHandler))
    .pipe(
      pug({
        basedir: "./src/views/",
      })
    )
    .pipe(
      rename({
        extname: ".php",
      })
    )
    .pipe(gulp.dest(`${wordpressThemes}`));
});

gulp.task("sass:prod", () => {
  return gulp
    .src(`${styleSrcPath}/**/*.sass`, ["sass"])
    .pipe(sassGlob())
    .pipe(automale(errorHandler))
    .pipe(sass())
    .pipe(cssMin({ compatibility: "ie8" }))
    .pipe(rename("style.css"))
    .pipe(gulp.dest(`${wordpressThemes}`));
});

gulp.task("prod", gulp.series("pug:prod", "sass:dev"));
