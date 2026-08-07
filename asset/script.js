/**
 * XI-1 Saintek - Main JavaScript
 * Website Kelas SMA PGRI 3 Jakarta
 */

document.addEventListener('DOMContentLoaded', () => {

  const firebaseConfig = {
        apiKey: "AIzaSyDFRslV-wFwbmYGr7s0Lk17pXGm0Tq8NQM",
        authDomain: "website-kelas-v3.firebaseapp.com",
        databaseURL: "https://website-kelas-v3-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "website-kelas-v3",
        storageBucket: "website-kelas-v3.appspot.com",
        messagingSenderId: "812973677269",
        appId: "1:812973677269:web:6bd751c8d98bbb0822605c",
        measurementId: "G-N9N6XH85KB"
    };
  
  setTimeout(() => {
    initTheme();
    initNavigation();
    initTypingEffect();
    initTabsSystem();
    initStudentsSection();
    initHomeroomSection();
    initCurrentYear();
    initStarsBackground();
    
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
      });
    }
  }, 1500);
});

// Preloader
function initPreloader() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 2000);
}

// Theme Toggle
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  const savedTheme = localStorage.getItem('theme');
  const isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches);
  
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    updateThemeIcons(true);
  }
  
  function updateThemeIcons(isDark) {
    const navIcon = themeToggle.querySelector('i');
    if (isDark) {
      navIcon.classList.remove('fa-moon');
      navIcon.classList.add('fa-sun');
    } else {
      navIcon.classList.remove('fa-sun');
      navIcon.classList.add('fa-moon');
    }
  }
  
  themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    updateThemeIcons(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });
}

// Navigation
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileClose = document.getElementById('mobile-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const body = document.body;
  
  const backdrop = document.createElement('div');
  backdrop.classList.add('mobile-backdrop');
  body.appendChild(backdrop);
  
  function openMobileMenu() {
    mobileMenu.classList.add('active');
    backdrop.classList.add('active');
    body.classList.add('no-scroll');
  }
  
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    backdrop.classList.remove('active');
    body.classList.remove('no-scroll');
  }
  
  mobileMenuToggle.addEventListener('click', openMobileMenu);
  mobileClose.addEventListener('click', closeMobileMenu);
  backdrop.addEventListener('click', closeMobileMenu);
  
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 100)) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        window.scrollTo({
          top: targetElement.offsetTop - navbarHeight - 20,
          behavior: 'smooth'
        });
      }
    });
  });
  
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', () => {
      backToTop.style.opacity = window.scrollY > 500 ? '1' : '0';
      backToTop.style.visibility = window.scrollY > 500 ? 'visible' : 'hidden';
    });
  }
}

// Typing Effect
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;
  
  const phrases = [
    'Welcome To Website XI.1 Saintek',
    'Kelas Lantai 3',
    'Bersama Kita Bisa! 💪'
  ];
  
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let pauseDuration = 1500;
  
  function typeText() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = pauseDuration;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    }
    
    setTimeout(typeText, typingSpeed);
  }
  
  typeText();
}

// Tabs System
function initTabsSystem() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      button.classList.add('active');
      document.getElementById(`${tabId}-content`).classList.add('active');
    });
  });
}

