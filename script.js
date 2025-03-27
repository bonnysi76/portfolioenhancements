function toggleMenu() {
  const menu = document.querySelector(".menu-links")
  const icon = document.querySelector(".hamburger-icon")
  menu.classList.toggle("open")
  icon.classList.toggle("open")
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    })
  })
})

// Typing animation for the title
function typeEffect(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  const timer = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
    } else {
      clearInterval(timer)
    }
  }, speed)
}

// Animate elements when they come into view
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Apply typing effect to the name
  const titleElement = document.querySelector(".title")
  if (titleElement && titleElement.textContent.includes("Bonny Modipa")) {
    const originalText = titleElement.textContent
    typeEffect(titleElement, originalText, 150)
  }

  // Observe sections for scroll animations
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section)
  })

  // Observe skill items for staggered animations
  document.querySelectorAll("article").forEach((article, index) => {
    article.style.transitionDelay = `${index * 0.1}s`
    observer.observe(article)
  })

  // Add particle background to profile section
  setupParticles()
})

// Progress bars for skills
document.querySelectorAll("article").forEach((article) => {
  const skillLevel = article.querySelector("p").textContent
  const skillBar = document.createElement("div")
  skillBar.className = "skill-bar"

  const progressBar = document.createElement("div")
  progressBar.className = "progress"

  if (skillLevel.includes("Experienced")) {
    progressBar.style.width = "85%"
  } else if (skillLevel.includes("Intermediate")) {
    progressBar.style.width = "65%"
  } else {
    progressBar.style.width = "45%"
  }

  skillBar.appendChild(progressBar)
  article.appendChild(skillBar)
})

// Particle background effect
function setupParticles() {
  const profileSection = document.getElementById("profile")
  if (!profileSection) return

  const particleContainer = document.createElement("div")
  particleContainer.className = "particles-container"
  profileSection.appendChild(particleContainer)

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`
    particle.style.animationDuration = `${Math.random() * 10 + 5}s`
    particle.style.animationDelay = `${Math.random() * 5}s`
    particleContainer.appendChild(particle)
  }
}

// Dark mode toggle
function setupDarkModeToggle() {
  const toggle = document.createElement("div")
  toggle.className = "dark-mode-toggle"
  toggle.innerHTML = "🌙"
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark")
    toggle.innerHTML = document.body.classList.contains("dark") ? "☀️" : "🌙"
  })
  document.body.appendChild(toggle)
}

setupDarkModeToggle()

