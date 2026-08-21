import { useState } from 'react'
import { useBooks } from '../context/BookContext'

function UpdateProgressModal({ book, onClose }) {
  const { updateBook } = useBooks()
  const [pagesRead, setPagesRead] = useState(book.pagesRead)

  function handleSubmit(e) {
    e.preventDefault()
    const updated = {
      ...book,
      pagesRead: parseInt(pagesRead),
      status: parseInt(pagesRead) >= book.pageCount ? 'completed' : book.status,
      finishDate: parseInt(pagesRead) >= book.pageCount
        ? new Date().toISOString().split('T')[0]
        : book.finishDate,
    }
    updateBook(updated)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Update Progress
        </h3>
        <p className="text-sm text-gray-500 mb-4">{book.title}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pages Read (out of {book.pageCount})
            </label>
            <input
              type="number"
              min="0"
              max={book.pageCount}
              value={pagesRead}
              onChange={(e) => setPagesRead(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProgressModal