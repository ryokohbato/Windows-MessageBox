const gulp = require("gulp");
const sourcemaps = require('gulp-sourcemaps');
const sass = require("gulp-sass");
sass.compiler = require('sass');    // コンパイラにDartSassを指定
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webserver = require("gulp-webserver");
const fs = require("fs");

// HTMLファイル設置
gulp.task("_html", done => {
  fs.copyFile("src/index.html", "dist/index.html", error => {
    if (error)
      console.log("index.htmlの配置に失敗しました。");

    done();
  });
})

// sassコンパイル・自動ベンダープレフィックス付与
gulp.task("_sass", () => {
  return gulp.src("src/style/style.scss")
    .pipe(sass({
      outputStyle: "expanded"
    }).on("error", sass.logError))
    .pipe(sourcemaps.write({includeContent: false}))
		.pipe(sourcemaps.init({loadMaps: true}))
    .pipe(postcss([
        autoprefixer({
          cascade: false,
          // IEのgridに対応させる
          grid: true,
        })
      ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"));
})

// [build] sassコンパイル・自動ベンダープレフィックス付与
gulp.task("_sass__build", () => {
  return gulp.src("src/style/style.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(postcss([
        autoprefixer({
          cascade: false,
          // IEのgridに対応させる
          grid: true,
        })
      ]))
    .pipe(gulp.dest("dist"));
})

// TypeScriptコンパイル
gulp.task("_ts", () => {
  const webpackConfig = require('./webpack.ts.development.config.js');
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("dist/"));
})

// [build] TypeScriptコンパイル
gulp.task("_ts__build", () => {
  const webpackConfig = require('./webpack.ts.production.config.js');
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("dist/"));
})

// JSをWebpackでバンドル
gulp.task("_js", () => {
  const webpackConfig = require('./webpack.js.development.config.js');
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("dist/"));
})

// [build] JSをWebpackでバンドル
gulp.task("_js__build", () => {
  const webpackConfig = require('./webpack.js.production.config.js');
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("dist/"));
})

// コンパイル・バンドル実行 (TypeScript)
gulp.task("dev_ts", gulp.parallel("_html", "_sass", "_ts"));

// ビルド (TypeScript)
gulp.task("build_ts", gulp.parallel("_html", "_sass__build", "_ts__build"));

// コンパイル・バンドル実行 (JavaScript)
gulp.task("dev_js", gulp.parallel("_html", "_sass", "_js"));

// ビルド (JavaScript)
gulp.task("build_js", gulp.parallel("_html", "_sass__build", "_js__build"));

// 変更のwatch・ローカルサーバー起動 (TypeScript)
gulp.task("watch_ts", done => {
  fs.exists("dist/", result => {
    if (!result) {
      console.log("distフォルダが見つかりませんでした。");
      done();
    }
    else
    {
      gulp.src("dist")
        .pipe(webserver({
          livereload: true,
          open: true,
        }))

      gulp.watch("src/index.html", gulp.task("_html"));
      gulp.watch(["src/style/*.scss", "src/style/**/*.scss"], gulp.task("_sass"));
      gulp.watch(["src/script/*.ts", "src/script/**/*.ts", "src/script/*.js", "src/script/**/*.js"], gulp.task("_ts"));
    }
  })
})

// 変更のwatch・ローカルサーバー起動 (JavaScript)
gulp.task("watch_js", done => {
  fs.exists("dist/", result => {
    if (!result) {
      console.log("distフォルダが見つかりませんでした。");
      done();
    }
    else
    {
      gulp.src("dist")
        .pipe(webserver({
          livereload: true,
          open: true,
        }))

      gulp.watch("src/index.html", gulp.task("_html"));
      gulp.watch(["src/style/*.scss", "src/style/**/*.scss"], gulp.task("_sass"));
      gulp.watch(["src/script/*.ts", "src/script/**/*.ts", "src/script/*.js", "src/script/**/*.js"], gulp.task("_js"));
    }
  })
})
