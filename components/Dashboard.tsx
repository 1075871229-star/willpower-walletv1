import React from 'react';
import { UserProfile, Record } from '../types';
import { JOGGING_COEFFICIENT } from '../constants';
import { TrendingUp, Activity, Zap } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  records: Record[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, records }) => {
  const totalMoney = records.reduce((sum, r) => sum + r.price, 0);
  const totalCalories = records.reduce((sum, r) => sum + r.calories, 0);
  
  // Logic: Minutes = TotalCalories / (UserWeight * 0.115)
  // Ensure weight is not zero to avoid Infinity
  const safeWeight = user.weight > 0 ? user.weight : 70;
  const joggingMinutesSaved = Math.round(totalCalories / (safeWeight * JOGGING_COEFFICIENT));

  return (
    <div className="pb-24">
      <header className="px-6 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Hi {user.name.split(' ')[0]},</h1>
        <p className="text-gray-500">Your willpower is paying off!</p>
      </header>

      <div className="px-4 space-y-4">
        {/* Main Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-200">
            <div className="flex items-center gap-2 mb-2 opacity-90">
              <TrendingUp size={18} />
              <span className="text-sm font-medium">Money Saved</span>
            </div>
            <div className="text-3xl font-bold">¥{totalMoney.toLocaleString()}</div>
          </div>
          
          <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-orange-500">
              <Activity size={18} />
              <span className="text-sm font-medium text-gray-500">Cals Avoided</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{totalCalories.toLocaleString()}</div>
            <div className="text-xs text-gray-400">kcal</div>
          </div>
        </div>

        {/* Smart Insight */}
        <div className="bg-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap size={100} />
          </div>
          <div className="relative z-10">
            <h3 className="font-semibold text-indigo-100 text-sm uppercase tracking-wider mb-1">Smart Insight</h3>
            <p className="text-lg leading-snug">
              Based on your {user.weight}kg weight, you saved <span className="font-bold text-yellow-300 text-2xl mx-1">{joggingMinutesSaved}</span> minutes of jogging today!
            </p>
          </div>
        </div>

        {/* Recent Records */}
        <div className="pt-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3 px-2">Recent Victories</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {records.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <p>No records yet.</p>
                <p className="text-sm">Tap + to add your first win!</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {records.slice().reverse().map((record) => (
                  <li key={record.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                         {/* Simple generic icon for food */}
                         <span className="font-bold text-lg">{record.foodName.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{record.foodName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600">+ ¥{record.price}</p>
                      <p className="text-xs text-orange-500 strike-through decoration-slate-400">{record.calories} kcal</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;