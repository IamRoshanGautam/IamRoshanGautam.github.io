document.addEventListener('DOMContentLoaded', function () {
  // Always go to homepage when clicking the Rosh logo
  const logoLink = document.querySelector('.nav-logo');
  if (logoLink) {
  logoLink.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if we're already on the homepage
    const currentPage = window.location.pathname;
    const isIndexPage = currentPage.endsWith('index.html') || 
                       currentPage.endsWith('/') || 
                       currentPage === '';
    
    if (isIndexPage) {
      // If already on homepage, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      
      // Also clear any hash from URL
      if (window.location.hash) {
        history.replaceState(null, null, ' ');
      }
    } else {
      // If not on homepage, navigate to index.html
      window.location.href = 'index.html';
    }
  });
}

  // =========================================================
  // NAVIGATION HANDLING - NO SMOOTH SCROLLING
  // =========================================================

  // Disable smooth scrolling for all anchor links in desktop nav
  const desktopNavLinks = document.querySelectorAll('#desktopNavLinks a[href^="#"]');
  desktopNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // INSTANT SCROLL - NO ANIMATION
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for navbar height
          behavior: 'instant' // NO smooth scrolling
        });
      }
    });
  });

  // =========================================================
  // STATE MANAGEMENT
  // =========================================================
  let currentModal = null;
  let scrollPosition = 0;
  
  // Save scroll position on refresh
  if (sessionStorage.getItem('scrollPosition')) {
    setTimeout(() => {
      window.scrollTo({
        top: parseInt(sessionStorage.getItem('scrollPosition')),
        behavior: 'instant' // Also make refresh instant
      });
    }, 100);
  }
  
  // Save current scroll position
  window.addEventListener('scroll', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  });

  // =========================================================
  // MOBILE NAVIGATION
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
    document.documentElement.scrollTop = scrollY;
    document.body.scrollTop = scrollY;
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

  // Disable smooth scrolling for mobile nav links
  if (hasMobileNav) {
    mobileNav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const targetEl = targetId ? document.querySelector(targetId) : null;

        closeMobileNav();

        setTimeout(() => {
          if (targetEl) {
            // INSTANT SCROLL - NO ANIMATION
            window.scrollTo({
              top: targetEl.offsetTop - 80,
              behavior: 'instant' // NO smooth scrolling
            });
          } else if (targetId) {
            window.location.hash = targetId;
          }
        }, 50); // Small delay for mobile nav to close
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
  // BACK TO TOP BUTTON FUNCTIONALITY - NO SMOOTH SCROLLING
  // =========================================================
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    backToTopBtn.onclick = function() {
      // INSTANT SCROLL - NO ANIMATION
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    };
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    // Initial check
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    }
  }

  // =========================================================
  // MODAL MANAGEMENT WITH SCROLL LOCK
  // =========================================================
  function lockBodyScroll() {
    // Just prevent scrolling without moving the page
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'relative';
    document.body.style.height = '100vh';
  }

  function unlockBodyScroll() {
    // Just re-enable scrolling
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.height = '';
    
    // NO SCROLLING NEEDED - we never moved!
  }
  
  function closeAllModals() {
    const modals = [
      'modal',
      'workshopGalleryModal',
      'lifeGalleryModal',
      'projectModal',
      'biProjectModal',
      'cyberProjectModal',
      'dbProjectModal'
    ];
    
    modals.forEach(modalId => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show', 'flex');
      }
    });
    
    unlockBodyScroll();
    currentModal = null;
  }
  
  // =========================================================
  // CERTIFICATE MODAL
  // =========================================================
  window.openModal = function (title, date, image, description = '') {
    closeAllModals();
    const modal = document.getElementById('modal');
    
    // Reset modal content to top
    modal.scrollTop = 0;
    
    // Update modal content
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDate').innerText = date;
    document.getElementById('modalImage').src = image;
    document.getElementById('modalDescription').innerText =
      description || 'Certificate preview only.';
    
    // Show modal and prevent body scroll
    modal.style.display = 'flex';
    modal.classList.add('show');
    lockBodyScroll();
    currentModal = 'modal';
    
    // Add click outside to close
    setTimeout(() => {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    }, 100);
  };

  window.closeModal = function () {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    modal.classList.remove('show');
    unlockBodyScroll();
    currentModal = null;
  };

  // =========================================================
  // WORKSHOP GALLERY MODAL
  // =========================================================
  window.openWorkshopGallery = function (title, description, images) {
    closeAllModals();
    const modal = document.getElementById('workshopGalleryModal');
    const modalTitle = document.getElementById('workshopGalleryTitle');
    const modalDesc = document.getElementById('workshopGalleryDesc');
    const galleryImages = document.getElementById('workshopGalleryImages');

    // Reset to top
    modal.scrollTop = 0;
    galleryImages.scrollTop = 0;

    modalTitle.textContent = title;
    modalDesc.textContent = description;
    galleryImages.innerHTML = '';

    if (images && images.length > 0) {
      images.forEach((image) => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = 'Workshop image';
        img.classList.add('w-full', 'h-auto', 'rounded-lg', 'shadow-md', 'mb-4');
        galleryImages.appendChild(img);
      });
    } else {
      const msg = document.createElement('p');
      msg.textContent = 'No images available.';
      msg.classList.add('text-gray-500', 'text-sm');
      galleryImages.appendChild(msg);
    }

    modal.style.display = 'flex';
    modal.classList.add('show');
    lockBodyScroll();
    currentModal = 'workshopGalleryModal';
    
    // THE FIX: Scroll everything to top after showing
    setTimeout(() => {
      // Scroll the modal container to top
      modal.scrollTop = 0;
      // Scroll the content area to top
      galleryImages.scrollTop = 0;
    }, 10);
    
    // Add click outside to close
    setTimeout(() => {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeWorkshopGallery();
        }
      });
    }, 100);
  };

  window.closeWorkshopGallery = function () {
    const modal = document.getElementById('workshopGalleryModal');
    modal.style.display = 'none';
    modal.classList.remove('show');
    unlockBodyScroll();
    currentModal = null;
  };

  // =========================================================
  // RESEARCH PROJECT MODALS
  // =========================================================

  window.closeAllProjectModals = function () {
    ['projectModal', 'biProjectModal', 'cyberProjectModal', 'dbProjectModal'].forEach((id) => {
      const modal = document.getElementById(id);
      if (!modal) return;

      modal.style.display = 'none';
      modal.classList.remove('flex');
    });
  };

  // Helper function to open project modals with improved visibility
  function openProjectModalFunction(modalId) {
    closeAllModals();
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Reset to top
    const contentContainer = modal.querySelector('div:last-child');
    if (contentContainer) {
      contentContainer.scrollTop = 0;
    }
    
    modal.style.display = 'flex';
    modal.classList.add('flex');
    lockBodyScroll();
    currentModal = modalId;
    
    // Ensure header is visible by scrolling modal to top
    setTimeout(() => {
      modal.scrollTop = 0;
    }, 10);
    
    // Add click outside to close
    setTimeout(() => {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          eval(`close${modalId.charAt(0).toUpperCase() + modalId.slice(1)}()`);
        }
      });
    }, 100);
  }

  // SIUE Nexus
  window.openProjectModal = function () {
    openProjectModalFunction('projectModal');
  };

  window.closeProjectModal = function () {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.classList.remove('flex');
    unlockBodyScroll();
    currentModal = null;
  };

  // BI Project (CMIS 566)
  window.openBIProjectModal = function () {
    openProjectModalFunction('biProjectModal');
  };

  window.closeBIProjectModal = function () {
    const modal = document.getElementById('biProjectModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.classList.remove('flex');
    unlockBodyScroll();
    currentModal = null;
  };

  // Cybersecurity Project (CMIS 422)
  window.openCyberProjectModal = function () {
    openProjectModalFunction('cyberProjectModal');
  };

  window.closeCyberProjectModal = function () {
    const modal = document.getElementById('cyberProjectModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.classList.remove('flex');
    unlockBodyScroll();
    currentModal = null;
  };

  // DB Project (CMIS 564)
  window.openDBProjectModal = function () {
    openProjectModalFunction('dbProjectModal');
  };

  window.closeDBProjectModal = function () {
    const modal = document.getElementById('dbProjectModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.classList.remove('flex');
    unlockBodyScroll();
    currentModal = null;
  };

  // =========================================================
  // ESC KEY TO CLOSE MODALS
  // =========================================================
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    
    if (currentModal) {
      switch(currentModal) {
        case 'modal':
          closeModal();
          break;
        case 'workshopGalleryModal':
          closeWorkshopGallery();
          break;
        case 'lifeGalleryModal':
          closeLifeGallery();
          break;
        case 'projectModal':
          closeProjectModal();
          break;
        case 'biProjectModal':
          closeBIProjectModal();
          break;
        case 'cyberProjectModal':
          closeCyberProjectModal();
          break;
        case 'dbProjectModal':
          closeDBProjectModal();
          break;
      }
    }
    
    // Also close mobile nav
    if (hasMobileNav && mobileNav.classList.contains('is-open')) {
      closeMobileNav();
    }
  });

  // =========================================================
  // LIFE GALLERY MODALS - UPDATED WITH NATURAL DESCRIPTIONS
  // =========================================================
  
  window.openPersonalGallery = function() {
    const photos = [
      {
        src: 'images/personal_section/Rosh_Alton_2024_1.jpg',
        title: 'Exploring Alton',
        description: 'Walking through downtown Alton and checking out the historic buildings and riverfront.'
      },
      {
        src: 'images/personal_section/Rosh_Alton_2024_2.jpg',
        title: 'Downtown Alton',
        description: 'Spending an afternoon in Alton, getting to know the local shops and meeting people from the area.'
      },
      {
        src: 'images/personal_section/Rosh_Cougar_Lake_2024.jpg',
        title: 'Cougar Lake',
        description: 'A peaceful evening at Cougar Lake, one of my favorite spots near campus for clearing my head.'
      },
      {
        src: 'images/personal_section/Roshan_HorshoeLake_Aug2024.jpg',
        title: 'Horseshoe Lake Summer',
        description: 'Summer gathering at Horseshoe Lake with friends in August 2024. Great way to unwind after a busy semester.'
      },
      {
        src: 'images/personal_section/Rosh_in_snow_1.jpg',
        title: 'First Illinois Winter',
        description: 'My first real winter in Illinois - definitely took some getting used to compared to back home.'
      },
      {
        src: 'images/personal_section/Rosh_in_snow_2.jpg',
        title: 'Snow Day',
        description: 'Another snowy day. Still adjusting to this weather but learning to appreciate the change of seasons.'
      },
      {
        src: 'images/personal_section/Rosh_Edwardsville_Sep2024.JPG',
        title: 'Edwardsville Event',
        description: 'At a local event in Edwardsville, September 2024. Always good to connect with the community outside of campus.'
      }
    ];
    setTimeout(() => {
      const modal = document.getElementById('lifeGalleryModal');
      if (modal) modal.scrollTop = 0;
    }, 20);
    openLifeGallery('Personal Moments', photos);
  };
  
  window.openAcademicGallery = function() {
    const photos = [
      {
        src: 'images/personal_section/Rosh_Speaking.jpg',
        title: 'Presenting Research',
        description: 'Sharing some of my project work. Public speaking used to make me nervous, but I\'ve gotten more comfortable with it.'
      },
      {
        src: 'images/personal_section/Rosh_SIUE_One.jpg',
        title: 'Campus Life',
        description: 'Posing with SIUE Mascot Eddie.'
      },
      {
        src: 'images/personal_section/Rosh_SIUE_2.jpg',
        title: 'SIUE Campus',
        description: 'Another day at SIUE. The campus has become a second home over these past semesters.'
      },
      {
        src: 'images/personal_section/Rosh_Presenting_2.jpg',
        title: 'Project Demo',
        description: 'Demonstrating one of our semester projects. Always nerve-wracking but rewarding when it all works.'
      },
      {
        src: 'images/personal_section/Rosh_KU_Graduation_Two.jpg',
        title: 'Graduation Day at KU',
        description: 'Graduating from Kathmandu University with my Computer Engineering degree. Four years of hard work paying off.'
      },
      {
        src: 'images/personal_section/Rosh_KU_Graduation_One.jpg',
        title: 'KU Graduation',
        description: 'Celebrating graduation with friends and family. Proud moment after years of late nights and tough exams.'
      }
    ];
    
    openLifeGallery('Academic Life', photos);
  };
  
  window.openTravelGallery = function() {
    const photos = [
      {
        src: 'images/personal_section/Rosh_Manali_India.1.jpg',
        title: 'Manali Mountains',
        description: 'Hiking in Manali, India. The Himalayas never get old - every trip feels like a new adventure.'
      },
      {
        src: 'images/personal_section/Rosh_Manali_India_2.jpg',
        title: 'Mountain Trek',
        description: 'Higher up in the mountains near Manali. The air gets thin up here but the views are worth it.'
      },
      {
        src: 'images/personal_section/Rosh_Manali_India.jpg',
        title: 'Himalayan Journey',
        description: 'Exploring the mountain roads. These trips remind me why I love traveling - seeing new places, meeting new people.'
      },
      {
        src: 'images/personal_section/Rosh_Kurintar.jpg',
        title: 'Kurintar Views',
        description: 'Stopping at Kurintar on a road trip. Small towns like this have their own charm.'
      },
      {
        src: 'images/personal_section/Rosh_Kalinchowk_Two.jpg',
        title: 'Kalinchowk Trek',
        description: 'Made it to Kalinchowk after a long hike. These treks push you physically but clear your mind completely.'
      },
      {
        src: 'images/personal_section/Rosh_Kalinchowk_Snow.jpg',
        title: 'Snow at Kalinchowk',
        description: 'Winter trekking at Kalinchowk. Cold and challenging, but that\'s part of what makes it memorable.'
      },
      {
        src: 'images/personal_section/Rosh_in_woods.jpg',
        title: 'Forest Trail',
        description: 'Getting lost (not really) in the woods. Sometimes you just need to disconnect and wander.'
      },
      {
        src: 'images/personal_section/Rosh_In_the_woods.jpg',
        title: 'Among the Trees',
        description: 'More forest exploring. There\'s something peaceful about being surrounded by trees and quiet.'
      },
      {
        src: 'images/personal_section/Rosh_Chitwan.jpg',
        title: 'Chitwan National Park',
        description: 'At Chitwan checking out the wildlife. Saw some incredible animals and learned about conservation efforts there.'
      },
      {
        src: 'images/personal_section/Rosh_Chitlang.jpg',
        title: 'Chitlang Village',
        description: 'Visiting Chitlang, a small village outside Kathmandu. Life moves slower here, which is refreshing.'
      },
      {
        src: 'images/personal_section/Rosh_Chitlang_3.jpg',
        title: 'Rural Nepal',
        description: 'Spending time in rural areas gives you a different perspective. The hospitality in these villages is incredible.'
      },
      {
        src: 'images/personal_section/Rosh_Brewery_Tour.jpg',
        title: 'Brewery Visit',
        description: 'Touring a local brewery. Interesting to see the process behind the scenes and learn about the craft.'
      },
      {
        src: 'images/personal_section/Rosh_Mustang.jpg',
        title: 'Mustang Region',
        description: 'Out in Mustang, one of the most remote areas I\'ve visited. Felt like stepping into another world.'
      },
      {
        src: 'images/personal_section/Rosh_Selfie_1.jpg',
        title: 'On the Road',
        description: 'Quick selfie during one of many trips. Traveling has taught me to be flexible and embrace the unexpected.'
      },
      {
        src: 'images/personal_section/Rosh_Chicago.jpg',
        title: 'Chicago Visit',
        description: 'Exploring Chicago for the first time. Big change from the mountains, but cities have their own energy.'
      }
    ];
    setTimeout(() => {
      const modal = document.getElementById('lifeGalleryModal');
      if (modal) modal.scrollTop = 0;
    }, 20);
    openLifeGallery('Travel & Exploration', photos);
  };
  
  window.openSportsGallery = function() {
    const photos = [
      {
        src: 'images/personal_section/Rosh_Dirt_Bike.jpg',
        title: 'Dirt Biking',
        description: 'First time on a dirt bike. Little scary at first but once you get the hang of it, it\'s a rush.'
      },
      {
        src: 'images/personal_section/Rosh_Boating.jpg',
        title: 'Out on the Water',
        description: 'Boating with friends. These are the days you look back on and smile.'
      },
      {
        src: 'images/personal_section/Rosh_Blood_Donation.jpg',
        title: 'Blood Donation',
        description: 'Donating blood at a local drive. Small thing to do but it can make a real difference.'
      },
      {
        src: 'images/personal_section/Rosh_Waterfall_Chitlang.jpg',
        title: 'Chitlang Waterfall',
        description: 'Found this waterfall while hiking near Chitlang. Worth the extra miles off the main trail.'
      },
      {
        src: 'images/personal_section/Rosh_Cricket.jpg',
        title: 'Cricket Match',
        description: 'Playing cricket with friends. Grew up with this game, so it always feels like home when we play.'
      },
      {
        src: 'images/personal_section/Rosh_Force_Car.jpg',
        title: 'Off-Roading',
        description: 'Taking this Force out for some off-road driving. Challenging terrain but the vehicle handled it well.'
      }
    ];
    setTimeout(() => {
      const modal = document.getElementById('lifeGalleryModal');
      if (modal) modal.scrollTop = 0;
    }, 20);
    openLifeGallery('Sports & Activities', photos);
  };
  
  function openLifeGallery(title, photos) {
    closeAllModals();
    const modal = document.getElementById('lifeGalleryModal');
    const modalTitle = document.getElementById('lifeGalleryTitle');
    const galleryContent = document.getElementById('lifeGalleryContent');
    
    if (!modal || !modalTitle || !galleryContent) {
      console.error('Life gallery modal elements not found');
      return;
    }
    
    // Clear and set title
    modalTitle.textContent = title;
    galleryContent.innerHTML = '';
    
    // Build gallery content
    if (photos && photos.length > 0) {
      const gridContainer = document.createElement('div');
      gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6';
      
      photos.forEach((photo) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'life-gallery-image-container';
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.title;
        img.className = 'life-gallery-image';
        
        const overlay = document.createElement('div');
        overlay.className = 'life-gallery-hover-overlay';
        
        const titleEl = document.createElement('h3');
        titleEl.className = 'life-gallery-hover-title';
        titleEl.textContent = photo.title;
        
        const description = document.createElement('p');
        description.className = 'life-gallery-hover-description';
        description.textContent = photo.description;
        
        overlay.appendChild(titleEl);
        overlay.appendChild(description);
        photoItem.appendChild(img);
        photoItem.appendChild(overlay);
        gridContainer.appendChild(photoItem);
      });
      
      galleryContent.appendChild(gridContainer);
    } else {
      const msg = document.createElement('p');
      msg.textContent = 'No photos available yet. Coming soon!';
      msg.className = 'text-gray-500 text-center text-lg py-12';
      galleryContent.appendChild(msg);
    }
    
    // Show modal
    modal.style.display = 'flex';
    modal.classList.add('show');
    lockBodyScroll();
    currentModal = 'lifeGalleryModal';
    
    // THE FIX: Scroll everything to top after showing
    setTimeout(() => {
      // Scroll the modal container to top
      modal.scrollTop = 0;
      // Scroll the content area to top
      galleryContent.scrollTop = 0;
    }, 10);
    
    // Add click outside to close
    setTimeout(() => {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeLifeGallery();
        }
      });
    }, 100);
  }
  
  window.closeLifeGallery = function() {
    const modal = document.getElementById('lifeGalleryModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.classList.remove('show');
    unlockBodyScroll();
    currentModal = null;
  };

  // =========================================================
  // ADDITIONAL COMPETENCIES COLOR FIX
  // =========================================================
  const mentoringElements = document.querySelectorAll('.bg-teal-100.text-teal-800');
  mentoringElements.forEach(element => {
    element.classList.add('hover:bg-teal-200');
  });

  // =========================================================
  // PROJECT CARD ENHANCEMENTS
  // =========================================================
  const projectItems = document.querySelectorAll('.project-item');
  
  projectItems.forEach((item, index) => {
    // Add click animation
    item.addEventListener('click', function() {
      this.style.transform = 'translateY(-5px) scale(0.99)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
    
    // Add keyboard navigation
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // =========================================================
  // IMPROVED MODAL SCROLLING
  // =========================================================
  function ensureModalHeaderVisible(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Scroll modal container to top
    modal.scrollTop = 0;
    
    // Also ensure the content inside is scrolled to top
    const contentDiv = modal.querySelector('div:last-child');
    if (contentDiv) {
      contentDiv.scrollTop = 0;
    }
  }

  // Update project modal opening to ensure visibility
  const originalOpenProjectModal = window.openProjectModal;
  window.openProjectModal = function() {
    originalOpenProjectModal();
    setTimeout(() => ensureModalHeaderVisible('projectModal'), 50);
  };

  const originalOpenBIProjectModal = window.openBIProjectModal;
  window.openBIProjectModal = function() {
    originalOpenBIProjectModal();
    setTimeout(() => ensureModalHeaderVisible('biProjectModal'), 50);
  };

  const originalOpenCyberProjectModal = window.openCyberProjectModal;
  window.openCyberProjectModal = function() {
    originalOpenCyberProjectModal();
    setTimeout(() => ensureModalHeaderVisible('cyberProjectModal'), 50);
  };

  const originalOpenDBProjectModal = window.openDBProjectModal;
  window.openDBProjectModal = function() {
    originalOpenDBProjectModal();
    setTimeout(() => ensureModalHeaderVisible('dbProjectModal'), 50);
  };

  // =========================================================
  // INITIALIZE ON LOAD
  // =========================================================
  highlightActiveSection();
  
  // Save initial scroll position
  setTimeout(() => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  }, 500);
});