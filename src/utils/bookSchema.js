// Default book structure
export const createBook = ({
  title = '',
  author = '',
  pageCount = 0,
  coverImage = '',
  status = 'want to read',
  pagesRead = 0,
  genre = '',
  startDate = '',
  finishDate = '',
  dateAdded = new Date().toISOString(),
  isFavorite = false,
} = {}) => ({
  id: Date.now(),
  title,
  author,
  pageCount,
  coverImage,
  status,
  pagesRead,
  genre,
  startDate,
  finishDate,
  dateAdded,
  isFavorite,
})

export const STATUSES = ['want to read', 'reading', 'completed']

export const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Biography',
  'History',
  'Self-Help',
  'Other',
]