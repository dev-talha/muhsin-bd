/* AL-MUHSIN BD PLC - Shared frontend behavior */
(function ($) {
  'use strict';

  const App = {
    async init() {
      await this.loadComponents();
      this.initHeader();
      this.setCurrentYear();
      this.markActiveNav();
      await Promise.all([
        this.renderCompanies(),
        this.renderNews(),
        this.renderGallery()
      ]);
      this.initContactForm();
      this.initAOS();
    },

    async loadComponents() {
      const tasks = [];
      const header = document.querySelector('[data-component="header"]');
      const footer = document.querySelector('[data-component="footer"]');

      if (header) tasks.push(this.fetchInto('components/header.html', header));
      if (footer) tasks.push(this.fetchInto('components/footer.html', footer));
      await Promise.all(tasks);
    },

    async fetchInto(url, target) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Could not load ${url}`);
        target.innerHTML = await response.text();
      } catch (error) {
        console.error(error);
        target.innerHTML = '<div class="container py-3"><small class="text-danger">Shared component could not be loaded. Preview through a local web server or GitHub Pages.</small></div>';
      }
    },

    initHeader() {
      const header = document.getElementById('siteHeader');
      if (!header) return;
      const toggleState = () => header.classList.toggle('scrolled', window.scrollY > 12);
      toggleState();
      window.addEventListener('scroll', toggleState, { passive: true });
    },

    setCurrentYear() {
      const year = document.getElementById('currentYear');
      if (year) year.textContent = new Date().getFullYear();
    },

    markActiveNav() {
      const current = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('[data-page]').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-page') === current);
      });
      const businessPages = ['sister-concerns.html','muhsin-mart.html','muhsin-real-estate.html','muhsin-foundation.html'];
      if (businessPages.includes(current)) {
        const menu = document.getElementById('businessMenu');
        if (menu) menu.classList.add('active');
      }
    },

    async getJSON(url) {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return response.json();
    },

    async renderCompanies() {
      const targets = document.querySelectorAll('[data-companies-list]');
      if (!targets.length) return;
      try {
        const companies = await this.getJSON('data/companies.json');
        targets.forEach(target => {
          const limit = Number(target.dataset.limit || companies.length);
          target.innerHTML = companies.slice(0, limit).map((company, index) => `
            <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${index * 80}">
              <article class="corp-card">
                <div class="corp-card-img">
                  <img src="${company.image}" alt="${company.name} placeholder visual" loading="lazy">
                </div>
                <div class="corp-card-body">
                  <div class="company-logo-float"><img src="${company.logo}" alt="${company.name} logo" loading="lazy"></div>
                  <span class="news-meta">${company.type}</span>
                  <h3>${company.name}</h3>
                  <p>${company.short}</p>
                  <a class="card-link" href="${company.slug}" aria-label="Learn more about ${company.name}">Learn More <span aria-hidden="true">→</span></a>
                </div>
              </article>
            </div>`).join('');
        });
      } catch (error) { console.error(error); }
    },

    async renderNews() {
      const targets = document.querySelectorAll('[data-news-list]');
      if (!targets.length) return;
      try {
        const news = await this.getJSON('data/news.json');
        targets.forEach(target => {
          const limit = Number(target.dataset.limit || news.length);
          target.innerHTML = news.slice(0, limit).map((item, index) => `
            <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${index * 70}">
              <article class="news-card">
                <img src="${item.image}" alt="${item.title} placeholder image" loading="lazy">
                <div class="news-body">
                  <div class="news-meta">${item.category} • ${this.formatDate(item.date)}</div>
                  <h3>${item.title}</h3>
                  <p>${item.summary}</p>
                </div>
              </article>
            </div>`).join('');
        });
      } catch (error) { console.error(error); }
    },

    async renderGallery() {
      const targets = document.querySelectorAll('[data-gallery-list]');
      if (!targets.length) return;
      try {
        const gallery = await this.getJSON('data/gallery.json');
        targets.forEach(target => {
          const limit = Number(target.dataset.limit || gallery.length);
          target.innerHTML = gallery.slice(0, limit).map((item, index) => `
            <div class="col-12 col-sm-6 col-lg-4" data-aos="zoom-in" data-aos-delay="${index * 55}">
              <figure class="gallery-card mb-0">
                <img src="${item.image}" alt="${item.title} placeholder image" loading="lazy">
                <figcaption class="gallery-caption"><small class="d-block fw-normal opacity-75">${item.category}</small>${item.title}</figcaption>
              </figure>
            </div>`).join('');
        });
      } catch (error) { console.error(error); }
    },

    formatDate(value) {
      return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));
    },

    initContactForm() {
      const form = document.getElementById('contactForm');
      if (!form) return;
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.checkValidity()) {
          event.stopPropagation();
          form.classList.add('was-validated');
          return;
        }
        const data = new FormData(form);
        const subject = encodeURIComponent(`Website enquiry: ${data.get('subject') || 'General'}`);
        const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\n\nMessage:\n${data.get('message')}`);
        window.location.href = `mailto:almuhsinbd@gmail.com?subject=${subject}&body=${body}`;
      });
    },

    initAOS() {
      if (window.AOS) AOS.init({ duration: 700, once: true, offset: 50, easing: 'ease-out-cubic' });
    }
  };

  $(document).ready(() => App.init());
})(jQuery);
