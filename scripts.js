document.addEventListener('DOMContentLoaded', function () {
    // Navigation toggle for mobile
    document.getElementById('navToggle').addEventListener('click', function () {
        const mobileNav = document.getElementById('mobileNavContainer');
        mobileNav.classList.toggle('hidden');
        mobileNav.classList.toggle('flex');
    });

    // Close mobile navigation when clicking outside
    document.addEventListener('click', function (e) {
        const mobileNav = document.getElementById('mobileNavContainer');
        const navToggle = document.getElementById('navToggle');
        if (!mobileNav.contains(e.target) && !navToggle.contains(e.target)) {
            mobileNav.classList.add('hidden');
            mobileNav.classList.remove('flex');
        }
    });

    // Modal functionality
    window.openModal = function (title, date, image, description = '') {
        document.getElementById('modalTitle').innerText = title;
        document.getElementById('modalDate').innerText = date;
        document.getElementById('modalImage').src = image;
        document.getElementById('modalDescription').innerText = description || 'Certificate preview only.';
        document.getElementById('modal').classList.remove('hidden');
    };

    window.closeModal = function () {
        document.getElementById('modal').classList.add('hidden');
    };

    // Workshop gallery functionality
    window.openWorkshopGallery = function (title, description, images) {
        document.getElementById('workshopGalleryTitle').innerText = title;
        document.getElementById('workshopGalleryDesc').innerText = description;
        const galleryImages = document.getElementById('workshopGalleryImages');
        galleryImages.innerHTML = ''; // Clear existing images
        images.forEach((image) => {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.classList.add('w-full', 'h-auto', 'rounded-lg', 'shadow-md');
            galleryImages.appendChild(imgElement);
        });
        document.getElementById('workshopGalleryModal').classList.remove('hidden');
    };

    window.closeWorkshopGallery = function () {
        document.getElementById('workshopGalleryModal').classList.add('hidden');
    };
});