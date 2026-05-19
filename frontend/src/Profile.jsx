import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMyProfile, getMyAthleteProfile } from './api'

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [userRes, profileRes] = await Promise.all([
          getMyProfile(),
          getMyAthleteProfile(),
        ])
        setUser(userRes.data)
        setProfile(profileRes.data)
      } catch (error) {
        console.error('Failed to fetch profile:', error)
        if (error.response?.status === 401) {
          navigate('/login')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/login')
  }

  return (
    <div className="bg-background text-on-surface font-body-base min-h-screen pb-24 dark">
      {/* TopAppBar */}
      <header className="bg-surface-glass/80 backdrop-blur-md border-b border-border-subtle docked full-width top-0 sticky z-50 shadow-neon-green-glow/5">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-max-width mx-auto">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary-fixed-dim">sports_soccer</span>
            <Link to="/" className="font-headline-md text-headline-md-mobile md:text-headline-md tracking-tighter text-on-surface">TurfAlly</Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/">Home</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/explore">Explore</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/bookings">Bookings</Link>
            <Link className="font-label-uppercase text-label-uppercase text-primary font-bold" to="/profile">Profile</Link>
          </div>
          <button onClick={handleLogout} className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-error transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-8">
        <div className="mb-8">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-2">My Profile</h2>
          <p className="font-body-base text-on-surface-variant">Your player stats, ratings, and account settings.</p>
        </div>

        {loading ? (
          <div className="glass-card rounded-xl p-12 text-center">
            <span className="material-symbols-outlined text-primary-fixed-dim text-[48px] animate-pulse">person</span>
            <p className="text-on-surface-variant mt-4">Loading profile...</p>
          </div>
        ) : (
          <>
            {/* Profile Card */}
            <div className="glass-card rounded-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 to-transparent pointer-events-none"></div>

              <div className="h-28 w-28 rounded-full overflow-hidden border-2 border-primary-fixed-dim bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-[56px] text-on-surface-variant">person</span>
              </div>

              <div className="flex-1 text-center md:text-left relative z-10">
                <h3 className="font-headline-md text-[28px] text-on-surface mb-1">
                  {user ? `${user.first_name} ${user.last_name}`.trim() || user.username : '—'}
                </h3>
                <p className="font-body-base text-on-surface-variant mb-1">@{user?.username}</p>
                <p className="font-body-sm text-secondary-container mb-4 font-bold tracking-widest uppercase">
                  {profile?.member_type || 'Elite Member'}
                </p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {[
                    { label: 'Matches', value: profile?.matches ?? 0, color: 'text-primary-fixed-dim' },
                    { label: 'Win Rate', value: `${profile?.win_rate ?? 0}%`, color: 'text-primary-fixed-dim' },
                    { label: 'MVP', value: profile?.mvp ?? 0, color: 'text-secondary-fixed-dim' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-surface-container-high px-4 py-2 rounded-lg text-center min-w-[90px]">
                      <p className="text-[12px] text-on-surface-variant font-label-uppercase uppercase mb-1">{stat.label}</p>
                      <p className={`font-headline-md text-[22px] ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-label-uppercase text-label-uppercase flex items-center gap-2 hover:opacity-90 mt-4 md:mt-0 relative z-10">
                <span className="material-symbols-outlined">edit</span>
                Edit Profile
              </button>
            </div>

            {/* Account Info */}
            <div className="glass-card rounded-xl p-6">
              <h4 className="font-headline-md text-[18px] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-fixed-dim">manage_accounts</span>
                Account Details
              </h4>
              <div className="space-y-3">
                {[
                  { label: 'Username', value: user?.username, icon: 'badge' },
                  { label: 'Email', value: user?.email || 'Not set', icon: 'email' },
                  { label: 'Full Name', value: `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'Not set', icon: 'person' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4 p-3 rounded-lg bg-surface-container">
                    <span className="material-symbols-outlined text-on-surface-variant">{item.icon}</span>
                    <div>
                      <p className="font-label-uppercase text-label-uppercase text-on-surface-variant">{item.label}</p>
                      <p className="font-body-base text-on-surface">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/bookings" className="flex items-center gap-2 bg-surface-container-high px-5 py-3 rounded-lg font-label-uppercase text-label-uppercase hover:bg-surface-variant transition-colors">
                <span className="material-symbols-outlined text-primary-fixed-dim">calendar_month</span>
                My Bookings
              </Link>
              <Link to="/explore" className="flex items-center gap-2 bg-surface-container-high px-5 py-3 rounded-lg font-label-uppercase text-label-uppercase hover:bg-surface-variant transition-colors">
                <span className="material-symbols-outlined text-secondary-fixed-dim">explore</span>
                Find Turfs
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 bg-error-container/10 text-on-error-container px-5 py-3 rounded-lg font-label-uppercase text-label-uppercase hover:bg-error-container/20 transition-colors border border-error/20">
                <span className="material-symbols-outlined">logout</span>
                Sign Out
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

// Import React and hooks
// Import routing utilities
// Import API functions

// Main Profile component

// Navigation hook

// User state

// Athlete profile state

// Loading state

// Run when component mounts

// Fetch profile data

// Fetch user and athlete profile together

// Save user data

// Save athlete profile data

// Handle fetch errors

// Redirect if unauthorized

// Stop loading

// Call fetch function

// Logout function

// Remove access token

// Remove refresh token

// Redirect to login page

// Main container

// Top navigation bar

// Navbar wrapper

// Logo section

// Sports icon

// Website logo

// Desktop navigation menu

// Home link

// Explore link

// Bookings link

// Profile link

// Logout button

// Logout icon

// Main page content

// Page heading

// Title

// Subtitle

// Loading condition

// Loading card

// Loading icon

// Loading text

// Profile card

// Background effect

// Profile picture container

// Default profile icon

// User information section

// User full name

// Username

// Membership type

// Stats section

// Stats array mapping

// Single stat card

// Stat label

// Stat value

// Edit profile button

// Edit icon

// Account details card

// Section heading

// Heading icon

// Account details list

// Account info mapping

// Single account detail row

// Row icon

// Text container

// Detail label

// Detail value

// Quick actions section

// My bookings button

// Calendar icon

// Explore button

// Explore icon

// Sign out button

// Logout icon