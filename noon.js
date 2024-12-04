
// Links
document.querySelectorAll('a').forEach(function(link) {
    if (!link.getAttribute('href') || link.getAttribute('href') === "") {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // منع النقر
        });
        link.style.pointerEvents = 'none'; // منع التفاعل مع الرابط
        link.style.color = 'gray'; // جعل اللون رمادياً (اختياري)
    }
});




document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.menu_List');

    dropdowns.forEach(dropdown => {
        const dropdownButton = dropdown.querySelector('.chat-button');
        const dropdownContent = dropdown.querySelector('.menu_List_div');
        const links = dropdownContent.querySelectorAll('li');

        // Toggle the dropdown menu on button click
        dropdownButton.onclick = function (event) {
            // Close all other open dropdowns
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    const otherContent = d.querySelector('.menu_List_div');
                    if (otherContent.style.display === 'block') {
                        closeDropdown(otherContent);
                    }
                }
            });

            if (dropdownContent.style.display === 'block') {
                closeDropdown(dropdownContent);
            } else {
                openDropdown(dropdownContent);
            }

            // Stop the event from bubbling up to the window
            event.stopPropagation();
        };

        // Track the last hovered link
        links.forEach(link => {
            link.onmouseover = function () {
                // Remove 'last-hovered' class from all links
                links.forEach(l => l.classList.remove('last-hovered'));
                // Add 'last-hovered' class to the currently hovered link
                link.classList.add('last-hovered');
                dropdownContent.classList.remove('opened');
            };
        });

        // Close the dropdown menu when clicking inside it
        dropdownContent.onclick = function (event) {
            if (event.target.tagName.toLowerCase() === 'li') {
                closeDropdown(dropdownContent);
            }
            event.stopPropagation(); // Prevent the click from closing the dropdown immediately
        };
    });

    // Close all dropdown menus when mousedown outside of them
    window.addEventListener('mousedown', function (event) {
        dropdowns.forEach(dropdown => {
            const dropdownContent = dropdown.querySelector('.menu_List_div');
            if (dropdownContent.style.display === 'block' && !dropdown.contains(event.target)) {
                closeDropdown(dropdownContent);
            }
        });
    });

    function openDropdown(content) {
        content.style.display = 'block';
        content.style.animation = 'slideDown 0.3s ease-out forwards';
        content.classList.add('opened'); // Add class to show hover effect on the first item
    }

    function closeDropdown(content) {
        content.style.animation = 'slideUp 0.3s ease-in forwards';
        setTimeout(() => {
            content.style.display = 'none';
            content.classList.remove('opened'); // Remove hover effect on close
            content.querySelectorAll('li').forEach(l => l.classList.remove('last-hovered')); // Clear last-hovered
        }, 200);
    }
});






// وظيفة لإعادة تحميل الصفحة
function reloadPage() {
    location.reload();
}

// إيقاف التمرير على مستوى الموقع
function disableScroll() {
    document.body.style.overflow = 'hidden';
}

// تفعيل التمرير
function enableScroll() {
    document.body.style.overflow = 'auto';
}

// وظيفة لإخفاء الديف
function hideDiv() {
    const div = document.getElementById('Reload-logo');
    if (div) {
        div.style.opacity = '0'; // تغيير الشفافية لجعل الديف غير مرئي
        setTimeout(() => {
            div.style.display = 'none'; // تغيير العرض بعد أن يكون الديف غير مرئي
            enableScroll(); // تفعيل التمرير بعد إخفاء الديف
        }, 500); // التأخير لمزامنة وقت الانتقال
    }
}

