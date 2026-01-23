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
    
    // Update modal content
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDate').innerText = date;
    document.getElementById('modalImage').src = image;
    document.getElementById('modalDescription').innerText =
      description || 'Certificate preview only.';
    
    // Show modal and prevent body scroll
    document.body.classList.add('modal-open');
    modal.classList.remove('hidden');
    modal.classList.add('show');
    
    // Store scroll position before opening modal
    modal._scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    
    // Lock body scroll
    document.body.style.position = 'fixed';
    document.body.style.top = `-${modal._scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  };

  window.closeModal = function () {
    const modal = document.getElementById('modal');
    
    // Close modal and restore body scroll
    document.body.classList.remove('modal-open');
    modal.classList.add('hidden');
    modal.classList.remove('show');
    
    // Restore body scroll position
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    
    // Restore scroll position
    if (modal._scrollY !== undefined) {
      window.scrollTo(0, modal._scrollY);
    }
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
    
    // Close certificate modal first
    const modal = document.getElementById('modal');
    if (modal && !modal.classList.contains('hidden')) {
      window.closeModal();
      return;
    }
    
    // Also close other modals on ESC
    if (certificateModal && !certificateModal.classList.contains('hidden')) {
      window.closeModal();
    }
    if (workshopModal && !workshopModal.classList.contains('hidden')) {
      window.closeWorkshopGallery();
    }
    // Close life gallery modal on ESC
    const lifeGalleryModal = document.getElementById('lifeGalleryModal');
    if (lifeGalleryModal && lifeGalleryModal.classList.contains('flex')) {
      window.closeLifeGallery();
    }
    
    // Close project modals
    window.closeAllProjectModals();
  });

  // =========================================================
  // LIFE & INTERESTS MODAL - WITH CLICK OUTSIDE TO CLOSE
  // =========================================================
  window.openLifeModal = function(title, image, description) {
    const modal = document.getElementById('lifeModal');
    if (!modal) return;
    document.getElementById('lifeModalTitle').innerText = title;
    document.getElementById('lifeModalImage').src = image;
    document.getElementById('lifeModalDescription').innerText = description;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  window.closeLifeModal = function() {
    const modal = document.getElementById('lifeModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.getElementById('lifeModalTitle').innerText = '';
    document.getElementById('lifeModalImage').src = '';
    document.getElementById('lifeModalDescription').innerText = '';
  };

  // Close modal on outside click
  const lifeModal = document.getElementById('lifeModal');
  if (lifeModal) {
    lifeModal.addEventListener('click', function(e) {
      if (e.target === lifeModal) {
        window.closeLifeModal();
      }
    });
  }

  // =========================================================
  // BACK TO TOP BUTTON - SIMPLE VERSION
  // =========================================================
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    // Simple back-to-top functionality
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('title', 'Back to top');
    
    backToTopBtn.onclick = function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
        backToTopBtn.classList.remove('hidden');
      } else {
        backToTopBtn.style.display = 'none';
        backToTopBtn.classList.add('hidden');
      }
    });
    
    // Initial check
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'flex';
      backToTopBtn.classList.remove('hidden');
    }
  }

  // =========================================================
  // LIFE GALLERY MODALS - ALL IMAGES INCLUDED
  // =========================================================
  
  window.openPersonalGallery = function() {
    const photos = [
      {
        src: 'images/personal_section/Rosh_Alton_2024_1.JPG',
        title: 'Exploring Historic Alton',
        description: 'Discovering the rich history and architecture of Alton, Illinois while building connections in the local community.'
      },
      {
        src: 'images/personal_section/Rosh_Alton_2024_2.JPG',
        title: 'Alton Community Engagement',
        description: 'Networking and engaging with community members in downtown Alton, demonstrating strong interpersonal skills.'
      },
      {
        src: 'images/personal_section/Rosh_Cougar_Lake_2024.JPG',
        title: 'Strategic Reflection at Cougar Lake',
        description: 'Taking time for strategic thinking and planning by the peaceful Cougar Lake, balancing work with mindfulness.'
      },
      {
        src: 'images/personal_section/Roshan_HorshoeLake_Aug2024.JPG',
        title: 'Team Building at Horseshoe Lake',
        description: 'Developing team collaboration skills during a summer gathering at Horseshoe Lake in August 2024.'
      },
      {
        src: 'images/personal_section/Rosh_in_snow_1.JPG',
        title: 'Adapting to Challenges',
        description: 'Demonstrating adaptability and resilience while navigating challenging conditions during winter in Illinois.'
      },
      {
        src: 'images/personal_section/Rosh_in_snow_2.JPG',
        title: 'Perseverance in Adverse Conditions',
        description: 'Showing determination and problem-solving skills in snowy environments, qualities that translate to project challenges.'
      },
      {
        src: 'images/personal_section/Rosh_Edwardsville_Sep2024.JPG',
        title: 'Professional Development in Edwardsville',
        description: 'Engaging in professional networking and community events in Edwardsville to expand industry connections.'
      }
    ];
    
    openLifeGallery('Personal Moments', photos);
  };
  
  window.openAcademicGallery = function() {
    const photos = [
      {
        src: 'images/personal_section/Rosh_Speaking.JPG',
        title: 'Technical Presentation Delivery',
        description: 'Confidently presenting complex technical concepts to diverse audiences, showcasing communication and leadership skills.'
      },
      {
        src: 'images/personal_section/Rosh_SIUE_One.jpeg',
        title: 'SIUE Campus Collaboration',
        description: 'Collaborating with peers on the SIUE campus, fostering teamwork and knowledge-sharing in academic environments.'
      },
      {
        src: 'images/personal_section/Rosh_SIUE_2.jpeg',
        title: 'SIUE Academic Engagement',
        description: 'Active participation in campus life and academic discussions at Southern Illinois University Edwardsville.'
      },
      {
        src: 'images/personal_section/Rosh_Presenting_2.jpeg',
        title: 'Project Demonstration',
        description: 'Demonstrating project outcomes and technical solutions to faculty and industry professionals.'
      },
      {
        src: 'images/personal_section/Rosh_KU_Graduation_Two.jpeg',
        title: 'Engineering Graduation Achievement',
        description: 'Celebrating the completion of a rigorous Bachelor of Engineering in Computer Engineering program at Kathmandu University.'
      },
      {
        src: 'images/personal_section/Rosh_KU_Graduation_One.jpeg',
        title: 'Academic Milestone Accomplishment',
        description: 'Achieving academic excellence and graduating with honors from a prestigious engineering institution.'
      }
    ];
    
    openLifeGallery('Academic Life', photos);
  };
  
  window.openTravelGallery = function() {
    const photos = [
      {
        src: 'images/personal_section/Rosh_Manali_India.1.JPG',
        title: 'Strategic Planning in Manali',
        description: 'Developing strategic thinking skills while navigating complex mountain terrains in Manali, India.'
      },
      {
        src: 'images/personal_section/Rosh_Manali_India_2.JPG',
        title: 'Risk Assessment in Himalayas',
        description: 'Applying risk assessment and management skills during challenging treks in the Himalayan region.'
      },
      {
        src: 'images/personal_section/Rosh_Manali_India.JPG',
        title: 'Adapting to New Environments',
        description: 'Demonstrating adaptability and quick learning in unfamiliar cultural and geographical settings.'
      },
      {
        src: 'images/personal_section/Rosh_Kurintar.JPG',
        title: 'Problem Solving in Kurintar',
        description: 'Applying analytical thinking to navigate and overcome challenges in diverse outdoor settings.'
      },
      {
        src: 'images/personal_section/Rosh_Kalinchowk_Two.JPG',
        title: 'Goal-Oriented Trekking',
        description: 'Setting and achieving challenging goals during demanding treks to high-altitude destinations.'
      },
      {
        src: 'images/personal_section/Rosh_Kalinchowk_Snow.JPG',
        title: 'Resilience in Extreme Conditions',
        description: 'Building resilience and determination while operating in challenging, high-stakes environments.'
      },
      {
        src: 'images/personal_section/Rosh_in_woods.JPG',
        title: 'Strategic Navigation Skills',
        description: 'Developing strong navigation and orientation skills during exploratory forest expeditions.'
      },
      {
        src: 'images/personal_section/Rosh_In_the_woods.JPG',
        title: 'Systematic Outdoor Planning',
        description: 'Applying systematic thinking and planning during extended outdoor navigation challenges.'
      },
      {
        src: 'images/personal_section/Rosh_Chitwan.JPG',
        title: 'Wildlife Conservation Awareness',
        description: 'Gaining appreciation for biodiversity and environmental conservation at Chitwan National Park.'
      },
      {
        src: 'images/personal_section/Rosh_Chitlang.JPG',
        title: 'Cultural Immersion Experience',
        description: 'Engaging with diverse cultures and communities during travels through rural Nepal.'
      },
      {
        src: 'images/personal_section/Rosh_Chitlang_3.JPG',
        title: 'Rural Community Engagement',
        description: 'Building cross-cultural communication skills while interacting with local communities in Chitlang.'
      },
      {
        src: 'images/personal_section/Rosh_Brewery_Tour.JPG',
        title: 'Industrial Process Observation',
        description: 'Studying operational processes and quality control during an educational brewery tour.'
      },
      {
        src: 'images/personal_section/Rosh_Mustang.jpeg',
        title: 'Remote Area Exploration',
        description: 'Developing self-reliance and resource management skills during expeditions to remote regions.'
      },
      {
        src: 'images/personal_section/Rosh_Selfie_1.jpeg',
        title: 'Global Perspective Development',
        description: 'Building a global mindset through diverse travel experiences across different continents.'
      },
      {
        src: 'images/personal_section/Rosh_Chicago.jpeg',
        title: 'Urban Innovation Exploration',
        description: 'Studying urban development and technological innovation in major metropolitan centers like Chicago.'
      }
    ];
    
    openLifeGallery('Travel & Exploration', photos);
  };
  
  window.openSportsGallery = function() {
    const photos = [
      {
        src: 'images/personal_section/Rosh_Dirt_Bike.JPG',
        title: 'Risk Management in Action',
        description: 'Applying calculated risk assessment and quick decision-making during high-adrenaline dirt biking.'
      },
      {
        src: 'images/personal_section/Rosh_Boating.JPG',
        title: 'Water Navigation Leadership',
        description: 'Demonstrating leadership and coordination skills while managing water-based activities and safety protocols.'
      },
      {
        src: 'images/personal_section/Rosh_Blood_Donation.JPG',
        title: 'Community Service Commitment',
        description: 'Demonstrating social responsibility and commitment to community welfare through regular blood donation.'
      },
      {
        src: 'images/personal_section/Rosh_Waterfall_Chitlang.JPG',
        title: 'Exploratory Research Skills',
        description: 'Applying investigative and research skills during exploratory trips to natural landmarks and formations.'
      },
      {
        src: 'images/personal_section/Rosh_Cricket.JPG',
        title: 'Team Strategy Development',
        description: 'Building teamwork, strategy development, and competitive spirit through organized sports participation.'
      },
      {
        src: 'images/personal_section/Rosh_Force_Car.jpeg',
        title: 'Technical Vehicle Operation',
        description: 'Applying technical knowledge and mechanical understanding during off-road vehicle operations.'
      }
    ];
    
    openLifeGallery('Sports & Activities', photos);
  };
  
  function openLifeGallery(title, photos) {
    const modal = document.getElementById('lifeGalleryModal');
    const modalTitle = document.getElementById('lifeGalleryTitle');
    const galleryContent = document.getElementById('lifeGalleryContent');
    
    if (!modal || !modalTitle || !galleryContent) {
      console.error('Life gallery modal elements not found');
      return;
    }
    
    modalTitle.textContent = title;
    galleryContent.innerHTML = '';
    
    if (photos && photos.length > 0) {
      const gridContainer = document.createElement('div');
      gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';
      
      photos.forEach((photo) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'flex flex-col';
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.title;
        img.className = 'w-full h-80 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300';
        
        img.onerror = function() {
          console.warn(`Failed to load image: ${photo.src}`);
          photoItem.style.display = 'none';
        };
        
        const titleEl = document.createElement('h3');
        titleEl.className = 'text-gray-900 font-bold text-base mt-3';
        titleEl.textContent = photo.title;
        
        const description = document.createElement('p');
        description.className = 'text-gray-600 text-sm mt-1 italic';
        description.textContent = photo.description;
        
        photoItem.appendChild(img);
        photoItem.appendChild(titleEl);
        photoItem.appendChild(description);
        gridContainer.appendChild(photoItem);
      });
      
      galleryContent.appendChild(gridContainer);
    } else {
      const msg = document.createElement('p');
      msg.textContent = 'No photos available yet. Coming soon!';
      msg.className = 'text-gray-500 text-center text-lg py-12';
      galleryContent.appendChild(msg);
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  
  window.closeLifeGallery = function() {
    const modal = document.getElementById('lifeGalleryModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };
  
  // Close modal on outside click - only when clicking the backdrop
  const lifeGalleryModal = document.getElementById('lifeGalleryModal');
  if (lifeGalleryModal) {
    lifeGalleryModal.addEventListener('click', function(e) {
      if (e.target === lifeGalleryModal) {
        window.closeLifeGallery();
      }
    });
  }
  
  // Make sure modal is hidden on page load
  if (lifeGalleryModal) {
    lifeGalleryModal.classList.add('hidden');
    lifeGalleryModal.classList.remove('flex');
  }
});