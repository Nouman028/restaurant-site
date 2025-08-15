// ==================== Mobile Nav Toggle ====================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu){
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
  });
}

// Allow focus trapping for accessibility (simple)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded','false');
    navToggle.focus();
  }
});

// ==================== Filterable Menu ====================
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? 'block' : 'none';
    });
  });
});

// ==================== Reviews Carousel ====================
const slides = document.querySelectorAll('.slide');
let current = 0;
function showSlide(i){
  slides.forEach(s => s.classList.remove('active'));
  slides[i].classList.add('active');
}
document.getElementById('prevReview').addEventListener('click', ()=>{
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});
document.getElementById('nextReview').addEventListener('click', ()=>{
  current = (current + 1) % slides.length;
  showSlide(current);
});

// ==================== Forms Validation ====================
function setError(id, msg){
  const el = document.querySelector(`.error[data-for="${id}"]`);
  if (el) el.textContent = msg || '';
}
function isEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

const reservationForm = document.getElementById('reservationForm');
if (reservationForm){
  reservationForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let ok = true;
    const name = reservationForm.name.value.trim();
    const email = reservationForm.email.value.trim();
    const date = reservationForm.date.value;
    const time = reservationForm.time.value;
    const guests = reservationForm.guests.value;

    setError('name'); setError('email'); setError('date'); setError('time'); setError('guests');

    if (!name){ ok=false; setError('name','Please enter your name'); }
    if (!isEmail(email)){ ok=false; setError('email','Enter a valid email'); }
    if (!date){ ok=false; setError('date','Pick a date'); }
    if (!time){ ok=false; setError('time','Pick a time'); }
    const g = Number(guests);
    if (!g || g < 1 || g > 20){ ok=false; setError('guests','Guests must be 1–20'); }

    if (ok){
      // Simulate success
      alert('Reservation submitted! Check your email for confirmation.');
      reservationForm.reset();
    }
  });
}

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm){
  newsletterForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value.trim();
    const err = document.querySelector('.error[data-for="newsletterEmail"]');
    err.textContent = isEmail(email) ? 'Subscribed! 🎉' : 'Please enter a valid email';
    if (isEmail(email)) newsletterForm.reset();
  });
}

// ==================== Scroll to Top ====================
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', ()=>{
  if (window.scrollY > 400) scrollBtn.classList.add('show');
  else scrollBtn.classList.remove('show');
});
scrollBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// ==================== Dynamic Year ====================
document.getElementById('year').textContent = new Date().getFullYear();

// ==================== Small Enhancements ====================
// Improve keyboard focus on interactive elements
document.querySelectorAll('a, button, input').forEach(el => {
  el.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && el.tagName === 'A' && el.getAttribute('href')?.startsWith('#')){
      const id = el.getAttribute('href').slice(1);
      document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
    }
  });
});
