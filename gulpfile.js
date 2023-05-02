const { src, dest, watch } = require("gulp"); // este es para importar funciones de gulp
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber"); // este plugin es para que no detenga la ejecucion del watch cuando alga un eror y muestre el eror.

function css(done) {
  src("src/scss/**/*.scss") //indentificar el archivo SASS
    .pipe(plumber())
    .pipe(sass()) //compilarlo
    .pipe(dest("build/css")); //almacenarlo en el disco duro

  done(); //Es un Callback que avisa a gulp cuando llegamos al final
}
function dev(done) {
  watch("src/scss/**/*.scss", css);

  done();
}
exports.css = css; //es para llamar a ejecutar la funcion
exports.dev = dev; //es para llamar a ejecutar la funcion
