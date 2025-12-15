import React from 'react';
import { Record } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StatsProps {
  records: Record[];
}

const Stats: React.FC<StatsProps> = ({ records }) => {
  // Aggregate data for the last 7 days
  const getLast7DaysData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateString = d.toLocaleDateString(undefined, { weekday: 'short' });
      
      // Find records for this day (simplified date matching)
      const dailyTotal = records
        .filter(r => {
            const rDate = new Date(r.timestamp);
            return rDate.getDate() === d.getDate() && rDate.getMonth() === d.getMonth();
        })
        .reduce((sum, r) => sum + r.price, 0);

      data.push({
        day: dateString,
        amount: dailyTotal,
      });
    }
    return data;
  };

  const chartData = getLast7DaysData();
  const totalSaved = records.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="pb-24 px-4 pt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Weekly Trends</h1>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h2 className="text-sm font-medium text-gray-500 mb-4">Money Saved (Last 7 Days)</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#9CA3AF' }} 
                dy={10}
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: '#ECFDF5' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.amount > 0 ? '#10B981' : '#E5E7EB'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-emerald-900 text-white rounded-2xl p-6">
        <h3 className="text-emerald-200 text-sm font-medium mb-1">Total Savings</h3>
        <p className="text-4xl font-bold">¥{totalSaved.toLocaleString()}</p>
        <p className="text-emerald-200 text-xs mt-2 opacity-80">Keep pushing towards your goal!</p>
      </div>
    </div>
  );
};

export default Stats;