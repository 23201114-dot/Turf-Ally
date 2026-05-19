// Import React hooks
import React, { useState, useEffect } from 'react'

// Import routing components
import { Link, useNavigate } from 'react-router-dom'

// Import API functions
import { getTurfs, createBooking } from './api'

// Main ExploreTurfs component
export default function ExploreTurfs() {

  // Navigation hook
  const navigate = useNavigate()

  // State for storing all turf data
  const [turfs, setTurfs] = useState([])

  // Loading state while fetching data
  const [loading, setLoading] = useState(true)

  // Current selected sport filter
  const [filter, setFilter] = useState('All')

  // Currently selected turf for booking modal
  const [selectedTurf, setSelectedTurf] = useState(null)

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    start_time: '',
    end_time: ''
  })

  // Booking loading state
  const [bookingLoading, setBookingLoading] = useState(false)

  // Booking success state
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Booking error state
  const [bookingError, setBookingError] = useState('')

  // Check user login status from localStorage
  const isLoggedIn = !!localStorage.getItem('access_token')

  // Sports category list
  const sports = ['All', 'Football', 'Basketball', 'Tennis', 'Cricket', 'Padel']

  // Static turf images
  const turfImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBV0XeVhnasILKy50WNh5WPGpT6mugdimtrTJK-eWZRchXINKFbLw7R5L7W9GxZB6CtW_sh-amNrDSF63r3MPfa3KdjtrxZkpj0rPxkP2oj2wu4Le3tNxOeZttLELz8OEML7wFs5bFdeeFSGh_kbycwBmA2OydBjR1Pzp5sHdtYe_TkKUtLDlCIJ10L_JSXtxCzV0pnzrJkNTUqvhdft8R9Kqxb6hqzo1JzVOI51dErfYMC7lFpWxct-m53o6qPu57GngEzxtLWND0',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA_PdcX0XCqaCfdE95SUvI3KzEIPS2o2f9mHctX4OvxViByz_5vNE5EH4Evi8dHB2DHOGa1gHDnoe2o4H2-fZ6t2r9wbX8438JF1YwyBCgD0n4V2qv-Py6wkQAenNSQTbqfR6mv4Fzz5GfEHO8pb-O6bTMx4u4blDFtM38Ou1z86njBB_iRJ9QRzL571d4UWRjf4ZFoAOafawmlzR9JlHGvvZAsppQk9cNjbghIn7nBfhTLNnDkKAPVVj-d6s4oAAFRyDrPTr06AJ8',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAa1rv4SLcPB_ROLywenu_5xBbhjiUj0XlaBBl5SluGmFSk-1LUTGlGtLTATnhMfDa2nKGizbhc2Ku_1XOKVHBF1IQcl9YlPyIQREqcPA270UP6nE_1VXcNHV9IzQSDcHWSQVIw9F7py79EJ3tPANHet4CRdrABGiTGkVVRLhFdIALnwJC-SVRPII34o4sT6lWu_JbxLKbj9nvnff2HgTh7kFGVfqFyCd5CxQgNurC7aEiSRB3hY7J_bROZXHLZdqD9USj8fu0k0yg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA7TahuCOI8Cad-C_ftXUZS6pG1WUWuSGDXqsVRpeN5HXq213OaeiK0HUhnWM8RAE3Sfo0ZsvCmLM2-YWuf53ZlCXIvTsVmEulxEZxDun0A0eK7QH4oL-4LQPs_ZiS5VI2jXruRg2YbbS_fDQRt9HKS2eT4mCH_DfoFgXvvPEwDUmtfDK5uCracb6hGTI-iH0EQVjHehyUyw8UE6OrLvK-KQ_LhfrrhBYj5Hb8p46Z4yKEDlzCzq3HxpNGM-nnouzY3wfP2LRnQ0KM',
  ]

  // Fetch turf data when component loads
  useEffect(() => {

    // Async function to fetch turfs
    const fetchTurfs = async () => {
      try {

        // API call
        const response = await getTurfs()

        // Save turf data into state
        setTurfs(response.data)

      } catch (error) {

        // Error handling
        console.error('Failed to fetch turfs:', error)

      } finally {

        // Stop loading
        setLoading(false)
      }
    }

    // Call fetch function
    fetchTurfs()

  }, [])

  // Filter turfs based on selected sport
  const filteredTurfs =
    filter === 'All'
      ? turfs
      : turfs.filter(t => t.sport === filter)

  // Open booking modal
  const openBookingModal = (turf) => {

    // Redirect to login if user not logged in
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    // Set selected turf
    setSelectedTurf(turf)

    // Reset booking form
    setBookingForm({
      start_time: '',
      end_time: ''
    })

    // Reset booking states
    setBookingSuccess(false)
    setBookingError('')
  }

  // Handle booking submission
  const handleBook = async (e) => {

    // Prevent page reload
    e.preventDefault()

    // Start booking loading
    setBookingLoading(true)

    // Clear previous error
    setBookingError('')

    try {

      // Create booking API request
      await createBooking({
        turf_id: selectedTurf.id,
        start_time: bookingForm.start_time,
        end_time: bookingForm.end_time,
      })

      // Show success message
      setBookingSuccess(true)

    } catch (err) {

      // Show booking error
      setBookingError(
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data) ||
        'Booking failed. Please try again.'
      )

    } finally {

      // Stop loading
      setBookingLoading(false)
    }
  }

  // Component UI
  return (
    <div className="bg-background text-on-surface font-body-base min-h-screen dark">

      {/* Top Navigation Bar */}
      <header className="bg-surface-glass/80 backdrop-blur-md docked full-width top-0 sticky z-50 border-b border-border-subtle">

        {/* Navbar container */}
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-max-width mx-auto">

          {/* Logo section */}
          <div className="flex items-center gap-4">

            {/* App icon */}
            <span className="material-symbols-outlined text-primary-fixed-dim">
              sports_soccer
            </span>

            {/* Website logo/title */}
            <Link
              to="/"
              className="font-headline-md text-headline-md tracking-tighter text-on-surface"
            >
              TurfAlly
            </Link>
          </div>

          {/* Desktop navigation menu */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all"
              to="/"
            >
              Home
            </Link>

            <Link
              className="font-label-uppercase text-label-uppercase text-primary font-bold"
              to="/explore"
            >
              Explore
            </Link>

            <Link
              className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all"
              to="/bookings"
            >
              Bookings
            </Link>

            <Link
              className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all"
              to="/profile"
            >
              Profile
            </Link>
          </div>

          {/* User profile or login button */}
          {isLoggedIn ? (

            // Profile icon button
            <Link
              to="/profile"
              className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center border border-border-subtle hover:border-primary-container/50 transition-all"
            >
              <span className="material-symbols-outlined text-on-surface-variant">
                person
              </span>
            </Link>

          ) : (

            // Sign in button
            <Link
              to="/login"
              className="bg-primary-container text-on-primary-container px-5 py-2 rounded-lg font-label-uppercase text-label-uppercase font-bold hover:opacity-90 transition-all neon-glow-primary"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>
    </div>
  )
}