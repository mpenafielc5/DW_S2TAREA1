const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

function setMenuState(isOpen) {
    navLinks.classList.toggle('active', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
}

mobileMenuBtn.addEventListener('click', () => {
    setMenuState(!navLinks.classList.contains('active'));
});

// Cierra el menú móvil automáticamente al elegir una sección
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuState(false));
});

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function getTheme() {
    return html.getAttribute('data-theme') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.checked = theme === 'dark';
}

themeToggle.addEventListener('change', (e) => {
    setTheme(e.target.checked ? 'dark' : 'light');
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

themeToggle.checked = getTheme() === 'dark';

const projectsData = {
    superstore: {
        title: "Superstore Dashboard",
        subtitle: "Prueba Técnica de Pasantías / Solución BI",
        description: "Dashboard analítico interactivo diseñado para un negocio ficticio utilizando el dataset de Superstore (Kaggle). Permite evaluar, consultar y visualizar las métricas clave de ventas desde distintas perspectivas estratégicas.",
        details: [
            "Backend desarrollado en Django utilizando SQL crudo (sin ORM) para optimización de consultas.",
            "Interfaz dinámica en HTML y JavaScript integrando Chart.js para reportería gráfica.",
            "Filtros avanzados por rango de fechas, categoría/subcategoría y ubicación (estado/ciudad).",
            "Métricas clave (KPIs), tablas analíticas y diseño completamente adaptado a versión móvil."
        ],
        tech: ["Django", "MySQL", "SQL Crudo", "HTML5", "JavaScript", "Chart.js"],
        repo: "https://github.com/mpenafielc5/web_superstore.git"
    },
    medicai: {
        title: "Medic AI",
        subtitle: "Sistema de Salud Asistido por Inteligencia Artificial",
        description: "Plataforma integral diseñada para apoyar a los profesionales de la salud en la gestión de consultas médicas, predicción epidemiológica de enfermedades y análisis estadístico en tiempo real.",
        details: [
            "Modelo de Machine Learning (Random Forest Classifier) entrenado con Scikit-learn para sugerir diagnósticos según síntomas.",
            "Visualizaciones estadísticas interactivas con D3.js para análisis demográfico por edad, género y estacionalidad.",
            "Backend robusto en Django integrado con AWS S3 (vía boto3) para gestión de archivos multimedia.",
            "Módulos para gestión de Pacientes, Consultas con Preevaluación Asistida y Administración de Roles (Médicos/Admins)."
        ],
        tech: ["Python", "Django", "Scikit-learn", "D3.js", "Tailwind CSS", "AWS S3", "Pandas"],
        repo: "https://gitlab.com/mpenafielc5/medic_ai.git"
    },
    petcare: {
        title: "PetCare 360 - BI & Data Warehousing",
        subtitle: "Arquitectura Completa de Inteligencia de Negocios para Servicios de Grooming",
        description: "Solución analítica integral end-to-end orientada a la toma de decisiones estratégicas, análisis de rentabilidad por línea de negocio y optimización operativa de agendamiento y personal en PetCare 360.",
        details: [
            "Diseño de Data Mart Dimensional en Esquema Estrella sobre SQL Server con restricciones y claves estructuradas.",
            "Automatización de pipelines ETL para extracción, limpieza, transformación y validación de datos transaccionales mediante SSIS (SQL Server Integration Services).",
            "Construcción de Cubo OLAP multidimensional con jerarquías, medidas e indicadores clave de rendimiento (KPIs) en SSAS (SQL Server Analysis Services).",
            "Orquestación y automatización de flujos de carga diaria mediante tareas en SQL Server Agent con notificaciones por correo.",
            "Dashboard interactivo y gerencial en Power BI conectado al Cubo OLAP para análisis de rendimiento por tienda, canal, especie y empleado."
        ],
        tech: ["Power BI", "SQL Server Analysis Services (SSAS)", "SSIS", "SQL Server Agent", "Modelado Olap / Estrella"],
        repo: "https://drive.google.com/file/d/1EkV3BOpuYmF90Y_fSZUMEGePmVuVWzL3/view?usp=sharing"
    }
};

const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const openModalBtns = document.querySelectorAll('.open-modal-btn');

openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-project');
        const data = projectsData[key];

        if (data) {
            modalBody.innerHTML = `
                <h3>${data.title}</h3>
                <p><strong>${data.subtitle}</strong></p>
                <p>${data.description}</p>
                <h4>Detalles Técnicos y Utilidad:</h4>
                <ul>
                    ${data.details.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <h4>Tecnologías:</h4>
                <div class="project-tags" style="margin-bottom: 1.5rem;">
                    ${data.tech.map(t => `<span class="badge">${t}</span>`).join('')}
                </div>
                <a href="${data.repo}" target="_blank" class="btn btn-primary">Ver Repositorio</a>
            `;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
        }
    });
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
}

const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const validators = {
    name: (value) => {
        if (!value.trim()) return 'Por favor ingresa tu nombre.';
        if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres.';
        return '';
    },
    email: (value) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return 'Por favor ingresa tu correo.';
        if (!emailPattern.test(value)) return 'Ingresa un correo electrónico válido.';
        return '';
    },
    message: (value) => {
        if (!value.trim()) return 'Por favor escribe un mensaje.';
        if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
        return '';
    }
};

function validateField(input, errorId, validatorKey) {
    const errorEl = document.getElementById(errorId);
    const errorMsg = validators[validatorKey](input.value);
    input.classList.toggle('invalid', Boolean(errorMsg));
    errorEl.textContent = errorMsg;
    return !errorMsg;
}

nameInput.addEventListener('input', () => validateField(nameInput, 'nameError', 'name'));
emailInput.addEventListener('input', () => validateField(emailInput, 'emailError', 'email'));
messageInput.addEventListener('input', () => validateField(messageInput, 'messageError', 'message'));

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, 'nameError', 'name');
    const isEmailValid = validateField(emailInput, 'emailError', 'email');
    const isMessageValid = validateField(messageInput, 'messageError', 'message');

    if (!isNameValid || !isEmailValid || !isMessageValid) {
        return;
    }

    alert('¡Gracias por tu mensaje! El formulario funciona correctamente.');
    contactForm.reset();
    [nameInput, emailInput, messageInput].forEach(input => input.classList.remove('invalid'));
});