// Navbar scroll-spy
const links = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function onScroll() {
  const pos = window.scrollY + 80;
  sections.forEach(sec => {
    if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
      links.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      a?.classList.add('active');
    }
  });
}
window.addEventListener('scroll', onScroll);

// IntersectionObserver for animations
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el));

// Smart Download
document.getElementById('smartDownload').onclick = () => {
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const url = isMobile
    ? 'https://your-site.com/downloads/BoxMover.apk'
    : 'https://your-site.com/downloads/BoxMoverSetup.exe';
  const a = document.createElement('a');
  a.href = url; a.download = url.split('/').pop();
  document.body.appendChild(a); a.click(); a.remove();
};

// Dark Mode Toggle
const darkToggle = document.getElementById('darkToggle');
darkToggle.onclick = () => {
  const html = document.documentElement;
  const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', theme);
  darkToggle.textContent = theme === 'light' ? '🌙' : '☀️';
};

// Scroll to section helper
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Contact form (with FormSubmit)
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const responseText = document.getElementById('formResponse');

  fetch("https://formsubmit.co/ajax/z7355108@gmail.com", {
    method: "POST",
    headers: {
      'Accept': 'application/json'
    },
    body: formData
  })
  .then(response => {
    if (response.ok) {
      responseText.textContent = "✅ شكراً لإرسال الشكوى، سيتم الرد عليك في أسرع وقت ممكن.";
      responseText.style.color = "green";
      form.reset();
    } else {
      responseText.textContent = "❌ حدث خطأ أثناء الإرسال. الرجاء المحاولة مرة أخرى.";
      responseText.style.color = "red";
    }
  })
  .catch(error => {
    responseText.textContent = "❌ لم يتم إرسال الرسالة، تأكد من اتصالك بالإنترنت.";
    responseText.style.color = "red";
  });
});
