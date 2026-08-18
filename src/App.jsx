import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import AddBook from './pages/AddBook'
import Statistics from './pages/Statistics'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </main>
    </div>
  )
}

export default App