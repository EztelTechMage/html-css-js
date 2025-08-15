// Document ready function to ensure document object model is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer copyright
    // btw what is the use of this footer copyright
// some say its for proffesional looking daw ser
    document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar scroll effect - adds shadow and reduces padding when scrolling
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to top button functionality modal
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // the click effect to change background color i just found it at w3 schools but i ask ai uncle how to implement and how it works
    // also i add my favorite colors
    document.querySelectorAll('.card-title').forEach(title => {
        title.addEventListener('click', function() {
            // Array of possible background colors
            const colors = [
                '#f8f9fa', // Light gray
                '#e9ecef', // Lighter gray
                '#dee2e6', // Gray
                '#ced4da', // Dark gray
                '#0d6efd', // Primary blue
                '#198754', // Success green
                '#ffc107', // Warning yellow
                '#0dcaf0'  // Info teal
            ];
            
            // this one is to Select a random color from the array of colors
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Apply the color to the projects section background
            document.getElementById('projects').style.backgroundColor = randomColor;
            
            // Add a temporary class for a smooth transition effect OwO
            const projectsSection = document.getElementById('projects');
            projectsSection.classList.add('color-transition');
            
            // Remove the transition class after the animation completes
            setTimeout(() => {
                projectsSection.classList.remove('color-transition');
            }, 500);
        });
    });

    // this one below is a validation with custom feedback i get it when i ask about validation of contacts
    // 
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Prevent form submission if validation fails
            if (!this.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                // Form is valid - show success message and reset form
                event.preventDefault();
                
                // Create a custom alert element instead of using default alert()
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success alert-dismissible fade show';
                alertDiv.setAttribute('role', 'alert');
                alertDiv.innerHTML = `
                    <strong>Thank you!</strong> Your message has been sent successfully.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;
                
                // Insert the alert before the form
                contactForm.parentNode.insertBefore(alertDiv, contactForm);
                
                // Remove the alert after 5 seconds
                setTimeout(() => {
                    alertDiv.classList.remove('show');
                    setTimeout(() => {
                        alertDiv.remove();
                    }, 150); // Wait for fade out to complete
                }, 5000);
                
                // Reset the form
                this.reset();
                this.classList.remove('was-validated');
            }
            
            // Add Bootstrap's validation class
            this.classList.add('was-validated');
        }, false);
    }

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial check and then on scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Enhanced hover effect for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // Social icons click effect with more functionality
    document.querySelectorAll('.social-icons a').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get which social platform was clicked
            const platform = this.querySelector('i').className.split(' ')[1].replace('fa-', '');
            
            // Create a custom modal for demo purposes
            const demoModal = new bootstrap.Modal(document.createElement('div'));
            const modalContent = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${platform.charAt(0).toUpperCase() + platform.slice(1)} Link</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>This would normally redirect to your ${platform} profile.</p>
                            <p>In a real implementation, you would replace the # in the href with your actual profile URL.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            `;
            
            demoModal._element.className = 'modal fade';
            demoModal._element.innerHTML = modalContent;
            document.body.appendChild(demoModal._element);
            demoModal.show();
        });
    });
});

// Function to toggle mobile menu (alternative to Bootstrap's toggle)
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}