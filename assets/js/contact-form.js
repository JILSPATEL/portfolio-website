// ==========================================================================
// CUSTOM CONTACT FORM - GOOGLE FORMS INTEGRATION
// Seamlessly submits form data to Google Forms while providing a custom modern UX
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn = form.querySelector('.submit-btn');
    const formStatus = document.getElementById('formStatus');

    // Google Form Action URL & Entry IDs
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

        // Disable button & trigger loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        if (formStatus) {
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';
        }

        // Collect form fields
        const formData = new FormData();
        formData.append(ENTRY_IDS.firstName, document.getElementById('firstName').value.trim());
        formData.append(ENTRY_IDS.lastName, document.getElementById('lastName').value.trim());
        formData.append(ENTRY_IDS.email, document.getElementById('email').value.trim());
        formData.append(ENTRY_IDS.subject, document.getElementById('subject').value.trim());
        formData.append(ENTRY_IDS.message, document.getElementById('message').value.trim());

        try {
            await fetch(GOOGLE_FORM_ACTION, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Required for cross-origin submission to Google Forms
            });

            if (formStatus) {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. I will get back to you shortly.';
                formStatus.style.display = 'block';
            }

            form.reset();

            // Clear success message after 6 seconds
            setTimeout(() => {
                if (formStatus) formStatus.style.display = 'none';
            }, 6000);

        } catch (error) {
            if (formStatus) {
                formStatus.className = 'form-status error';
                formStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Something went wrong while submitting. Please feel free to email me directly at <a href="mailto:201430142023.cse.jils@gmail.com" style="color: #ffffff; text-decoration: underline;">201430142023.cse.jils@gmail.com</a>.';
                formStatus.style.display = 'block';
            }
            console.error('Contact Form Submission Error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });

    // Realtime input validation border indicator
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.hasAttribute('required') && this.value.trim() === '') {
                this.style.borderColor = 'rgba(239, 68, 68, 0.6)';
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
