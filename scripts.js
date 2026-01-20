document.addEventListener('DOMContentLoaded', function () {
  // =========================================================
  // MOBILE NAVIGATION (works with CSS: #mobileNavContainer.is-open)
  // =========================================================
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNavContainer');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavClose = document.getElementById('mobileNavClose');

  const hasMobileNav = !!(navToggle && mobileNav && mobileMenu);

  let scrollY = 0;

  function lockScroll() {
    scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '';
    document.body.style.width = '100%';
  }

  function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
  }

  function openMobileNav() {
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    lockScroll();
  }

  function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    unlockScroll();
  }

  function toggleMobileNav() {
    if (mobileNav.classList.contains('is-open')) closeMobileNav();
    else openMobileNav();
  }

  if (hasMobileNav) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMobileNav();
    });
  }

  if (hasMobileNav && mobileNavClose) {
    mobileNavClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeMobileNav();
    });
  }

  if (hasMobileNav) {
    mobileMenu.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!hasMobileNav) return;
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMobileNav();
    }
  });

  if (hasMobileNav) {
    mobileNav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const targetEl = targetId ? document.querySelector(targetId) : null;

        closeMobileNav();

        requestAnimationFrame(() => {
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else if (targetId) {
            window.location.hash = targetId;
          }
        });
      });
    });
  }

  // =========================================================
  // NAVBAR SCROLL EFFECT & ACTIVE LINK TRACKING
  // =========================================================
  
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  // Add scroll shadow effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 20) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Active link highlighting based on scroll position
  function highlightActiveSection() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightActiveSection);
  highlightActiveSection(); // Run on load

  // =========================================================
  // CERTIFICATE MODAL - WITH CLICK OUTSIDE TO CLOSE
  // =========================================================
  window.openModal = function (title, date, image, description = '') {
    const modal = document.getElementById('modal');
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDate').innerText = date;
    document.getElementById('modalImage').src = image;
    document.getElementById('modalDescription').innerText =
      description || 'Certificate preview only.';
    modal.classList.remove('hidden');
    modal.classList.add('show');
  };

  window.closeModal = function () {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    modal.classList.remove('show');
  };

  // Add click outside handler for certificate modal
  const certificateModal = document.getElementById('modal');
  if (certificateModal) {
    certificateModal.addEventListener('click', function(e) {
      if (e.target === certificateModal) {
        window.closeModal();
      }
    });
  }

  // =========================================================
  // WORKSHOP GALLERY MODAL - WITH CLICK OUTSIDE TO CLOSE
  // =========================================================
  window.openWorkshopGallery = function (title, description, images) {
    const modal = document.getElementById('workshopGalleryModal');
    const modalTitle = document.getElementById('workshopGalleryTitle');
    const modalDesc = document.getElementById('workshopGalleryDesc');
    const galleryImages = document.getElementById('workshopGalleryImages');

    modalTitle.textContent = title;
    modalDesc.textContent = description;
    galleryImages.innerHTML = '';

    if (images && images.length > 0) {
      images.forEach((image) => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = 'Workshop image';
        img.classList.add('w-full', 'h-auto', 'rounded-lg', 'shadow-md');
        galleryImages.appendChild(img);
      });
    } else {
      const msg = document.createElement('p');
      msg.textContent = 'No images available.';
      msg.classList.add('text-gray-500', 'text-sm');
      galleryImages.appendChild(msg);
    }

    modal.classList.remove('hidden');
    modal.classList.add('show');
  };

  window.closeWorkshopGallery = function () {
    const modal = document.getElementById('workshopGalleryModal');
    const modalTitle = document.getElementById('workshopGalleryTitle');
    const modalDesc = document.getElementById('workshopGalleryDesc');
    const galleryImages = document.getElementById('workshopGalleryImages');

    modal.classList.add('hidden');
    modal.classList.remove('show');
    modalTitle.innerText = '';
    modalDesc.innerText = '';
    galleryImages.innerHTML = '';
  };

  // Add click outside handler for workshop modal
  const workshopModal = document.getElementById('workshopGalleryModal');
  if (workshopModal) {
    workshopModal.addEventListener('click', function(e) {
      if (e.target === workshopModal) {
        window.closeWorkshopGallery();
      }
    });
  }

  // =========================================================
  // RESEARCH PROJECT MODALS - WITH CLICK OUTSIDE TO CLOSE
  // =========================================================

  window.closeAllProjectModals = function () {
    ['projectModal', 'biProjectModal', 'cyberProjectModal', 'dbProjectModal'].forEach((id) => {
      const modal = document.getElementById(id);
      if (!modal) return;

      modal.classList.remove('flex');
      modal.classList.remove('show');
      modal.classList.add('hidden');
    });
  };

  // SIUE Nexus
  window.openProjectModal = function () {
    window.closeAllProjectModals();
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  window.closeProjectModal = function () {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  };

  // BI Project (CMIS 566)
  window.openBIProjectModal = function () {
    window.closeAllProjectModals();
    const modal = document.getElementById('biProjectModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  window.closeBIProjectModal = function () {
    const modal = document.getElementById('biProjectModal');
    if (!modal) return;
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  };

  // Cybersecurity Project (CMIS 422)
  window.openCyberProjectModal = function () {
    window.closeAllProjectModals();
    const modal = document.getElementById('cyberProjectModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  window.closeCyberProjectModal = function () {
    const modal = document.getElementById('cyberProjectModal');
    if (!modal) return;
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  };

  // DB Project (CMIS 564)
  window.openDBProjectModal = function () {
    window.closeAllProjectModals();
    const modal = document.getElementById('dbProjectModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  window.closeDBProjectModal = function () {
    const modal = document.getElementById('dbProjectModal');
    if (!modal) return;
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  };

  // Add click outside handlers for all project modals
  const projectModals = [
    { id: 'projectModal', closeFunc: window.closeProjectModal },
    { id: 'biProjectModal', closeFunc: window.closeBIProjectModal },
    { id: 'cyberProjectModal', closeFunc: window.closeCyberProjectModal },
    { id: 'dbProjectModal', closeFunc: window.closeDBProjectModal }
  ];

  projectModals.forEach(({ id, closeFunc }) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeFunc();
        }
      });
    }
  });

  // ESC closes any open project modal
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    window.closeAllProjectModals();
    
    // Also close other modals on ESC
    if (certificateModal && !certificateModal.classList.contains('hidden')) {
      window.closeModal();
    }
    if (workshopModal && !workshopModal.classList.contains('hidden')) {
      window.closeWorkshopGallery();
    }
  });

  // =========================================================
  // LIFE & INTERESTS MODAL - WITH CLICK OUTSIDE TO CLOSE
  // =========================================================
  window.openLifeModal = function(title, image, description) {
    const modal = document.getElementById('lifeModal');
    document.getElementById('lifeModalTitle').innerText = title;
    document.getElementById('lifeModalImage').src = image;
    document.getElementById('lifeModalDescription').innerText = description;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  window.closeLifeModal = function() {
    const modal = document.getElementById('lifeModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.getElementById('lifeModalTitle').innerText = '';
    document.getElementById('lifeModalImage').src = '';
    document.getElementById('lifeModalDescription').innerText = '';
  };

  // Close modal on outside click
  const lifeModal = document.getElementById('lifeModal');
  if (lifeModal) {
    lifeModal.addEventListener('click', function() {
      window.closeLifeModal();
    });
  }
});
