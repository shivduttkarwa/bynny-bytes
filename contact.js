
      // Form submission handling
      document
        .getElementById("contactForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          // Get form data
          const formData = new FormData(this);
          const selectedMeals = [];
          const checkboxes = document.querySelectorAll(
            'input[name="meals[]"]:checked'
          );

          checkboxes.forEach((checkbox) => {
            const mealCard = checkbox.nextElementSibling;
            const mealName = mealCard.querySelector(".meal-name").textContent;
            const mealPrice = mealCard.querySelector(".meal-price").textContent;
            selectedMeals.push(`${mealName} (${mealPrice})`);
          });

          // Show success message
          const submitBtn = document.querySelector(".submit-btn");
          const originalText = submitBtn.innerHTML;

          submitBtn.innerHTML =
            '<i class="fas fa-check"></i> Order Request Sent!';
          submitBtn.style.background =
            "linear-gradient(135deg, var(--bunny-green) 0%, #7cb342 100%)";

          // Reset form after 3 seconds
          setTimeout(() => {
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = "";

            // Show confirmation alert
            alert(
              `Thank you! We've received your order request for:\n\n${selectedMeals.join(
                "\n"
              )}\n\nWe'll contact you within 24 hours to confirm your order.`
            );
          }, 2000);
        });

      // Add ripple effect to buttons
      document.addEventListener("click", function (e) {
        if (
          e.target.classList.contains("submit-btn") ||
          e.target.classList.contains("back-home")
        ) {
          createRipple(e, e.target);
        }
      });

      function createRipple(event, element) {
        const circle = document.createElement("span");
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;
        const rect = element.getBoundingClientRect();

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.style.position = "absolute";
        circle.style.borderRadius = "50%";
        circle.style.background = "rgba(255, 255, 255, 0.3)";
        circle.style.transform = "scale(0)";
        circle.style.animation = "ripple 0.6s linear";
        circle.style.pointerEvents = "none";

        element.style.position = "relative";
        element.style.overflow = "hidden";
        element.appendChild(circle);

        setTimeout(() => {
          circle.remove();
        }, 600);
      }

      // Add ripple animation CSS
      const style = document.createElement("style");
      style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
      document.head.appendChild(style);

      // Smooth scrolling for any anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });
   