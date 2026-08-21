import { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useBooks } from '../context/BookContext'

function ReadingGoal() {
  const { books } = useBooks()
  const [goal, setGoal] = useLocalStorage('readingGoal', 12)
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState(goal)

  const currentYear = new Date().getFullYear()
  const completed = books.filter((b) => {
    if (b.status !== 'completed' || !b.finishDate) return false
    return new Date(b.finishDate).getFullYear() === currentYear
  }).length

  const progressPercent = Math.min(Math.round((completed / goal) * 100), 100)

  function handleSave() {
    setGoal(parseInt(inputValue))
    setEditing(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-gray-800">
          {currentYear} Reading Goal
        </h3>
        {editing ? (
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-16 border rounded px-2 py-1 text-sm"
            />
            <button
              onClick={handleSave}
              className="text-sm text-indigo-600 font-medium hover:text-indigo-800"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Edit Goal
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-3">
        {completed} of {goal} books completed
      </p>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-indigo-500 h-3 rounded-full transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1 text-right">{progressPercent}%</p>
    </div>
  )
}

export default ReadingGoal