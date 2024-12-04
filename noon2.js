// دالة لإزالة أيقونة "checkmark" من كل الديفات
function removeCheckmarks() {
    const checkmarks = document.querySelectorAll('.cvss');
    checkmarks.forEach(function(icon) {
        icon.remove();
    });
}

// دالة لإضافة الأيقونة عند الضغط على ديف
function addCheckmark(div) {
    // التأكد من إزالة أي أيقونات سابقة
    removeCheckmarks(); 

    // التحقق من عدم وجود الأيقونة مسبقاً
    if (!div.querySelector('ion-icon')) {
        const icon = document.createElement('ion-icon');
        icon.setAttribute('name', 'checkmark-outline');
        icon.classList.add('cvss');
        div.appendChild(icon);
    }
}

// دالة لتفعيل الوضع الليلي
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode', 'system-mode');
    addCheckmark(document.getElementById('dark-mode')); // إضافة الأيقونة
    localStorage.setItem('theme', 'dark-mode'); // حفظ الوضع في Local Storage
}

// دالة لتفعيل الوضع النهاري
function enableLightMode() {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode', 'system-mode');
    addCheckmark(document.getElementById('light-mode')); // إضافة الأيقونة
    localStorage.setItem('theme', 'light-mode'); // حفظ الوضع في Local Storage
}

// دالة لتفعيل الوضع الافتراضي للجهاز
function enableSystemMode() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDarkScheme) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }

    document.body.classList.add('system-mode');
    addCheckmark(document.getElementById('system-mode')); // إضافة الأيقونة
    localStorage.setItem('theme', 'system-mode'); // حفظ الوضع في Local Storage
}

document.addEventListener('DOMContentLoaded', function() {
    // إضافة المستمعات (Event Listeners) إلى الديفات
    document.getElementById('dark-mode').addEventListener('click', enableDarkMode);
    document.getElementById('light-mode').addEventListener('click', enableLightMode);
    document.getElementById('system-mode').addEventListener('click', enableSystemMode);

    // استرجاع الوضع المخزن عند تحميل الصفحة
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
        enableDarkMode();
    } else if (savedTheme === 'light-mode') {
        enableLightMode();
    } else if (savedTheme === 'system-mode') {
        enableSystemMode();
    }
});







  // Variable to store background image
  let currentBackground = '';
  let isBackgroundSaved = false; // To track if the background is saved

  // Function to set background image
  function setBackground(src, button) {
      const div = document.getElementById('MainBackgroundDiv');

      // Remove checkmark from all buttons
      removeCheckmarks();

      // Set background image
      div.style.backgroundImage = `url(${src})`;
      currentBackground = src; // Save current background

      // Add checkmark to the clicked button
      button.innerHTML += '<ion-icon class="icon-checkmark" name="checkmark-done-outline"></ion-icon>';

      // Clear saved background in localStorage since it needs to be saved explicitly
      localStorage.removeItem('backgroundSrc');
      isBackgroundSaved = false; // Reset save status
  }

  // Function to reset background (remove image)
  function resetBackground() {
      const div = document.getElementById('MainBackgroundDiv');
      div.style.backgroundImage = 'none';  // Remove background image
      removeCheckmarks();
      currentBackground = ''; // Clear current background

      // Clear localStorage
      localStorage.removeItem('backgroundSrc');
      isBackgroundSaved = false; // Reset save status
  }

  // Function to save the current background
  function saveBackground() {
      const saveButton = document.getElementById('SaveBackgroundButton');
      if (!isBackgroundSaved) {
          if (currentBackground) {
              localStorage.setItem('backgroundSrc', currentBackground);
              saveButton.innerHTML = '<span class="material-symbols-outlined solet" style="color: #207fff;">star</span>'; // Change icon to filled star
              isBackgroundSaved = true; // Mark as saved
          } else {
              alert('Please select a background before saving.');
          }
      } else {
          // If already saved, reset to original state
          localStorage.removeItem('backgroundSrc');
          saveButton.innerHTML = '<span class="material-symbols-outlined">star</span>'; // Reset icon to original star
          isBackgroundSaved = false; // Mark as not saved
      }
  }

  // Helper function to remove checkmark icons from all buttons
  function removeCheckmarks() {
      const buttons = document.querySelectorAll('.ImageButton');
      buttons.forEach(button => {
          const checkmark = button.querySelector('.icon-checkmark');
          if (checkmark) {
              checkmark.remove();
          }
      });
  }

  // Function to handle custom image upload
  function uploadCustomBackground(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              const div = document.getElementById('MainBackgroundDiv');
              div.style.backgroundImage = `url(${e.target.result})`;

              // Save the custom image to localStorage
              currentBackground = e.target.result; // Update currentBackground
              localStorage.setItem('backgroundSrc', e.target.result);
              isBackgroundSaved = true; // Mark as saved
          };
          reader.readAsDataURL(file); // Read the file and convert to base64
      }
  }

  // Function to load saved background on page reload
  function loadSavedBackground() {
      const backgroundSrc = localStorage.getItem('backgroundSrc');
      if (backgroundSrc) {
          const div = document.getElementById('MainBackgroundDiv');
          div.style.backgroundImage = `url(${backgroundSrc})`;
          currentBackground = backgroundSrc; // Restore current background
          isBackgroundSaved = true; // Mark as saved
          const saveButton = document.getElementById('SaveBackgroundButton');
          saveButton.innerHTML = '<span class="material-symbols-outlined">star_rate</span>'; // Change icon to filled star
      }
  }

  // Load saved background on page load
  window.onload = loadSavedBackground;