// Scroll-spy for Navbar links
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

// Hamburger menu toggle (mobile)
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('show');
});

// Smart Download button
document.getElementById('smartDownload').addEventListener('click', () => {
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const url = isMobile
    ? 'https://www.mediafire.com/file/6vz4p8yyvx28q2j/BoxMover1.0.0.6mob.apk/file'
    : 'https://www.mediafire.com/file/7s9pwtbr7lzze6o/BoxMover1.0.0.6pc.exe/file';
  const a = document.createElement('a');
  a.href = url; a.download = url.split('/').pop();
  document.body.appendChild(a); a.click(); a.remove();
});

// Dark Mode Toggle
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', theme);
  darkToggle.textContent = theme === 'light' ? '🌙' : '☀️';
});

// Scroll helper
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// AJAX Contact Form via FormSubmit
const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    fetch("https://formsubmit.co/ajax/z7355108@gmail.com", {
      method: "POST",
      headers: { 'Accept': 'application/json' },
      body: formData
    })
    .then(response => {
      if (response.ok) {
        formResponse.textContent = "✅ شكراً لإرسال الشكوى، سيتم الرد عليك في أسرع وقت ممكن.";
        formResponse.style.color = "green";
        contactForm.reset();
      } else {
        formResponse.textContent = "❌ حدث خطأ أثناء الإرسال. الرجاء المحاولة مرة أخرى.";
        formResponse.style.color = "red";
      }
    })
    .catch(() => {
      formResponse.textContent = "❌ لم يتم إرسال الرسالة، تأكد من اتصالك بالإنترنت.";
      formResponse.style.color = "red";
    });
  });
}
