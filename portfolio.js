// Dynamic title changing
const titles = ["Blockchain Developer", "Blockchain & Web Developer"]
let titleIndex = 0
const dynamicTitle = document.getElementById("dynamic-title")

function changeTitle() {
  titleIndex = (titleIndex + 1) % titles.length
  dynamicTitle.textContent = titles[titleIndex]
}

// Change title every 3 seconds
setInterval(changeTitle, 3000)

// Navigation functionality
const navLinks = document.querySelectorAll(".nav-link")
const navLinksMobile = document.querySelectorAll(".nav-link-mobile")
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const mobileMenu = document.querySelector(".mobile-menu")
const sections = document.querySelectorAll("section")

// Mobile menu toggle
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
  const icon = mobileMenuBtn.querySelector("i")
  if (mobileMenu.classList.contains("active")) {
    icon.className = "fas fa-times"
  } else {
    icon.className = "fas fa-bars"
  }
})

// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
  // Close mobile menu if open
  mobileMenu.classList.remove("active")
  mobileMenuBtn.querySelector("i").className = "fas fa-bars"
}

// Add click listeners to navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const sectionId = e.target.getAttribute("data-section")
    scrollToSection(sectionId)
  })
})

navLinksMobile.forEach((link) => {
  link.addEventListener("click", (e) => {
    const sectionId = e.target.getAttribute("data-section")
    scrollToSection(sectionId)
  })
})

// Add click listeners to buttons that navigate to sections
document.querySelectorAll("[data-section]").forEach((button) => {
  button.addEventListener("click", (e) => {
    const sectionId = e.target.closest("[data-section]").getAttribute("data-section")
    scrollToSection(sectionId)
  })
})

// Active section detection on scroll
function updateActiveSection() {
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Update desktop navigation
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("data-section") === sectionId) {
          link.classList.add("active")
        }
      })
    }
  })
}

// Parallax effect for hero grid
function updateParallax() {
  const scrollY = window.scrollY
  const heroGrid = document.querySelector(".hero-grid")
  if (heroGrid) {
    heroGrid.style.transform = `translateY(${scrollY * 0.5}px)`
  }
}

// Scroll event listener
window.addEventListener("scroll", () => {
  updateActiveSection()
  updateParallax()
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".about-card, .skill-card, .project-card, .experience-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Smooth reveal animation for sections
const revealElements = document.querySelectorAll(".section-header, .hero-content")
revealElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
})

// Reveal sections on load
window.addEventListener("load", () => {
  setTimeout(() => {
    revealElements.forEach((el) => {
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    })
  }, 300)
})

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.05) translateY(-10px)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1) translateY(0)"
  })
})

// Add click effects to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    // Create ripple effect
    const ripple = document.createElement("span")
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple effect styles
const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateActiveSection()

  // Add loading animation
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  window.addEventListener("load", () => {
    document.body.style.opacity = "1"
  })
})

// Handle resize events
window.addEventListener("resize", () => {
  // Close mobile menu on resize
  if (window.innerWidth > 768) {
    mobileMenu.classList.remove("active")
    mobileMenuBtn.querySelector("i").className = "fas fa-bars"
  }
})

// Add scroll-to-top functionality
let scrollToTopBtn

function createScrollToTopButton() {
  scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollToTopBtn.className = "scroll-to-top"
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(to right, #2563eb, #0891b2);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.25);
    `

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })

  document.body.appendChild(scrollToTopBtn)
}

// Show/hide scroll to top button
window.addEventListener("scroll", () => {
  if (!scrollToTopBtn) createScrollToTopButton()

  if (window.scrollY > 500) {
    scrollToTopBtn.style.opacity = "1"
    scrollToTopBtn.style.visibility = "visible"
  } else {
    scrollToTopBtn.style.opacity = "0"
    scrollToTopBtn.style.visibility = "hidden"
  }
})
