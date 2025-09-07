document.addEventListener('DOMContentLoaded', () => {

    // 1. Плавная прокрутка (без изменений)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Переключение темной/светлой темы (без изменений)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const isDark = localStorage.getItem('isDarkTheme') === 'true';

    if (isDark) {
        body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isCurrentlyDark = body.classList.contains('dark-theme');
        localStorage.setItem('isDarkTheme', isCurrentlyDark);

        if (isCurrentlyDark) {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // 3. Обработка формы контактов (без изменений)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Показываем сообщение о начале отправки
            formStatus.textContent = 'Отправка...';
            formStatus.style.color = '#007bff'; // Синий цвет для ожидания

            // Собираем данные формы
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Здесь вы вставляете свои реальные ключи из EmailJS
            const serviceID = 'service_qavey9l';
            const templateID = 'template_zuxtxal';

            const fullMessage = `Письмо от ${formData.name} (${formData.email})\n\n${formData.message}`;

            // Отправляем данные с помощью EmailJS
            emailjs.send(serviceID, templateID, {
                from_name: formData.name,
                reply_to: formData.email,
                message: fullMessage, 
            })
                .then(
                    () => {
                        // В случае успеха
                        formStatus.textContent = 'Сообщение успешно отправлено.';
                        formStatus.style.color = '#28a745';
                        contactForm.reset();
                    },
                    (error) => {
                        // В случае ошибки
                        formStatus.textContent = 'Ошибка отправки. Пожалуйста, попробуйте позже.';
                        formStatus.style.color = '#dc3545'; // Красный цвет
                        console.error('FAILED...', error);
                    }
                )
                .finally(() => {
                    // Убираем сообщение через 5 секунд в любом случае
                    setTimeout(() => {
                        formStatus.textContent = '';
                    }, 5000);
                });
        });
    }

    // 4. Логика для бургер-меню (без изменений)
    const menuToggleBtn = document.getElementById('menu-toggle');
    const navLinksContainer = document.getElementById('nav-links-container');
    const navLinks = document.querySelectorAll('.nav-links a');

    menuToggleBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = menuToggleBtn.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            const icon = menuToggleBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 5. Логика для переключения языка
    const translations = {
        ru: {
            nav_about: 'Обо мне',
            nav_projects: 'Проекты',
            nav_skills: 'Навыки',
            nav_achievements: 'Достижения',
            nav_contact: 'Контакты',
            hero_specialty: 'Разработчик C++ | <b>E-Commerse</b> | Frontend & Backend',
            hero_projects_btn: 'Мои проекты',
            hero_contact_btn: 'Связаться со мной',
            about_title: 'Обо мне',
            about_text: 'какая то инфа про меня сюда',
            about_skill_1: 'Навыки работы C++, Python и JavaScript',
            about_skill_2: 'Работа с базами данных (MSSQL) и навыки работы с Django',
            about_skill_3: 'И сюда чето -----------------------------------------',
            projects_title: 'Проекты',
            project1_title: 'Программа для тестирования студентов',
            project1_text: 'Участвовал в командном проекте во время учебы в компьютерной академии IT Step. Суть проекта в создании программы для тестирования студентов.',
            project2_title: 'Интернет магазин',
            project2_text_1: 'Командный проект Интернет магазин. Для создания проекта использовались Python (Backend) и фреймворк Django.',
            project2_text_2: 'Проект \'Интернет магазин\' - это полный рабочий интернет магазин с базой данных для пользователей и товаров.',
            project2_text_3: 'Функционал:<br> --> Покупки товаров<span style="margin-left: 90px;"> --> Регистрация аккаунтов</span><br> --> Возможность доставки<span style="margin-left: 48px;"> --> Оплата картой</span><br> --> Отзывы и комментарии<span style="margin-left: 43px;"> --> Многое другое</span>',
            skills_title: 'Навыки',
            skill1_title: 'C++ / Python',
            skill1_text: 'Продвинутый уровень (C++, Django Framework, Python)',
            skill2_title: 'Frontend',
            skill2_text: 'Продвинутый уровень (HTML, CSS, JavaScript, базовый React)',
            skill3_title: 'Базы данных',
            skill3_text: 'Средний уровень (MSSQL, проектирование БД)',
            achievements_title: 'Достижения',
            achievement1_title: 'Сертификат IT Step',
            achievement2_title: 'Чета',
            contact_title: 'Связаться со мной',
            contact_form_text: 'Оставьте свое сообщение, и я свяжусь с вами в ближайшее время!',
            form_name: 'Имя:',
            form_name_placeholder: 'Ваше имя',
            form_email: 'Email:',
            form_email_placeholder: 'Ваш email',
            form_message: 'Сообщение:',
            form_message_placeholder: 'Ваше сообщение...',
            form_submit_btn: 'Отправить сообщение',
            contact_info_title: 'Мои контакты',
            contact_email: 'artemzheleznovjob@gmail.com',
            contact_phone: '+48 790 592 145',
            footer_text: '&copy; 2025 Artem Zheleznov. Все права защищены.'
        },
        en: {
            nav_about: 'About',
            nav_projects: 'Projects',
            nav_skills: 'Skills',
            nav_achievements: 'Achievements',
            nav_contact: 'Contact',
            hero_specialty: 'C++ Developer | <b>E-Commerce</b> | Frontend & Backend',
            hero_projects_btn: 'My Projects',
            hero_contact_btn: 'Contact Me',
            about_title: 'About Me',
            about_text: 'Some info about me here',
            about_skill_1: 'Skills in C++, Python, and JavaScript',
            about_skill_2: 'Work with databases (MSSQL) and skills in Django',
            about_skill_3: 'And something here -----------------------------------------',
            projects_title: 'Projects',
            project1_title: 'Student Testing Program',
            project1_text: 'I participated in a team project during my studies at IT Step computer academy. The project\'s goal was to create a program for student testing.',
            project2_title: 'Online Store',
            project2_text_1: 'A team project for an online store. The project was created using Python (Backend) and the Django framework.',
            project2_text_2: 'The \'Online Store\' project is a fully functional online store with a database for users and products.',
            project2_text_3: 'Functionality:<br> --> Product purchases<span style="margin-left: 90px;"> --> Account registration</span><br> --> Delivery options<span style="margin-left: 48px;"> --> Card payment</span><br> --> Reviews and comments<span style="margin-left: 43px;"> --> And much more</span>',
            skills_title: 'Skills',
            skill1_title: 'C++ / Python',
            skill1_text: 'Advanced level (C++, Django Framework, Python)',
            skill2_title: 'Frontend',
            skill2_text: 'Advanced level (HTML, CSS, JavaScript, basic React)',
            skill3_title: 'Databases',
            skill3_text: 'Intermediate level (MSSQL, DB design)',
            achievements_title: 'Achievements',
            achievement1_title: 'IT Step Certificate',
            achievement2_title: 'Something',
            contact_title: 'Contact Me',
            contact_form_text: 'Leave your message and I will get back to you shortly!',
            form_name: 'Name:',
            form_name_placeholder: 'Your name',
            form_email: 'Email:',
            form_email_placeholder: 'Your email',
            form_message: 'Message:',
            form_message_placeholder: 'Your message...',
            form_submit_btn: 'Send Message',
            contact_info_title: 'My Contacts',
            contact_email: 'artemzheleznovjob@gmail.com',
            contact_phone: '+48 790 592 145',
            footer_text: '&copy; 2025 Artem Zheleznov. All rights reserved.'
        },
        pl: {
            nav_about: 'O mnie',
            nav_projects: 'Projekty',
            nav_skills: 'Umiejętności',
            nav_achievements: 'Osiągnięcia',
            nav_contact: 'Kontakt',
            hero_specialty: 'Programista C++ | <b>E-Commerce</b> | Frontend & Backend',
            hero_projects_btn: 'Moje projekty',
            hero_contact_btn: 'Skontaktuj się ze mną',
            about_title: 'O mnie',
            about_text: 'Jakaś informacja o mnie',
            about_skill_1: 'Umiejętności w C++, Python i JavaScript',
            about_skill_2: 'Praca z bazami danych (MSSQL) i umiejętności w Django',
            about_skill_3: 'I coś tu jeszcze -----------------------------------------',
            projects_title: 'Projekty',
            project1_title: 'Program do testowania studentów',
            project1_text: 'Brałem udział w projekcie zespołowym podczas studiów w akademii komputerowej IT Step. Celem projektu było stworzenie programu do testowania studentów.',
            project2_title: 'Sklep internetowy',
            project2_text_1: 'Projekt zespołowy Sklep internetowy. Do stworzenia projektu użyto Pythona (Backend) oraz frameworku Django.',
            project2_text_2: 'Projekt \'Sklep internetowy\' to w pełni działający sklep internetowy z bazą danych dla użytkowników i produktów.',
            project2_text_3: 'Funkcjonalność:<br> --> Zakupy produktów<span style="margin-left: 90px;"> --> Rejestracja kont</span><br> --> Opcje dostawy<span style="margin-left: 48px;"> --> Płatność kartą</span><br> --> Recenzje i komentarze<span style="margin-left: 43px;"> --> I wiele więcej</span>',
            skills_title: 'Umiejętności',
            skill1_title: 'C++ / Python',
            skill1_text: 'Poziom zaawansowany (C++, Django Framework, Python)',
            skill2_title: 'Frontend',
            skill2_text: 'Poziom zaawansowany (HTML, CSS, JavaScript, podstawowy React)',
            skill3_title: 'Bazy danych',
            skill3_text: 'Poziom średniozaawansowany (MSSQL, projektowanie baz danych)',
            achievements_title: 'Osiągnięcia',
            achievement1_title: 'Certyfikat IT Step',
            achievement2_title: 'Coś',
            contact_title: 'Skontaktuj się ze mną',
            contact_form_text: 'Zostaw wiadomość, a skontaktuję się z Tobą wkrótce!',
            form_name: 'Imię:',
            form_name_placeholder: 'Twoje imię',
            form_email: 'Email:',
            form_email_placeholder: 'Twój email',
            form_message: 'Wiadomość:',
            form_message_placeholder: 'Twoja wiadomość...',
            form_submit_btn: 'Wyślij wiadomość',
            contact_info_title: 'Moje kontakty',
            contact_email: 'artemzheleznovjob@gmail.com',
            contact_phone: '+48 790 592 145',
            footer_text: '&copy; 2025 Artem Zheleznov. Wszelkie prawa zastrzeżone.'
        }
    };

    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsToTranslate = document.querySelectorAll('[data-lang-key]');

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });
        localStorage.setItem('selectedLang', lang);
        updateActiveLangButton(lang);
    }

    function updateActiveLangButton(lang) {
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
    }

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    const savedLang = localStorage.getItem('selectedLang') || 'ru';
    setLanguage(savedLang);

});
