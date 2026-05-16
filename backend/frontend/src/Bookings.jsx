import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBookings } from './api'

export default function Bookings() {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookings();
        const now = new Date();
        const upcoming = response.data.filter(b => new Date(b.start_time) >= now);
        const past = response.data.filter(b => new Date(b.start_time) < now);
        setUpcomingBookings(upcoming);
        setPastBookings(past);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return { month, day };
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="bg-background text-on-surface font-body-base min-h-screen pb-24">
      {/* TopAppBar */}
      <header className="bg-surface-glass/80 backdrop-blur-md border-b border-border-subtle docked full-width top-0 sticky z-50 shadow-neon-green-glow/5">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-max-width mx-auto">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary-fixed-dim">menu</span>
            <h1 className="font-headline-md text-headline-md-mobile md:text-headline-md tracking-tighter text-on-surface">TurfAlly</h1>
          </div>
          
          {/* Main Navigation (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/">Home</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/explore">Explore</Link>
            <Link className="font-label-uppercase text-label-uppercase text-primary font-bold" to="/bookings">Bookings</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/profile">Profile</Link>
          </div>

          <div className="h-10 w-10 rounded-full overflow-hidden border border-border-subtle">
            <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCBbaIYv1XzPQDz8EG601Ck3XF0VMTvy0B1_sWlzpKHavjAqF56ep1bRQ27hzgyzDWx7b98O_8YoJrs1svCRHqUFQ1W8VruLMbjLWQ5Ho3hrxS8Pg5qsi777fEmzkddjSO9q8iOa_HfFh9dQQ1qNB974n2Gtl5220HZwNA93G6w-n5XHOXRyQinzFwR1KGOgx22OgC6haFEGROfaO8axZ4tSmrbjbY0zILsxBtJEnj7NdyFXHRPPbZtZkiKeHhTthLSebkS_h3hIg"/>
          </div>
        </div>
      </header>

      <main className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-8">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-2">My Bookings</h2>
          <p className="font-body-base text-on-surface-variant">Manage your upcoming matches and review your performance history.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-surface-container-low p-1 rounded-xl w-fit">
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`${activeTab === 'upcoming' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'} px-6 py-2 rounded-lg font-label-uppercase text-label-uppercase transition-all duration-200`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setActiveTab('past')}
            className={`${activeTab === 'past' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'} px-6 py-2 rounded-lg font-label-uppercase text-label-uppercase transition-all duration-200`}
          >
            Past
          </button>
        </div>

        {loading ? (
           <p className="text-on-surface-variant">Loading bookings...</p>
        ) : (
          <>
            {activeTab === 'upcoming' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {upcomingBookings.length === 0 ? (
                  <p className="text-on-surface-variant">You have no upcoming bookings.</p>
                ) : (
                  upcomingBookings.map((booking) => {
                    const { month, day } = formatDate(booking.start_time);
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
                        <div className="mb-6 mt-4">
                          <h3 className="font-headline-md text-headline-md text-on-surface mb-1">{booking.turf?.name || `Turf #${booking.turf_id}`}</h3>
                          <p className="font-body-sm text-on-surface-variant flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">sports_soccer</span>
                            {booking.turf?.sport || 'Football'}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="bg-surface-container-high p-3 rounded-lg flex flex-col items-center justify-center min-w-[64px]">
                            <span className="text-[12px] font-bold text-on-surface-variant uppercase">{month}</span>
                            <span className="text-[20px] font-bold text-primary-fixed-dim">{day}</span>
                          </div>
                          <div>
                            <p className="font-headline-md text-[18px]">{formatTime(booking.start_time)} - {formatTime(booking.end_time)}</p>
                            <p className="font-body-sm text-on-surface-variant">Total: ${booking.total_amount}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button className="flex-1 bg-primary-fixed-dim text-on-primary-fixed px-4 py-3 rounded-lg font-label-uppercase text-label-uppercase flex items-center justify-center gap-2 hover:bg-primary-fixed transition-colors">
                            <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
                            Check-in
                          </button>
                          <button className="p-3 border border-border-subtle rounded-lg text-on-surface hover:bg-surface-variant transition-colors">
                            <span className="material-symbols-outlined">directions</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {activeTab === 'past' && (
              <div className="mt-8">
                <div className="space-y-4">
                  {pastBookings.length === 0 ? (
                     <p className="text-on-surface-variant">You have no past bookings.</p>
                  ) : (
                    pastBookings.map((booking) => {
                      const { month, day } = formatDate(booking.start_time);
                      return (
                        <div key={booking.id} className="glass-card rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 opacity-70 hover:opacity-100 transition-opacity border-l-4 border-l-on-surface-variant/30">
                          <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="text-center min-w-[60px]">
                              <p className="text-[12px] font-bold text-on-surface-variant uppercase">{month} {day}</p>
                              <p className="text-on-surface text-[14px]">Completed</p>
                            </div>
                            <div>
                              <h4 className="font-headline-md text-[16px]">{booking.turf?.name || `Turf #${booking.turf_id}`}</h4>
                              <p className="font-body-sm text-on-surface-variant">{booking.turf?.sport || 'Football'} • ${booking.total_amount}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                            <button className="border border-secondary-container/30 text-secondary-fixed-dim px-4 py-2 rounded-lg font-label-uppercase text-[11px] tracking-wider hover:bg-secondary-container/10 transition-all">
                              Book Again
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}