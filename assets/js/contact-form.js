// Custom Contact Form - Google Forms Integration
// This script submits form data to Google Forms while maintaining a custom UI

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const formStatus = document.getElementById('formStatus');

    // Google Form URL and Entry IDs
    const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSfpaAtrnGyw7aFtERAcr0ynOBeszr06SzGwuExdgv3NmoxJ2Q/formResponse';

    const ENTRY_IDS = {
        firstName: 'entry.2088169774',
        lastName: 'entry.548310488',
        email: 'entry.706187133',
        subject: 'entry.1881702505',
        message: 'entry.1806757318'
    };

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        formStatus.className = 'form-status';
        formStatus.style.display = 'none';

        // Get form values
        const formData = new FormData();
        formData.append(ENTRY_IDS.firstName, document.getElementById('firstName').value);
        formData.append(ENTRY_IDS.lastName, document.getElementById('lastName').value);
        formData.append(ENTRY_IDS.email, document.getElementById('email').value);
        formData.append(ENTRY_IDS.subject, document.getElementById('subject').value);
        formData.append(ENTRY_IDS.message, document.getElementById('message').value);

        try {
            // Submit to Google Forms
            await fetch(GOOGLE_FORM_ACTION, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Required for cross-origin requests to Google Forms
            });

            // Show success message
            formStatus.className = 'form-status success';
            formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';

            // Reset form
            form.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);

        } catch (error) {
            // Show error message
            formStatus.className = 'form-status error';
            formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again.';
            console.error('Form submission error:', error);
        } finally {
            // Re-enable submit button and remove loading state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });

    // Add input validation feedback
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = 'rgba(239, 68, 68, 0.5)';
            } else {
                this.style.borderColor = '';
            }
        });

        input.addEventListener('input', function () {
            if (this.value.trim() !== '') {
                this.style.borderColor = '';
            }
        });
    });
});
