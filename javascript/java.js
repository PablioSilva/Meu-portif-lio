document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.hidden');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show'); // Remove a classe para permitir a repetição
        }
      });
    });
  
    elements.forEach(el => observer.observe(el));
  });
  