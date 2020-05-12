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
    },300)

    setTimeout(() => {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('#js-scroll'),
            smooth: true,
            getSpeed: true,
            getDirection: true,
            useKeyboard: true
        });
        
        let dynamicBackgrounds = [];
        let dynamicColorElements = [];
        scroll.on('scroll', (instance) => {
            const progress = parseInt(360 * instance.scroll.y / instance.limit);
            

            //scroll.el.style.backgroundColor = `hsl(${progress}, 11%, 81%)`;

            dynamicBackgrounds.forEach(obj => {
                //obj.el.style.backgroundColor = `hsl(${progress}, 11%, 81%)`;
            });
            dynamicColorElements.forEach(obj => {
                //obj.el.style.color = `hsl(${progress}, 11%, 81%)`;
            });

            document.documentElement.setAttribute('data-direction', instance.direction)

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