// اختبار سرعة الإنترنت
function getInternetSpeed(callback) {
    const startTime = new Date().getTime();
    const download = new Image();
    download.onload = () => {
        const endTime = new Date().getTime();
        const duration = (endTime - startTime) / 1000; // الزمن المستغرق بالثواني
        const bitsLoaded = 50000 * 8; // حجم الصورة بالبتات
        const speedBps = bitsLoaded / duration; // سرعة الإنترنت بالبت في الثانية
        const speedKbps = speedBps / 1024; // تحويل إلى كيلوبت في الثانية
        callback(speedKbps);
    };
    download.onerror = () => {
        callback(0); // في حالة حدوث خطأ في تحميل الصورة
    };
    download.src = "https://www.google.com/images/phd/px.gif?random=" + Math.random();
}

// وظيفة لإظهار الديف وتشغيل شريط التحميل
function showDiv(speed) {
    const div = document.getElementById('Reload-logo');
    const progressBar = document.getElementById('progress-bar');
    const statusText = document.getElementById('status-text');
    if (div && progressBar && statusText) {
        disableScroll(); // إيقاف التمرير عند إظهار الديف
        div.style.display = 'flex';
        div.style.opacity = '1';

        statusText.innerText = "Loading... Please wait."; // نص توضيحي أثناء التحميل

        let progress = 0;
        const intervalTime = speed > 1000 ? 50 : 200; // سرعة الزيادة تعتمد على سرعة الإنترنت
        const interval = setInterval(() => {
            if (progress < 90) { // السماح بالوصول إلى 90% فقط
                progress += 10; // زيادة التقدم بنسبة 10٪
            } else if (document.readyState === 'complete') {
                // اكتمال التحميل
                progress = 100;
                clearInterval(interval);
                setTimeout(hideDiv, 500); // إخفاء الديف بعد اكتمال شريط التحميل بفترة قصيرة
            }
            progressBar.style.width = progress + '%';
        }, intervalTime);
    }
}

// التحقق من حالة الإنترنت
function checkInternetAndLoad() {
    getInternetSpeed((speed) => {
        showDiv(speed);
    });
}

// إظهار الديف عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    const div = document.getElementById('Reload-logo');
    const statusText = document.getElementById('status-text');
    const progressBar = document.getElementById('progress-bar');
    if (navigator.onLine) {
        checkInternetAndLoad();
    } else if (div && statusText && progressBar) {
        disableScroll();
        div.style.display = 'flex';
        div.style.opacity = '1';
        statusText.innerText = "Internet disconnected.";
        progressBar.style.width = '0%';
    }
});

// التعامل مع قطع الاتصال
window.addEventListener('offline', () => {
    const div = document.getElementById('Reload-logo');
    const statusText = document.getElementById('status-text');
    if (div && statusText) {
        disableScroll();
        div.style.display = 'flex';
        div.style.opacity = '1';
        statusText.innerText = "Internet disconnected.";
        document.getElementById('progress-bar').style.width = '0%';
    }
});

// التعامل مع عودة الاتصال
window.addEventListener('online', () => {
    checkInternetAndLoad();
});

// اكتمال شريط التحميل عند تحميل جميع الموارد
window.addEventListener('load', () => {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = '100%';
        setTimeout(hideDiv, 500); // إخفاء الديف بعد اكتمال شريط التحميل بفترة قصيرة
    }
});


// ------------------------------------------------

// اعدادات الإنترنت
function openInternetSettings() {
    if (navigator.userAgent.indexOf('Windows NT') !== -1) {
        // فتح إعدادات الشبكة على نظام تشغيل Windows
        window.open('ms-settings:network', '_blank');
    } else if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
        // لا توجد طريقة لفتح إعدادات الشبكة مباشرة في نظام macOS عبر المتصفح
        alert("لا يمكن فتح إعدادات الإنترنت على macOS مباشرة من المتصفح. يرجى فتح إعدادات النظام يدويًا.");
    } else {
        alert("نظام التشغيل غير مدعوم.");
    }
}

// -------------------------------------------------





