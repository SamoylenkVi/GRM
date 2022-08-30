const keys = {
    ESCAPE: 'Escape',
    ESC: 'Esc',
};

export default function() {
    const page = document.querySelector('body');
    const picture = document.querySelector('.gallery-picture');
    const galleryPopUp = document.querySelector('.gallery-pop-up');
    const galleryOverlay = galleryPopUp.querySelector('.gallery-overlay');
    const galleryButton = galleryPopUp.querySelector('.gallery-button-close');
    
    const openPopupHandler = (evt) => {
        evt.preventDefault();
    
        page.style.overflow = 'hidden';
        galleryPopUp.classList.add('gallery-pop-up-opend')

        document.addEventListener('keydown', escapeKeydownHandler);
        galleryOverlay.addEventListener('click', closePopupHandler);
        galleryButton.addEventListener('click', closePopupHandler);
    };

    const closePopupHandler = () => {
        page.style.overflow = 'auto';
        galleryPopUp.classList.remove('gallery-pop-up-opend')
    
        document.removeEventListener('keydown', escapeKeydownHandler);
        galleryOverlay.removeEventListener('click', closePopupHandler);
        galleryButton.removeEventListener('click', closePopupHandler);
    };

    const escapeKeydownHandler = (evt) => {
        if (evt.key === keys.ESCAPE || evt.key === keys.ESC) {
          closePopupHandler(evt);
        }
    };

    picture.addEventListener('click', openPopupHandler);
}