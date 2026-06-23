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

const insightPanel = document.getElementById("insightPanel");

function rotateInsightPanelOnScroll() {
  if (!insightPanel) return;

  const section = insightPanel.closest(".scroll-3d-section");
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);

  const rotateY = -22 + progress * 44;
  const rotateX = 12 - progress * 18;
  const translateY = -20 + progress * 40;

  insightPanel.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px)`;
}

window.addEventListener("scroll", rotateInsightPanelOnScroll);
window.addEventListener("load", rotateInsightPanelOnScroll);

/* OpenWidget - Floating Contact Button */

window.__ow = window.__ow || {};
window.__ow.organizationId = "9a765581-2a40-4600-870e-ceacfc2732c6";
window.__ow.integration_name = "manual_settings";
window.__ow.product_name = "openwidget";

(function (n, t, c) {
  function i(n) {
    return e._h ? e._h.apply(null, n) : e._q.push(n);
  }

  var e = {
    _q: [],
    _h: null,
    _v: "2.0",

    on: function () {
      i(["on", c.call(arguments)]);
    },

    once: function () {
      i(["once", c.call(arguments)]);
    },

    off: function () {
      i(["off", c.call(arguments)]);
    },

    get: function () {
      if (!e._h) {
        throw new Error("[OpenWidget] You can't use getters before load.");
      }

      return i(["get", c.call(arguments)]);
    },

    call: function () {
      i(["call", c.call(arguments)]);
    },

    init: function () {
      var n = t.createElement("script");
      n.async = true;
      n.type = "text/javascript";
      n.src = "https://cdn.openwidget.com/openwidget.js";
      t.head.appendChild(n);
    }
  };

  !n.__ow.asyncInit && e.init();
  n.OpenWidget = n.OpenWidget || e;
})(window, document, [].slice);
