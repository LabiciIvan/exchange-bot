let loginForm = document.querySelector('.login-form');

const loadLoginForm =  () => {
    
    gsap.from(".login-form", {
        opacity: 0, 
        y: -100, 
        duration: 1
      });
}


loadLoginForm();