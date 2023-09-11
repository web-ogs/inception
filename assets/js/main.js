/**
* Updated: 16 Aug 2023
* Author: Courtney - web-OGs
*/

var Messenger = function (el) {
    'use strict';
    var m = this;

    m.init = function () {
        m.codeletters = "&#*+%?£@§$";
        m.message = 0;
        m.current_length = 0;
        m.fadeBuffer = false;
        m.messages = [
            'Loading...',
            'Ready',
            ''
        ];

        setTimeout(m.animateIn, 2);
    };

    m.generateRandomString = function (length) {
        var random_text = '';
        while (random_text.length < length) {
            random_text += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
        }

        return random_text;
    };

    m.animateIn = function () {
        if (m.current_length < m.messages[m.message].length) {
            m.current_length = m.current_length + 2;
            if (m.current_length > m.messages[m.message].length) {
                m.current_length = m.messages[m.message].length;
            }

            var message = m.generateRandomString(m.current_length);
            $(el).html(message);

            setTimeout(m.animateIn, 10);
        } else {
            setTimeout(m.animateFadeBuffer, 10);
        }
    };

    m.animateFadeBuffer = function () {
        if (m.fadeBuffer === false) {
            m.fadeBuffer = [];
            for (var i = 0; i < m.messages[m.message].length; i++) {
                m.fadeBuffer.push({ c: (Math.floor(Math.random() * 12)) + 1, l: m.messages[m.message].charAt(i) });
            }
        }

        var do_cycles = false;
        var message = '';

        for (var i = 0; i < m.fadeBuffer.length; i++) {
            var fader = m.fadeBuffer[i];
            if (fader.c > 0) {
                do_cycles = true;
                fader.c--;
                message += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
            } else {
                message += fader.l;
            }
        }

        $(el).html(message);

        if (do_cycles === true) {
            setTimeout(m.animateFadeBuffer, 50);
        } else {
            setTimeout(m.cycleText, 1580);
        }
    };

    m.cycleText = function () {
        m.message = m.message + 1;
        if (m.message >= m.messages.length) {
            m.message = 0;
        }

        m.current_length = 0;
        m.fadeBuffer = false;
        $(el).html('');

        setTimeout(m.animateIn, 100);
    };

    m.init();
}

console.clear();
var messenger = new Messenger($('#messenger'));




/** TIME DISPLAY */
`use strict`;
function refreshTime() {
    var datetime = new Date().toLocaleTimeString();
    console.log(datetime); // it will represent date in the console of developers tool
    document.getElementById("time").textContent = datetime; // represent on html page
}
setInterval(refreshTime, 100);


/** CODEDTEXT HOVER */
document.querySelectorAll('.codedText').forEach((t) => {
    const arr1 = t.innerHTML.split('')
    const arr2 = []
    arr1.forEach((char, i) => arr2[i] = randChar()) //fill arr2 with random characters
    t.onpointerover = () => {
        const tl = gsap.timeline()
        let step = 0
        tl.fromTo(t, {
            innerHTML: arr2.join(''),
          
            
        }, {
            duration: arr1.length / 20, //duration based on text length
            ease: 'power1.in',
            delay: 0.1,
        
           
            onUpdate: () => {
                const p = Math.floor(tl.progress() * (arr1.length)) //whole number from 0 - text length
                if (step != p) { //throttle the change of random characters
                    step = p
                    arr1.forEach((char, i) => arr2[i] = randChar())
                    let pt1 = arr1.join('').substring(p, 0),
                        pt2 = arr2.join('').substring(arr2.length - p, 0)
                    if (t.classList.contains('fromRight')) {
                        pt1 = arr2.join('').substring(arr2.length - p, 0)
                        pt2 = arr1.join('').substring(arr1.length - p)
                    }
                    t.innerHTML = pt1 + pt2 //update text
                }

            }
        })
    }
})

