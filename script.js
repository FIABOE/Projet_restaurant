// ===== MENU DATA =====
const menuData = {
  entrees: [
    { name: "Carpaccio de Saint-Jacques", price: "24€", desc: "Huile de truffe blanche, citron caviar, herbes fraîches du jardin", tag: "Signature" },
    { name: "Velouté de courge musquée", price: "16€", desc: "Crème fouettée au gingembre, graines de courge torréfiées", tag: "Végétarien" },
    { name: "Foie gras poêlé maison", price: "28€", desc: "Chutney de figues, brioche toastée, réduction de Sauternes", tag: "" },
    { name: "Tartare de bœuf Charolais", price: "22€", desc: "Câpres, échalotes confites, œuf de ferme, frites fines", tag: "" },
  ],
  plats: [
    { name: "Filet de sole meunière", price: "38€", desc: "Beurre noisette aux câpres, pommes vapeur, citron confit", tag: "Poisson du jour" },
    { name: "Magret de canard rôti", price: "34€", desc: "Jus au poivre long, purée de panais, cerise griotte", tag: "" },
    { name: "Côte de veau de lait", price: "42€", desc: "Jus corsé, gnocchi à la ricotta, champignons sauvages", tag: "Signature" },
    { name: "Risotto aux truffes noires", price: "48€", desc: "Truffe du Périgord, parmesan 24 mois, huile d'olive de Nyons", tag: "Végétarien" },
  ],
  desserts: [
    { name: "Soufflé au Grand Marnier", price: "16€", desc: "Glace vanille Bourbon, tuile dentelle au sésame", tag: "Signature" },
    { name: "Tarte au citron meringuée", price: "14€", desc: "Citrons de Menton, meringue italienne, zestes confits", tag: "" },
    { name: "Fondant chocolat Valrhona", price: "15€", desc: "Cœur coulant, crème anglaise, éclats de fève de cacao", tag: "" },
    { name: "Assiette de fromages affinés", price: "18€", desc: "Sélection de 5 fromages, pain aux noix maison, confiture", tag: "" },
  ],
  vins: [
    { name: "Chablis Premier Cru 2021", price: "68€", desc: "Domaine William Fèvre · Blanc sec, minéral et élégant", tag: "Blanc" },
    { name: "Pomerol Château Gazin 2019", price: "145€", desc: "Bordeaux · Rouge puissant, notes de fruits noirs et épices", tag: "Rouge" },
    { name: "Champagne Ruinart Blanc de Blancs", price: "120€", desc: "Chardonnay · Bulles fines, fraîcheur et délicatesse", tag: "Champagne" },
    { name: "Sancerre Rouge 2022", price: "72€", desc: "Henri Bourgeois · Pinot noir, légèreté et finesse", tag: "Rouge" },
  ]
};

function switchTab(category) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  renderMenu(category);
}

function renderMenu(category) {
  const grid = document.getElementById('menuContent');
  const items = menuData[category];
  grid.innerHTML = items.map(item => `
    <div class="menu-item reveal">
      <div class="menu-item-top">
        <span class="menu-item-name">${item.name}</span>
        <span class="menu-item-price">${item.price}</span>
      </div>
      <p class="menu-item-desc">${item.desc}</p>
      ${item.tag ? `<span class="menu-item-tag">${item.tag}</span>` : ''}
    </div>
  `).join('');
  // Trigger reveal
  setTimeout(() => {
    grid.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
  }, 10);
}

// Init menu
renderMenu('entrees');

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE MENU =====
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-header, .temo-card, .stack-item, .value-item, .gal-item, .about-img-wrap, .about-text, .resa-info, .resa-form, .dist-item').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ===== RESERVATION FORM =====
function handleResa(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Envoi en cours...';
  btn.style.opacity = '0.7';

  setTimeout(() => {
    e.target.reset();
    btn.textContent = 'Confirmer la réservation';
    btn.style.opacity = '1';
    const msg = document.getElementById('resaSuccess');
    msg.classList.add('show');
    setTimeout(() => msg.classList.remove('show'), 6000);
  }, 1400);
}

// ===== SET MIN DATE on date input =====
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}
