import React from 'react'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="bg-background text-on-surface font-body-base overflow-x-hidden dark">
      {/* TopAppBar */}
      <header className="bg-surface-glass/80 backdrop-blur-md docked full-width top-0 sticky z-50 border-b border-border-subtle shadow-neon-green-glow/5">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-max-width mx-auto">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary-fixed-dim">menu</span>
            <h1 className="font-headline-md text-headline-md tracking-tighter text-on-surface">TurfAlly</h1>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <Link className="font-label-uppercase text-label-uppercase text-primary font-bold" to="/">Home</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:bg-surface-variant transition-colors px-3 py-1 rounded" to="/explore">Explore</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:bg-surface-variant transition-colors px-3 py-1 rounded" to="/bookings">Bookings</Link>
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:bg-surface-variant transition-colors px-3 py-1 rounded" to="/profile">Profile</Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden border border-border-subtle">
              <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwMWg3VhKie4ZFVIV51N3Aew-YpL4zU3Czz_8vfrF5Ocxxoxdztb8brIyg_N6ZUUqrI5Tu_PNYOLpUdz55fNtOfT-gW0xXhgW3mf2V2L5POH-uUDGDt5ja35IrhXS9pNj3yUC2Ik6it43x4NRzjtod15UxqULcfxETgGymrd-CaNSHU1XKK1jkk6B6HsHW9jmwhatGPfJcU1wEDbXRDBAK-yu3kUrcKK7tUtJNQ1h3UYjXduB7tQy1MU5bz5n2bqw93Iyknj2B9wU" />
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full min-h-[751px] flex flex-col items-center justify-center pt-20 pb-32 px-margin-mobile md:px-margin-desktop overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary-container/10 rounded-full blur-[100px]"></div>
            <img alt="Football Turf" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-KWC4UGeJLudl60VH-itnX_gx9yycM1waGIKdHFHzBW7wEb-v_H49ULOdifwxUrtvHGXBGhLZgPXJBTNxhKW4Qt6O76SMVvH8edZSWDWO_VeKteZjO60JxZE265wH0hf9vf9h5_9seqgrKkkWVFgBcoPVTgO7a_tNToZGbpR2U9r1JB_YLu8tyeLpmUYmLuRAu3d2RuPgeDU6ImN6pbJ2V7iSogZCzZDb_lGJLEqIqxjJmEvc2qZD0Kpl8Axypr2wMhLcrBSz2Ow" />
          </div>
          <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-primary-container/20 text-primary-fixed-dim mb-4">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span className="font-label-uppercase text-label-uppercase">The Future of Sports Booking</span>
            </div>
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface max-w-3xl mx-auto leading-tight">
              Dominate the Pitch. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-fixed-dim to-secondary-fixed-dim">Book Your Arena.</span>
            </h2>
            <p className="font-body-base text-body-base text-on-surface-variant max-w-xl mx-auto">
              Access elite sports facilities with precision scheduling. TurfAlly bridges the gap between urban athletes and premium arenas.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-12">
              <div className="glass-panel p-2 rounded-xl flex items-center gap-2 focus-within:ring-2 ring-secondary-container/30 transition-all">
                <div className="flex-1 flex items-center px-4 gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">search</span>
                  <input className="bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant w-full font-body-base outline-none" placeholder="Find your turf..." type="text" />
                </div>
                <button className="bg-primary-container text-on-primary-container px-8 py-3 rounded-lg font-label-uppercase text-label-uppercase font-bold hover:scale-105 active:scale-95 transition-all neon-glow-primary">
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop -mt-24 relative z-20 pb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Trending Venues</h3>
              <p className="text-on-surface-variant font-body-sm">Most booked arenas in your city right now.</p>
            </div>
            <button className="flex items-center gap-2 text-primary-fixed-dim hover:gap-3 transition-all">
              <span className="font-label-uppercase text-label-uppercase">View All</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-2 relative group rounded-xl overflow-hidden glass-panel">
              <img alt="Premier League Arena" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_PdcX0XCqaCfdE95SUvI3KzEIPS2o2f9mHctX4OvxViByz_5vNE5EH4Evi8dHB2DHOGa1gHDnoe2o4H2-fZ6t2r9wbX8438JF1YwyBCgD0n4V2qv-Py6wkQAenNSQTbqfR6mv4Fzz5GfEHO8pb-O6bTMx4u4blDFtM38Ou1z86njBB_iRJ9QRzL571d4UWRjf4ZFoAOafawmlzR9JlHGvvZAsppQk9cNjbghIn7nBfhTLNnDkKAPVVj-d6s4oAAFRyDrPTr06AJ8" />
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
                <img alt="Rooftop Court" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa1rv4SLcPB_ROLywenu_5xBbhjiUj0XlaBBl5SluGmFSk-1LUTGlGtLTATnhMfDa2nKGizbhc2Ku_1XOKVHBF1IQcl9YlPyIQREqcPA270UP6nE_1VXcNHV9IzQSDcHWSQVIw9F7py79EJ3tPANHet4CRdrABGiTGkVVRLhFdIALnwJC-SVRPII34o4sT6lWu_JbxLKbj9nvnff2HgTh7kFGVfqFyCd5CxQgNurC7aEiSRB3hY7J_bROZXHLZdqD9USj8fu0k0yg" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h4 className="font-headline-md text-headline-md text-on-surface">Skyline Hoops</h4>
                  <p className="text-on-surface-variant font-body-sm">4.9 ★ (120 reviews)</p>
                </div>
              </div>
              <div className="flex-1 relative group rounded-xl overflow-hidden glass-panel">
                <img alt="Indoor Padel" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7TahuCOI8Cad-C_ftXUZS6pG1WUWuSGDXqsVRpeN5HXq213OaeiK0HUhnWM8RAE3Sfo0ZsvCmLM2-YWuf53ZlCXIvTsVmEulxEZxDun0A0eK7QH4oL-4LQPs_ZiS5VI2jXruRg2YbbS_fDQRt9HKS2eT4mCH_DfoFgXvvPEwDUmtfDK5uCracb6hGTI-iH0EQVjHehyUyw8UE6OrLvK-KQ_LhfrrhBYj5Hb8p46Z4yKEDlzCzq3HxpNGM-nnouzY3wfP2LRnQ0KM" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h4 className="font-headline-md text-headline-md text-on-surface">Padel Point</h4>
                  <p className="text-on-surface-variant font-body-sm">Available in 2h</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
