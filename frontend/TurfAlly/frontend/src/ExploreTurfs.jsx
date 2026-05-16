import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTurfs } from './api'

export default function ExploreTurfs() {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await getTurfs();
        setTurfs(response.data);
      } catch (error) {
        console.error("Failed to fetch turfs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTurfs();
  }, []);

  return (
    <div className="bg-background text-on-surface font-body-base min-h-screen">
      {/* TopAppBar */}
      <header className="bg-surface-glass/80 backdrop-blur-md docked full-width top-0 sticky z-50 border-b border-border-subtle shadow-neon-green-glow/5">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-max-width mx-auto">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-on-surface cursor-pointer">menu</span>
            <h1 className="font-headline-md text-headline-md tracking-tighter text-on-surface">TurfAlly</h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/">Home</Link>
            <Link className="font-label-uppercase text-label-uppercase text-primary font-bold" to="/explore">Explore</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/bookings">Bookings</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/profile">Profile</Link>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary-container/20">
            <img alt="user_profile_image" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBooKKz4wsRuEJYAakzoFgzdUyn8XYwMhDHrnVNxf5FFzdUCPV2FCHhmXZwsuWwk10qKxyZ0p6DTui_imwv8BGmy71IjH0nKM_Ynto_TRkz15RT59XY6255BZb-RKe8pfZJ0Tfoqvkb-qvBZij1YHN_isdoTWsBIHnFGqzAlnXRlVa_Oh00nRZ6kbB4zjkBSPo18R5-d81wksNUOSyhEBHe97Yzo-RkXWSHRro_C0yYvLvFK1sRbyuqTNCJyN1ZItA316WGaqIb2oI" />
          </div>
        </div>
      </header>

      <main className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 pb-32">
        {/* Search & Filter Section */}
        <section className="flex flex-col gap-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-headline-md text-headline-md-mobile md:text-headline-md text-on-surface mb-1">Available Turfs Near You</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Showing {turfs.length} locations in your area</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-secondary-container text-secondary-container font-label-uppercase text-label-uppercase hover:bg-secondary-container/10 transition-all">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>map</span>
              Toggle Map View
            </button>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-1.5 rounded-full bg-primary-container text-on-primary font-label-uppercase text-label-uppercase flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">distance</span>
              Distance
            </button>
            <button className="px-4 py-1.5 rounded-full glass-card text-on-surface font-label-uppercase text-label-uppercase flex items-center gap-2 hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined text-[18px]">star</span>
              Rating
            </button>
            <button className="px-4 py-1.5 rounded-full glass-card text-on-surface font-label-uppercase text-label-uppercase flex items-center gap-2 hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Price
            </button>
            <button className="px-4 py-1.5 rounded-full glass-card text-on-surface font-label-uppercase text-label-uppercase flex items-center gap-2 hover:bg-surface-variant transition-colors ml-auto">
              <span className="material-symbols-outlined text-[18px]">tune</span>
              More Filters
            </button>
          </div>
        </section>

        {/* Turf Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {loading ? (
             <p className="text-on-surface-variant">Loading turfs...</p>
          ) : turfs.length === 0 ? (
             <p className="text-on-surface-variant">No turfs available at the moment.</p>
          ) : (
            turfs.map((turf) => (
              <div key={turf.id} className="glass-card rounded-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  {/* Since we don't have turf image from the model, using a placeholder for now */}
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV0XeVhnasILKy50WNh5WPGpT6mugdimtrTJK-eWZRchXINKFbLw7R5L7W9GxZB6CtW_sh-amNrDSF63r3MPfa3KdjtrxZkpj0rPxkP2oj2wu4Le3tNxOeZttLELz8OEML7wFs5bFdeeFSGh_kbycwBmA2OydBjR1Pzp5sHdtYe_TkKUtLDlCIJ10L_JSXtxCzV0pnzrJkNTUqvhdft8R9Kqxb6hqzo1JzVOI51dErfYMC7lFpWxct-m53o6qPu57GngEzxtLWND0" alt="Turf" />
                  <div className="absolute top-4 right-4 px-2 py-1 bg-surface-container/80 backdrop-blur-md rounded-lg flex items-center gap-1 border border-border-subtle">
                    <span className="material-symbols-outlined text-secondary-container text-[16px]">star</span>
                    <span className="text-label-uppercase font-label-uppercase text-on-surface">4.8</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-md text-headline-md text-on-surface">{turf.name}</h3>
                    <span className="font-label-uppercase text-label-uppercase text-secondary-container bg-secondary-container/10 px-2 py-0.5 rounded">{turf.sport}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {turf.venue?.name || 'Local Venue'}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="font-display-lg-mobile text-display-lg-mobile text-primary-fixed-dim">${turf.hourly_rate}</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">/hr</span>
                    </div>
                    <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-label-uppercase text-label-uppercase font-bold hover:shadow-neon-green-glow transition-all active:scale-95 duration-200">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
