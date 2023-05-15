document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  crearGaleria();
  scrollNav();
  navegacionFija();
}
function navegacionFija() {
  const barra = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");
  const body = document.querySelector("body");

  window.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().top < 0) {
      barra.classList.add("fijo");
      body.classList.add("body-scroll");
    } else {
      barra.classList.remove("fijo");
      body.classList.remove("body-scroll");
    }
  });
}

function scrollNav() {
  document.querySelectorAll(".navegacion-principal a").forEach((e) => {
    e.addEventListener("click", function (e) {
      e.preventDefault();
      const t = e.target.attributes.href.value;
      document.querySelector(t).scrollIntoView({ behavior: "smooth" });
    });
  });
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
      <source srcset="build/img/thumb/${i}.avif" type="image/avif" />
          <source srcset="build/img/thumb/${i}.webp" type="image/webp" />
          <img
            loading="lazy"
            width="200"
            height="300"
            src="build/img/thumb/${i}.jpg"
            alt="Imagen galeria."
          />
      `;

    imagen.onclick = function () {
      mustrarImagen(i);
    };
    galeria.appendChild(imagen);
  }
}

function mustrarImagen(id) {
  const imagen = document.createElement("picture");
  imagen.innerHTML = `
      <source srcset="build/img/grande/${id}.avif" type="image/avif" />
          <source srcset="build/img/grande/${id}.webp" type="image/webp" />
          <img
            loading="lazy"
            width="200"
            height="300"
            src="build/img/grande/${id}.jpg"
            alt="Imagen galeria."
          />
      `;
  // Crea el Overlay con la imagen
  const overlay = document.createElement("DIV");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");

  overlay.onclick = function () {
    const body = document.querySelector("body");

    body.classList.remove("fijar-body");
    overlay.remove();
  };

  // Boton para cerrar el modal
  const cerrarModal = document.createElement("P");
  cerrarModal.textContent = "X";
  cerrarModal.classList.add("btn-cerrar");

  cerrarModal.onclick = function () {
    const body = document.querySelector("body");

    body.classList.remove("fijar-body");
    overlay.remove();
  };

  overlay.appendChild(cerrarModal);

  // Añadirlo al HTML con el body
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}
