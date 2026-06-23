document.addEventListener('DOMContentLoaded', () => {
  const progress = document.querySelector('.progress-bar');
  const updateProgress = () => {
    if (!progress) return;
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = height > 0 ? `${(scrollTop / height) * 100}%` : '0%';
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.endsWith(current)) link.classList.add('active');
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('.accordion').forEach(button => {
    button.addEventListener('click', () => {
      const panel = button.nextElementSibling;
      if (!panel) return;
      panel.classList.toggle('open');
      button.setAttribute('aria-expanded', panel.classList.contains('open'));
    });
  });
});

function openModal(imageSrc) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImage');
  if (!modal || !modalImg) return;
  modal.style.display = 'block';
  modalImg.src = imageSrc;
}
