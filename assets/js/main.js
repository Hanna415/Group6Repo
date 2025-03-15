/**
* Template Name: Green
* Template URL: https://bootstrapmade.com/green-free-one-page-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();




// function calculateCarbon() {
//   // Get input values
//   let electricity = parseFloat(document.getElementById("electricity").value) || 0;
//   let carMiles = parseFloat(document.getElementById("car-miles").value) || 0;
//   let publicTransport = parseFloat(document.getElementById("public-transport").value) || 0;
//   let gas = parseFloat(document.getElementById("gas").value) || 0;

//   // Carbon footprint conversion factors (example values in kg CO₂)
//   const electricityFactor = 0.5; // kg CO₂ per kWh
//   const carFactor = 0.21; // kg CO₂ per km driven
//   const publicTransportFactor = 0.1; // kg CO₂ per hour
//   const gasFactor = 2.3; // kg CO₂ per cubic meter

//   // Calculate carbon footprint
//   let electricityCO2 = electricity * electricityFactor;
//   let carCO2 = carMiles * carFactor;
//   let publicTransportCO2 = publicTransport * publicTransportFactor;
//   let gasCO2 = gas * gasFactor;

//   let totalCarbon = electricityCO2 + carCO2 + publicTransportCO2 + gasCO2;

//   // Display result
//   document.getElementById("result").innerHTML = 
//   `Your estimated carbon footprint is ${totalCarbon.toFixed(2)} kg CO₂ per month.`;
// }



function calculateCarbon() {
  // Get input values
  let electricity = parseFloat(document.getElementById("electricity").value) || 0;
  let carMiles = parseFloat(document.getElementById("car-miles").value) || 0;
  let publicTransport = parseFloat(document.getElementById("public-transport").value) || 0;
  let gas = parseFloat(document.getElementById("gas").value) || 0;

  // Carbon footprint conversion factors (example values in kg CO₂)
  const electricityFactor = 0.5; // kg CO₂ per kWh
  const carFactor = 0.21; // kg CO₂ per km driven
  const publicTransportFactor = 0.1; // kg CO₂ per hour
  const gasFactor = 2.3; // kg CO₂ per cubic meter

  // Calculate carbon footprint
  let electricityCO2 = electricity * electricityFactor;
  let carCO2 = carMiles * carFactor;
  let publicTransportCO2 = publicTransport * publicTransportFactor;
  let gasCO2 = gas * gasFactor;

  let totalCarbon = electricityCO2 + carCO2 + publicTransportCO2 + gasCO2;

  // Display result
  document.getElementById("result-text").innerHTML = 
      `Your estimated carbon footprint is ${totalCarbon.toFixed(2)} kg CO₂ per month.`;

  // Create Pie Chart
  let ctx = document.getElementById("carbonChart").getContext("2d");
  if (window.carbonChartInstance) {
      window.carbonChartInstance.destroy();
  }
  window.carbonChartInstance = new Chart(ctx, {
      type: "pie",
      data: {
          labels: ["Electricity", "Car", "Public Transport", "Natural Gas"],
          datasets: [{
              data: [electricityCO2, carCO2, publicTransportCO2, gasCO2],
              backgroundColor: ["#2d6a4f", "#ff6b6b", "#4d96ff", "#ffa600"]
          }]
      },
      options: {
          responsive: true
      }
  });
}