function randChar() {
    let c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$^&*()…æ_+-=;[]/~`"
    c = c[Math.floor(Math.random() * c.length)]
    return (Math.random() > 0.5) ? c : c.toUpperCase()
}



/** CODEDTEXT HOVER */
document.querySelectorAll('.contact-codedText').forEach((t) => {
    const arr1 = t.innerHTML.split('')
    const arr2 = []
    arr1.forEach((char, i) => arr2[i] = randChar()) //fill arr2 with random characters
    t.onpointerover = () => {
        const tl = gsap.timeline()
        let step = 0
        tl.fromTo(t, {
            innerHTML: arr2.join(''),


        }, {
            duration: arr1.length / 20, //duration based on text length
            ease: 'power1.in',
            delay: 0.1,


            onUpdate: () => {
                const p = Math.floor(tl.progress() * (arr1.length)) //whole number from 0 - text length
                if (step != p) { //throttle the change of random characters
                    step = p
                    arr1.forEach((char, i) => arr2[i] = randChar())
                    let pt1 = arr1.join('').substring(p, 0),
                        pt2 = arr2.join('').substring(arr2.length - p, 0)
                    if (t.classList.contains('fromRight')) {
                        pt1 = arr2.join('').substring(arr2.length - p, 0)
                        pt2 = arr1.join('').substring(arr1.length - p)
                    }
                    t.innerHTML = pt1 + pt2 //update text
                }

            }
        })
    }
})

function randChar() {
    let c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$^&*()…æ_+-=;[]/~`"
    c = c[Math.floor(Math.random() * c.length)]
    return (Math.random() > 0.5) ? c : c.toUpperCase()
}



/** MODAL CLICK */
// Get the modal
var modal1 = document.getElementById("myModal1");

// Get the button/div that opens the modal
var div = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close1")[0];

// When the user clicks the button, open the modal 
div.onclick = function () {
    modal1.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal1.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal1.style.display = "none";
    }
}
/** MODAL 2 CLICK */
// Get the modal
var modal2 = document.getElementById("myModal2");

// Get the button/div that opens the modal
var div2 = document.getElementById("myBtn2");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close2")[0];

// When the user clicks the button, open the modal 
div2.onclick = function () {
    modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}

/** MODAL 3 CLICK */
// Get the modal
var modal3 = document.getElementById("myModal3");

// Get the button/div that opens the modal
var div3 = document.getElementById("myBtn3");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close3")[0];

// When the user clicks the button, open the modal 
div3.onclick = function () {
    modal3.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal3.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal3) {
        modal3.style.display = "none";
    }
}

/** DROPDOWN SOCIALS CLICK */
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};



/** HERO TEXT ANIMATION */
$(window).scroll(function () {
    var a = $(window).scrollTop();
    var b = "translateX(" + a * 0.12 + "px)";
    var c = "translateX(" + -a * 0.11 + "px)";
    var d = "translateX(" + a * 0.2 + "px)";

    $('.hero-text-1').css({
        transform: b
    });
    $('.hero-text-2').css({
        transform: c
    });
    $('.hero-text-3').css({
        transform: d
    })
});


/** SQAURE ANIMATION */
$(window).scroll(function () {
    var w = $(window).scrollTop();

    var f = "translateX(" + w * 0.12 + "px)";
    var f1 = "translateX(" + w * 0.30 + "px)";

    $('.box.three').css({
        transform: f
    });
    $('.box1.three1').css({
        transform: f1
    }) 

});




/** PAGE LOAD */

(function () {
    "use strict";



/**
* Easy selector helper function
*/
const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}
/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
        if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
            selectEl.addEventListener(type, listener)
        }
    }
}
/**
 * Easy on scroll event listener 
 */
const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
}


    /** LINK STATES ON SCROLL */
    /**
let section = document.querySelectorAll('section');
let menu = document.querySelectorAll('header nav a');
window.onscroll = () => {
    section.forEach(i => {
        let top = window.scrollY;
        let offset = i.offsetTop - 350;
        let height = i.offsetHeight;
        let id = i.getAttribute('id');
        if (top >= offset && top < offset + height) {
            menu.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']')
                    .classList.add('active');
            });
        }
    });
};
window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
        * /


    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 500
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)




    /**
 * Scrolls to an element with header offset
 */
    const scrollto = (el) => {
        let header = select('#header-top')
        let offset = header.offsetHeight

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }



    /**
* Back to top button
*/
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
* Preloader
*/
    let preloader = select('#preloader-page');
    if (preloader) {
        window.addEventListener('load', () => {
            document.body.style.overflow = 'hidden'
            setTimeout(() => {
                preloader.remove(),
                document.body.style.overflow = ''
            }, 5900);
        });
    }





    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });
   
})()




