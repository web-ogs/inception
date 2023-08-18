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
     * Header fixed top on scroll
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        let headerOffset = selectHeader.offsetTop
        let nextElement = selectHeader.nextElementSibling
        const headerFixed = () => {
            if ((headerOffset - window.scrollY) <= 0) {
                selectHeader.classList.add('fixed-top')
                nextElement.classList.add('scrolled-offset')
            } else {
                selectHeader.classList.remove('fixed-top')
                nextElement.classList.remove('scrolled-offset')
            }
        }
        window.addEventListener('load', headerFixed)
        onscroll(document, headerFixed)
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
     * Hero type effect
     */
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
# Hover
--------------------------------------------------------------*/
   


    window.onload = function () {
        const links = document.querySelectorAll("codedText");
        const solveMilliseconds = 800;
        const characterSelectionMilliseconds = 40;
        const delayMilliseconds = 250;
        const characters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*#@/*!%&^"];

        const randomArrayElement = (arr) => {
            return arr[(arr.length * Math.random()) | 0];
        };

        links.forEach((element) => {
            element.addEventListener("mouseenter", (e) => {
                const element = e.target;
                scrambleText(element);
                e.preventDefault();
            });
        });

        function scrambleText(element) {
            if (element.classList.contains("active") == false) {
                let delay = 0;
                const elementText = element.innerText;
                const elementCharacters = [...elementText];
                const lockMilliseconds =
                    delayMilliseconds * elementCharacters.length + solveMilliseconds;

                element.classList.add("active");

                setTimeout(() => {
                    element.classList.remove("active");
                }, lockMilliseconds);

                elementCharacters.forEach((character, index) => {
                    setTimeout(
                        () => {
                            let intervalId = setInterval(() => {
                                const randomCharacter = randomArrayElement(characters);
                                element.innerText = replaceCharacter(
                                    element.innerText,
                                    index,
                                    randomCharacter
                                );

                                setTimeout(() => {
                                    clearInterval(intervalId);
                                    element.innerText = replaceCharacter(
                                        element.innerText,
                                        index,
                                        elementCharacters[index]
                                    );
                                }, solveMilliseconds);
                            }, characterSelectionMilliseconds);
                        },
                        delay === 0 ? (delay += 1) : (delay += delayMilliseconds)
                    );
                });
            }
        }

        function replaceCharacter(str, index, chr) {
            return `${str.substring(0, index)}${chr}${str.substring(index + 1)}`;
        }
    };


   
  

    /**
     * END
     */
})()

