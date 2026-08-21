import { useState } from 'react'
import { useBooks } from '../context/BookContext'
import { STATUSES, GENRES } from '../utils/bookSchema'

function AddBookForm({ onClose }) {
  const { addBook } = useBooks()
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    title: '',
    author: '',
    pageCount: '',
    coverImage: '',
    status: 'want to read',
    genre: '',
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Title is required'
    if (!form.author.trim()) newErrors.author = 'Author is required'
    if (!form.pageCount || form.pageCount <= 0)
      newErrors.pageCount = 'Enter a valid page count'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    addBook({ ...form, pageCount: parseInt(form.pageCount) })
    if (onClose) onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Book title"
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Author
        </label>
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author name"
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Page Count
        </label>
        <input
          name="pageCount"
          type="number"
          value={form.pageCount}
          onChange={handleChange}
          placeholder="Number of pages"
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {errors.pageCount && <p className="text-red-500 text-xs mt-1">{errors.pageCount}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cover Image URL
        </label>
        <input
          name="coverImage"
          value={form.coverImage}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Genre
        </label>
        <select
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Select a genre</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700"
      >
        Add Book
      </button>
    </form>
  )
}

export default AddBookForm