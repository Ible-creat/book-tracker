import { useState } from 'react'
import { useBooks } from '../context/BookContext'
import BookList from '../components/BookList'
import AddBookForm from '../components/AddBookForm'

function Home() {
  const { books } = useBooks()
  const [showForm, setShowForm] = useState(false)

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

      <BookList />
    </div>
  )
}

export default Home