import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import AddRecordModal from './components/AddRecordModal';
import Community from './components/Community';
import Stats from './components/Stats';
import Profile from './components/Profile';
import { UserProfile, Record } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [records, setRecords] = useState<Record[]>([]);
  const [view, setView] = useState<string>('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Persistence Load
  useEffect(() => {
    const savedUser = localStorage.getItem('ww_user');
    const savedRecords = localStorage.getItem('ww_records');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
    setIsLoading(false);
  }, []);

  // Save on Change
  useEffect(() => {
    if (user) {
      localStorage.setItem('ww_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ww_records', JSON.stringify(records));
  }, [records]);

  const handleOnboardingComplete = (newUser: UserProfile) => {
    setUser(newUser);
  };

  const handleAddRecord = (recordData: Omit<Record, 'id' | 'timestamp'>) => {
    const newRecord: Record = {
      ...recordData,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    setRecords((prev) => [...prev, newRecord]);
    
    // Optional: Visual feedback or vibration could go here
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-emerald-50 text-emerald-600">Loading...</div>;
  }

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative shadow-2xl overflow-hidden">
      <main className="min-h-screen">
        {view === 'dashboard' && <Dashboard user={user} records={records} />}
        {view === 'community' && <Community user={user} records={records} />}
        {view === 'stats' && <Stats records={records} />}
        {view === 'profile' && <Profile user={user} onUpdate={handleUpdateUser} />}
      </main>

      <Navigation 
        currentView={view} 
        setView={setView} 
        onAddClick={() => setIsAddModalOpen(true)} 
      />

      <AddRecordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddRecord}
      />
    </div>
  );
};

export default App;