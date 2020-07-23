function headerBehavior () {
    let oldScroll = 0;
    let header = document.querySelector('.header')
    let headerHeight = header.clientHeight;

    window.addEventListener('scroll', (e) => {
        let newScroll = window.scrollY;
        (newScroll > oldScroll) ? scrollBottom() : scrollTop()
        oldScroll = newScroll
    })

    function scrollTop () {
        header.classList.remove('header-hidden')
    }

    function scrollBottom () {
        if (window.scrollY > headerHeight) {
            header.classList.add('header-hidden')
        }
    }

}

function elementToVisible () {
    //all texts
    let texts = Array.prototype.slice.call(document.querySelectorAll('.text'));
    //all images
    let images = Array.prototype.slice.call(document.querySelectorAll('.image'));
    let scrollHeight = window.scrollY
    let displayHeight = document.documentElement.clientHeight

    //variables transform images (scale)
    let pageHeight = window.innerHeight;
    let minScale = 1;
    

    changeTextElements (scrollHeight) 
    changeImageElements(scrollHeight)

    window.addEventListener('scroll', (e) => {
        scrollHeight = window.scrollY
        changeTextElements (scrollHeight) 
        changeImageElements(scrollHeight)
        transformImagesToScroll()
    })


    //tracking text elements
    function changeTextElements (scrollValue) {
        texts.forEach(text => {
            (scrollValue + displayHeight - 50 > text.getBoundingClientRect().top + scrollValue
            && !text.classList.contains('visible')) ? 
            text.classList.add('visible') : null;
        });
    }
    //tracking image elements
    function changeImageElements (scrollValue) {
        images.forEach(image => {
            (scrollValue + displayHeight - 150 > image.getBoundingClientRect().top + scrollValue
            && !image.classList.contains('image-visible')) ? 
            image.classList.add('image-visible') : null;
        });
    }

    function transformImagesToScroll () {
        let images = Array.prototype.slice.call(document.querySelectorAll('.image-visible'));
        let oldScale = 1.4;
        let wt = window.pageYOffset
        let wh = document.body.clientHeight;
        let et;
        let eh;
        images.forEach(image => {
            let coordinates = image.getBoundingClientRect()
            et = coordinates.top + wt
            eh = image.offsetHeight
            let coeffcient = (coordinates.top + eh) / wh 
            if(wt + wh >= et && wt +wh - eh * 2 <= et + (wh -eh)) {
                // image.style.transform = `scale(${oldScale * coeffcient - oldScale})`
            } else {

            }
        }) 
    }
}

function mobileMenuToggle () {
    let header = document.querySelector('.header');
    let menuButton = document.querySelector('.header-burger-wrapper');
    let menuIcon = document.querySelector('.header-burger-menu');
    let mobileMenu = document.querySelector('.header-burger-items');

    menuButton.addEventListener('click', (e) => {
        e.stopPropagation()
        menuIcon.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        header.classList.toggle('open');
        if(document.querySelector('.header.open')) {
            bodyScrollLock.disableBodyScroll()
        } else {
            bodyScrollLock.enableBodyScroll()
        }
    })
}

function fullCommentOpen () {
    let testimonialsBlock = document.querySelector('.testimonials')
    if(testimonialsBlock) {
        let allCommentsPreviev = Array.prototype.slice.call(document.querySelectorAll('.testimonials-text-comment'));
        allCommentsPreviev.forEach((comment) => {
            comment.addEventListener('click', (e) => {
                let fullComment = comment.nextElementSibling 
                fullComment.classList.toggle('open')
            })
        })
    } 
}


function formValidation () {
    let contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        let form = contactForm.querySelector('form')
        
        let nameInput = form.elements.name;
        let regExpName = /^(?![\s.]+$)[a-zA-Z\s.]{1,50}$/;
        let nameMessage = 'Enter your current name';


        let emailInput = form.elements.email;
        let regExpEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
        let emailMessage = 'The email is wrong';

        let phoneInput = form.elements.message;
        let regExpPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
        let phoneMessage = 'The phone is wrong';

        let messageInput = form.elements.message;
        let regExpMessage = /^\s*(?:\S\s*){5,10000}$/;
        let messageMessage = 'The message is too short';

        let submitButton = form.querySelector('button');
        
        let nameVal = false; 
        let emailVal = false; 
        let phoneVal = true; 
        let messageVal = true;


        function testFunction (inp, exp, message, validator) {
            let parrentField = inp.closest('.contact-form-input');
            let errorField = parrentField.querySelector('.error-field')
            let labelField = parrentField.querySelector('.contact-form-input-label')

            inp.addEventListener('input', (e) => {
                let inputValue = inp.value;
                let res = exp.test(inputValue)
                if(!res && inputValue) {
                    inp.classList.add('error-input')
                    errorField.innerText = message;
                    labelField.classList.remove('correct-field')
                    validator = false;
                    changeValidator(validator)
                } else if (inputValue == '') {
                    inp.classList.remove('error-input');
                    errorField.innerText = '';
                    labelField.classList.remove('correct-field')
                    validator = false;
                } else {
                    inp.classList.remove('error-input')
                    errorField.innerText = '';
                    labelField.classList.add('correct-field')
                    validator = true;
                    changeValidator(validator)
                }
            })

            function changeValidator(validator) {
                switch(inp) {
                    case nameInput: 
                        nameVal = validator;
                        break;
                    case emailInput: 
                        emailVal = validator;
                        break;
                    case messageInput: 
                        messageVal = validator;
                        break;
                    case phoneInput: 
                        phoneVal = validator;
                        break;
                }
                isButtonDisabled()
            }
        }

        testFunction(nameInput, regExpName, nameMessage, nameVal)
        testFunction(emailInput, regExpEmail, emailMessage, emailVal)
        testFunction(phoneInput, regExpPhone, phoneMessage, phoneVal)
        testFunction(messageInput, regExpMessage, messageMessage, messageVal)

        function isButtonDisabled(){
            (nameVal && emailVal && messageVal && phoneVal) ? 
            submitButton.removeAttribute('disabled') : 
            submitButton.getAttribute('disabled')
        }
    }


    
    

}


// slider init home page

$(document).ready(function(){
    let mainSlider = $('.case-slider-items');
    let initSlide = 1;

    mainSlider.slick({
        slidesToShow: 3,
        draggable: true,
        dots: false,
        fade: false,
        arrows: true,
        swipeToSlide: true,
        edgeFriction: 0.5,
        prevArrow: $('.case-slider-arrows-prev'),
        nextArrow: $('.case-slider-arrows-next'),
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                slidesToShow: 2
              }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                    
                }
            },
        ]
        
    });

    let totalSlides = mainSlider.slick("getSlick").slideCount

    loadingLineFill(0)

    mainSlider.on('afterChange', (e, slick, cur, next) => {
        loadingLineFill(cur)
    })

    function loadingLineFill (current) {
        let line = document.querySelector('.case-slider-loading')
        let width = 100/totalSlides * (current + 1)
        line.style.width = `${width}%`
    }
});



function asyncScroll() {
    if (document.body.clientWidth < 1201) {
        return false;
    }
    let pageHeight = window.innerHeight;
    let rightBlocks = Array.prototype.slice.call(
        document.querySelectorAll('.gallery-block-right')
    );
    let scrollHeight;
    let maxTranslate = 220;
    
    
    function asyncScrollAction() {
        scrollHeight = window.pageYOffset;
        let blockCoordX;
        let thisCoord;
        let blockHeight;
        let coof;
        rightBlocks.forEach(function(block) {
            blockHeight = block.clientHeight;
            blockCoordX = block.getBoundingClientRect().top + scrollHeight;
            thisCoord = pageHeight + scrollHeight;

            if (
                thisCoord > blockCoordX &&
                block.getBoundingClientRect().top > -blockHeight
            ) {
                coof =
                    (block.getBoundingClientRect().top + blockHeight) /
                    pageHeight;
                block.style.transform = `translateY(${coof * maxTranslate -
                    maxTranslate}px)`;
            } else {
                return false;
            }
        });
    }
    if (rightBlocks) {
        asyncScrollAction();
        window.addEventListener('scroll', function(e) {
            asyncScrollAction();
        });
    }
}



headerBehavior()
mobileMenuToggle()
setTimeout(elementToVisible, 1200)
fullCommentOpen()
formValidation()
