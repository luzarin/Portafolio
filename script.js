let scale = 1;
const ZOOM_SPEED = 0.1;
const MAX_SCALE = 5;

function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = imgSrc;
    lightbox.style.display = 'flex';
    scale = 1;
    lightboxImage.style.transform = `scale(${scale})`;

    lightbox.addEventListener('wheel', zoomImage);
    lightbox.addEventListener('click', closeLightbox);
    lightboxImage.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    lightboxImage.addEventListener('mousedown', startDrag);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    lightbox.removeEventListener('wheel', zoomImage);
}

function zoomImage(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -1 : 1;
    
    if (delta > 0 || (delta < 0 && scale > 1)) {
        scale += delta * ZOOM_SPEED;
        scale = Math.min(Math.max(1, scale), MAX_SCALE);
        document.getElementById('lightboxImage').style.transform = `scale(${scale})`;
    }
}

let isDragging = false;
let startX, startY;

function startDrag(e) {
    isDragging = true;
    startX = e.clientX - document.getElementById('lightboxImage').getBoundingClientRect().left;
    startY = e.clientY - document.getElementById('lightboxImage').getBoundingClientRect().top;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
    if (isDragging) {
        const lightboxImage = document.getElementById('lightboxImage');
        const x = e.clientX - startX;
        const y = e.clientY - startY;
        lightboxImage.style.left = `${x}px`;
        lightboxImage.style.top = `${y}px`;
    }
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

// Añadir event listeners a todas las imágenes
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.map-item img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src);
        });
    });
});
