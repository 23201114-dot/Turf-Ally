import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getTurfs, createBooking } from './api'

export default function ExploreTurfs() {
  const navigate = useNavigate()
  const [turfs, setTurfs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [selectedTurf, setSelectedTurf] = useState(null)
  const [bookingForm, setBookingForm] = useState({ start_time: '', end_time: '' })
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const isLoggedIn = !!localStorage.getItem('access_token')

  const sports = ['All', 'Football', 'Basketball', 'Tennis', 'Cricket', 'Padel']

  const turfImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBV0XeVhnasILKy50WNh5WPGpT6mugdimtrTJK-eWZRchXINKFbLw7R5L7W9GxZB6CtW_sh-amNrDSF63r3MPfa3KdjtrxZkpj0rPxkP2oj2wu4Le3tNxOeZttLELz8OEML7wFs5bFdeeFSGh_kbycwBmA2OydBjR1Pzp5sHdtYe_TkKUtLDlCIJ10L_JSXtxCzV0pnzrJkNTUqvhdft8R9Kqxb6hqzo1JzVOI51dErfYMC7lFpWxct-m53o6qPu57GngEzxtLWND0',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA_PdcX0XCqaCfdE95SUvI3KzEIPS2o2f9mHctX4OvxViByz_5vNE5EH4Evi8dHB2DHOGa1gHDnoe2o4H2-fZ6t2r9wbX8438JF1YwyBCgD0n4V2qv-Py6wkQAenNSQTbqfR6mv4Fzz5GfEHO8pb-O6bTMx4u4blDFtM38Ou1z86njBB_iRJ9QRzL571d4UWRjf4ZFoAOafawmlzR9JlHGvvZAsppQk9cNjbghIn7nBfhTLNnDkKAPVVj-d6s4oAAFRyDrPTr06AJ8',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAa1rv4SLcPB_ROLywenu_5xBbhjiUj0XlaBBl5SluGmFSk-1LUTGlGtLTATnhMfDa2nKGizbhc2Ku_1XOKVHBF1IQcl9YlPyIQREqcPA270UP6nE_1VXcNHV9IzQSDcHWSQVIw9F7py79EJ3tPANHet4CRdrABGiTGkVVRLhFdIALnwJC-SVRPII34o4sT6lWu_JbxLKbj9nvnff2HgTh7kFGVfqFyCd5CxQgNurC7aEiSRB3hY7J_bROZXHLZdqD9USj8fu0k0yg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA7TahuCOI8Cad-C_ftXUZS6pG1WUWuSGDXqsVRpeN5HXq213OaeiK0HUhnWM8RAE3Sfo0ZsvCmLM2-YWuf53ZlCXIvTsVmEulxEZxDun0A0eK7QH4oL-4LQPs_ZiS5VI2jXruRg2YbbS_fDQRt9HKS2eT4mCH_DfoFgXvvPEwDUmtfDK5uCracb6hGTI-iH0EQVjHehyUyw8UE6OrLvK-KQ_LhfrrhBYj5Hb8p46Z4yKEDlzCzq3HxpNGM-nnouzY3wfP2LRnQ0KM',
  ]

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await getTurfs()
        setTurfs(response.data)
      } catch (error) {
        console.error('Failed to fetch turfs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTurfs()
  }, [])

  const filteredTurfs = filter === 'All' ? turfs : turfs.filter(t => t.sport === filter)

  const openBookingModal = (turf) => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    setSelectedTurf(turf)
    setBookingForm({ start_time: '', end_time: '' })
    setBookingSuccess(false)
    setBookingError('')
  }

  const handleBook = async (e) => {
    e.preventDefault()
    setBookingLoading(true)
    setBookingError('')
    try {
      await createBooking({
        turf_id: selectedTurf.id,
        start_time: bookingForm.start_time,
        end_time: bookingForm.end_time,
      })
      setBookingSuccess(true)
    } catch (err) {
      setBookingError(err.response?.data?.detail || JSON.stringify(err.response?.data) || 'Booking failed. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  return (
    <div className="bg-background text-on-surface font-body-base min-h-screen dark">
      {/* TopAppBar */}
      <header className="bg-surface-glass/80 backdrop-blur-md docked full-width top-0 sticky z-50 border-b border-border-subtle">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-max-width mx-auto">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary-fixed-dim">sports_soccer</span>
            <Link to="/" className="font-headline-md text-headline-md tracking-tighter text-on-surface">TurfAlly</Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/">Home</Link>
            <Link className="font-label-uppercase text-label-uppercase text-primary font-bold" to="/explore">Explore</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/bookings">Bookings</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/profile">Profile</Link>
          </div>
          {isLoggedIn ? (
            <Link to="/profile" className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center border border-border-subtle hover:border-primary-container/50 transition-all">
              <span className="material-symbols-outlined text-on-surface-variant">person</span>
            </Link>
          ) : (
            <Link to="/login" className="bg-primary-container text-on-primary-container px-5 py-2 rounded-lg font-label-uppercase text-label-uppercase font-bold hover:opacity-90 transition-all neon-glow-primary">
              Sign In
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 pb-32">
        {/* Header */}
        <section className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-headline-md text-headline-md-mobile md:text-headline-md text-on-surface mb-1">Available Turfs Near You</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Showing {filteredTurfs.length} location{filteredTurfs.length !== 1 ? 's' : ''} in your area
              </p>
            </div>
          </div>

          {/* Sport Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {sports.map(sport => (
              <button
                key={sport}
                onClick={() => setFilter(sport)}
                className={`px-4 py-1.5 rounded-full font-label-uppercase text-label-uppercase flex items-center gap-2 transition-all ${
                  filter === sport
                    ? 'bg-primary-container text-on-primary-container neon-glow-primary'
                    : 'glass-card text-on-surface hover:bg-surface-variant'
                }`}
              >
                {sport === 'All' && <span className="material-symbols-outlined text-[18px]">filter_list</span>}
                {sport === 'Football' && <span className="material-symbols-outlined text-[18px]">sports_soccer</span>}
                {sport === 'Basketball' && <span className="material-symbols-outlined text-[18px]">sports_basketball</span>}
                {sport === 'Tennis' && <span className="material-symbols-outlined text-[18px]">sports_tennis</span>}
                {sport === 'Cricket' && <span className="material-symbols-outlined text-[18px]">sports_cricket</span>}
                {sport === 'Padel' && <span className="material-symbols-outlined text-[18px]">sports_tennis</span>}
                {sport}
              </button>
            ))}
          </div>
        </section>

        {/* Turf Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-surface-container-high"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-surface-container-high rounded w-3/4"></div>
                  <div className="h-3 bg-surface-container-high rounded w-1/2"></div>
                  <div className="h-10 bg-surface-container-high rounded"></div>
                </div>
              </div>
            ))
          ) : filteredTurfs.length === 0 ? (
            <div className="col-span-3 text-center py-24">
              <span className="material-symbols-outlined text-[64px] text-on-surface-variant mb-4 block">location_off</span>
              <p className="text-on-surface-variant font-body-base">No turfs available for this sport.</p>
              <button onClick={() => setFilter('All')} className="mt-4 text-primary-fixed-dim font-label-uppercase text-label-uppercase underline">
                View All
              </button>
            </div>
          ) : (
            filteredTurfs.map((turf, index) => (
              <div key={turf.id} className="glass-card rounded-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={turfImages[index % turfImages.length]}
                    alt={turf.name}
                  />
                  <div className="absolute top-4 right-4 px-2 py-1 bg-surface-container/80 backdrop-blur-md rounded-lg flex items-center gap-1 border border-border-subtle">
                    <span className="material-symbols-outlined text-secondary-container text-[16px]">star</span>
                    <span className="text-label-uppercase font-label-uppercase text-on-surface">4.8</span>
                  </div>
                  <div className="absolute top-4 left-4 px-2 py-1 bg-primary-container/20 border border-primary-container/30 rounded-full">
                    <span className="text-[11px] font-bold text-primary-container tracking-wider uppercase">{turf.sport}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-md text-headline-md text-on-surface">{turf.name}</h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {turf.venue?.name || 'Local Venue'} · {turf.venue?.location || ''}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="font-display-lg-mobile text-display-lg-mobile text-primary-fixed-dim">${turf.hourly_rate}</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">/hr</span>
                    </div>
                    <button
                      onClick={() => openBookingModal(turf)}
                      className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-label-uppercase text-label-uppercase font-bold hover:shadow-neon-green-glow transition-all active:scale-95 duration-200 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Booking Modal */}
      {selectedTurf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setSelectedTurf(null)}></div>
          <div className="relative z-10 w-full max-w-md glass-panel rounded-2xl p-8 border border-primary-container/20">
            {bookingSuccess ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-[64px] text-primary-fixed-dim mb-4 block">check_circle</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Booking Confirmed!</h3>
                <p className="text-on-surface-variant font-body-sm mb-6">Your slot at <strong className="text-on-surface">{selectedTurf.name}</strong> is reserved.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate('/bookings')}
                    className="flex-1 bg-primary-container text-on-primary-container py-3 rounded-lg font-label-uppercase text-label-uppercase font-bold"
                  >
                    View Bookings
                  </button>
                  <button
                    onClick={() => setSelectedTurf(null)}
                    className="flex-1 border border-border-subtle text-on-surface-variant py-3 rounded-lg font-label-uppercase text-label-uppercase"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">{selectedTurf.name}</h3>
                    <p className="text-on-surface-variant font-body-sm flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[14px]">sports_soccer</span>
                      {selectedTurf.sport} · ${selectedTurf.hourly_rate}/hr
                    </p>
                  </div>
                  <button onClick={() => setSelectedTurf(null)} className="text-on-surface-variant hover:text-on-surface">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                {bookingError && (
                  <div className="mb-4 p-3 rounded-lg bg-error-container/20 border border-error/30 text-on-error-container text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-error">error</span>
                    {bookingError}
                  </div>
                )}

                <form onSubmit={handleBook} className="space-y-4">
                  <div>
                    <label className="block text-label-uppercase font-label-uppercase text-on-surface-variant mb-2 tracking-wider">Start Time</label>
                    <input
                      type="datetime-local"
                      required
                      value={bookingForm.start_time}
                      onChange={(e) => setBookingForm({ ...bookingForm, start_time: e.target.value })}
                      className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-label-uppercase font-label-uppercase text-on-surface-variant mb-2 tracking-wider">End Time</label>
                    <input
                      type="datetime-local"
                      required
                      value={bookingForm.end_time}
                      onChange={(e) => setBookingForm({ ...bookingForm, end_time: e.target.value })}
                      className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all"
                    />
                  </div>
                  <div className="glass-panel rounded-lg p-4 flex justify-between items-center">
                    <span className="text-on-surface-variant font-body-sm">Estimated Total</span>
                    <span className="text-primary-fixed-dim font-headline-md text-[20px]">
                      ${bookingForm.start_time && bookingForm.end_time
                        ? (Math.max(0, (new Date(bookingForm.end_time) - new Date(bookingForm.start_time)) / 3600000) * parseFloat(selectedTurf.hourly_rate)).toFixed(2)
                        : '—'
                      }
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full bg-primary-container text-on-primary-container py-3 rounded-lg font-label-uppercase text-label-uppercase font-bold hover:opacity-90 active:scale-95 transition-all neon-glow-primary disabled:opacity-50"
                  >
                    {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
