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
            (scrollValue + displayHeight - 200 > text.getBoundingClientRect().top + scrollValue
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
            console.log(coeffcient)
            console.log(et)
            console.log(eh)
            if(wt + wh >= et && wt +wh - eh * 2 <= et + (wh -eh)) {
                // image.style.transform = `scale(${oldScale * coeffcient - oldScale})`
            } else {
                console.log(2)
            }
        }) 



        console.log(wt + 'прокрутка окна')
        console.log(wh + 'высота окна')
    }
}






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
elementToVisible()