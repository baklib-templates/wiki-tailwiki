(function () {
    "use strict";
  
    /***********************************/
    /*     Customizer Js             
    /*     by Ari budin               
     ==================================*/
    function changeTheme(color) {
      document.documentElement.className = document.documentElement.className.replace(/\btheme-\S+/g, '');
      document.documentElement.classList.add(`theme-${color}`);
    }
  
    function saveTheme(color) {
      localStorage.setItem('selectedTheme', color);
    }
  
    function loadTheme() {
      const savedColor = localStorage.getItem('selectedTheme');
      if (savedColor) {
        changeTheme(savedColor);
        // Set active class to the correct button
        const colorButton = document.querySelector(`.relative button[data-color="${savedColor}"]`);
        if (colorButton) {
          colorButtons.forEach(btn => btn.classList.remove('active'));
          colorButton.classList.add('active');
        }
      }
    }
  
    function changeNeutralTheme(neutral) {
      document.documentElement.className = document.documentElement.className.replace(/\bcolor-\S+/g, '');
      document.documentElement.classList.add(`color-${neutral}`);
    }
  
    function saveNeutralTheme(neutral) {
      localStorage.setItem('selectedNeutralTheme', neutral);
    }
  
    function loadNeutralTheme() {
      const savedNeutral = localStorage.getItem('selectedNeutralTheme');
      if (savedNeutral) {
        changeNeutralTheme(savedNeutral);
        // Set active class to the correct button
        const neutralButton = document.querySelector(`.relative button[data-neutral="${savedNeutral}"]`);
        if (neutralButton) {
          neutralButtons.forEach(btn => btn.classList.remove('active'));
          neutralButton.classList.add('active');
        }
      }
    }
  
    function toggleDarkMode() {
      const htmlElement = document.documentElement;
      const isDark = htmlElement.classList.toggle('dark');
      localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
    }
  
    function loadDarkMode() {
      const darkMode = localStorage.getItem('darkMode');
      if (darkMode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  
    function toggleDirection() {
      const htmlElement = document.documentElement;
      const isRtl = htmlElement.dir === 'rtl';
      htmlElement.dir = isRtl ? 'ltr' : 'rtl';
      localStorage.setItem('textDirection', htmlElement.dir);
    }
  
    function loadDirection() {
      const direction = localStorage.getItem('textDirection');
      if (direction) {
        document.documentElement.dir = direction;
        document.getElementById('switch-rtl').checked = (direction === 'rtl');
      }
    }
  
    const colorButtons = document.querySelectorAll('.relative button[data-color]');
    colorButtons.forEach(button => {
      button.addEventListener('click', function() {
        colorButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
  
        const color = button.getAttribute('data-color');
        changeTheme(color);
        saveTheme(color);
      });
    });
  
    const neutralButtons = document.querySelectorAll('.relative button[data-neutral]');
    neutralButtons.forEach(button => {
      button.addEventListener('click', function() {
        neutralButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
  
        const neutral = button.getAttribute('data-neutral');
        changeNeutralTheme(neutral);
        saveNeutralTheme(neutral);
      });
    });
  
    const lightDarkButton = document.getElementById('lightdark');
    if (lightDarkButton) {
        lightDarkButton.addEventListener('click', toggleDarkMode);
    }
  
    const switchRtl = document.getElementById('switch-rtl');
    if (switchRtl) {
        switchRtl.addEventListener('change', toggleDirection);
    }
  
    window.addEventListener('load', () => {
      loadTheme();
      loadNeutralTheme();
      loadDarkMode();
      loadDirection();
    });
  
    (function() {
      const darkMode = localStorage.getItem('darkMode');
      if (darkMode === 'dark') {
        document.documentElement.classList.add('dark');
      }
    })();
  })();
  