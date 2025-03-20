async function searchBooks(query) {
  if (!query) {
    alert('Digite um título ou autor!');
    return [];
  }

  try {
    
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    
    
    if (!response.ok) {
      throw new Error('Erro ao buscar livros');
    }

   
    const data = await response.json();

    
    const books = data.items || [];

    
    return books.map(book => ({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || ['Autor desconhecido']
    }));
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    return [];
  }
}


async function handleSearch() {
  const query = document.getElementById('query').value;
  const books = await searchBooks(query);

  
  displayBooks(books);
}


function displayBooks(books) {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';

  if (books.length === 0) {
    const noResults = document.createElement('li');
    noResults.textContent = 'Nenhum livro encontrado.';
    bookList.appendChild(noResults);
  }

  books.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} - ${book.authors.join(', ')}`;
    bookList.appendChild(li);
  });
}