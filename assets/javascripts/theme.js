(function () {
  "use strict";

  /**
   * ------------------------------------------------------------------------
   * Variables
   * ------------------------------------------------------------------------
   */
  const navi = document.querySelector(".nav-top");
  if ( navi != null) {
    var header_offset =90;
  } else {
    var header_offset = 0;
  }

  /**
   * ------------------------------------------------------------------------
   * Functions
   * ------------------------------------------------------------------------
   */

  // Jarallax
  const myJarallax = function () {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.2
    });
  }

  // Typed Js
  const myTyped = function () {
    var x = document.querySelectorAll('[data-toggle="typed"]');
    "undefined"!=typeof Typed&&x&&[]
    .forEach.call( x, function(x){
      !function(x){
        var typo = x.dataset.options;
        typo = typo?JSON.parse(typo):{};
        var object = Object.assign({
          typeSpeed:100,
          backSpeed:100,
          backDelay:1e3,
          loop:!0
        },typo);
        new Typed(x,object)
      }(x)
    });
  }
  
  // Back to top button
  const myBacktotop = function () {
    // browser window scroll 
    var offset = 300,
      offset_opacity = 1200,
      back_to_top = document.querySelector(".back-top"),
      scrollpos = window.scrollY;

    var add_class_back_scroll = function add_class_back_scroll() {
      back_to_top.classList.add("block");
      back_to_top.classList.remove("hidden");
    };

    var add_class_offset_scroll = function add_class_offset_scroll() {
      back_to_top.classList.add("opacity-90");
    };

    var remove_class_back_scroll = function remove_class_back_scroll() {
      back_to_top.classList.remove("block","opacity-90");
      back_to_top.classList.add("hidden");
    };

    // back to top by es6-scroll-to
    var defaults = {
      duration: 400,
      easing: function easing(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      },
      to: 0
    };
    var animatedScrollTo = function animatedScrollTo(args) {
      if (isInteger(args)) {
        args = {
          to: args
        };
      }
      var options = extend(defaults, args);
      options.startingYOffset = window.pageYOffset;
      options.distanceYOffset = parseInt(options.to, 10) - options.startingYOffset;
      window.requestAnimationFrame(function (timestamp) {
        return animateScroll(options, timestamp);
      });
    };
    var animateScroll = function animateScroll(options, now) {
      if (!options.startTime) {
        options.startTime = now;
      }
      var currentTime = now - options.startTime;
      var newYOffset = Math.round(options.easing(currentTime, options.startingYOffset, options.distanceYOffset, options.duration));
      if (currentTime < options.duration) {
        window.requestAnimationFrame(function (timestamp) {
          return animateScroll(options, timestamp);
        });
      } else {
        newYOffset = options.to;
      }
      setScrollTopPosition(newYOffset);
    };
    var setScrollTopPosition = function setScrollTopPosition(newYOffset) {
      document.documentElement.scrollTop = newYOffset;
      document.body.scrollTop = newYOffset;
    };
    var isInteger = function isInteger(value) {
      if (Number.isInteger) {
        return Number.isInteger(value);
      } else {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
      }
    };
    var extend = function extend(defaults, options) {
      var extendedOptions = {};
      for (var key in defaults) {
        extendedOptions[key] = options[key] || defaults[key];
      }
      return extendedOptions;
    };
    var easeInQuint = function easeInQuint(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    };

    const scroll_a = document.querySelectorAll('.back-top');
    if ( scroll_a !=null) {
      for (var i = 0; i < scroll_a.length; i++) {
        scroll_a[i].addEventListener("click", function(){
          animatedScrollTo({
            easing: easeInQuint,
            duration: 800
          });
        });
      }
    }

    window.addEventListener('scroll', function () {
      scrollpos = window.scrollY;
      if (scrollpos > offset) {
        add_class_back_scroll();
      } else {
        remove_class_back_scroll();
      }
      if (scrollpos > offset_opacity) {
        add_class_offset_scroll();
      }
    });
  }

  // Preloader
  const myPreloader = function () {
    var xpre = document.querySelector(".preloader");
    if ( xpre != null) {
      window.addEventListener('load',function(){
        document.querySelector('body').classList.add("loaded-success")  
      });
    }
  }

  // Light Gallery
  const myLightgallery = function () {
    // Call lightgallery
    var lgt = document.querySelectorAll('.lightgallery-thumbnail');
    if ( lgt != null) {
      var _loop = function _loop(x) {
        lightGallery( lgt[x], {
          thumbnail:true,
          animateThumb: false,
          showThumbByDefault: false
        });
      }
      for (var x = 0; x < lgt.length; x++) {
        _loop(x);
      }
    }

    // Call lightgallery with slider
    var lgs = document.querySelectorAll('.lightgallery-slider');
    if ( lgs != null) {
      var _loop = function _loop(y) {
        lightGallery( lgs[y], {
          selector: '.slider-item',
          thumbnail:true,
          animateThumb: false,
          showThumbByDefault: false,
        });
      }
      for (var y = 0; y < lgs.length; y++) {
        _loop(y);
      }
    }
  }

  // Lazy load images
  const myLazyload = function () {  
    // lazy load in all
    var lazys = document.querySelector('.lazy');
    if ( lazys !=null) {
      var lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy",
        callback_reveal: function (el) {
          if ( el.complete && el.naturalWidth !== 0 ) {
            el.classList.remove('loading'),
            el.classList.add('loaded');
          }
        }
      });
      lazyLoadInstance.update();
    }
  }

  // Sticky element
  const mySticky = function () {
    // sticky
    var stickys = document.querySelectorAll('.sticky');
    if ( stickys !=null) {
      for (var i = 0; i < stickys.length; i++) {
        new hcSticky(stickys[i], {
          stickTo: stickys[i].parentNode,
          top: header_offset,
          bottomEnd: 0
        });
      }
    }
  }

  // rotate if scroll
  const myRotate = function () {
    var scroll_el = document.querySelectorAll('.scroll-rotate');

    function scrollRotate() {
      for (var i = 0; i < scroll_el.length; i++) {
        scroll_el[i].style.transform = "rotate(" + window.pageYOffset/2 + "deg)";
      }
    }

    window.onscroll = function () {
      if ( scroll_el !=null) {
        scrollRotate();
      }
    };
  }

  // wow animate
  const myWow = function () {
    new WOW().init();
  }

  // Navbar if scroll down
  const myNavigation = function () {
    var scrollpos = document.body.scrollTop || document.documentElement.scrollTop;
    var nav_one = document.querySelector(".nav-top");

    // navbar on scroll
    var add_class_on_scroll3 = function add_class_on_scroll3() {
      return nav_one.classList.add("shadow");
    };
    var remove_class_on_scroll3 = function remove_class_on_scroll3() {
      return nav_one.classList.remove("shadow");
    };

    var navCustom3 = function navCustom3() {
      if ( nav_one !=null) {
        var nav_one_height = nav_one.offsetHeight;
      } else {
        var nav_one_height = header_offset;
      }
      scrollpos = document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollpos >= nav_one_height) {
        add_class_on_scroll3();
      } else {
        remove_class_on_scroll3();
      }
    }
    
    if ( nav_one !=null) {
      // if nav start not in top and not scroll
      window.addEventListener('load', function () {
        navCustom3();
      });

      // if nav scroll
      window.addEventListener('scroll', function () {
        navCustom3();
      });
    }
  }

  // Custom JS
  const myCustom = function () {
    
    // insert your javascript in here

  }

  /**
   * ------------------------------------------------------------------------
   * Launch Functions
   * ------------------------------------------------------------------------
   */
  
  myJarallax();
  myLightgallery();
  myTyped();
  myBacktotop();
  myPreloader();
  mySticky();
  myLazyload();
  myRotate();
  myWow();
  myNavigation();
  myCustom();

})();