document.addEventListener('DOMContentLoaded', function () {
  // =========================================================
  // MOBILE NAVIGATION (works with CSS: #mobileNavContainer.is-open)
  // =========================================================
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNavContainer');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavClose = document.getElementById('mobileNavClose');

  // IMPORTANT:
  // Do NOT return early here.
  // Even if the mobile-nav elements are missing (or renamed), your
  // certificate/project modals should still work.
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

  // Hamburger open/close (CLICK ONLY — avoids mobile double-trigger issues)
  if (hasMobileNav) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMobileNav();
    });
  }

  // Close button (X)
  if (hasMobileNav && mobileNavClose) {
    mobileNavClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeMobileNav();
    });
  }

  // Clicking inside menu should not close it
  if (hasMobileNav) {
    mobileMenu.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  // Escape key closes menu
  document.addEventListener('keydown', function (e) {
    if (!hasMobileNav) return;
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMobileNav();
    }
  });

  // Close when a menu option is selected (close first, then scroll)
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
  // CERTIFICATE MODAL
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

  // =========================================================
  // WORKSHOP GALLERY MODAL
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

  // =========================================================
  // RESEARCH PROJECT MODALS
  // =========================================================

  // Helper: ensure only one project modal is visible at a time.
  // Expose on window so any inline onclick handlers can safely call it.
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

  // ESC closes any open project modal
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    window.closeAllProjectModals();
  });
});
