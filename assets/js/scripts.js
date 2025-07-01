/**
 * Configuración de rutas base
 */
const getBasePath = () => {
  if (window.location.hostname === "localhost") {
    return "";
  }
  // Si tu app está en un subdirectorio en producción, cámbialo
  return ""; // ejemplo: return "/sistema-doctorado";
};

const BASE_PATH = getBasePath();

/**
 * Cierre de sesión
 */
const setupLogout = () => {
  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("userName");
      window.location.href = `${BASE_PATH}/pages/login.html`;
    });
  }
};

/**
 * Mostrar nombre de usuario
 */
const updateUserName = () => {
  const userNameElement = document.getElementById("user-name");
  if (userNameElement) {
    const userName = localStorage.getItem("userName") || "Usuario";
    userNameElement.textContent = userName;
  }
};

/**
 * Estado activo de navegación
 */
const setupNavigation = () => {
  const navItems = document.querySelectorAll(".nav-menu li");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      document.querySelector(".nav-menu li.active")?.classList.remove("active");
      this.classList.add("active");
    });
  });
};

/**
 * Nombres de archivos subidos
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
 * Validaciones básicas
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

  document
    .querySelectorAll("#admissionForm, #registroForm, #loginForm, #resetPasswordForm")
    .forEach((form) => {
      validateForm(form);
    });
};

/**
 * Al cargar DOM
 */
document.addEventListener("DOMContentLoaded", function () {
  updateUserName();
  setupLogout();
  setupNavigation();
  setupFileUploads();
  validateForms();

  const successModal = document.getElementById("successModal");
  if (successModal) {
    window.closeModal = function () {
      successModal.style.display = "none";
      window.location.href = `${BASE_PATH}/pages/login.html`;
    };
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const usuario = document.getElementById("usuario").value.trim();
      const contrasena = document.getElementById("contrasena").value.trim();

      if (usuario && contrasena) {
        localStorage.setItem("userName", usuario);
        window.location.href = `${BASE_PATH}/pages/inicio.html`; // ← cambiado aquí
      } else {
        const errorMessage = document.getElementById("errorMessage");
        if (errorMessage) {
          errorMessage.style.display = "block";
        }
      }
    });
  }
});
