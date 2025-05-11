/**
 * Configuración de rutas base
 * Esto maneja correctamente tanto desarrollo local como producción
 */
const getBasePath = () => {
  if (window.location.hostname === "localhost") {
    return "";
  }
  // Si estás en un subdirectorio en producción, ej: tu-dominio.com/sistema-doctorado/
  return ""; // Cambia esto por '/sistema-doctorado' si es necesario
};

const BASE_PATH = getBasePath();

/**
 * Maneja el cierre de sesión con rutas correctas
 */
const setupLogout = () => {
  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("userName");
      // Usamos ruta absoluta desde la raíz del sitio
      window.location.href = `${BASE_PATH}/pages/login.html`;
    });
  }
};

/**
 * Actualiza el nombre de usuario en la interfaz
 */
const updateUserName = () => {
  const userNameElement = document.getElementById("user-name");
  if (userNameElement) {
    const userName = localStorage.getItem("userName") || "Usuario";
    userNameElement.textContent = userName;
  }
};

/**
 * Maneja la navegación y active states
 */
const setupNavigation = () => {
  const navItems = document.querySelectorAll(".nav-menu li");
  if (navItems.length > 0) {
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        document
          .querySelector(".nav-menu li.active")
          ?.classList.remove("active");
        this.classList.add("active");
      });
    });
  }
};

/**
 * Maneja la visualización de nombres de archivos subidos
 */
const setupFileUploads = () => {
  document.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener("change", function () {
      const fileName = this.files[0]
        ? this.files[0].name
        : "Ningún archivo seleccionado";
      if (this.nextElementSibling) {
        this.nextElementSibling.textContent = fileName;
      }
    });
  });
};

/**
 * Valida formularios
 */
const validateForms = () => {
  const validateForm = (form) => {
    form.addEventListener("submit", function (e) {
      let isValid = true;

      form.querySelectorAll("[required]").forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = "red";
        } else {
          field.style.borderColor = "#ddd";
        }
      });

      // Validar contraseñas coincidentes
      const password = form.querySelector("#contrasena, #nueva-contrasena");
      const confirmPassword = form.querySelector("#repetir-contrasena");

      if (
        password &&
        confirmPassword &&
        password.value !== confirmPassword.value
      ) {
        isValid = false;
        alert("Las contraseñas no coinciden");
      }

      if (!isValid) {
        e.preventDefault();
        alert("Por favor complete todos los campos requeridos correctamente.");
      }
    });
  };

  // Aplicar a todos los formularios con validación
  document
    .querySelectorAll(
      "#admissionForm, #registroForm, #loginForm, #resetPasswordForm"
    )
    .forEach((form) => {
      validateForm(form);
    });
};

/**
 * Inicialización cuando el DOM está cargado
 */
document.addEventListener("DOMContentLoaded", function () {
  updateUserName();
  setupLogout();
  setupNavigation();
  setupFileUploads();
  validateForms();

  // Manejar el modal de éxito en registro
  const successModal = document.getElementById("successModal");
  if (successModal) {
    window.closeModal = function () {
      successModal.style.display = "none";
      window.location.href = `${BASE_PATH}/pages/login.html`;
    };
  }

  // Manejar el login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const usuario = document.getElementById("usuario").value;
      const contrasena = document.getElementById("contrasena").value;

      // Validación simple (en producción usar autenticación real)
      if (usuario && contrasena) {
        localStorage.setItem("userName", usuario);
        window.location.href = `${BASE_PATH}/admision.html`;
      } else {
        const errorMessage = document.getElementById("errorMessage");
        if (errorMessage) {
          errorMessage.style.display = "block";
        }
      }
    });
  }
});
