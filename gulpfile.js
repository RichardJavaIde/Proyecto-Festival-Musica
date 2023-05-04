const { src, dest, watch, parallel } = require("gulp"); // este es para importar funciones de gulp
//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber"); // este plugin es para que no detenga la ejecucion del watch cuando alga un eror y muestre el eror.
//imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(done) {
  src("src/scss/**/*.scss") //indentificar el archivo SASS
    .pipe(plumber())
    .pipe(sass()) //compilarlo
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
function dev(done) {
  watch("src/scss/**/*.scss", css);

  done();
}

exports.css = css; //es para llamar a ejecutar la funcion
exports.imagenes = imagenes;
exports.versionWebp = versionWebp; //es para llamar a ejecutar la funcion
exports.versionavif = versionavif; //es para llamar a ejecutar la funcion
exports.dev = parallel(versionWebp, versionavif, imagenes, dev); //es para llamar a ejecutar la funcion
