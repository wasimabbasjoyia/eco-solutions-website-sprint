// script.js

document.addEventListener('DOMContentLoaded', () => {
  // This ensures our script runs only after the entire HTML document has been loaded and parsed.
  
  // =========================================================
  // 1. Mobile Navigation Toggle
  //    - Toggles the 'nav-open' class on the main navigation
  //    - Closes the nav automatically when a link inside it is clicked
  // =========================================================
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mainNav = document.querySelector('.main-nav');
  
  if (hamburgerMenu && mainNav) {
    hamburgerMenu.addEventListener('click', () => {
      // Toggle the 'nav-open' class to show/hide the mobile menu
      mainNav.classList.toggle('nav-open');
    });
    
    // Add event listeners to all navigation links within the main nav
    // This ensures the mobile menu closes when a link is tapped
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        // If the mobile nav is currently open, close it
        if (mainNav.classList.contains('nav-open')) {
          mainNav.classList.remove('nav-open');
        }
      });
    });
  }
  
  // =========================================================
  // 2. Smooth Scrolling for Navigation Links
  //    - Overrides default jump behavior for internal anchor links
  //    - Smoothly scrolls to the target section
  //    - Updates the URL hash without a hard jump (for better history)
  // =========================================================
  // Selects all anchor tags whose 'href' attribute starts with '#'
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault(); // Stop the browser's default jump-to-anchor behavior
      
      const targetId = this.getAttribute('href'); // Get the ID from the href (e.g., "#about")
      const targetElement = document.querySelector(targetId); // Find the element with that ID
      
      if (targetElement) {
        // Use the scrollIntoView method for smooth scrolling
        // 'behavior: "smooth"' makes the scroll animated
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Optional: Update the URL hash.
        // This changes the URL (e.g., adds #about) without forcing a page reload/jump,
        // which is good for user history and direct linking.
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // =========================================================
  // 3. Active Navigation Link on Scroll (Intersection Observer)
  //    - Highlights the current section's link in the header navigation
  //      as the user scrolls through the page.
  // =========================================================
  const sections = document.querySelectorAll('main section'); // Select all main sections
  const navLinks = document.querySelectorAll('.main-nav a'); // Select all navigation links
  
  // Configuration for the Intersection Observer
  const observerOptions = {
    root: null, // 'null' means the viewport is the root
    rootMargin: '0px', // No margin around the root
    threshold: 0.7 // A section is considered 'intersecting' when 70% of it is visible
  };
  
  // Callback function to execute when observed sections enter or exit the viewport
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // If a section is intersecting (i.e., visible enough in the viewport):
        
        // First, remove the 'active' class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Then, find the nav link that corresponds to the currently intersecting section
        const currentSectionId = entry.target.id;
        const correspondingLink = document.querySelector(`.main-nav a[href="#${currentSectionId}"]`);
        
        // If a corresponding link is found, add the 'active' class to it
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  // Loop through each section and tell the observer to watch it
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // =========================================================
  // 4. Contact Form Client-Side Validation
  //    - Prevents form submission if required fields are empty or invalid
  //    - Displays specific error messages to the user
  //    - Adds/removes 'error' classes for visual feedback via CSS
  // =========================================================
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Stop the form from submitting immediately
      
      let isValid = true; // Flag to track if the entire form is valid
      
      // --- Validate Name Input ---
      const nameInput = document.getElementById('name');
      // 'nextElementSibling' assumes your error message span is right after the input
      const nameError = nameInput.nextElementSibling;
      if (nameInput.value.trim() === '') { // 'trim()' removes whitespace from both ends
        isValid = false;
        nameInput.classList.add('error'); // Add error class for CSS styling
        nameError.textContent = 'Name cannot be empty.'; // Set specific error message
        nameError.classList.add('show'); // Show the error message
      } else {
        nameInput.classList.remove('error'); // Remove error classes if valid
        nameError.classList.remove('show');
      }
      
      // --- Validate Email Input ---
      const emailInput = document.getElementById('email');
      const emailError = emailInput.nextElementSibling;
      // A simple regex for basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        emailInput.classList.add('error');
        emailError.textContent = 'Please enter a valid email address.';
        emailError.classList.add('show');
      } else {
        emailInput.classList.remove('error');
        emailError.classList.remove('show');
      }
      
      // --- Validate Message Textarea ---
      const messageInput = document.getElementById('message');
      const messageError = messageInput.nextElementSibling;
      if (messageInput.value.trim() === '') {
        isValid = false;
        messageInput.classList.add('error');
        messageError.textContent = 'Message cannot be empty.';
        messageError.classList.add('show');
      } else {
        messageInput.classList.remove('error');
        messageError.classList.remove('show');
      }
      
      // If isValid is still true after all checks, the form can be conceptually submitted
      if (isValid) {
        // In a real application, this is where you would send the form data to a server
        // using Fetch API or XMLHttpRequest.
        // For this example, we'll just show an alert and reset the form.
        
        alert('Thank you for your message! We will get back to you shortly.');
        this.reset(); // Clears all input fields in the form
        
        
      }
    });
  }
});
