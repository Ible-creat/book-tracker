import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { createBook } from '../utils/bookSchema'

const BookContext = createContext()

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', [])

  function addBook(bookData) {
    const newBook = createBook(bookData)
    setBooks([...books, newBook])
  }

  function deleteBook(id) {
    setBooks(books.filter((book) => book.id !== id))
  }

  function updateBook(updatedBook) {
    setBooks(books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    ))
  }

  function toggleFavorite(id) {
    setBooks(books.map((book) =>
      book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
    ))
  }

  return (
    <BookContext.Provider value={{
      books,
      addBook,
      deleteBook,
      updateBook,
      toggleFavorite,
    }}>
      {children}
    </BookContext.Provider>
  )
}

export function useBooks() {
  return useContext(BookContext)
}