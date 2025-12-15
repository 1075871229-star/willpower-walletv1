import React, { useState } from 'react';
import { UserProfile, Record, LeaderboardUser } from '../types';
import { MOCK_COMMUNITY_USERS } from '../constants';
import { UserPlus, Trophy, Flame } from 'lucide-react';

interface CommunityProps {
  user: UserProfile;
  records: Record[];
}

type SortMode = 'money' | 'calories';

const Community: React.FC<CommunityProps> = ({ user, records }) => {
  const [sortMode, setSortMode] = useState<SortMode>('money');

  const currentUserStats: LeaderboardUser = {
    id: 'current_user',
    name: user.name,
    totalMoney: records.reduce((sum, r) => sum + r.price, 0),
    totalCalories: records.reduce((sum, r) => sum + r.calories, 0),
    isCurrentUser: true,
  };

  const allUsers = [...MOCK_COMMUNITY_USERS, currentUserStats].sort((a, b) => {
    if (sortMode === 'money') return b.totalMoney - a.totalMoney;
    return b.totalCalories - a.totalCalories;
  });

  const handleInvite = () => {
    alert(`Invite sent to contacts for ${user.mobile}`);
  };

  return (
    <div className="pb-24 px-4 pt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>
        <button
          onClick={handleInvite}
          className="flex items-center gap-1 text-sm bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full font-medium hover:bg-emerald-200 transition-colors"
        >
          <UserPlus size={16} />
          Invite
        </button>
      </div>

      <div className="bg-gray-100 p-1 rounded-xl flex mb-6">
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            sortMode === 'money' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
          }`}
          onClick={() => setSortMode('money')}
        >
          Wealth Ranking
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            sortMode === 'calories' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
          }`}
          onClick={() => setSortMode('calories')}
        >
          Calorie Ranking
        </button>
      </div>

      <div className="space-y-3">
        {allUsers.map((u, index) => (
          <div
            key={u.id}
            className={`flex items-center p-4 rounded-xl border ${
              u.isCurrentUser
                ? 'bg-emerald-50 border-emerald-200 ring-1 ring-emerald-400'
                : 'bg-white border-gray-100'
            }`}
          >
            <div className="w-8 font-bold text-gray-400 text-lg italic">#{index + 1}</div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 flex items-center gap-2">
                {u.name}
                {index === 0 && <Trophy size={16} className="text-yellow-500" />}
              </div>
            </div>
            <div className="text-right">
              {sortMode === 'money' ? (
                <div className="font-bold text-emerald-600">¥{u.totalMoney.toLocaleString()}</div>
              ) : (
                <div className="font-bold text-orange-500 flex items-center justify-end gap-1">
                    <Flame size={14} />
                    {u.totalCalories.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;