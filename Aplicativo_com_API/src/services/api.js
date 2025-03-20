const API_URL="https://www.googleapis.com/books/v1/volumes";

export async function searchBooks(query){
    const response = await fetch(`${API_URL}?q=${query}`);
    const data = await response.json();
    return data.items || [];
}