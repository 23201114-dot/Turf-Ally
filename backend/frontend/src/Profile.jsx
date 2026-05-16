import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
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
            <Link className="font-label-uppercase text-label-uppercase text-on-surface-variant hover:text-primary transition-all" to="/bookings">Bookings</Link>
            <Link className="font-label-uppercase text-label-uppercase text-primary font-bold" to="/profile">Profile</Link>
          </div>

          <div className="h-10 w-10 rounded-full overflow-hidden border border-border-subtle">
            <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCBbaIYv1XzPQDz8EG601Ck3XF0VMTvy0B1_sWlzpKHavjAqF56ep1bRQ27hzgyzDWx7b98O_8YoJrs1svCRHqUFQ1W8VruLMbjLWQ5Ho3hrxS8Pg5qsi777fEmzkddjSO9q8iOa_HfFh9dQQ1qNB974n2Gtl5220HZwNA93G6w-n5XHOXRyQinzFwR1KGOgx22OgC6haFEGROfaO8axZ4tSmrbjbY0zILsxBtJEnj7NdyFXHRPPbZtZkiKeHhTthLSebkS_h3hIg"/>
          </div>
        </div>
      </header>

      <main className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-8">
        <div className="mb-8">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-2">My Profile</h2>
          <p className="font-body-base text-on-surface-variant">Your player stats, ratings, and account settings.</p>
        </div>

        <div className="glass-card rounded-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
            <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-primary-fixed-dim">
                <img alt="Athlete Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCBbaIYv1XzPQDz8EG601Ck3XF0VMTvy0B1_sWlzpKHavjAqF56ep1bRQ27hzgyzDWx7b98O_8YoJrs1svCRHqUFQ1W8VruLMbjLWQ5Ho3hrxS8Pg5qsi777fEmzkddjSO9q8iOa_HfFh9dQQ1qNB974n2Gtl5220HZwNA93G6w-n5XHOXRyQinzFwR1KGOgx22OgC6haFEGROfaO8axZ4tSmrbjbY0zILsxBtJEnj7NdyFXHRPPbZtZkiKeHhTthLSebkS_h3hIg" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
                <h3 className="font-headline-md text-[32px] text-on-surface mb-1">Urban Pro</h3>
                <p className="font-body-base text-secondary-container mb-4 font-bold tracking-widest uppercase">Elite Member</p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="bg-surface-container-high px-4 py-2 rounded-lg text-center min-w-[100px]">
                        <p className="text-[12px] text-on-surface-variant font-label-uppercase uppercase mb-1">Matches</p>
                        <p className="font-headline-md text-[24px] text-primary-fixed-dim">142</p>
                    </div>
                    <div className="bg-surface-container-high px-4 py-2 rounded-lg text-center min-w-[100px]">
                        <p className="text-[12px] text-on-surface-variant font-label-uppercase uppercase mb-1">Win Rate</p>
                        <p className="font-headline-md text-[24px] text-primary-fixed-dim">68%</p>
                    </div>
                    <div className="bg-surface-container-high px-4 py-2 rounded-lg text-center min-w-[100px]">
                        <p className="text-[12px] text-on-surface-variant font-label-uppercase uppercase mb-1">MVP</p>
                        <p className="font-headline-md text-[24px] text-secondary-fixed-dim">24</p>
                    </div>
                </div>
            </div>
            
            <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-label-uppercase text-label-uppercase flex items-center gap-2 hover:opacity-90 mt-4 md:mt-0">
                <span className="material-symbols-outlined">edit</span>
                Edit Profile
            </button>
        </div>
      </main>
    </div>
  )
}
