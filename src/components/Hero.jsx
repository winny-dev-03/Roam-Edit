import React from 'react'

function Hero() {
  return (
    <main
      className="relative min-h-[85vh] bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/images/React-pic.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/40 to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 min-h-[85vh] px-6 py-7 md:px-16 lg:px-24">

        {/* Navigation */}
        <nav className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold tracking-tight">
            Sammy Iria Blog<span className="text-[#8DB4D6]">.</span>
          </a>

          <div className="hidden items-center gap-9 text-sm md:flex">
            <a href="/" className="transition hover:text-[#8DB4D6]">Home</a>
            <a href="#destinations" className="transition hover:text-[#8DB4D6]">Destinations</a>
            <a href="#stories" className="transition hover:text-[#8DB4D6]">Stories</a>
            <a href="#technology" className="transition hover:text-[#8DB4D6]">Technology</a>
          </div>

          <a
            href="#stories"
            className="rounded-full border border-white/70 px-5 py-3 text-xs font-medium transition hover:bg-white hover:text-slate-900"
          >
            Explore More ↗
          </a>
        </nav>

        {/* Main heading */}
        <section className="flex min-h-[70vh] max-w-3xl flex-col justify-center pb-12 pt-20">
        <p className="mb-6 text-xs font-semibold tracking-[0.3em] text-[#D6E6F2]">
  YOUR WORLD OF TRAVEL & DISCOVERY
</p>

          <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-8xl">
        See the World
<br />
Differently.
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-white/85 sm:text-lg">
       A world worth exploring, one destination, experience and story at a time.
          </p>

          <a
            href="#stories"
            className="mt-9 inline-flex w-fit items-center gap-3 rounded-full bg-[#8DB4D6] px-7 py-4 text-sm font-semibold text-[#161316] transition hover:bg-[#D6E6F2]"
          >
            Explore Stories <span>↗</span>
          </a>
        </section>
      </div>
    </main>
  )
}

export default Hero
