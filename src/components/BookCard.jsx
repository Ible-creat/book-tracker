import { useState } from 'react'
import { useBooks } from '../context/BookContext'
import UpdateProgressModal from './UpdateProgressModal'

function BookCard({ book }) {
  const { deleteBook, toggleFavorite } = useBooks()
  const [showProgress, setShowProgress] = useState(false)

  const progressPercent = book.pageCount > 0
    ? Math.round((book.pagesRead / book.pageCount) * 100)
    : 0

  const statusColors = {
    'want to read': 'bg-gray-100 text-gray-700',
    'reading': 'bg-blue-100 text-blue-700',
    'completed': 'bg-green-100 text-green-700',
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex gap-4">
      {book.coverImage ? (
        <img
          src={book.coverImage}
          alt={`${book.title} cover`}
          className="w-16 h-24 object-cover rounded"
        />
      ) : (
        <div className="w-16 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs text-center">
          No Cover
        </div>
      )}

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-800">{book.title}</h3>
            <p className="text-sm text-gray-500">{book.author}</p>
          </div>
          <button
            onClick={() => toggleFavorite(book.id)}
            aria-label={book.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="text-xl"
          >
            {book.isFavorite ? '⭐' : '☆'}
          </button>
        </div>

        <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${statusColors[book.status]}`}>
          {book.status}
        </span>

        {book.genre && (
          <p className="text-xs text-gray-400 mt-1">{book.genre}</p>
        )}

        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{book.pagesRead} of {book.pageCount} pages</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-3">
          <button
            onClick={() => setShowProgress(true)}
            className="text-xs text-indigo-600 hover:text-indigo-800"
          >
            Update Progress
          </button>
          <button
            onClick={() => deleteBook(book.id)}
            aria-label={`Delete ${book.title}`}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {showProgress && (
        <UpdateProgressModal
          book={book}
          onClose={() => setShowProgress(false)}
        />
      )}
    </div>
  )
}

export default BookCard