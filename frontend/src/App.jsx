import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getTurfs } from './api'

function App() {
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem('access_token')
  const [featuredTurfs, setFeaturedTurfs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getTurfs()
      .then(res => setFeaturedTurfs(res.data.slice(0, 3)))
      .catch(() => {})
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/login')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/explore${searchQuery ? `?q=${searchQuery}` : ''}`)
  }

  const turfImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA_PdcX0XCqaCfdE95SUvI3KzEIPS2o2f9mHctX4OvxViByz_5vNE5EH4Evi8dHB2DHOGa1gHDnoe2o4H2-fZ6t2r9wbX8438JF1YwyBCgD0n4V2qv-Py6wkQAenNSQTbqfR6mv4Fzz5GfEHO8pb-O6bTMx4u4blDFtM38Ou1z86njBB_iRJ9QRzL571d4UWRjf4ZFoAOafawmlzR9JlHGvvZAsppQk9cNjbghIn7nBfhTLNnDkKAPVVj-d6s4oAAFRyDrPTr06AJ8',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAa1rv4SLcPB_ROLywenu_5xBbhjiUj0XlaBBl5SluGmFSk-1LUTGlGtLTATnhMfDa2nKGizbhc2Ku_1XOKVHBF1IQcl9YlPyIQREqcPA270UP6nE_1VXcNHV9IzQSDcHWSQVIw9F7py79EJ3tPANHet4CRdrABGiTGkVVRLhFdIALnwJC-SVRPII34o4sT6lWu_JbxLKbj9nvnff2HgTh7kFGVfqFyCd5CxQgNurC7aEiSRB3hY7J_bROZXHLZdqD9USj8fu0k0yg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA7TahuCOI8Cad-C_ftXUZS6pG1WUWuSGDXqsVRpeN5HXq213OaeiK0HUhnWM8RAE3Sfo0ZsvCmLM2-YWuf53ZlCXIvTsVmEulxEZxDun0A0eK7QH4oL-4LQPs_ZiS5VI2jXruRg2YbbS_fDQRt9HKS2eT4mCH_DfoFgXvvPEwDUmtfDK5uCracb6hGTI-iH0EQVjHehyUyw8UE6OrLvK-KQ_LhfrrhBYj5Hb8p46Z4yKEDlzCzq3HxpNGM-nnouzY3wfP2LRnQ0KM',
  ]

  return (
    <div className="bg-background text-on-surface font-body-base overflow-x-hidden dark">
      {/* TopAppBar */}
      <header className="bg-surface-glass/80 backdrop-blur-md docked full-width top-0 sticky z-50 border-b border-border-subtle shadow-neon-green-glow/5">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-max-width mx-auto">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary-fixed-dim">sports_soccer</span>
            <Link to="/" className="font-headline-md text-headline-md tracking-tighter text-on-surface">TurfAlly</Link>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <Link className="font-label-uppercase text-label-uppercase text-primary font-bold" to="/">Home</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-colors" to="/explore">Explore</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-colors" to="/bookings">Bookings</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-colors" to="/profile">Profile</Link>
          </nav>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden border border-border-subtle hover:border-primary-container/50 transition-all">
                  <span className="material-symbols-outlined text-on-surface-variant">person</span>
                </Link>
                <button onClick={handleLogout} className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-error transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-primary-container text-on-primary-container px-5 py-2 rounded-lg font-label-uppercase text-label-uppercase font-bold hover:opacity-90 transition-all neon-glow-primary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full min-h-[680px] flex flex-col items-center justify-center pt-20 pb-32 px-margin-mobile md:px-margin-desktop overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-container/8 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary-container/8 rounded-full blur-[100px]"></div>
            <img
              alt="Football Turf Background"
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-KWC4UGeJLudl60VH-itnX_gx9yycM1waGIKdHFHzBW7wEb-v_H49ULOdifwxUrtvHGXBGhLZgPXJBTNxhKW4Qt6O76SMVvH8edZSWDWO_VeKteZjO60JxZE265wH0hf9vf9h5_9seqgrKkkWVFgBcoPVTgO7a_tNToZGbpR2U9r1JB_YLu8tyeLpmUYmLuRAu3d2RuPgeDU6ImN6pbJ2V7iSogZCzZDb_lGJLEqIqxjJmEvc2qZD0Kpl8Axypr2wMhLcrBSz2Ow"
            />
          </div>
          <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-primary-container/20 text-primary-fixed-dim mb-4">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span className="font-label-uppercase text-label-uppercase">The Future of Sports Booking</span>
            </div>
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface max-w-3xl mx-auto leading-tight">
              Dominate the Pitch. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-fixed-dim to-secondary-fixed-dim">Book Your Arena.</span>
            </h2>
            <p className="font-body-base text-body-base text-on-surface-variant max-w-xl mx-auto">
              Access elite sports facilities with precision scheduling. TurfAlly bridges the gap between urban athletes and premium arenas.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-12">
              <form onSubmit={handleSearch} className="glass-panel p-2 rounded-xl flex items-center gap-2 focus-within:ring-2 ring-secondary-container/30 transition-all">
                <div className="flex-1 flex items-center px-4 gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">search</span>
                  <input
                    className="bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant w-full font-body-base outline-none"
                    placeholder="Find your turf..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button type="submit" className="bg-primary-container text-on-primary-container px-8 py-3 rounded-lg font-label-uppercase text-label-uppercase font-bold hover:scale-105 active:scale-95 transition-all neon-glow-primary">
                  Search
                </button>
              </form>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              {[
                { label: 'Active Turfs', value: '50+' },
                { label: 'Cities', value: '12' },
                { label: 'Happy Athletes', value: '10k+' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="font-display-lg-mobile text-display-lg-mobile text-primary-fixed-dim">{stat.value}</p>
                  <p className="font-label-uppercase text-label-uppercase text-on-surface-variant">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Venues Section */}
        <section className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop -mt-16 relative z-20 pb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Trending Venues</h3>
              <p className="text-on-surface-variant font-body-sm">Most booked arenas in your city right now.</p>
            </div>
            <Link to="/explore" className="flex items-center gap-2 text-primary-fixed-dim hover:gap-3 transition-all">
              <span className="font-label-uppercase text-label-uppercase">View All</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          {featuredTurfs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[500px]">
              {/* Large featured card */}
              <div className="md:col-span-2 relative group rounded-xl overflow-hidden glass-panel">
                <img
                  alt={featuredTurfs[0]?.name || 'Featured Turf'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={turfImages[0]}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                  <div>
                    <span className="bg-primary-container/20 text-primary-container px-3 py-1 rounded-full font-label-uppercase text-label-uppercase mb-3 inline-block">Pro-Grade</span>
                    <h4 className="font-headline-md text-headline-md text-on-surface">{featuredTurfs[0]?.name}</h4>
                    <p className="text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {featuredTurfs[0]?.venue?.location || 'Prime Location'}
                    </p>
                  </div>
                  <div className="glass-panel px-6 py-4 rounded-xl text-center">
                    <span className="block font-headline-md text-headline-md text-primary-fixed-dim">${featuredTurfs[0]?.hourly_rate}</span>
                    <span className="text-on-surface-variant text-[10px] font-label-uppercase">Per Hour</span>
                  </div>
                </div>
              </div>

              {/* Two smaller cards */}
              <div className="flex flex-col gap-6">
                {featuredTurfs.slice(1, 3).map((turf, i) => (
                  <div key={turf.id} className="flex-1 relative group rounded-xl overflow-hidden glass-panel">
                    <img
                      alt={turf.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={turfImages[i + 1]}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h4 className="font-headline-md text-headline-md text-on-surface">{turf.name}</h4>
                      <p className="text-on-surface-variant font-body-sm">${turf.hourly_rate}/hr • {turf.sport}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Placeholder when no turfs loaded yet */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[500px]">
              <div className="md:col-span-2 relative group rounded-xl overflow-hidden glass-panel">
                <img alt="Premier League Arena" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={turfImages[0]} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                  <div>
                    <span className="bg-primary-container/20 text-primary-container px-3 py-1 rounded-full font-label-uppercase text-label-uppercase mb-3 inline-block">Pro-Grade</span>
                    <h4 className="font-headline-md text-headline-md text-on-surface">Thunderbolt Arena</h4>
                    <p className="text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      Downtown Sports District
                    </p>
                  </div>
                  <div className="glass-panel px-6 py-4 rounded-xl text-center">
                    <span className="block font-headline-md text-headline-md text-primary-fixed-dim">$45</span>
                    <span className="text-on-surface-variant text-[10px] font-label-uppercase">Per Hour</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex-1 relative group rounded-xl overflow-hidden glass-panel">
                  <img alt="Skyline Hoops" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={turfImages[1]} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h4 className="font-headline-md text-headline-md text-on-surface">Skyline Hoops</h4>
                    <p className="text-on-surface-variant font-body-sm">4.9 ★ (120 reviews)</p>
                  </div>
                </div>
                <div className="flex-1 relative group rounded-xl overflow-hidden glass-panel">
                  <img alt="Padel Point" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={turfImages[2]} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h4 className="font-headline-md text-headline-md text-on-surface">Padel Point</h4>
                    <p className="text-on-surface-variant font-body-sm">Available in 2h</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-32">
          <div className="glass-panel rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 to-secondary-container/5"></div>
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[48px] text-primary-fixed-dim mb-4 block">emoji_events</span>
              <h3 className="font-display-lg-mobile text-display-lg-mobile text-on-surface mb-3">Ready to Play?</h3>
              <p className="text-on-surface-variant font-body-base mb-8 max-w-md mx-auto">
                Join thousands of athletes booking premium turf experiences across the city.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/explore" className="bg-primary-container text-on-primary-container px-8 py-3 rounded-lg font-label-uppercase text-label-uppercase font-bold hover:scale-105 active:scale-95 transition-all neon-glow-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">explore</span>
                  Explore Turfs
                </Link>
                {!isLoggedIn && (
                  <Link to="/login" className="border border-secondary-container/40 text-secondary-fixed-dim px-8 py-3 rounded-lg font-label-uppercase text-label-uppercase font-bold hover:bg-secondary-container/10 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">login</span>
                    Create Account
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle">
        <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-fixed-dim">sports_soccer</span>
            <span className="font-label-uppercase text-label-uppercase text-on-surface">TurfAlly © 2026</span>
          </div>
          <div className="flex gap-6">
            <Link to="/explore" className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-on-surface transition-colors">Explore</Link>
            <Link to="/bookings" className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-on-surface transition-colors">Bookings</Link>
            <Link to="/profile" className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-on-surface transition-colors">Profile</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
