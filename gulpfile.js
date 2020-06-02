const gulp = require("gulp");
const rollup = require("gulp-better-rollup");
const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
// import npm from 'rollup-plugin-npm';
const json = require("rollup-plugin-json");

const getBabelOptions = ({ useESModules }) => ({
  exclude: "**/node_modules/**",
  runtimeHelpers: true,
  plugins: [["@babel/transform-runtime", { regenerator: false, useESModules }]]
});

gulp.task("js", () => {
  return gulp
    .src("src/api/*.js")
    .pipe(
      rollup(
        {
          plugins: [
            babel(getBabelOptions({ useESModules: true })),
            resolve(),
            commonjs(),
            json()
          ]
        },
        "umd"
      )
    )
    .pipe(gulp.dest("dist/"));
});

gulp.task("copy", () => {
  return gulp.src("src/api/*.json").pipe(gulp.dest("dist/"));
});
