const gulp = require("gulp");
const webserver = require("gulp-webserver");

// ローカルサーバー起動
gulp.task("live", done => {
  gulp.src("dist")
    .pipe(webserver({
      livereload: true,
      open: true,
    }))
})