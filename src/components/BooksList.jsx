import React, { useEffect, useState } from 'react'

function BooksList() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch('https://mon-vieux-grimoire-backend-lmkk.onrender.com/api/books')
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error('Erreur API :', err))
  }, [])

  return (
    <div>
      <h2>Liste des livres</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default BooksList
