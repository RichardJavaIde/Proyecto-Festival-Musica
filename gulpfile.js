const { src, dest, watch, parallel } = require("gulp"); // este es para importar funciones de gulp
//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber"); // este plugin es para que no detenga la ejecucion del watch cuando alga un eror y muestre el eror.

const autoPrefixer = require("autoprefixer");
const cssNano = require("cssnano");
const postCss = require("gulp-postcss");
const sourceMaps = require("gulp-sourcemaps");

//imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

//js
const terser = require("gulp-terser-js");

function css(done) {
  src("src/scss/**/*.scss") //indentificar el archivo SASS
    .pipe(sourceMaps.init())
    .pipe(plumber())
    .pipe(sass()) //compilarlo
    .pipe(postCss([autoPrefixer(), cssNano()]))
    .pipe(sourceMaps.write("."))
    .pipe(dest("build/css")); //almacenarlo en el disco duro

  done(); //Es un Callback que avisa a gulp cuando llegamos al final
}
function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };
  src("src/img/**/*.{png,jpg}") //
    .pipe(cache(imagemin(opciones))) //
    .pipe(dest("build/img")); //
  done();
}
function versionWebp(done) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));
  done();
}
function versionavif(done) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}") //
    .pipe(avif(opciones)) //
    .pipe(dest("build/img"));
  done();
}
function javascript(done) {
  src("src/js/**/*.js") //
    .pipe(sourceMaps.init())
    .pipe(terser())
    .pipe(sourceMaps.write("."))
    .pipe(dest("build/js"));
  done();
}

function dev(done) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);

  done();
}

exports.css = css; //es para llamar a ejecutar la funcion
exports.js = javascript; //es para llamar a ejecutar la funcion
exports.imagenes = imagenes;
exports.versionWebp = versionWebp; //es para llamar a ejecutar la funcion
exports.versionavif = versionavif; //es para llamar a ejecutar la funcion
exports.dev = parallel(versionWebp, versionavif, imagenes, javascript, dev); //es para llamar a ejecutar la funcion