// متموج
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
  
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
  
    ripple.classList.add("ripple");
  
    button.appendChild(ripple);
  
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  // //////////////
  

  document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggleButton2");
    const toggleDiv = document.getElementById("toggleDiv2");

    // استرجاع حالة الديف من localStorage عند تحميل الصفحة
    const divState = localStorage.getItem("toggleDivState");
    if (divState === "visible") {
        toggleDiv.style.display = "block";
        toggleButton.innerHTML = '<div class="rrol"><span id="material-symbols-outlined" class="material-symbols-outlined material">arrow_back</span><div>';
    } else {
        toggleDiv.style.display = "none";
        toggleButton.innerHTML = '<span id="material-symbols-outlined" class="material-symbols-outlined material">more_horiz</span>';
    }

    toggleButton.addEventListener("click", function() {
        if (toggleDiv.style.display === "block") {
            // إذا كان الديف ظاهرًا، قم بتطبيق الرسوم المتحركة للإخفاء
            toggleDiv.style.animation = "hideDiv 0.5s forwards";
            setTimeout(() => {
                toggleDiv.style.display = "none";
                localStorage.setItem("toggleDivState", "hidden"); // حفظ الحالة كمخفي
            }, 500); // نفس مدة الرسوم المتحركة
            toggleButton.innerHTML = '<span id="material-symbols-outlined" class="material-symbols-outlined material">more_horiz</span>';
        } else {
            // إذا كان الديف مخفيًا، قم بتطبيق الرسوم المتحركة للظهور
            toggleDiv.style.display = "block";
            toggleDiv.style.animation = "showDiv 0.5s forwards";
            localStorage.setItem("toggleDivState", "visible"); // حفظ الحالة كظاهر
            toggleButton.innerHTML = '<div class="rrol"><span id="material-symbols-outlined" class="material-symbols-outlined material">arrow_back</span></div>';
        }
    });
});







    document.addEventListener('DOMContentLoaded', (event) => {
        const toggleButton = document.getElementById('toggleButton');
        const content = document.getElementById('content');
        const content2 = document.getElementById('content2');
        const isContentVisible = localStorage.getItem('contentVisible') === 'true';
    
        if (isContentVisible) {
            content.classList.remove('hi');
            content2.classList.remove('hi');
            toggleButton.innerHTML = '<div class="rrol"><span id="material-symbols-outlined" class="material-symbols-outlined material">close</span></div>';
        } else {
            content.classList.add('hi');
            content2.classList.add('hi');
            toggleButton.innerHTML = '<span id="material-symbols-outlined" class="material-symbols-outlined material">filter_list</span>';
        }
    
        toggleButton.addEventListener('click', () => {
            const isCurrentlyVisible = !content.classList.contains('hi');
            
            if (isCurrentlyVisible) {
                content.classList.add('hi');
                content2.classList.add('hi');
                toggleButton.innerHTML = '<span id="material-symbols-outlined" class="material-symbols-outlined material">filter_list</span>';
                localStorage.setItem('contentVisible', 'false');
            } else {
                content.classList.remove('hi');
                content2.classList.remove('hi');
                toggleButton.innerHTML = '<div class="rrol"><span id="material-symbols-outlined" class="material-symbols-outlined material">close</span></div>';
                localStorage.setItem('contentVisible', 'true');
            }
        });
    });
    



    









    document.addEventListener('click', function(event) {
        const target = event.target;
        
        // Toggle the display of the divs when clicking on the buttons
        if (target.matches('.show-btn')) {
            const targetId = target.getAttribute('data-target');
            const targetDiv = document.getElementById(targetId);
            if (!targetDiv.classList.contains('visible')) {
                // Show the div
                targetDiv.classList.add('visible');
                targetDiv.classList.remove('coffees');
                targetDiv.style.display = 'block';
            } else {
                // Hide the div
                targetDiv.classList.remove('visible');
                targetDiv.classList.add('coffees');
                targetDiv.style.display = 'none';
            }
        }
    
        // Hide the div when clicking on the hide button inside it
        if (target.matches('.hide-btn')) {
            const targetId = target.getAttribute('data-target');
            const targetDiv = document.getElementById(targetId);
            targetDiv.classList.remove('visible');
            targetDiv.classList.add('coffees');
            targetDiv.style.display = 'none';
        }
    
        // Hide specific divs when clicking outside of them
        ['wwc7'].forEach(function(id) {
            const div = document.getElementById(id);
            if (div && div.classList.contains('visible') && !div.contains(target) && !target.matches(`[data-target="${id}"]`)) {
                div.classList.remove('visible');
                div.classList.add('coffees');
                div.style.display = 'none';
            }
        });
    });









    

    document.addEventListener('DOMContentLoaded', () => {
        // استرجاع البيانات المحفوظة من التخزين المحلي عند تحميل الصفحة
        const savedText = localStorage.getItem('textContent');
        const savedImageSrc = localStorage.getItem('imageSrc');
        const savedImageLink = localStorage.getItem('imageLink');
        const savedButtonLink = localStorage.getItem('buttonLink');
        const savedTextAlign = localStorage.getItem('textAlign');
        const isTextHidden = localStorage.getItem('isTextHidden');
        const isButtonHidden = localStorage.getItem('isButtonHidden');
        const savedButtonName = localStorage.getItem('buttonName');
    
        if (savedText) {
            document.getElementById('y5678').innerText = savedText;
        }
    
        if (savedImageSrc) {
            document.getElementById('a2345').src = savedImageSrc;
        }
    
        if (savedButtonLink) {
            document.getElementById('link_a2345').href = savedButtonLink;
            document.getElementById('link_y5678').href = savedButtonLink;
            document.querySelector('#b6789 button').onclick = function() {
                window.location.href = savedButtonLink;
            }
        }
    
        if (savedTextAlign) {
            document.getElementById('x1234').style.textAlign = savedTextAlign;
        }
    
        // استرجاع حالة checkbox لإخفاء النص
        if (isTextHidden === 'true') {
            document.getElementById('y5678').style.display = 'none';
            document.getElementById('hideTextCheckbox').checked = true;
        }
    
        // استرجاع حالة checkbox لإخفاء الزرار
        if (isButtonHidden === 'true') {
            document.getElementById('b6789').style.display = 'none';
            document.getElementById('hideButtonCheckbox').checked = true;
            window.location.href = '#z9101'; // نقل المستخدم إلى العنصر z9101
        }
    
        // استرجاع اسم الزر المحفوظ
        if (savedButtonName) {
            document.querySelector('#b6789 button').innerText = savedButtonName;
        }
    });
    
    function checkPassword() {
        var password = document.getElementById('d7890').value;
        if (password === '1234') { // استبدل 1234 بكلمة المرور الصحيحة
            document.getElementById('e1234').classList.remove('hidden');
        } else {
            alert('كلمة مرور غير صحيحة');
        }
    }
    
    function applyChanges() {
        var newText = document.getElementById('f5678').value;
        var imageUpload = document.getElementById('g9101').files[0];
        var imageLink = document.getElementById('imageLink').value;
        var buttonLink = document.getElementById('h2345').value;
        var buttonName = document.getElementById('buttonNameInput').value; // الحصول على اسم الزر الجديد
    
        if (newText) {
            document.getElementById('y5678').innerText = newText;
            localStorage.setItem('textContent', newText); // حفظ النص في التخزين المحلي
        }
    
        if (imageUpload) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var imageSrc = e.target.result;
                document.getElementById('a2345').src = imageSrc;
                localStorage.setItem('imageSrc', imageSrc); // حفظ مصدر الصورة في التخزين المحلي
            }
            reader.readAsDataURL(imageUpload);
        } else if (imageLink) {
            document.getElementById('a2345').src = imageLink;
            localStorage.setItem('imageSrc', imageLink); // حفظ رابط الصورة في التخزين المحلي
        }
    
        if (buttonLink) {
            // تطبيق الرابط على الزرار
            document.querySelector('#b6789 button').onclick = function() {
                window.location.href = buttonLink;
            }
    
            // تطبيق الرابط على النص
            document.getElementById('link_y5678').href = buttonLink;
    
            // تطبيق الرابط على الصورة
            document.getElementById('link_a2345').href = buttonLink;
    
            // حفظ رابط الزرار في التخزين المحلي
            localStorage.setItem('buttonLink', buttonLink);
        }
    
        if (buttonName) {
            document.querySelector('#b6789 button').innerText = buttonName; // تغيير اسم الزر
            localStorage.setItem('buttonName', buttonName); // حفظ اسم الزر في التخزين المحلي
        }
    
        closeEditSection();
    }
    
    function closeEditSection() {
        document.getElementById('e1234').classList.add('hidden');
    }
    
    // دالة محاذاة النص
    function alignText(direction) {
        const container = document.getElementById('x1234');
        container.style.textAlign = direction;
        localStorage.setItem('textAlign', direction); // حفظ محاذاة النص في التخزين المحلي
        console.log('تم تغيير محاذاة النص إلى: ' + direction); // تحقق من تنفيذ العملية
    }
    
    // إخفاء/إظهار النص وتخزين الحالة
    function toggleTextVisibility() {
        const textElement = document.getElementById('y5678');
        const isChecked = document.getElementById('hideTextCheckbox').checked;
        if (isChecked) {
            textElement.style.display = 'none';
            localStorage.setItem('isTextHidden', 'true');
        } else {
            textElement.style.display = 'block';
            localStorage.setItem('isTextHidden', 'false');
        }
    }
    
    // إخفاء/إظهار الزرار وتخزين الحالة
    function toggleButtonVisibility() {
        const buttonElement = document.getElementById('b6789');
        const isChecked = document.getElementById('hideButtonCheckbox').checked;
        if (isChecked) {
            buttonElement.style.display = 'none';
            localStorage.setItem('isButtonHidden', 'true');
            window.location.href = '#z9101'; // تحويل الرابط إلى العنصر ذو id="z9101"
        } else {
            buttonElement.style.display = 'block';
            localStorage.setItem('isButtonHidden', 'false');
        }
    }
    





