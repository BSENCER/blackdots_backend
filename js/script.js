// Global API URL setup
window.API_URL = 'https://blackdots-2.onrender.com/api';

// Cache-busting fetch function - prevents browser caching issues
async function noCacheFetch(url, options = {}) {
    const cacheBuster = `_cb=${Date.now()}`;
    const separator = url.includes('?') ? '&' : '?';
    const noCacheUrl = `${url}${separator}${cacheBuster}`;

    const defaultOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
        cache: 'no-store'
    };

    return fetch(noCacheUrl, { ...defaultOptions, ...options });
}

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        console.log('✅ Hamburger və navLinks tapıldı');

        // Toggle function
        function toggleMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }

            const isActive = hamburger.classList.contains('active');

            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Body scroll-u idarə et
            document.body.style.overflow = isActive ? '' : 'hidden';

            console.log('Menu:', isActive ? 'BAĞLANDI' : 'AÇILDI');
        }

        // Click event
        hamburger.addEventListener('click', toggleMenu);

        // Touch event (mobil üçün)
        hamburger.addEventListener('touchstart', function (e) {
            e.preventDefault();
            toggleMenu();
        }, { passive: false });

        // Link-lərə klik edəndə menü bağlansın
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Kənara klik edəndə bağlansın
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !e.target.closest('.nav-links') &&
                !e.target.closest('.hamburger')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Window resize-də bağlansın
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error('❌ Hamburger və ya navLinks tapılmadı!');
    }
});


// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Get all FAQ accordion items (index.html style)
    const faqAccordionItems = document.querySelectorAll('.faq-accordion-item');

    // Add click event listener to each FAQ accordion item
    faqAccordionItems.forEach(item => {
        const question = item.querySelector('.faq-accordion-question');

        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');

            // Close all FAQ accordion items
            faqAccordionItems.forEach(faq => {
                faq.classList.remove('active');
            });

            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Get all FAQ items (contact.html style)
    const faqItems = document.querySelectorAll('.faq-item');

    // Add click event listener to each FAQ item
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });

            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe FAQ accordion items for animation
    faqAccordionItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe FAQ items for animation
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Add keyboard navigation support for FAQ accordion items
    faqAccordionItems.forEach((item, index) => {
        const question = item.querySelector('.faq-accordion-question');
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');

        question.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });

        // Update aria-expanded when item is toggled
        const mutationObserver = new MutationObserver(() => {
            const isActive = item.classList.contains('active');
            question.setAttribute('aria-expanded', isActive.toString());
        });

        mutationObserver.observe(item, {
            attributes: true,
            attributeFilter: ['class']
        });
    });

    // Add keyboard navigation support for FAQ items
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');

        question.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });

        // Update aria-expanded when item is toggled
        const mutationObserver = new MutationObserver(() => {
            const isActive = item.classList.contains('active');
            question.setAttribute('aria-expanded', isActive.toString());
        });

        mutationObserver.observe(item, {
            attributes: true,
            attributeFilter: ['class']
        });
    });

    const API_URL = window.BASE_API_URL;
    console.log('Script initialized with API:', API_URL);

    // Load phases from backend and replace static content
    async function loadMethodologyPhases() {
        try {
            console.log('API-dən məlumat yüklənir:', API_URL + '/phases');
            const response = await noCacheFetch(`${API_URL}/phases`);

            if (!response.ok) {
                console.log('API xətası:', response.status, response.statusText);
                initializeMethodologyTabs();
                return;
            }

            const data = await response.json();
            console.log('API məlumatı alındı:', data);

            // Check if data is array
            if (!Array.isArray(data)) {
                console.error('API array deyil:', typeof data);
                initializeMethodologyTabs();
                return;
            }

            const phases = data;

            // Sort phases by order
            phases.sort((a, b) => (a.order || 0) - (b.order || 0));

            // Clear existing tabs and content
            const methodologyTabs = document.querySelector('.methodology-tabs');
            const methodologyContent = document.querySelector('.methodology-content');

            if (methodologyTabs && methodologyContent) {
                // Clear all tabs
                const existingTabs = document.querySelectorAll('.methodology-tab');
                existingTabs.forEach(tab => tab.remove());

                // Clear all content
                const existingPhases = document.querySelectorAll('.phase-content');
                existingPhases.forEach(phase => phase.remove());

                // Add new tabs and content from API
                if (Array.isArray(phases) && phases.length > 0) {
                    phases.forEach((phase, index) => {
                        // Create tab button
                        const tabButton = document.createElement('button');
                        tabButton.className = `methodology-tab ${index === 0 ? 'active' : ''}`;
                        tabButton.setAttribute('data-phase', phase.id);
                        tabButton.innerHTML = `<span>${phase.title || 'MƏRHƏLƏ'}</span>`;
                        methodologyTabs.appendChild(tabButton);

                        // Create content div
                        const isActive = index === 0 ? 'active' : '';
                        const phaseHTML = `
                            <div class="phase-content ${isActive}" data-phase="${phase.id}">
                                <div class="phase-inner">
                                    <div class="phase-image">
                                        <div class="phase-image-placeholder">${phase.icon || '📋'}</div>
                                    </div>
                                    <div class="phase-text">
                                        <h3>${phase.title || ''}</h3>
                                        <h4>${phase.subtitle || ''}</h4>
                                        <p>${phase.description || ''}</p>
                                        ${phase.description2 ? '<p>' + phase.description2 + '</p>' : ''}
                                        <h5>Bu Mərhələdə Nə Baş Verir?</h5>
                                        <ul>
                                            ${Array.isArray(phase.points) ? phase.points.map(point => `<li>${point}</li>`).join('') : '<li>Məlumat yoxdur</li>'}
                                        </ul>
                                        <a href="contact.html" class="btn btn-primary btn-phase">
                                            <span>${phase.buttonText || 'Ətraflı'}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        `;
                        methodologyContent.innerHTML += phaseHTML;
                    });
                    console.log('Fazalar və tablar yükləndi:', phases.length);
                }
            }

            // Initialize tabs after loading
            initializeMethodologyTabs();
        } catch (error) {
            console.error('Fazaları yükləmədə xəta:', error);
            initializeMethodologyTabs();
        }
    }

    function initializeMethodologyTabs() {
        const tabs = document.querySelectorAll('.methodology-tab');
        const contents = document.querySelectorAll('.phase-content');

        if (tabs.length === 0) {
            console.log('Tabs tapılmadı');
            return;
        }

        // Remove old event listeners by cloning
        tabs.forEach(tab => {
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);
        });

        // Get fresh tabs after cloning
        const freshTabs = document.querySelectorAll('.methodology-tab');

        freshTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                const phaseId = tab.dataset.phase;

                // Remove active class from all tabs and contents
                freshTabs.forEach(t => t.classList.remove('active'));
                contents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                const targetContent = document.querySelector(`.phase-content[data-phase="${phaseId}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });

            // Keyboard navigation
            tab.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' && index < freshTabs.length - 1) {
                    freshTabs[index + 1].click();
                } else if (e.key === 'ArrowLeft' && index > 0) {
                    freshTabs[index - 1].click();
                }
            });
        });

        // Set first tab as active if no active tab exists
        if (freshTabs.length > 0 && !document.querySelector('.methodology-tab.active')) {
            freshTabs[0].classList.add('active');
        }
    }

    // Load Partners and Clients
    function loadPartners() {
        const partnersSlider = document.getElementById('partnersSlider');
        const clientsSlider = document.getElementById('clientsSlider');

        if (!partnersSlider || !clientsSlider) return;

        noCacheFetch(`${API_URL}/partners`)
            .then(response => response.json())
            .then(partners => {
                const partnerList = partners.filter(p => p.type === 'partner');
                const clientList = partners.filter(p => p.type === 'client');

                partnersSlider.innerHTML = partnerList.map(partner => `
                    <div class="partner-card">
                        <div>
                            <img src="${partner.logo}" alt="${partner.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%2280%22><rect fill=%22%23f0f0f0%22 width=%22100%22 height=%2280%22/><text x=%2250%25%22 y=%2250%25%22 font-size=%2212%22 fill=%22%23999%22 text-anchor=%22middle%22 dy=%22.3em%22>${partner.name}</text></svg>'">
                            <div class="partner-name">${partner.name}</div>
                        </div>
                    </div>
                `).join('');

                clientsSlider.innerHTML = clientList.map(client => `
                    <div class="client-card">
                        <div>
                            <img src="${client.logo}" alt="${client.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%2280%22><rect fill=%22%23f0f0f0%22 width=%22100%22 height=%2280%22/><text x=%2250%25%22 y=%2250%25%22 font-size=%2212%22 fill=%22%23999%22 text-anchor=%22middle%22 dy=%22.3em%22>${client.name}</text></svg>'">
                            <div class="client-name">${client.name}</div>
                        </div>
                    </div>
                `).join('');
            })
            .catch(error => console.error('Error loading partners:', error));
    }

    // Slider functionality
    function slidePartners(direction) {
        const slider = document.getElementById('partnersSlider');
        const scrollAmount = 300;
        if (slider) {
            slider.scrollLeft += (direction * scrollAmount);
        }
    }


    // Load Services for tekliflerimiz.html
    async function loadServices() {
        const coreServicesContainer = document.getElementById('coreServicesContainer');
        const completeServicesGrid = document.getElementById('completeServicesGrid');

        if (!coreServicesContainer && !completeServicesGrid) return;

        try {
            const response = await noCacheFetch(`${API_URL}/services`);
            if (!response.ok) throw new Error('Failed to fetch services');

            const services = await response.json();

            // Render Core Services (First 2 items)
            if (coreServicesContainer && services.length >= 2) {
                const coreServices = services.slice(0, 2);
                coreServicesContainer.innerHTML = coreServices.map((service, index) => `
                    <div class="offer-service-item ${index % 2 !== 0 ? 'reverse' : ''}">
                        <div class="offer-service-content">
                            <h3>${service.title}</h3>
                            <p>${service.description}</p>
                        </div>
                        <div class="offer-service-image">
                            <div class="service-image-placeholder">${service.icon}</div>
                        </div>
                    </div>
                `).join('');
            }

            // Render Complete Services (All items)
            if (completeServicesGrid) {
                completeServicesGrid.innerHTML = services.map(service => `
                    <div class="service-box">
                        <div class="service-box-icon">${service.icon}</div>
                        <h4>${service.title}</h4>
                        <p>${service.description}</p>
                    </div>
                `).join('');
            }

        } catch (error) {
            console.error('Error loading services:', error);
            if (coreServicesContainer) coreServicesContainer.innerHTML = '<p>Xidmətlər yüklənərkən xəta baş verdi.</p>';
        }
    }


    // Load Team for about.html
    async function loadTeam() {
        const teamGrid = document.getElementById('teamGrid');
        if (!teamGrid) return;

        try {
            const response = await noCacheFetch(`${API_URL}/team`);
            if (!response.ok) throw new Error('Failed to fetch team');

            const team = await response.json();

            teamGrid.innerHTML = team.map(member => `
                <div class="team-member">
                    <div class="member-photo">
                        ${member.image && !member.image.includes('placeholder') ?
                    `<img src="${member.image}" alt="${member.name}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">` :
                    `<div class="member-initial">${member.name.charAt(0)}</div>`
                }
                    </div>
                    <h4>${member.name}</h4>
                    <p class="member-role">${member.position}</p>
                    <p class="member-bio">${member.bio}</p>
                </div>
            `).join('');

        } catch (error) {
            console.error('Error loading team:', error);
            teamGrid.innerHTML = '<p>Komanda məlumatları yüklənərkən xəta baş verdi.</p>';
        }
    }

    // Load Industries for about.html
    async function loadIndustries() {
        const industriesGrid = document.getElementById('industriesGrid');
        if (!industriesGrid) return;

        try {
            const response = await noCacheFetch(`${API_URL}/industries`);
            if (!response.ok) throw new Error('Failed to fetch industries');

            const industries = await response.json();

            industriesGrid.innerHTML = industries.map(ind => `
                <div class="industry-card">
                    <span class="industry-icon">${ind.icon}</span>
                    <h4>${ind.name}</h4>
                    <p>${ind.description}</p>
                </div>
            `).join('');

        } catch (error) {
            console.error('Error loading industries:', error);
            industriesGrid.innerHTML = '<p>Sənaye məlumatları yüklənərkən xəta baş verdi.</p>';
        }
    }


    // Load Apps for apps.html
    async function loadApps() {
        const appsContainer = document.getElementById('appsContainer');
        if (!appsContainer) return;

        try {
            const response = await noCacheFetch(`${API_URL}/apps`);
            if (!response.ok) throw new Error('Failed to fetch apps');

            const apps = await response.json();

            // Group apps by category
            const groupedApps = apps.reduce((acc, app) => {
                const category = app.category || 'Digər';
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(app);
                return acc;
            }, {});

            // Generate HTML
            let html = '';

            // Order categories if needed, or just iterate keys
            // For now, iterate keys
            for (const [category, categoryApps] of Object.entries(groupedApps)) {
                html += `
                    <div class="app-category">
                        <h2 class="category-title">${category}</h2>
                        <div class="apps-grid">
                            ${categoryApps.map(app => `
                                <div class="app-card-detailed">
                                    <span class="app-icon-large">${app.icon}</span>
                                    <h3>${app.name}</h3>
                                    <p>${app.description}</p>
                                    <div class="app-features">
                                        ${app.features ? app.features.map(f => `<span>• ${f}</span>`).join('') : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            appsContainer.innerHTML = html;

        } catch (error) {
            console.error('Error loading apps:', error);
            appsContainer.innerHTML = '<p>Tətbiqlər yüklənərkən xəta baş verdi.</p>';
        }
    }


    // Load Testimonials for index.html
    async function loadTestimonials() {
        const testimonialsGrid = document.getElementById('testimonialsGrid');
        if (!testimonialsGrid) return;

        try {
            const response = await noCacheFetch(`${API_URL}/testimonials`);
            if (!response.ok) throw new Error('Failed to fetch testimonials');

            const testimonials = await response.json();

            testimonialsGrid.innerHTML = testimonials.map(testimonial => `
                <div class="testimonial-card">
                    <p class="testimonial-quote">
                        "${testimonial.quote}"
                    </p>
                    <div class="testimonial-author">
                        <div class="author-avatar">${testimonial.author.split(' ').map(n => n[0]).join('')}</div>
                        <div class="author-info">
                            <h5>${testimonial.author}</h5>
                            <p>${testimonial.position}</p>
                        </div>
                    </div>
                </div>
            `).join('');

        } catch (error) {
            console.error('Error loading testimonials:', error);
            testimonialsGrid.innerHTML = '<p>Rəylər yüklənərkən xəta baş verdi.</p>';
        }
    }

    // Helper function to get full URL for images/videos
    function getFullPath(path) {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        // Prepend Render domain if it's a relative path
        const baseUrl = 'https://blackdots-2.onrender.com';
        return path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
    }

    function getBlogIcon(blog) {
        if (blog.icon && blog.icon !== '📰') return blog.icon;

        const text = `${blog.title || ''} ${blog.category || ''}`.toLowerCase();
        if (text.includes('məhsuldarlıq') || text.includes('product')) return '📈';
        if (text.includes('məsləhət') || text.includes('erp')) return '💡';
        if (text.includes('odoo')) return '🚀';
        if (text.includes('rəqəmsal')) return '💻';
        return '📰';
    }

    // Load Blogs for blog.html
    async function loadBlogs() {
        const blogGrid = document.getElementById('blogGrid');
        if (!blogGrid) return;

        try {
            console.log('Bloglar yüklənir... API URL:', `${API_URL}/blogs`);
            const response = await noCacheFetch(`${API_URL}/blogs`);

            if (!response.ok) {
                console.error('Fetch xətası:', response.status, response.statusText);
                throw new Error(`Server xətası: ${response.status}`);
            }

            const blogs = await response.json();
            console.log('Məlumat alındı (Raw Blogs):', blogs);

            if (!Array.isArray(blogs) || blogs.length === 0) {
                console.warn('Məlumat gəldi, amma boş array-dir.');
                blogGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #666;">Hələ ki, heç bir blog məqaləsi yoxdur.</p>';
                return;
            }

            // Məlumatları sıra ilə düzmək
            blogs.sort((a, b) => (a.order || 99) - (b.order || 99));

            blogGrid.innerHTML = blogs.map(blog => {
                // ID-ni yoxlayırıq (id və ya _id ola bilər)
                const blogId = blog.id || blog._id;
                console.log('Rendering blog:', blog.title, 'ID:', blogId);
                const imageUrl = getFullPath(blog.image);
                const blogIcon = getBlogIcon(blog);

                return `
                    <div class="blog-card" onclick="window.location.href='blog-detail.html?id=${blogId}'">
                        <div class="blog-image">
                            ${blog.image ? `<img src="${imageUrl}" alt="${blog.title}" onerror="this.parentElement.innerHTML='<div class=\\'blog-image-placeholder\\'>${blogIcon}</div>'">` : `<div class="blog-image-placeholder">${blogIcon}</div>`}
                            ${blog.video ? '<div class="play-icon">▶</div>' : ''}
                        </div>
                        <div class="blog-content">
                            <div class="blog-meta">
                                <span>👤 ${blog.author || 'Admin'}</span>
                                ${blog.date ? `<span>📅 ${new Date(blog.date).toLocaleDateString('az-AZ')}</span>` : ''}
                                ${blog.readTime ? `<span>⏱️ ${blog.readTime}</span>` : ''}
                                ${blog.category ? `<span>🏷️ ${blog.category}</span>` : ''}
                            </div>
                            <h3>${blog.title}</h3>
                            <p class="blog-excerpt">${blog.excerpt || ''}</p>
                            <a href="blog-detail.html?id=${blogId}" class="read-more">Daha çox oxu →</a>
                        </div>
                    </div>
                `;
            }).join('');

        } catch (error) {
            console.error('Bloglar yüklənərkən xəta baş verdi:', error);
            blogGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: red; padding: 2rem;">
                Məlumat yüklənərkən xəta baş verdi. <br>
                <small>${error.message}</small>
            </p>`;
        }
    }

    // Load Blog Detail for blog-detail.html
    async function loadBlogDetail() {
        const container = document.getElementById('blogDetailContainer');
        if (!container) return;

        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('id');

        if (!blogId) {
            container.innerHTML = '<p style="text-align: center;">Bloq tapılmadı.</p>';
            return;
        }

        try {
            const response = await noCacheFetch(`${API_URL}/blogs`);
            if (!response.ok) throw new Error('Failed to fetch blogs');

            const blogs = await response.json();
            const blog = blogs.find(b => b.id === blogId || b._id === blogId);

            if (!blog) {
                container.innerHTML = '<p style="text-align: center;">Bloq tapılmadı.</p>';
                return;
            }

            // Update Page Title
            document.title = `${blog.title} - BlackDots Blog`;

            container.innerHTML = `
                <div class="blog-detail-image">
                    ${blog.video ?
                    `<video src="${getFullPath(blog.video)}" controls style="width:100%; border-radius:12px;" poster="${getFullPath(blog.image) || ''}"></video>` :
                    (blog.image ? `<img src="${getFullPath(blog.image)}" alt="${blog.title}" onerror="this.src='https://via.placeholder.com/800x400?text=Şəkil+Yüklənmədi'">` : '<div class="blog-detail-image-placeholder">📰</div>')
                }
                </div>
                <div class="blog-detail-meta">
                    <span>👤 ${blog.author || 'Admin'}</span>
                    ${blog.date ? `<span>📅 ${new Date(blog.date).toLocaleDateString('az-AZ')}</span>` : ''}
                    ${blog.readTime ? `<span>⏱️ ${blog.readTime}</span>` : ''}
                    ${blog.category ? `<span>🏷️ ${blog.category}</span>` : ''}
                </div>
                <h1 class="blog-detail-title">${blog.title}</h1>
                <div class="blog-detail-content">
                    ${blog.content ? `<p>${blog.content}</p>` : '<p>Məzmun yoxdur.</p>'}
                </div>
                <a href="blog.html" class="back-link">← Bloqlara qayıt</a>
            `;

        } catch (error) {
            console.error('Error loading blog detail:', error);
            container.innerHTML = '<p style="text-align: center;">Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.</p>';
        }
    }

    // Load dynamic data on page load
    try {
        loadBlogs();
        loadBlogDetail();
        loadMethodologyPhases();
        loadPartners();
        loadServices();
        loadTeam();
        loadIndustries();
        loadApps();
        loadTestimonials();
    } catch (e) {
        console.error('Initialization error:', e);
    }

});
