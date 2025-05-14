const main = document.querySelector('main');

function createErrorBlock(message) {
    const sec = document.createElement('section');
    sec.classList.add('error-section');

    const p = document.createElement('p');
    p.classList.add('error-message');
    p.textContent = message;

    sec.appendChild(p);
    main.appendChild(sec);
}

Promise.all([
    fetch('sections.json').then(res => {
        if (!res.ok) throw new Error('Sections data could not be loaded.');
        return res.json();
    })
])
    .then(([sectionsData]) => {
        sectionsData.infoSections.forEach(section => {
            const sec = document.createElement('section');
            sec.classList.add('dynamic-section');

            if (section.title === 'Hero Section') {
                sec.classList.add('hero', 'container', 'hero-content');
                sec.innerHTML = `
          <h1>${section.content}</h1>
          <a href="${section.buttonLink}" class="primary-btn">${section.buttonText}</a>
        `;
                main.prepend(sec);
                return;
            }

            if (section.title === 'Our Collections') {
                sec.classList.add('collections');
                const wrapper = document.createElement('div');
                wrapper.classList.add('collections-content');

                const h2 = document.createElement('h2');
                h2.textContent = section.title;
                wrapper.appendChild(h2);

                const cards = document.createElement('div');
                cards.classList.add('collection-cards');

                section.collections.forEach(item => {
                    const a = document.createElement('a');
                    a.classList.add('collection-card');
                    a.href = item.link;

                    const img = document.createElement('img');
                    img.src = item.imageUrl;
                    img.alt = item.alt;

                    const h3 = document.createElement('h3');
                    h3.textContent = item.title;

                    a.appendChild(img);
                    a.appendChild(h3);
                    cards.appendChild(a);
                });

                wrapper.appendChild(cards);
                sec.appendChild(wrapper);
                main.appendChild(sec);
                return;
            }

            if (section.title === 'About Us') {
                sec.classList.add('about-section');
                const textDiv = document.createElement('div');
                textDiv.classList.add('about-text');

                const h2 = document.createElement('h2');
                h2.textContent = section.title;
                textDiv.appendChild(h2);

                section.content.forEach(block => {
                    const h3 = document.createElement('h3');
                    h3.textContent = block.subtitle;
                    const p = document.createElement('p');
                    p.textContent = block.text;
                    textDiv.appendChild(h3);
                    textDiv.appendChild(p);
                });

                const btn = document.createElement('a');
                btn.className = 'secondary-btn';
                btn.href = section.buttonLink;
                btn.textContent = section.buttonText;
                textDiv.appendChild(btn);

                const img = document.createElement('img');
                img.src = section.imageUrl;
                img.alt = 'About Atelier Luxe';

                sec.appendChild(textDiv);
                sec.appendChild(img);
                main.appendChild(sec);
                return;
            }

            if (section.title === 'How It Works') {
                sec.classList.add('how-it-works');
                const h2 = document.createElement('h2');
                h2.textContent = section.title;
                sec.appendChild(h2);

                const steps = document.createElement('div');
                steps.classList.add('how-it-works-container');

                section.steps.forEach(step => {
                    const a = document.createElement('a');
                    a.classList.add('how-card');
                    a.href = step.link;

                    const img = document.createElement('img');
                    img.src = step.imageUrl;
                    img.alt = step.alt;

                    const p = document.createElement('p');
                    p.textContent = step.text;

                    a.appendChild(img);
                    a.appendChild(p);
                    steps.appendChild(a);
                });

                sec.appendChild(steps);
                main.appendChild(sec);
                return;
            }

            if (section.title === 'Our Customers') {
                sec.classList.add('testimonials');
                const h2 = document.createElement('h2');
                h2.textContent = section.title;
                sec.appendChild(h2);

                const container = document.createElement('div');
                container.classList.add('testimonial-container');

                section.testimonials.forEach(t => {
                    const article = document.createElement('article');
                    article.classList.add('customer-quote');

                    const quote = document.createElement('p');
                    quote.textContent = `"${t.text}"`;

                    const avatar = document.createElement('div');
                    avatar.classList.add('customer-avatar');

                    const img = document.createElement('img');
                    img.src = t.avatar;
                    img.alt = `Portrait of ${t.name}`;

                    const name = document.createElement('span');
                    name.textContent = t.name;

                    avatar.appendChild(img);
                    avatar.appendChild(name);
                    article.appendChild(quote);
                    article.appendChild(avatar);
                    container.appendChild(article);
                });

                sec.appendChild(container);
                main.appendChild(sec);
                return;
            }

            if (section.title === 'Contact Us') {
                sec.classList.add('contact');
                const inner = document.createElement('div');
                inner.classList.add('contact-inner');

                const h2 = document.createElement('h2');
                h2.textContent = section.title;

                const btn = document.createElement('a');
                btn.href = section.buttonLink;
                btn.className = 'primary-btn';
                btn.textContent = section.buttonText;

                inner.appendChild(h2);
                inner.appendChild(btn);
                sec.appendChild(inner);
                main.appendChild(sec);
            }
        });
    })
    .catch(err => {
        console.error(err);
        createErrorBlock('⚠️ We are sorry, something went wrong while loading the page content.');
    });