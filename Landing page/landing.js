const main = document.querySelector('main');

fetch('sections.json')
    .then(response => {
        if (!response.ok) throw new Error('Sections data could not be loaded.');
        return response.json();
    })
    .then(sectionsData => {
        sectionsData.infoSections.forEach(sectionData => {
            const section = document.createElement('section');
            section.classList.add('dynamic-section');

            if (sectionData.title === 'Hero Section') {
                section.classList.add('hero', 'container', 'hero-content');
                section.innerHTML = `
          <h1>${sectionData.content}</h1>
          <a href="${sectionData.buttonLink}" class="primary-btn">${sectionData.buttonText}</a>`;
                main.append(section);
                return;
            }

            if (sectionData.title === 'Our Collections') {
                section.classList.add('collections');
                const wrapper = document.createElement('div');
                wrapper.classList.add('collections-content');

                const h2 = document.createElement('h2');
                h2.textContent = sectionData.title;
                wrapper.appendChild(h2);

                const cards = document.createElement('div');
                cards.classList.add('collection-cards');

                sectionData.collections.forEach(item => {
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
                section.appendChild(wrapper);
                main.appendChild(section);
                return;
            }

            if (sectionData.title === 'About Us') {
                section.classList.add('about-section');
                const textDiv = document.createElement('div');
                textDiv.classList.add('about-text');

                const h2 = document.createElement('h2');
                h2.textContent = sectionData.title;
                textDiv.appendChild(h2);

                sectionData.content.forEach(block => {
                    const h3 = document.createElement('h3');
                    h3.textContent = block.subtitle;
                    const p = document.createElement('p');
                    p.textContent = block.text;
                    textDiv.appendChild(h3);
                    textDiv.appendChild(p);
                });

                const btn = document.createElement('a');
                btn.className = 'secondary-btn';
                btn.href = sectionData.buttonLink;
                btn.textContent = sectionData.buttonText;
                textDiv.appendChild(btn);

                const img = document.createElement('img');
                img.src = sectionData.imageUrl;
                img.alt = 'About Atelier Luxe';

                section.appendChild(textDiv);
                section.appendChild(img);
                main.appendChild(section);
                return;
            }

            if (sectionData.title === 'How It Works') {
                section.classList.add('how-it-works');
                const h2 = document.createElement('h2');
                h2.textContent = sectionData.title;
                section.appendChild(h2);

                const steps = document.createElement('div');
                steps.classList.add('how-it-works-container');

                sectionData.steps.forEach(step => {
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

                section.appendChild(steps);
                main.appendChild(section);
                return;
            }

            if (sectionData.title === 'Our Customers') {
                section.classList.add('testimonials');
                const h2 = document.createElement('h2');
                h2.textContent = sectionData.title;
                section.appendChild(h2);

                const container = document.createElement('div');
                container.classList.add('testimonial-container');

                sectionData.testimonials.forEach(t => {
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

                section.appendChild(container);
                main.appendChild(section);
                return;
            }

            if (sectionData.title === 'Contact Us') {
                section.classList.add('contact');
                const inner = document.createElement('div');
                inner.classList.add('contact-inner');

                const h2 = document.createElement('h2');
                h2.textContent = sectionData.title;

                const btn = document.createElement('a');
                btn.href = sectionData.buttonLink;
                btn.className = 'primary-btn';
                btn.textContent = sectionData.buttonText;

                inner.appendChild(h2);
                inner.appendChild(btn);
                section.appendChild(inner);
                main.appendChild(section);
            }
        });
    })
    .catch(err => {
        console.error(err);
        const errorSection = document.createElement('section');
        errorSection.classList.add('error-section');
        const errorP = document.createElement('p');
        errorP.classList.add('error-message');
        errorP.textContent = 'We are sorry, something went wrong while loading the page content.';
        errorSection.appendChild(errorP);
        main.appendChild(errorSection);
    });