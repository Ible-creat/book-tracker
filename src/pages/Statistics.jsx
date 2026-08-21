import { useBooks } from '../context/BookContext'
import useLocalStorage from '../hooks/useLocalStorage'

function Statistics() {
  const { books } = useBooks()
  const [goal] = useLocalStorage('readingGoal', 12)

  const currentYear = new Date().getFullYear()

  const completedBooks = books.filter((b) => b.status === 'completed')
  const completedThisYear = completedBooks.filter((b) => {
    if (!b.finishDate) return false
    return new Date(b.finishDate).getFullYear() === currentYear
  })

  const totalPagesRead = books.reduce((sum, b) => sum + b.pagesRead, 0)
  const currentlyReading = books.filter((b) => b.status === 'reading').length
  const wantToRead = books.filter((b) => b.status === 'want to read').length

  const avgPages = completedBooks.length > 0
    ? Math.round(completedBooks.reduce((sum, b) => sum + b.pageCount, 0) / completedBooks.length)
    : 0

  const genreCounts = books.reduce((acc, b) => {
    if (b.genre) acc[b.genre] = (acc[b.genre] || 0) + 1
    return acc
  }, {})

  const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]

  const stats = [
    { label: 'Total Books', value: books.length, icon: '📚' },
    { label: 'Completed This Year', value: completedThisYear.length, icon: '✅' },
    { label: 'Currently Reading', value: currentlyReading, icon: '📖' },
    { label: 'Want to Read', value: wantToRead, icon: '🔖' },
    { label: 'Total Pages Read', value: totalPagesRead.toLocaleString(), icon: '📄' },
    { label: 'Avg Pages Per Book', value: avgPages, icon: '📊' },
    { label: 'Top Genre', value: topGenre ? topGenre[0] : 'N/A', icon: '🏆' },
    { label: 'Goal Progress', value: `${completedThisYear.length}/${goal}`, icon: '🎯' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Statistics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-3xl mb-2">{stat.icon}</p>
            <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          Add some books to see your statistics.
        </p>
      )}
    </div>
  )
}

export default Statistics