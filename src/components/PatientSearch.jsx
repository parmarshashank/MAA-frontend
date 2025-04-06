import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaUserInjured } from 'react-icons/fa';

const PatientSearch = ({ onPatientSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Hardcoded patient data for now
  const mockPatient = {
    id: "mock-uuid",
    beneficiaryId: "469213",
    name: "John Doe",
    age: 45,
    dob: "1979-03-15T00:00:00.000Z",
    gender: "MALE",
    caretaker: null,
    prescriptions: [
      {
        id: "rx1",
        medicationName: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        startDate: "2024-03-01T00:00:00.000Z",
        endDate: "2024-06-01T00:00:00.000Z"
      }
    ],
    createdAt: "2024-01-01T00:00:00.000Z"
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (searchQuery === "469213") {
        onPatientSelect(mockPatient);
      } else {
        // You can add toast notification here for no patient found
        onPatientSelect(null);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <FaSearch className="text-primary/50" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter Beneficiary ID (e.g., 469213)"
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-secondary
                     focus:ring-2 focus:ring-primary focus:border-transparent
                     transition-all bg-white/50 backdrop-blur-sm"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="absolute inset-y-0 right-0 px-6 bg-primary text-white 
                     rounded-r-lg hover:bg-primary-hover transition-colors
                     disabled:opacity-50"
            disabled={loading || !searchQuery}
          >
            {loading ? "Searching..." : "Search"}
          </motion.button>
        </div>
      </form>

      <div className="text-center text-primary/70">
        <FaUserInjured className="w-8 h-8 mx-auto mb-2" />
        <p>Enter a beneficiary ID to search for a patient</p>
        <p className="text-sm">Try using: 469213</p>
      </div>
    </div>
  );
};

export default PatientSearch; 