import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">📚 Book Tracker</h1>
        <nav className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'font-semibold underline' : 'hover:underline'
            }
          >
            My Books
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              isActive ? 'font-semibold underline' : 'hover:underline'
            }
          >
            Add Book
          </NavLink>
          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              isActive ? 'font-semibold underline' : 'hover:underline'
            }
          >
            Statistics
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header