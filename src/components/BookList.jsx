import { useBooks } from '../context/BookContext'
import BookCard from './BookCard'

function BookList({ books }) {
  const { books: allBooks } = useBooks()

  const displayBooks = books || allBooks

  if (displayBooks.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-4">📚</p>
        <p className="text-gray-500 text-lg">No books yet. Add your first book!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {displayBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

export default BookList