// Students Section
function initStudentsSection() {
  const studentsGrid = document.querySelector('.students-grid');
  if (!studentsGrid) return;
  
  const students = [
    { name: 'Akhtar Jaya Wardhana', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Azhar Aziz Hamdani', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Bagus Raditya Faturrahman', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Damar Cahyo Panuluh', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Dewi Thoatika Nurjanah', gender: 'Perempuan', icon: 'fas fa-user' },
    { name: 'Eka Puspita Novita Damayanti', gender: 'Perempuan', icon: 'fas fa-user' },
    { name: 'Evan Al Rasyid', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Fadel Shafwan Maliki', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Faqih Arya Pasha', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Fazril Ilyas', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Firdaus Ilham', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Fitri Lailan Najmi', gender: 'Perempuan', icon: 'fas fa-user' },
    { name: 'Intan Aliyana', gender: 'Perempuan', icon: 'fas fa-user' },
    { name: 'Jenius Hosevan Simon Panjaitan', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Juwita Apriyani', gender: 'Perempuan', icon: 'fas fa-user' },
    { name: 'Kayla Khalidah Tajudin', gender: 'Perempuan', icon: 'fas fa-user' },
    { name: 'Keyla Nur Hasanah', gender: 'Perempuan', icon: 'fas fa-user' },
    { name: 'Khoirul Anisa Putri', gender: 'Perempuan', icon: 'fas fa-user' },
    { name: 'Lequinsha Zalyandra Bilqis', gender: 'Perempuan', icon: 'fas fa-user' },
    { name: 'Lintang Azzalea Pratama', gender: 'Perempuan', icon: 'fas fa-user' },
    { name: 'Lutfiah Thalita Azmi', gender: 'Perempuan', icon: 'fas fa-user' },
    { name: 'Miftah Khoiron Ramadhan', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Moura Dealova Kanza Adiba T.', gender: 'Perempuan', icon: 'fas fa-user' },
    { name: 'Muhammad Rizky Maulana', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Muhammad Adelio Faustin AB', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Nabilla Oktavia Andini', gender: 'Perempuan', icon: 'fas fa-user' },
    { name: 'Nova Zaidah', gender: 'Perempuan', icon: 'fas fa-user' },
    { name: 'Poros Baroki Bumas', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Rayiandra Abinaya', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Rizqi Khoiril Ibad', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Steven Febrian Pratama', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Zafir Raihan Basri', gender: 'Laki-Laki', icon: 'fas fa-user' },
    { name: 'Zalfa Zahirah', gender: 'Perempuan', icon: 'fas fa-user' }
  ];
  
  students.forEach((student, index) => {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.style.animationDelay = `${index * 50}ms`;
    
    const genderColor = student.gender === 'Laki-Laki' ? '#4f46e5' : '#ec4899';
    const genderIcon = student.gender === 'Laki-Laki' ? 'fas fa-mars' : 'fas fa-venus';
    
    card.innerHTML = `
      <div class="student-avatar" style="background: linear-gradient(135deg, ${genderColor}, ${genderColor}cc);">
        <i class="${student.icon}"></i>
      </div>
      <h3 class="student-name">${student.name}</h3>
      <p class="student-gender"><i class="${genderIcon}"></i> ${student.gender}</p>
      <span class="student-badge">Siswa XI-1</span>
    `;
    
    studentsGrid.appendChild(card);
  });
}

// Homeroom Section
function initHomeroomSection() {
  const homeroomGrid = document.querySelector('.homeroom-grid');
  if (!homeroomGrid) return;
  
  const homeroom = {
    name: 'Ibu Afrinawati, M.Pd',
    role: 'Wali Kelas XI-1 Saintek',
    subject: 'Guru',
    icon: 'fas fa-chalkboard-teacher'
  };
  
  const card = document.createElement('div');
  card.className = 'homeroom-card';
  
  card.innerHTML = `
    <div class="homeroom-icon">
      <i class="${homeroom.icon}"></i>
    </div>
    <h3 class="homeroom-name">${homeroom.name}</h3>
    <p class="homeroom-role">${homeroom.role}</p>
    <p class="homeroom-subject">${homeroom.subject}</p>
    <span class="homeroom-badge">Pembimbing Kelas</span>
  `;
  
  homeroomGrid.appendChild(card);
}

// Current Year
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Stars Background
function initStarsBackground() {
  const starsContainer = document.getElementById('stars-background');
  if (!starsContainer) return;
  
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2 + 1;
    const opacity = Math.random() * 0.7 + 0.3;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    
    star.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background-color: white;
      opacity: ${opacity};
      left: ${x}%;
      top: ${y}%;
      animation: twinkle ${duration}s infinite alternate;
    `;
    
    starsContainer.appendChild(star);
  }
}
