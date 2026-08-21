import { useState } from 'react'
import { useBooks } from '../context/BookContext'
import BookList from '../components/BookList'
import AddBookForm from '../components/AddBookForm'
import { STATUSES, GENRES } from '../utils/bookSchema'

function Home() {
  const { books } = useBooks()
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterGenre, setFilterGenre] = useState('all')

  const filteredBooks = books
    .filter((b) => filterStatus === 'all' || b.status === filterStatus)
    .filter((b) => filterGenre === 'all' || b.genre === filterGenre)
    .filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          My Books
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({books.length} total)
          </span>
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium"
        >
          {showForm ? 'Cancel' : '+ Add Book'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Add a New Book</h3>
          <AddBookForm onClose={() => setShowForm(false)} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="flex gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="all">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="all">All Genres</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredBooks.length === 0 && books.length > 0 && (
        <p className="text-center text-gray-500 py-8">
          No books match your search or filter.
        </p>
      )}

      <BookList books={filteredBooks} />
    </div>
  )
}

export default Home