import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AskAI = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    query: ''
  });
  const [aiResponse, setAiResponse] = useState(null);

  // Hardcoded responses based on patient ID
  const mockResponses = {
    'P001': {
      chronicConditions: 'Hypertension (since 2020), Type 2 Diabetes (since 2019)',
      allergies: 'Penicillin, Sulfa drugs',
      ongoingMedications: 'Amlodipine (5mg daily), Metformin (1000mg twice daily)',
      pastSurgeries: 'Appendectomy (2018), Knee Arthroscopy (2021)',
      recentVisits: 'Last checkup: March 15, 2024 - Blood pressure review'
    },
    'P002': {
      chronicConditions: 'Asthma (since childhood)',
      allergies: 'No known allergies',
      ongoingMedications: 'Albuterol inhaler (as needed), Fluticasone (daily)',
      pastSurgeries: 'Tonsillectomy (2015)',
      recentVisits: 'Last checkup: April 1, 2024 - Routine asthma review'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate AI response with hardcoded data
    const patientData = mockResponses[formData.patientId];
    if (patientData) {
      const response = `Here is the medical history summary for Patient ${formData.patientId}:\n\n` +
        `Chronic Conditions: ${patientData.chronicConditions}\n\n` +
        `Allergies: ${patientData.allergies}\n\n` +
        `Ongoing Medications: ${patientData.ongoingMedications}\n\n` +
        `Past Surgeries: ${patientData.pastSurgeries}\n\n` +
        `Recent Visits: ${patientData.recentVisits}\n\n` +
        `Regarding your query: "${formData.query}"\n` +
        `Based on the patient's medical history above, I recommend discussing any specific concerns during the next follow-up visit.`;
      
      setAiResponse(response);
    } else {
      setAiResponse(`No data found for Patient ID: ${formData.patientId}. Please check the ID and try again.`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">
        Ask AI Assistant
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
            Patient ID
          </label>
          <input
            type="text"
            required
            placeholder="Enter patient ID (e.g., P001)"
            value={formData.patientId}
            className="w-full p-3 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763]"
            onChange={(e) => setFormData({...formData, patientId: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
            Your Query
          </label>
          <textarea
            required
            rows="4"
            placeholder="Ask anything about the patient's condition, medications, or treatment plan..."
            value={formData.query}
            className="w-full p-3 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763]"
            onChange={(e) => setFormData({...formData, query: e.target.value})}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#2D2D2D] text-white rounded-lg hover:bg-[#A68763] transition-colors"
        >
          Get AI Response
        </button>
      </form>

      {aiResponse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-4 bg-gray-50 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-2">AI Response:</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
            {aiResponse}
          </pre>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AskAI; 