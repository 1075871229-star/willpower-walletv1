import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Smartphone, Ruler, Weight, UserCircle } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>(user);

  const handleSave = () => {
    onUpdate(editForm);
    setIsEditing(false);
  };

  return (
    <div className="pb-24 px-4 pt-8">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 shadow-inner">
          <UserCircle size={64} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
        <p className="text-gray-500">{user.gender}, {user.age} years old</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><Smartphone size={20} /></div>
          <div>
            <p className="text-xs text-gray-500">Mobile</p>
            <p className="font-medium">{user.mobile}</p>
          </div>
        </div>

        {isEditing ? (
          <div className="p-4 space-y-4 bg-gray-50">
            <div>
                <label className="text-xs text-gray-500">Height (cm)</label>
                <input 
                    type="number" 
                    value={editForm.height} 
                    onChange={e => setEditForm({...editForm, height: Number(e.target.value)})}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label className="text-xs text-gray-500">Weight (kg)</label>
                <input 
                    type="number" 
                    value={editForm.weight} 
                    onChange={e => setEditForm({...editForm, weight: Number(e.target.value)})}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button 
                onClick={handleSave}
                className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium"
            >
                Save Changes
            </button>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-500 rounded-lg"><Ruler size={20} /></div>
              <div>
                <p className="text-xs text-gray-500">Height</p>
                <p className="font-medium">{user.height} cm</p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-3">
              <div className="p-2 bg-orange-50 text-orange-500 rounded-lg"><Weight size={20} /></div>
              <div>
                <p className="text-xs text-gray-500">Weight</p>
                <p className="font-medium">{user.weight} kg</p>
              </div>
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full mt-6 bg-white border border-emerald-600 text-emerald-600 font-bold py-3 rounded-xl hover:bg-emerald-50 transition-colors"
        >
          Update Body Data
        </button>
      )}
      
      <div className="mt-8 text-center">
        <button 
            onClick={() => {
                if(confirm('Are you sure you want to reset all data?')) {
                    localStorage.clear();
                    window.location.reload();
                }
            }}
            className="text-red-400 text-sm underline hover:text-red-600"
        >
            Reset App Data
        </button>
      </div>
    </div>
  );
};

export default Profile;