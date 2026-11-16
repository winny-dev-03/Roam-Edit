
import React, { useState } from 'react'
import { Link } from 'react-router'

const guides = [
  {
    id: 'cape-town-guide',
    title: 'The complete guide to exploring Cape Town',
    category: 'Destination Guide',
    location: 'Cape Town, South Africa',
    readTime: '8 min read',
    description:
      'Everything you need to know about exploring Cape Town, from its iconic landmarks to its quieter coastal corners.',
    image:
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'marrakech-guide',
    title: 'A first-timer’s guide to Marrakech',
    category: 'Travel Tips',
    location: 'Marrakech, Morocco',
    readTime: '7 min read',
    description:
      'Discover the markets, neighbourhoods, food and experiences that make Marrakech special.',
    image:
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'zanzibar-guide',
    title: 'Planning the perfect Zanzibar escape',
    category: 'Destination Guide',
    location: 'Zanzibar, Tanzania',
    readTime: '6 min read',
    description:
      'A practical introduction to island life, beautiful beaches and unforgettable local experiences.',
    image:
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'travel-planning',
    title: 'How to plan a trip without the stress',
    category: 'Travel Planning',
    location: 'Travel Inspiration',
    readTime: '5 min read',
    description:
      'Simple ways to organise your itinerary, manage your budget and prepare for a smoother journey.',
    image:
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'travel-packing',
    title: 'Packing smarter for your next adventure',
    category: 'Travel Tips',
    location: 'Travel Essentials',
    readTime: '4 min read',
    description:
      'Make packing easier with practical tips on what to bring and how to travel lighter.',
    image:
      'https://images.unsplash.com/photo-1553531384-411a247ccd73?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'travel-photography-guide',
    title: 'How to capture better travel memories',
    category: 'Travel Tips',
    location: 'Travel Inspiration',
    readTime: '6 min read',
    description:
      'Learn how to capture meaningful moments and tell better visual stories during your travels.',
    image:
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=85',
  },
]

const categories = [
  'All',
  'Destination Guide',
  'Travel Planning',
  'Travel Tips',
]

