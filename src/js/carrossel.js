function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');

  if (!carousel || !next || !prev) return;

  next.addEventListener('click', () => {
    carousel.scrollBy({ left: 300, behavior: 'smooth' });
  });

  prev.addEventListener('click', () => {
    carousel.scrollBy({ left: -300, behavior: 'smooth' });
  });
}

initCarousel();
