const spot = document.querySelector('.spot');
const core = document.querySelector('.cursor-core');

addEventListener('pointermove', e => {
  spot.style.left = e.clientX + 'px';
  spot.style.top = e.clientY + 'px';
  if (core) {
    core.style.left = e.clientX + 'px';
    core.style.top = e.clientY + 'px';
  }
});

// Reveal on scroll
const obs = new IntersectionObserver(
  es => es.forEach(e => e.isIntersecting && e.target.classList.add('show')),
  { threshold: .1 }
);

document
  .querySelectorAll('.section,.stats,.exp,.project,.quote,.contact-box')
  .forEach(x => {
    x.classList.add('reveal');
    obs.observe(x);
  });

// Active side nav
const nav = [...document.querySelectorAll('.side nav a')];
const secs = nav.map(a => document.querySelector(a.getAttribute('href')));

const io = new IntersectionObserver(
  es => es.forEach(e => {
    if (e.isIntersecting) nav.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }),
  { rootMargin: '-42% 0px -50% 0px' }
);
secs.forEach(s => s && io.observe(s));

// 3D Tilt for project - فقط لپ‌تاپ
const proj = document.querySelector('.project');
if (proj) {
  proj.addEventListener('pointermove', e => {
    if (innerWidth < 900) return;
    let r = proj.getBoundingClientRect();
    let x = (e.clientX - r.left) / r.width - .5;
    let y = (e.clientY - r.top) / r.height - .5;
    proj.style.transform = `perspective(1400px) rotateX(${y * -1}deg) rotateY(${x * 1.2}deg)`;
  });
  proj.addEventListener('pointerleave', () => (proj.style.transform = ''));
}
