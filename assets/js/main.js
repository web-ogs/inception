/**
* Updated: 16 Aug 2023
* Author: Courtney - web-OGs
*/


(function () {
    "use strict";

/*--------------------------------------------------------------
# General
--------------------------------------------------------------*/

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



    /*--------------------------------------------------------------
    # Scroll
    --------------------------------------------------------------*/

    /**
 * Scrolls to an element with header offset
 */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }


/**
 * Scrool with ofset on links with a class name .scrollto
 */
on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
        e.preventDefault()

        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
            navbar.classList.remove('navbar-mobile')
            let navbarToggle = select('.mobile-nav-toggle')
            navbarToggle.classList.toggle('bi-list')
            navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
    }
}, true)

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
    /**
 * Animation on scroll
 */
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    }
    window.addEventListener('load', () => {
        aos_init();
    });




    /*--------------------------------------------------------------
    # PRELOADER
    --------------------------------------------------------------*/

    /**
 * Preloader
 */
    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.remove()
            }, 100);
        });
    }



    /*--------------------------------------------------------------
    # TYPE ANIM
    --------------------------------------------------------------*/



    const typed = select('.typed')
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items')
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }



/*--------------------------------------------------------------
# Navigation
--------------------------------------------------------------*/


/**
 * Navbar links active state on scroll
 */
let navbarlinks = select('#navbar .scrollto', true)
const navbarlinksActive = () => {
    let position = window.scrollY + 300
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
 * Mobile nav toggle
 */
on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
})

/**
 * Mobile nav dropdowns activate
 */
on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
    }
}, true)




    /*--------------------------------------------------------------
# Hover
--------------------------------------------------------------*/
    document.querySelectorAll('.codedText').forEach((t) => {
        const arr1 = t.innerHTML.split('')
        const arr2 = []
        arr1.forEach((char, i) => arr2[i] = randChar()) //fill arr2 with random characters
        t.onpointerover = () => {
            const tl = gsap.timeline()
            let step = 0
            tl.fromTo(t, {
                innerHTML: arr2.join(''),
                color: '#f9007b',
               
            }, {
                duration: arr1.length / 90, //duration based on text length
                ease: 'power4.in',
                delay: 0.1,
                color: '#fff',
                background: '#000',
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
        let c = "abcdefghijklmnopqrstuvwxyz1234567890!@#$^&*()…æ_+-=;[]/~`"
        c = c[Math.floor(Math.random() * c.length)]
        return (Math.random() > 0.5) ? c : c.toUpperCase()
    }







    /**
     * END
     */
})()

