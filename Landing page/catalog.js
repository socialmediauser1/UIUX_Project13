function renderCatalogCards(cards) {
  const container = document.querySelector('.blog-container');
  container.innerHTML = '';

  cards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('blog-card');

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('blog-img');
    const img = document.createElement('img');
    img.src = card.imageUrl;
    img.alt = card.title;
    imgDiv.appendChild(img);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('blog-content');

    const title = document.createElement('h3');
    title.classList.add('blog-title');
    title.textContent = card.title;

    const description = document.createElement('p');
    description.textContent = card.description;

    const button = document.createElement('button');
    button.classList.add('blog-button');
    button.textContent = 'Explore';

    contentDiv.appendChild(title);
    contentDiv.appendChild(description);
    contentDiv.appendChild(button);

    cardDiv.appendChild(imgDiv);
    cardDiv.appendChild(contentDiv);
    container.appendChild(cardDiv);
  });
}

fetch('products.json')
  .then(response => {
    if (!response.ok) throw new Error("Could not load products");
    return response.json();
  })
  .then(products => renderCatalogCards(products))
  .catch(err => {
    console.error('Catalog loading error:', err);

    const container = document.querySelector('.blog-container');
    container.innerHTML = '';

    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = 'Sorry, products could not be loaded at the moment. Please try again later.';

    container.appendChild(errorDiv);
  });