import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getBookings, cancelBooking } from './api'

export default function Bookings() {
  const navigate = useNavigate()
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [pastBookings, setPastBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('upcoming')
  const [cancellingId, setCancellingId] = useState(null)

  const fetchBookings = async () => {
    try {
      const response = await getBookings()
      const now = new Date()
      const upcoming = response.data.filter(b => new Date(b.start_time) >= now)
      const past = response.data.filter(b => new Date(b.start_time) < now)
      setUpcomingBookings(upcoming)
      setPastBookings(past)
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
      if (error.response?.status === 401) {
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleCancel = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return
    setCancellingId(id)
    try {
      await cancelBooking(id)
      await fetchBookings()
    } catch (err) {
      console.error('Cancel failed:', err)
    } finally {
      setCancellingId(null)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.getDate()
    return { month, day }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  return (
    <div className="bg-background text-on-surface font-body-base min-h-screen pb-24 dark">
      {/* TopAppBar */}
      <header className="bg-surface-glass/80 backdrop-blur-md border-b border-border-subtle docked full-width top-0 sticky z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-max-width mx-auto">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary-fixed-dim">sports_soccer</span>
            <Link to="/" className="font-headline-md text-headline-md-mobile md:text-headline-md tracking-tighter text-on-surface">TurfAlly</Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/">Home</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/explore">Explore</Link>
            <Link className="font-label-uppercase text-label-uppercase text-primary font-bold" to="/bookings">Bookings</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/profile">Profile</Link>
          </div>
          <Link to="/profile" className="h-10 w-10 rounded-full overflow-hidden border border-border-subtle bg-surface-variant flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant">person</span>
          </Link>
        </div>
      </header>

      <main className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-2">My Bookings</h2>
            <p className="font-body-base text-on-surface-variant">Manage your upcoming matches and review your performance history.</p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-5 py-2.5 rounded-lg font-label-uppercase text-label-uppercase font-bold hover:opacity-90 transition-all neon-glow-primary"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Booking
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-surface-container-low p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`${activeTab === 'upcoming' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'} px-6 py-2 rounded-lg font-label-uppercase text-label-uppercase transition-all duration-200 flex items-center gap-2`}
          >
            <span className="material-symbols-outlined text-[16px]">upcoming</span>
            Upcoming
            {upcomingBookings.length > 0 && (
              <span className="bg-primary-container/30 px-1.5 py-0.5 rounded text-[10px]">{upcomingBookings.length}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`${activeTab === 'past' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'} px-6 py-2 rounded-lg font-label-uppercase text-label-uppercase transition-all duration-200 flex items-center gap-2`}
          >
            <span className="material-symbols-outlined text-[16px]">history</span>
            Past
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-card rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-surface-container-high rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-surface-container-high rounded w-1/2 mb-6"></div>
                <div className="h-16 bg-surface-container-high rounded mb-4"></div>
                <div className="h-10 bg-surface-container-high rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {activeTab === 'upcoming' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {upcomingBookings.length === 0 ? (
                  <div className="col-span-3 text-center py-24">
                    <span className="material-symbols-outlined text-[64px] text-on-surface-variant mb-4 block">event_busy</span>
                    <p className="text-on-surface font-headline-md text-[20px] mb-2">No upcoming bookings</p>
                    <p className="text-on-surface-variant font-body-sm mb-6">Find and book a turf to get started.</p>
                    <Link to="/explore" className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-label-uppercase text-label-uppercase font-bold hover:opacity-90 transition-all neon-glow-primary">
                      <span className="material-symbols-outlined text-[18px]">explore</span>
                      Explore Turfs
                    </Link>
                  </div>
                ) : (
                  upcomingBookings.map((booking) => {
                    const { month, day } = formatDate(booking.start_time)
                    return (
                      <div key={booking.id} className="glass-card rounded-xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                        {booking.status === 'confirmed' && (
                          <div className="absolute top-0 right-0 p-4">
                            <span className="bg-primary-container/20 text-primary-container px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 border border-primary-container/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                              Confirmed
                            </span>
                          </div>
                        )}
                        <div className="mb-5 mt-4">
                          <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                            {booking.turf?.name || `Turf #${booking.turf_id || booking.turf}`}
                          </h3>
                          <p className="font-body-sm text-on-surface-variant flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">sports_soccer</span>
                            {booking.turf?.sport || 'Football'}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 mb-5">
                          <div className="bg-surface-container-high p-3 rounded-lg flex flex-col items-center justify-center min-w-[64px]">
                            <span className="text-[12px] font-bold text-on-surface-variant uppercase">{month}</span>
                            <span className="text-[20px] font-bold text-primary-fixed-dim">{day}</span>
                          </div>
                          <div>
                            <p className="font-headline-md text-[18px]">{formatTime(booking.start_time)} — {formatTime(booking.end_time)}</p>
                            <p className="font-body-sm text-on-surface-variant">Total: <span className="text-primary-fixed-dim font-bold">${booking.total_amount}</span></p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button className="flex-1 bg-primary-fixed-dim text-on-primary-fixed px-4 py-3 rounded-lg font-label-uppercase text-label-uppercase flex items-center justify-center gap-2 hover:bg-primary-fixed transition-colors">
                            <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
                            Check-in
                          </button>
                          <button
                            onClick={() => handleCancel(booking.id)}
                            disabled={cancellingId === booking.id}
                            className="p-3 border border-error/30 rounded-lg text-error hover:bg-error/10 transition-colors disabled:opacity-50"
                            title="Cancel Booking"
                          >
                            {cancellingId === booking.id
                              ? <span className="material-symbols-outlined animate-spin">progress_activity</span>
                              : <span className="material-symbols-outlined">delete</span>
                            }
                          </button>
                          <button className="p-3 border border-border-subtle rounded-lg text-on-surface hover:bg-surface-variant transition-colors" title="Directions">
                            <span className="material-symbols-outlined">directions</span>
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            )}

            {activeTab === 'past' && (
              <div className="space-y-4">
                {pastBookings.length === 0 ? (
                  <div className="text-center py-24">
                    <span className="material-symbols-outlined text-[64px] text-on-surface-variant mb-4 block">history</span>
                    <p className="text-on-surface-variant font-body-base">No past bookings yet.</p>
                  </div>
                ) : (
                  pastBookings.map((booking) => {
                    const { month, day } = formatDate(booking.start_time)
                    return (
                      <div key={booking.id} className="glass-card rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 opacity-70 hover:opacity-100 transition-opacity border-l-4 border-l-on-surface-variant/30">
                        <div className="flex items-center gap-6 w-full md:w-auto">
                          <div className="text-center min-w-[60px]">
                            <p className="text-[12px] font-bold text-on-surface-variant uppercase">{month} {day}</p>
                            <p className="text-on-surface text-[14px]">Completed</p>
                          </div>
                          <div>
                            <h4 className="font-headline-md text-[16px]">{booking.turf?.name || `Turf #${booking.turf_id || booking.turf}`}</h4>
                            <p className="font-body-sm text-on-surface-variant">{booking.turf?.sport || 'Football'} · ${booking.total_amount}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                          <Link
                            to="/explore"
                            className="border border-secondary-container/30 text-secondary-fixed-dim px-4 py-2 rounded-lg font-label-uppercase text-[11px] tracking-wider hover:bg-secondary-container/10 transition-all"
                          >
                            Book Again
                          </Link>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}