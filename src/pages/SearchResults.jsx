
import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router'

const searchData = [
  {
    title: 'Cape Town',
    type: 'Destination',
    category: 'South Africa',
    description: 'Explore dramatic coastlines, beautiful mountains and vibrant city life.',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1000&q=85',
    link: '/destinations/cape-town',
  },
  {
    title: 'Marrakech',
    type: 'Destination',
    category: 'Morocco',
    description: 'Discover colourful markets, beautiful architecture and rich culture.',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1000&q=85',
    link: '/destinations/marrakech',
  },
  {
    title: 'Zanzibar',
    type: 'Destination',
    category: 'Tanzania',
    description: 'Experience turquoise waters, white sand beaches and island life.',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=85',
    link: '/destinations/zanzibar',
  },
  {
    title: 'Discovering the colourful streets of Marrakech',
    type: 'Story',
    category: 'Culture',
    description: 'A closer look at the streets, traditions and experiences of Marrakech.',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1000&q=85',
    link: '/stories/marrakech-streets',
  },
  {
    title: 'A different way to experience Cape Town',
    type: 'Story',
    category: 'Travel Guide',
    description: 'Discover a fresh perspective on one of South Africa’s most beautiful cities.',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1000&q=85',
    link: '/stories/cape-town-guide',
  },
  {
    title: 'Nairobi',
    type: 'Destination',
    category: 'Kenya',
    description: 'Discover a city where modern urban life meets incredible wildlife.',
    image: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?auto=format&fit=crop&w=1000&q=85',
    link: '/destinations/nairobi',
  },
]

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [search, setSearch] = useState(initialQuery)
  const [activeFilter, setActiveFilter] = useState('All')

  const query = search.trim().toLowerCase()

  const filteredResults = searchData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)

    const matchesFilter =
      activeFilter === 'All' || item.type === activeFilter

    return matchesSearch && matchesFilter
  })

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchParams(search.trim() ? { q: search.trim() } : {})
  }

  return (
    <main className="min-h-screen bg-[#F7F8F7] text-[#172B3A]">

      {/* Header */}
      <section className="bg-[#172B3A] px-6 pb-20 pt-36 text-white md:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-[#A9C3D8]">
            EXPLORE Sammy Iria's Blog
          </p>

          <h1 className="mb-6 text-4xl font-semibold md:text-6xl">
            Find what you're looking for.
          </h1>

          <p className="max-w-xl text-sm leading-8 text-white/65 md:text-base">
            Search destinations, travel guides and stories to find
            inspiration for your next journey.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search places, stories or experiences..."
              className="min-w-0 flex-1 rounded-full border border-white/20 bg-white px-6 py-4 text-sm text-[#172B3A] outline-none placeholder:text-gray-400 focus:border-[#7799B5]"
            />

            <button
              type="submit"
              className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#172B3A] transition hover:bg-[#DCE7EF]"
            >
              Search ↗
            </button>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12">

        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#7799B5]">
              SEARCH DISCOVERIES
            </p>

            <h2 className="text-3xl font-semibold">
              {query ? `Results for "${search}"` : 'Explore our collection'}
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'} found
            </p>
          </div>

          <Link
            to="/destinations"
            className="text-sm font-semibold transition hover:text-[#7799B5]"
          >
            Browse destinations ↗
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap gap-3">
          {['All', 'Destination', 'Story'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-6 py-3 text-sm transition ${
                activeFilter === filter
                  ? 'bg-[#172B3A] text-white'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-[#172B3A]'
              }`}
            >
              {filter === 'All' ? 'Everything' : `${filter}s`}
            </button>
          ))}
        </div>

        {/* Result Grid */}
        {filteredResults.length > 0 ? (
          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResults.map((item) => (
              <Link
                to={item.link}
                key={item.title}
                className="group"
              >
                <div className="mb-5 h-[280px] overflow-hidden rounded-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-[#E5EDF2] px-3 py-2 text-xs font-medium text-[#526F83]">
                    {item.type}
                  </span>

                  <span className="text-xs text-gray-400">
                    {item.category}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-semibold transition group-hover:text-[#7799B5]">
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-gray-500">
                  {item.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                  Explore <span>↗</span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center">
            <div className="mb-5 text-4xl">⌕</div>

            <h3 className="mb-3 text-2xl font-semibold">
              Nothing found just yet.
            </h3>

            <p className="mx-auto max-w-md text-sm leading-7 text-gray-500">
              We couldn't find anything matching your search.
              Try another destination, keyword or story.
            </p>

            <button
              onClick={() => {
                setSearch('')
                setSearchParams({})
                setActiveFilter('All')
              }}
              className="mt-7 rounded-full bg-[#172B3A] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#7799B5]"
            >
              Clear search
            </button>
          </div>
        )}

      </section>

    </main>
  )
}

export default SearchResults
