document.addEventListener('DOMContentLoaded', function () {
    // Navigation toggle for mobile
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNavContainer');
    const mobileMenu = document.getElementById('mobileMenu');

    // Ensure mobile navigation is hidden by default
    mobileNav.classList.add('hidden');
    mobileMenu.classList.add('translate-y-full');

    // Check screen size and hide menu for desktop mode
    function updateMenuVisibility() {
        if (window.innerWidth > 768) {
            mobileNav.classList.add('hidden');
            mobileMenu.classList.add('translate-y-full');
            mobileNav.style.backgroundColor = 'transparent';
        } else {
            mobileNav.classList.add('hidden'); // Ensure hidden state on mobile mode refresh
            mobileMenu.classList.add('translate-y-full');
            mobileNav.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        }
    }

    // Update menu visibility on page load and resize
    updateMenuVisibility();
    window.addEventListener('resize', updateMenuVisibility);

    navToggle.addEventListener('click', function (e) {
        e.stopPropagation(); // Prevent click from propagating to document
        mobileNav.classList.toggle('hidden');
        mobileMenu.classList.toggle('translate-y-full');

        // Adjust shadow visibility
        if (!mobileNav.classList.contains('hidden')) {
            mobileNav.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        } else {
            mobileNav.style.backgroundColor = 'transparent';
        }
    });

    // Close mobile navigation when clicking outside
    document.addEventListener('click', function (e) {
        if (!mobileNav.contains(e.target) && !navToggle.contains(e.target)) {
            mobileNav.classList.add('hidden');
            mobileMenu.classList.add('translate-y-full');
            mobileNav.style.backgroundColor = 'transparent'; // Reset shadow
        }
    });

    // Ensure mobile menu links are clickable
    const mobileMenuLinks = document.querySelectorAll('#mobileMenu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileNav.classList.add('hidden');
            mobileMenu.classList.add('translate-y-full');
            mobileNav.style.backgroundColor = 'transparent';
        });
    });

    // Ensure menu visibility is corrected on refresh
    window.addEventListener('load', updateMenuVisibility);

    // Debugging: Log menu state changes
    navToggle.addEventListener('click', () => {
        console.log('Hamburger menu toggled:', !mobileNav.classList.contains('hidden'));
    });

    // Certificate modal functions
    window.openModal = function (title, date, image, description = '') {
        const modal = document.getElementById('modal');
        document.getElementById('modalTitle').innerText = title;
        document.getElementById('modalDate').innerText = date;
        document.getElementById('modalImage').src = image;
        document.getElementById('modalDescription').innerText = description || 'Certificate preview only.';
        modal.classList.remove('hidden');
        modal.classList.add('show');
    };

    window.closeModal = function () {
        const modal = document.getElementById('modal');
        modal.classList.add('hidden');
        modal.classList.remove('show');
    };

    // Workshop modal functions
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

    // Research project modal
    window.openProjectModal = function (title, summary, details, points) {
        const modal = document.getElementById('projectModal');
        const modalTitle = document.getElementById('projectModalTitle');
        const modalContent = document.getElementById('projectModalContent');

        if (title === 'SIUE Nexus: Maximizing Career Success Through Digital Alumni Integration') {
            modalTitle.textContent = title;
            modalContent.innerHTML = `
                <p><strong>Authors:</strong> Roshan Gautam, Kayleigh Straeter, Joseph Meyer, Erica Dockery, Prizma Bajracharya</p>
                <p><strong>Course:</strong> CMIS 526 - Information System and Technology</p>
                <p><strong>Abstract:</strong> SIUE Nexus is a strategic digital initiative designed to transform career outcomes at Southern Illinois University Edwardsville by connecting students with a powerful alumni network. The proposed platform addresses the current disconnect through AI-driven matchmaking, structured mentorships, event management, and engagement analytics.</p>
                <p><strong>Objectives:</strong></p>
                <ul class="list-disc ml-6">
                    <li>Enhance student career success through alumni mentorship</li>
                    <li>Enable structured networking across geographical boundaries</li>
                    <li>Strengthen alumni loyalty and university reputation</li>
                </ul>
                <p><strong>Platform Features:</strong></p>
                <ul class="list-disc ml-6">
                    <li>Customizable profile system for students and alumni</li>
                    <li>AI-driven mentor-mentee matching based on career trajectory</li>
                    <li>Event module for hybrid networking sessions with calendar sync</li>
                    <li>Feedback and engagement tracking for continual improvement</li>
                    <li>Data dashboards (Power BI, Argos) for trend analysis and ROI measurement</li>
                </ul>
                <p><strong>Technology Ecosystem:</strong> Integrated with Ellucian Banner, Microsoft Power BI, Argos, Microsoft PowerApps, and secure cloud infrastructure</p>
                <p><strong>Recommendation:</strong> Graduway by Gravyty was recommended based on feature completeness, alignment with stakeholder needs, and measurable ROI. Alternatives (Scale Growth AI and 360 Alumni) were also evaluated for budget and scope tradeoffs.</p>
                <p><strong>Benefits:</strong> $680,000 projected in five-year gains from improved engagement, event participation, and alumni giving. ROI: 30.4%. Payback Period: 1.44 years.</p>
                <p><strong>Conclusion:</strong> SIUE Nexus is not just a platform — it's a cultural shift toward long-term alumni-student synergy. With proper implementation, it will strengthen SIUE's identity, elevate its placement success, and build a thriving professional community.</p>
            `;
        } else {
            modalTitle.textContent = title;
            modalContent.innerHTML = `
                <p><strong>Summary:</strong> ${summary}</p>
                <p><strong>Details:</strong> ${details}</p>
                <ul class="list-disc ml-6">
                    ${points.map(point => `<li>${point}</li>`).join('')}
                </ul>
            `;
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    };

    window.closeProjectModal = function () {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }
    };
});