/// وظيفة لتأخير 3 ثواني ثم إخفاء كل ديف
for (let i = 1; i <= 5; i++) {
    setTimeout(function() {
      var myDiv = document.getElementById('myDivThatWillFadeOutSlowly' + i);
  
      // التأكد من أن العنصر موجود قبل إضافة الـ class
      if (myDiv) {
        console.log('عنصر ' + i + ' موجود');
        myDiv.classList.add('fade-out');
        
        // حدث لانتظار انتهاء الانتقال (transition)
        myDiv.addEventListener('transitionend', function() {
          myDiv.style.display = 'none';
        });
      } else {
        console.log('عنصر ' + i + ' غير موجود');
      }
      
    }, 3000);
  }
  





  window.onload = function() {
    // مصفوفة تحتوي على جميع الكلاسات التي تريد منع ترجمتها
    const classList = ['material-symbols-outlined', 'div-menu-div ul', 'xo', 'zoho'];

    classList.forEach(function(className) {
        document.querySelectorAll('.' + className).forEach(function(element) {
            if (!element.hasAttribute('translate')) {
                element.setAttribute('translate', 'no');
            }
        });
    });

    // الكود الخاص بعناصر الـ GIF
    const showFullscreenDynamicContainerButton = document.getElementById('show_fullscreen_dynamic_container_button');
    const fullscreenToggleDynamicContainer = document.getElementById('fullscreen_toggle_dynamic_container');
    const fullscreenContentToggleButton = document.getElementById('fullscreen_content_toggle_button');
    const closeFullscreenDynamicContainerButton = document.getElementById('close_fullscreen_dynamic_container_button');
    const overlay = document.getElementById('overlay');

    let originalContent = "fullscreen";
    let isOriginalState = true;

    showFullscreenDynamicContainerButton.addEventListener('click', function() {
        fullscreenToggleDynamicContainer.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    fullscreenContentToggleButton.addEventListener('click', function() {
        if (isOriginalState) {
            fullscreenToggleDynamicContainer.classList.add('fullscreen-size');
            fullscreenContentToggleButton.textContent = 'fullscreen_exit';
            isOriginalState = false;
        } else {
            fullscreenToggleDynamicContainer.classList.remove('fullscreen-size');
            fullscreenContentToggleButton.textContent = originalContent;
            isOriginalState = true;
        }
    });

    closeFullscreenDynamicContainerButton.addEventListener('click', function() {
        fullscreenToggleDynamicContainer.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
};







document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("max-mix-on");
    if (button) {
        button.addEventListener("click", function() {
            var maxMix = document.getElementById("max-mix");
            
            if (maxMix.style.margin === "0px -299px") {
                maxMix.style.margin = "0 0px";
                button.innerHTML = "arrow_forward_ios"; // يعيد المحتوى الأصلي للزر
            } else {
                maxMix.style.margin = "0 -299px";
                button.innerHTML = "arrow_back_ios"; // يغير محتوى الزر إلى السهم
            }
        });
    }
});








// // Copy img + relode
// document.addEventListener('DOMContentLoaded', function() {
//     let contextMenu = document.getElementById('contextMenu');
//     let targetImage = null;  // لتخزين الصورة التي تم الضغط عليها
//     let longPressTimer;

//     // دالة لإظهار القائمة السياقية
//     function showContextMenu(event, isImage) {
//         event.preventDefault();
//         contextMenu.style.left = `${event.pageX}px`;
//         contextMenu.style.top = `${event.pageY}px`;
//         contextMenu.style.display = 'block';

//         // إظهار أزرار النسخ إذا كانت صورة
//         if (isImage) {
//             document.getElementById('copyImageLinkBtn').style.display = 'flex';
//             document.getElementById('copyImageBtn').style.display = 'flex';
//         } else {
//             document.getElementById('copyImageLinkBtn').style.display = 'none';
//             document.getElementById('copyImageBtn').style.display = 'none';
//         }
//     }

//     // دالة لإخفاء القائمة السياقية
//     function hideContextMenu() {
//         contextMenu.style.display = 'none';
//     }

//     // إظهار القائمة عند الضغط بالزر الأيمن
//     document.addEventListener('contextmenu', function(event) {
//         let clickedElement = event.target;

//         // التحقق إذا كان العنصر صورة
//         if (clickedElement.tagName === 'IMG') {
//             targetImage = clickedElement;
//             showContextMenu(event, true);
//         } else {
//             showContextMenu(event, false);
//         }
//     });

//     // إظهار القائمة عند الضغط المطول (2 ثانية)
//     document.addEventListener('mousedown', function(event) {
//         longPressTimer = setTimeout(function() {
//             let clickedElement = event.target;
//             if (clickedElement.tagName === 'IMG') {
//                 targetImage = clickedElement;
//                 showContextMenu(event, true);
//             } else {
//                 showContextMenu(event, false);
//             }
//         }, 2000);  // الضغط المطول لمدة 2 ثانية
//     });

//     // إلغاء الضغط المطول إذا تم رفع الإصبع
//     document.addEventListener('mouseup', function() {
//         clearTimeout(longPressTimer);
//     });

//     // إخفاء القائمة عند الضغط خارجها
//     document.addEventListener('click', function(event) {
//         if (!contextMenu.contains(event.target)) {
//             hideContextMenu();
//         }
//     });

//     // دالة زر Reload لإعادة تحميل الصفحة
//     document.getElementById('reloadBtn').addEventListener('click', function() {
//         location.reload();
//     });

//     // دالة زر نسخ رابط الصورة
//     document.getElementById('copyImageLinkBtn').addEventListener('click', function() {
//         if (targetImage) {
//             let imageUrl = targetImage.src;
//             navigator.clipboard.writeText(imageUrl)
//                 .then(() => alert('تم نسخ رابط الصورة!'))
//                 .catch(() => alert('فشل في نسخ رابط الصورة.'));
//             hideContextMenu();
//         }
//     });

//     // دالة زر نسخ الصورة
//     document.getElementById('copyImageBtn').addEventListener('click', function() {
//         if (targetImage) {
//             const canvas = document.createElement('canvas');
//             const ctx = canvas.getContext('2d');
//             canvas.width = targetImage.naturalWidth;
//             canvas.height = targetImage.naturalHeight;

//             // رسم الصورة على الـ canvas
//             ctx.drawImage(targetImage, 0, 0);

//             // تحويل الـ canvas إلى بيانات صورة ونسخها إلى الحافظة
//             canvas.toBlob(function(blob) {
//                 const item = new ClipboardItem({ 'image/png': blob });
//                 navigator.clipboard.write([item])
//                     .then(() => alert('تم نسخ الصورة!'))
//                     .catch(() => alert('فشل في نسخ الصورة.'));
//             }, 'image/png');

//             hideContextMenu();
//         }
//     });
// });








function makeAbsolute() {
    var div = document.getElementById("myDiv123");
    var innerDiv = document.getElementById("innerDiv");
    var resetBtn = document.getElementById("resetBtn");

    // أضف الفئة active لإضافة الهامش
    div.classList.add("active");

    // تعيين الموضع إلى absolute وإظهار الزر
    div.style.position = "absolute";
    div.style.top = ""; // اختياري: اضبط الموضع حسب الحاجة
    div.style.left = ""; // اختياري: اضبط الموضع حسب الحاجة
    resetBtn.style.display = "flex";

    // إخفاء الديف الداخلي
    innerDiv.classList.add("hidden");
}

function resetPosition(event) {
    event.stopPropagation(); // منع تفعيل حدث الضغط على الديف

    var div = document.getElementById("myDiv123");
    var innerDiv = document.getElementById("innerDiv");
    var resetBtn = document.getElementById("resetBtn");

    // إزالة الفئة active لإزالة الهامش
    div.classList.remove("active");

    // إعادة تعيين الموضع إلى relative وإخفاء الزر
    div.style.position = "relative";
    div.style.top = "";
    div.style.left = "";
    resetBtn.style.display = "none";

    // إظهار الديف الداخلي
    innerDiv.classList.remove("hidden");
}




// Prayer times

    let activeButton = null;

    function scrollToDiv(divId, button) {
      const element = document.getElementById(divId);
      element.scrollIntoView({ behavior: 'smooth' });

      // إعادة اللون الأصلي للزرار السابق
      if (activeButton) {
        activeButton.classList.remove('active');
      }

      // تفعيل الزر الحالي
      button.classList.add('active');
      activeButton = button;
    }

    // إضافة الكلاس ripple-btn وحدث onmousedown تلقائيًا وتفعيل أول زر من اليمين
    document.addEventListener('DOMContentLoaded', function() {
      const buttons = document.querySelectorAll('.prayer-menu button');

      // تفعيل آخر زر عند تحميل الصفحة (أول زر من ناحية اليمين)
      if (buttons.length > 0) {
        const lastButton = buttons[buttons.length - 1];
        lastButton.classList.add('active');
        activeButton = lastButton;
      }

      // إضافة كلاس ripple-btn وonmousedown لكل زر
      buttons.forEach(button => {
        button.classList.add('ripple-btn');
        button.setAttribute('onmousedown', 'createRipple(event)');
      });
    });









