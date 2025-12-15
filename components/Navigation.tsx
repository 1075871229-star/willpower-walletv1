import React from 'react';
import { Home, Users, BarChart2, User } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  setView: (view: string) => void;
  onAddClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, onAddClick }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'stats', icon: BarChart2, label: 'Stats' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-emerald-100 pb-safe pt-2 px-4 shadow-lg z-40">
      <div className="flex justify-between items-center max-w-md mx-auto relative h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center w-16 transition-colors duration-200 ${
                isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <Icon size={24} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </button>
          );
        })}
        
        {/* Floating Action Button positioned absolutely within the nav logic or visually above */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
           <button
            onClick={onAddClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-lg border-4 border-emerald-50 transition-transform active:scale-95"
            aria-label="Add Record"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;