(() => {
  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById("leadForm");
  const msg = document.getElementById("formMsg");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      if (msg) {
        msg.className = "small text-warning";
        msg.textContent = "Revisa los campos marcados para poder enviarlo.";
      }
      return;
    }

    // Recoger datos (para integrar con API/CRM)
    const payload = {
      name: document.getElementById("name")?.value?.trim() || "",
      email: document.getElementById("email")?.value?.trim() || "",
      phone: document.getElementById("phone")?.value?.trim() || "",
      interest: document.getElementById("interest")?.value || "",
      note: document.getElementById("note")?.value?.trim() || "",
      consent: document.getElementById("consent")?.checked || false,
      createdAt: new Date().toISOString()
    };

    // DEMO: aquí llamarías a tu backend
    // fetch("/api/leads", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) })

    // Feedback UI
    form.reset();
    form.classList.remove("was-validated");
    if (msg) {
      msg.className = "small text-success";
      msg.textContent = "¡Listo! Te hemos apuntado. En breve recibirás novedades del lanzamiento.";
    }

    // Por si quieres ver los datos en consola mientras pruebas:
    console.log("Lead capturado (demo):", payload);
  });
})();

