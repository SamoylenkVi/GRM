export default function() {
    let headerToggle = document.getElementById('headerToggle');
    if (headerToggle) {
    headerToggle.onclick = function() {
        document.body.classList.toggle('header-open');
        this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'false');
    }
    }
    let anchors = document.getElementsByClassName('js-scroll');
    for (let i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', function (e) {
            e.preventDefault();
            document.body.classList.remove('header-open');
            headerToggle.setAttribute('aria-expanded', 'false');
            document.getElementById(e.currentTarget.href.split("#")[1]).scrollIntoView({ behavior: 'smooth' });
        });
    }
    let prevScrollpos = window.pageYOffset,
        mainHeader = document.querySelector('.main-header'),
        princList = document.querySelector('.principles-list');
    if (window.pageYOffset > 50) {
        mainHeader.classList.add('header-red');
    };
    function throttle(fn, wait) {
        var time = Date.now();
        return function() {
            if ((time + wait - Date.now()) < 0) {
                fn();
                time = Date.now();
            }
        }
    }
    function headerManagemenet() {
        let currentScrollPos = window.pageYOffset;
        if ((prevScrollpos > currentScrollPos) || (currentScrollPos <= 100)) {
            mainHeader.style.transform = "translateY(0)";
        } else {
            mainHeader.style.transform = "translateY(-100%)";
        }
        prevScrollpos = currentScrollPos;
        if (currentScrollPos > 50) {
            mainHeader.classList.add('header-red');
        } else {
            mainHeader.classList.remove('header-red');
        }
    }
    window.addEventListener('scroll', throttle(headerManagemenet, 50));
    const slider = document.querySelector('.stages-list');
    if (slider) {
        const slides = slider.children,
            controls = document.getElementsByClassName('stages-control'),
            sliderPrev = document.getElementById('sliderPrev'),
            sliderNext = document.getElementById('sliderNext');
            sliderPrev.onclick = function () {
            let controlsActive = document.querySelector('.stages-control[aria-selected="true"]');
            if (controlsActive === document.querySelector('.stages-control')) {
                slider.scrollLeft = slides[slides.length-1].offsetLeft - slider.offsetLeft;
            } else {
                slider.scrollLeft = document.getElementById(controlsActive.previousElementSibling.getAttribute('aria-controls')).offsetLeft - slider.offsetLeft;
            }
        };
        sliderNext.onclick = function () {
            let controlsActive = document.querySelector('.stages-control[aria-selected="true"]');
            if (controlsActive === document.querySelector('.stages-control:last-of-type')) {
                slider.scrollLeft = slides[0].offsetLeft - slider.offsetLeft;
            } else {
                slider.scrollLeft = document.getElementById(controlsActive.nextElementSibling.getAttribute('aria-controls')).offsetLeft - slider.offsetLeft;
            }
        };
        for (let i=0;i<controls.length;i++) {
            controls[i].onclick = function () {
                slider.scrollLeft = document.getElementById(this.getAttribute('aria-controls')).offsetLeft - slider.offsetLeft;
                this.blur();
                return false;
            }
        }
        slider.onscroll = function () {
            for (let i=0;i<slides.length;i++) {
                if (slider.scrollLeft === slides[i].offsetLeft - slider.offsetLeft) {
                    document.querySelector('.stages-control[aria-selected="true"]').setAttribute('aria-selected','false');
                    controls[i].setAttribute('aria-selected','true');
                }
            }
            return false;
        };
    }
    const principles = document.getElementsByClassName('principles-link');
    for (let i=0;i<principles.length;i++) {
        principles[i].onclick = function () {
            if (this.getAttribute('aria-expanded') === 'true') {
                this.setAttribute('aria-expanded', 'false');
            } else {
                if (document.querySelector('.principles-link[aria-expanded="true"]')) {
                    document.querySelector('.principles-link[aria-expanded="true"]').setAttribute('aria-expanded', "false");
                }
                this.setAttribute('aria-expanded', "true");
            }
            this.blur();
            return false;
        };
    }
    let princPrev = function () {
        let principlesActive = document.querySelector('.principles-link[aria-expanded="true"]');
        if (!principlesActive || principlesActive === document.querySelector('.principles-link')) {
            document.querySelector('.principles-list li:last-child .principles-link').click();
        } else {
            principlesActive.parentElement.previousElementSibling.querySelector('.principles-link').click();
        }
    }, princNext = function () {
        let principlesActive = document.querySelector('.principles-link[aria-expanded="true"]');
        if (!principlesActive || principlesActive === document.querySelector('.principles-list li:last-child .principles-link')) {
            document.querySelector('.principles-link').click();
        } else {
            principlesActive.parentElement.nextElementSibling.querySelector('.principles-link').click();
        }
    };
}