function TravelGuides() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filteredGuides = guides.filter((guide) => {
    const matchesCategory =
      activeCategory === 'All' ||
      guide.category === activeCategory

    const matchesSearch =
      guide.title.toLowerCase().includes(search.toLowerCase()) ||
      guide.location.toLowerCase().includes(search.toLowerCase()) ||
      guide.description.toLowerCase().includes(search.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <main className="bg-[#F7F8F7] text-[#172B3A]">

      {/* Hero */}
      <section
        className="relative flex min-h-[65vh] items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=90')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 md:px-12">
          <p className="mb-6 text-xs font-semibold tracking-[0.3em] text-white/75">
            PLAN BETTER. TRAVEL FURTHER.
          </p>

          <h1 className="mb-7 max-w-3xl text-5xl font-semibold leading-tight text-white md:text-7xl">
            Your guide to
            <br />
            going further.
          </h1>

          <p className="max-w-xl text-base leading-8 text-white/80 md:text-lg">
            Practical advice, destination insights and thoughtful
            recommendations to help you make more of every journey.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-[#7799B5]">
              THE TRAVEL GUIDE COLLECTION
            </p>

            <h2 className="max-w-xl text-4xl font-semibold leading-tight md:text-5xl">
              A little preparation. A much better journey.
            </h2>
          </div>

          <p className="max-w-lg text-base leading-8 text-gray-500">
            Good journeys start with good information. Explore guides
            covering destinations, planning, travel essentials and
            experiences worth making time for.
          </p>
        </div>
      </section>

      {/* Featured Guide */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
        <Link
          to="/stories/cape-town-guide"
          className="group grid overflow-hidden rounded-2xl bg-white md:grid-cols-2"
        >
          <div className="min-h-[350px] overflow-hidden md:min-h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1400&q=90"
              alt="Cape Town landscape"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-center p-8 md:p-14">
            <p className="mb-6 text-xs font-semibold tracking-[0.25em] text-[#7799B5]">
              FEATURED GUIDE
            </p>

            <p className="mb-4 text-xs tracking-widest text-gray-400">
              SOUTH AFRICA · DESTINATION GUIDE
            </p>

            <h2 className="mb-6 text-3xl font-semibold leading-tight transition group-hover:text-[#7799B5] md:text-5xl">
              The complete guide to exploring Cape Town.
            </h2>

            <p className="mb-8 text-sm leading-8 text-gray-500">
              From beautiful coastlines and iconic landmarks to
              neighbourhoods worth discovering, get to know Cape Town
              beyond the usual tourist stops.
            </p>

            <span className="inline-flex items-center gap-3 text-sm font-semibold">
              Explore the guide <span>↗</span>
            </span>
          </div>
        </Link>
      </section>

      {/* Travel Planning Topics */}
      <section className="bg-white px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[#7799B5]">
              TRAVEL WITH CONFIDENCE
            </p>

            <h2 className="text-3xl font-semibold md:text-5xl">
              What do you need help with?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                number: '01',
                title: 'Choosing a destination',
                description:
                  'Find inspiration and learn what makes each destination worth visiting.',
              },
              {
                number: '02',
                title: 'Planning your journey',
                description:
                  'Get practical advice on budgets, itineraries and travel preparation.',
              },
              {
                number: '03',
                title: 'Making the most of it',
                description:
                  'Discover local experiences, hidden gems and ways to travel better.',
              },
            ].map((item) => (
              <div
                key={item.number}
                className="border-t border-gray-200 pt-7"
              >
                <p className="mb-10 text-sm text-[#7799B5]">
                  {item.number}
                </p>

                <h3 className="mb-4 text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm leading-8 text-gray-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Guides */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <div className="mb-12">
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[#7799B5]">
            FIND YOUR NEXT READ
          </p>

          <h2 className="text-3xl font-semibold md:text-5xl">
            Explore our travel guides.
          </h2>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search travel guides..."
            className="w-full rounded-full border border-gray-200 bg-white px-6 py-4 text-sm outline-none transition focus:border-[#7799B5]"
          />
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-6 py-3 text-sm transition ${
                activeCategory === category
                  ? 'bg-[#172B3A] text-white'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-[#172B3A]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="mb-8 text-sm text-gray-500">
          Showing {filteredGuides.length} guides
        </p>

        {filteredGuides.length > 0 ? (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGuides.map((guide) => (
              <Link
                to={`/stories/${guide.id}`}
                key={guide.id}
                className="group"
              >
                <div className="mb-6 h-[300px] overflow-hidden rounded-2xl">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold tracking-widest text-[#7799B5]">
                    {guide.category}
                  </span>

                  <span className="text-xs text-gray-400">
                    {guide.readTime}
                  </span>
                </div>

                <h3 className="mb-4 text-xl font-semibold leading-snug transition group-hover:text-[#7799B5]">
                  {guide.title}
                </h3>

                <p className="mb-5 text-sm leading-7 text-gray-500">
                  {guide.description}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  Read guide <span>↗</span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <h3 className="mb-3 text-2xl font-semibold">
              No guides found.
            </h3>

            <p className="text-sm text-gray-500">
              Try another search or select a different category.
            </p>

            <button
              onClick={() => {
                setSearch('')
                setActiveCategory('All')
              }}
              className="mt-6 text-sm font-semibold text-[#7799B5] underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Closing CTA */}
      <section className="bg-[#172B3A] px-6 py-24 text-center text-white md:px-12">
        <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-[#A9C3D8]">
          EVERY JOURNEY STARTS SOMEWHERE
        </p>

        <h2 className="mx-auto mb-7 max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">
          Make your next journey a memorable one.
        </h2>

        <p className="mx-auto mb-10 max-w-lg text-sm leading-8 text-white/65">
          Find a destination, get inspired and start planning your next adventure.
        </p>

        <Link
          to="/destinations"
          className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#172B3A] transition hover:bg-[#DCE7EF]"
        >
          Explore destinations <span>↗</span>
        </Link>
      </section>

    </main>
  )
}

export default TravelGuides
