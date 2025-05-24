'use client';

import { useState } from 'react';

interface NavigationProps {
  currentSection: 'home' | 'analysis' | 'routine' | 'shop' | 'ai' | 'assistant' | 'social';
  navigateTo: (section: 'home' | 'analysis' | 'routine' | 'shop' | 'ai' | 'assistant' | 'social') => void;
  isAuthenticated: boolean;
  onAuthClick: () => void;
}

export default function Navigation({ currentSection, navigateTo, isAuthenticated, onAuthClick }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      public: true
    },
    { 
      id: 'analysis', 
      label: 'Skin Analysis', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      public: true
    },
    { 
      id: 'routine', 
      label: 'My Routine', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      public: false
    },
    { 
      id: 'shop', 
      label: 'Shop', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      public: true
    },
    { 
      id: 'ai', 
      label: 'AI Assistant', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      public: false
    },
    { 
      id: 'social', 
      label: 'Community', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      public: false
    }
  ];

  const handleNavClick = (sectionId: string) => {
    const section = sectionId as 'home' | 'analysis' | 'routine' | 'shop' | 'ai' | 'assistant' | 'social';
    navigateTo(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 glass-card border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => handleNavClick('home')}
          >
            <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Chok-Chok
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = currentSection === item.id;
              const canAccess = item.public || isAuthenticated;
              
              return (
                <button
                  key={item.id}
                  onClick={() => canAccess ? handleNavClick(item.id) : onAuthClick()}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    isActive
                      ? 'gradient-primary text-white shadow-lg'
                      : canAccess
                      ? 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50'
                      : 'text-gray-400 dark:text-gray-500 hover:bg-white/30 dark:hover:bg-gray-800/30'
                  }`}
                  disabled={!canAccess && item.id !== 'home' && item.id !== 'analysis' && item.id !== 'shop'}
                >
                  {item.icon}
                  <span className="hidden lg:block">{item.label}</span>
                  {!canAccess && item.id !== 'home' && item.id !== 'analysis' && item.id !== 'shop' && (
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* Auth Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Auth Button */}
            {!isAuthenticated && (
              <button
                onClick={onAuthClick}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 gradient-primary text-white rounded-full font-medium hover-lift"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Sign In</span>
              </button>
            )}

            {isAuthenticated && (
              <div className="hidden sm:flex items-center space-x-2 px-3 py-2 glass-card rounded-full">
                <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">U</span>
                </div>
                <span className="text-sm font-medium">Welcome back!</span>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const isActive = currentSection === item.id;
                const canAccess = item.public || isAuthenticated;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => canAccess ? handleNavClick(item.id) : onAuthClick()}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? 'gradient-primary text-white shadow-lg'
                        : canAccess
                        ? 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {!canAccess && item.id !== 'home' && item.id !== 'analysis' && item.id !== 'shop' && (
                      <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </button>
                );
              })}
              
              {/* Mobile Auth Button */}
              {!isAuthenticated && (
                <button
                  onClick={() => {
                    onAuthClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 gradient-primary text-white rounded-lg font-medium mt-4"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Sign In / Register</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}