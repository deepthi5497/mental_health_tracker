// src/components/DailyLog/DailyLog.jsx
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const DailyLog = () => {
  const [formData, setFormData] = useState({
    mood: 5,
    anxietyLevel: 5,
    sleepHours: 8,
    sleepQuality: 3,
    physicalActivity: 'none',
    socialInteractions: 0,
    stressLevel: 5,
    symptoms: []
  });

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        fetchLogs();
      }
    } catch (err) {
      console.error('Failed to save log:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/logs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      }
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-8">Daily Mental Health Tracker</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Emotional State Section */}
            <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700">Emotional State</h2>
              
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  How is your mood today? (1-10)
                  <span className="text-sm text-gray-500 ml-2">1 = Very Low, 10 = Excellent</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.mood}
                  onChange={(e) => setFormData({...formData, mood: Number(e.target.value)})}
                  className="w-full accent-blue-500"
                />
                <div className="text-sm text-gray-600 mt-1">Current value: {formData.mood}</div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Anxiety Level (1-10)
                  <span className="text-sm text-gray-500 ml-2">1 = Very Calm, 10 = Severe Anxiety</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.anxietyLevel}
                  onChange={(e) => setFormData({...formData, anxietyLevel: Number(e.target.value)})}
                  className="w-full accent-blue-500"
                />
                <div className="text-sm text-gray-600 mt-1">Current value: {formData.anxietyLevel}</div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Stress Level (1-10)
                  <span className="text-sm text-gray-500 ml-2">1 = No Stress, 10 = Extremely Stressed</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.stressLevel}
                  onChange={(e) => setFormData({...formData, stressLevel: Number(e.target.value)})}
                  className="w-full accent-blue-500"
                />
                <div className="text-sm text-gray-600 mt-1">Current value: {formData.stressLevel}</div>
              </div>
            </div>

            {/* Physical Well-being Section */}
            <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700">Physical Well-being</h2>
              
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Hours of Sleep Last Night
                </label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={formData.sleepHours}
                  onChange={(e) => setFormData({...formData, sleepHours: Number(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter hours of sleep"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Sleep Quality (1-5)
                  <span className="text-sm text-gray-500 ml-2">1 = Poor, 5 = Excellent</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.sleepQuality}
                  onChange={(e) => setFormData({...formData, sleepQuality: Number(e.target.value)})}
                  className="w-full accent-blue-500"
                />
                <div className="text-sm text-gray-600 mt-1">Current value: {formData.sleepQuality}</div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Physical Activity Level
                </label>
                <select
                  value={formData.physicalActivity}
                  onChange={(e) => setFormData({...formData, physicalActivity: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="none">No Activity</option>
                  <option value="light">Light (e.g., Walking)</option>
                  <option value="moderate">Moderate (e.g., Jogging)</option>
                  <option value="intense">Intense (e.g., High-intensity workout)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Social and Symptoms Section */}
          <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Number of Social Interactions Today
                <span className="text-sm text-gray-500 ml-2">Count of meaningful social contacts</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.socialInteractions}
                onChange={(e) => setFormData({...formData, socialInteractions: Number(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter number of interactions"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-4">
                Symptoms Experienced Today (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Depression',
                  'Anxiety',
                  'Panic Attacks',
                  'Fatigue',
                  'Sleep Issues',
                  'Loss of Interest',
                  'Difficulty Concentrating',
                  'Mood Swings',
                  'Irritability'
                ].map((symptom) => (
                  <label key={symptom} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.symptoms.includes(symptom)}
                      onChange={(e) => {
                        const updatedSymptoms = e.target.checked
                          ? [...formData.symptoms, symptom]
                          : formData.symptoms.filter(s => s !== symptom);
                        setFormData({...formData, symptoms: updatedSymptoms});
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{symptom}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-blue-300"
          >
            {loading ? 'Saving...' : 'Save Daily Log'}
          </button>
        </form>

        {/* Progress Chart */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Progress Over Time</h2>
          <div className="bg-white p-4 rounded-lg h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={logs}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis 
                  dataKey="date"
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                  stroke="#666"
                />
                <YAxis domain={[0, 10]} stroke="#666" />
                <Tooltip
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #ddd' }}
                />
                <Legend />
                <Line type="monotone" dataKey="mood" stroke="#8884d8" name="Mood" strokeWidth={2} />
                <Line type="monotone" dataKey="anxietyLevel" stroke="#82ca9d" name="Anxiety" strokeWidth={2} />
                <Line type="monotone" dataKey="stressLevel" stroke="#ffc658" name="Stress" strokeWidth={2} />
                <Line type="monotone" dataKey="sleepQuality" stroke="#ff8042" name="Sleep Quality" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyLog;