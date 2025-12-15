import React, { useState } from 'react';
import { MOCK_FOODS } from '../constants';
import { Record } from '../types';
import { X, Check } from 'lucide-react';

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (record: Omit<Record, 'id' | 'timestamp'>) => void;
}

const AddRecordModal: React.FC<AddRecordModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [selectedFoodId, setSelectedFoodId] = useState<string>('');
  const [price, setPrice] = useState<number | ''>('');
  const [calories, setCalories] = useState<number>(0);

  if (!isOpen) return null;

  const handleFoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const foodId = e.target.value;
    setSelectedFoodId(foodId);
    
    const food = MOCK_FOODS.find(f => f.id === foodId);
    if (food) {
      setPrice(food.defaultPrice);
      setCalories(food.defaultCalories);
    } else {
        setPrice('');
        setCalories(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const food = MOCK_FOODS.find(f => f.id === selectedFoodId);
    if (selectedFoodId && price !== '' && food) {
      onAdd({
        foodName: food.name,
        price: Number(price),
        calories: calories,
      });
      // Reset
      setSelectedFoodId('');
      setPrice('');
      setCalories(0);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-emerald-600 px-6 py-4 flex justify-between items-center text-white">
          <h2 className="text-lg font-bold">Resist Temptation</h2>
          <button onClick={onClose} className="hover:bg-emerald-700 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What did you avoid?</label>
            <select
              required
              className="w-full px-4 py-3 border border-emerald-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none"
              value={selectedFoodId}
              onChange={handleFoodChange}
            >
              <option value="">Select Item...</option>
              {MOCK_FOODS.map(food => (
                <option key={food.id} value={food.id}>{food.name}</option>
              ))}
            </select>
          </div>

          {selectedFoodId && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Saved (¥)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">¥</span>
                  <input
                    type="number"
                    required
                    className="w-full pl-8 pr-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Calories (kcal)</label>
                <div className="relative">
                  <input
                    type="number"
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500"
                    value={calories}
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!selectedFoodId}
            className="w-full bg-emerald-600 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl shadow-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <Check size={20} />
            Confirm Savings
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecordModal;