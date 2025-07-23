
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
    window.openProjectModal = function () {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    };

    window.closeProjectModal = function () {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }
    };
});
