import LocomotiveScroll from '../../../src/locomotive-scroll';

const getTranslate = (el) => {
    var translate = {};
    if (!window.getComputedStyle) return;
    var style = getComputedStyle(el);
    var transform = style.transform || style.webkitTransform || style.mozTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
    translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;
    return translate;
}

const lerp = (start, end, amt) => {
    return (1 - amt) * start + amt * end;
}

const transform = (element, x, y, delay) => {
    var transform;

    if (!delay) {
      transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(x, ",").concat(y, ",0,1)");
    } else {
      var start = getTranslate(element);
      var lerpX = lerp(start.x, x, delay);
      var lerpY = lerp(start.y, y, delay);
      transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(lerpX, ",").concat(lerpY, ",0,1)");
    }

    element.style.webkitTransform = transform;
    element.style.msTransform = transform;
    element.style.transform = transform;
  
}

(function() {

    document.documentElement.classList.add('is-loaded');
    document.documentElement.classList.remove('is-loading');

    
    

    setTimeout(() => {
        document.documentElement.classList.add('is-ready');        
    },300);


    setTimeout(() => {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('#js-scroll'),
            smooth: true,
            smoothMobile: true,
            getSpeed: true,
            getDirection: true,
            useKeyboard: true
        });
        
        let dynamicBackgrounds = [];
        let dynamicColorElements = [];
        scroll.on('scroll', (instance) => {
            const progress = 360 * instance.scroll.y / instance.limit;
            
            //scroll.el.style.backgroundColor = `hsl(${progress}, 11%, 81%)`;

            dynamicBackgrounds.forEach(obj => {
                //obj.el.style.backgroundColor = `hsl(${progress}, 11%, 81%)`;
            });
            dynamicColorElements.forEach(obj => {
                //obj.el.style.color = `hsl(${progress}, 11%, 81%)`;
            });

            document.documentElement.setAttribute('data-direction', instance.direction)

            console.log("progress")
            // const awards = document.getElementById("awards")
            // const awardsHeight = (awards.getBoundingClientRect().height * -1)
            // const awardsTop = awards.getBoundingClientRect().top
            // const awardsHeight1 = awardsHeight / 3
            // const awardsHeight2 = (awardsHeight / 3) * 2

            //if(awardsTop < 100 && awardsHeight < awardsTop ){
                // if(progress > 150 && progress < (16.66 + 150) ){
                //     document.getElementById("awardsLogo3").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsLogo3").style.opacity = "0"
                //     document.getElementById("awardsLogo2").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsLogo2").style.opacity = "0"
                //     document.getElementById("awardsLogo1").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsLogo1").style.opacity = "1"
                //     document.getElementById("awardsText3").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsText3").style.opacity = "0"
                //     document.getElementById("awardsText2").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsText2").style.opacity = "0"
                //     document.getElementById("awardsText1").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsText1").style.opacity = "1"
                // }
                // if(progress > (16.66 + 150) && progress < (33.33 + 150)){
                //     document.getElementById("awardsLogo3").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsLogo3").style.opacity = "0"
                //     document.getElementById("awardsLogo1").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsLogo1").style.opacity = "0"
                //     document.getElementById("awardsLogo2").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsLogo2").style.opacity = "1"
                //     document.getElementById("awardsText3").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsText3").style.opacity = "0"
                //     document.getElementById("awardsText3").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsText1").style.opacity = "0"
                //     document.getElementById("awardsText2").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsText2").style.opacity = "1"
                // }
                // if(progress > (33.33 + 150)){
                //     document.getElementById("awardsLogo1").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsLogo1").style.opacity = "0"
                //     document.getElementById("awardsLogo2").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsLogo2").style.opacity = "0"
                //     document.getElementById("awardsLogo3").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsLogo3").style.opacity = "1"
                //     document.getElementById("awardsText1").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsText1").style.opacity = "0"
                //     document.getElementById("awardsText2").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsText2").style.opacity = "0"
                //     document.getElementById("awardsText3").style.transition = "opacity 1s ease-out"
                //     document.getElementById("awardsText3").style.opacity = "1"
                // }
                if(progress > 315){
                    const pos = progress - 300
                    const logo = document.getElementById("logoAnimado")
                    const back = document.getElementById("backAnimado")
                    const logoSizes = logo.getBoundingClientRect()
                    const backSizes = back.getBoundingClientRect()
                    logo.style.transition = "0.51s ease-out"
                    back.style.transition = "0.51s ease-out"
                    const posXlogo = logoSizes.width / 2.3 
                    const posYlogo = logoSizes.height / 1.3
                    const posXback = document.body.getBoundingClientRect().width / 2.3
                    const posYback = backSizes.height / 1.6


                    if(pos <= 50 ){
                        logo.style.top = `calc(${pos}vh - ${posYlogo}px)`;
                        logo.style.left = `calc(${pos}vw - ${posXlogo}px)`;
                        back.style.bottom = `calc(${pos}vh - ${posYback}px)`;
                        back.style.right = `calc(${pos}vw - ${posXback}px)`;
                    }
                }
            //}
        });

        scroll.on('call', (value, way, obj) => {
            if (value === 'dynamicBackground') {
                if(way === 'enter') {
                    dynamicBackgrounds.push({
                        id: obj.id,
                        el: obj.el
                    });
                } else {
                    for (var i = 0; i < dynamicBackgrounds.length; i++) {
                        if(obj.id === dynamicBackgrounds[i].id) {
                            dynamicBackgrounds.splice(i,1);
                        }
                    }
                }
            } else if (value === 'dynamicColor') {
                if(way === 'enter') {
                    dynamicColorElements.push({
                        id: obj.id,
                        el: obj.el
                    });
                } else {
                    for (var i = 0; i < dynamicColorElements.length; i++) {
                        if(obj.id === dynamicColorElements[i].id) {
                            dynamicColorElements.splice(i,1);
                        }
                    }
                }
            }

        });

    }, 1000)
    
})();


