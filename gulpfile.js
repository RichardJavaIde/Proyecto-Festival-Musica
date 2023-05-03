const { src, dest, watch, parallel } = require("gulp"); // este es para importar funciones de gulp
//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber"); // este plugin es para que no detenga la ejecucion del watch cuando alga un eror y muestre el eror.
//imagenes
const webp = require("gulp-webp");

function css(done) {
  src("src/scss/**/*.scss") //indentificar el archivo SASS
    .pipe(plumber())
    .pipe(sass()) //compilarlo
    .pipe(dest("build/css")); //almacenarlo en el disco duro

  done(); //Es un Callback que avisa a gulp cuando llegamos al final
}
function versionWebp(done) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));
  done();
}
function dev(done) {
  watch("src/scss/**/*.scss", css);

  done();
}

exports.css = css; //es para llamar a ejecutar la funcion
exports.versionWebp = versionWebp; //es para llamar a ejecutar la funcion
exports.dev = parallel(versionWebp, dev); //es para llamar a ejecutar la funcion
