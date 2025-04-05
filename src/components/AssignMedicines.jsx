import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFileAlt } from 'react-icons/fa';

const AssignMedicines = () => {
  const [medicines] = useState([
    { id: 'MED001', name: 'Paracetamol' },
    { id: 'MED002', name: 'Amoxicillin' },
    { id: 'MED003', name: 'Ibuprofen' }
  ]);

  const [searchPatientId, setSearchPatientId] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [assignments, setAssignments] = useState([]);

  // Add frequency options
  const frequencyOptions = [
    { value: 'qd', label: 'qd - Once daily' },
    { value: 'bid', label: 'bid - Twice daily' },
    { value: 'tid', label: 'tid - Three times daily' },
    { value: 'qid', label: 'qid - Four times daily' },
    { value: 'q4h', label: 'q4h - Every 4 hours' },
    { value: 'q6h', label: 'q6h - Every 6 hours' },
    { value: 'q8h', label: 'q8h - Every 8 hours' },
    { value: 'q12h', label: 'q12h - Every 12 hours' },
    { value: 'prn', label: 'prn - As needed' },
    { value: 'ac', label: 'ac - Before meals' },
    { value: 'pc', label: 'pc - After meals' },
    { value: 'hs', label: 'hs - At bedtime' }
  ];

  // Add dosage units
  const dosageUnits = [
    { value: 'mg', label: 'mg - Milligrams' },
    { value: 'mcg', label: 'mcg - Micrograms' },
    { value: 'g', label: 'g - Grams' },
    { value: 'ml', label: 'ml - Milliliters' },
    { value: 'cc', label: 'cc - Cubic centimeters' },
    { value: 'IU', label: 'IU - International Units' },
    { value: 'tbsp', label: 'tbsp - Tablespoon' },
    { value: 'tsp', label: 'tsp - Teaspoon' }
  ];

  // Add duration options
  const durationOptions = [
    { value: 'x 7 days', label: 'For 7 days' },
    { value: 'x 10 days', label: 'For 10 days' },
    { value: 'x 5/7', label: 'For 5 days out of 7' },
    { value: 'x 3/12', label: 'For 3 months' },
    { value: 'until finished', label: 'Until finished' },
    { value: 'stat', label: 'Immediately (stat)' },
    { value: 'ad lib', label: 'As desired (ad lib)' }
  ];

  // Update formData state
  const [formData, setFormData] = useState({
    medicineId: '',
    dosageAmount: '',
    dosageUnit: '',
    frequency: '',
    duration: '',
    visitNotes: ''
  });

  // Mock patient data
  const mockPatients = {
    'P001': {
      name: 'John Doe',
      age: 45,
      chronicConditions: 'Hypertension (since 2020), Type 2 Diabetes (since 2019)',
      allergies: 'Penicillin, Sulfa drugs',
      ongoingMedications: 'Amlodipine (5mg daily), Metformin (1000mg twice daily)',
      recentVisits: 'Last checkup: March 15, 2024 - Blood pressure review'
    },
    'P002': {
      name: 'Jane Smith',
      age: 32,
      chronicConditions: 'Asthma (since childhood)',
      allergies: 'No known allergies',
      ongoingMedications: 'Albuterol inhaler (as needed)',
      recentVisits: 'Last checkup: April 1, 2024 - Routine asthma review'
    }
  };

  const handlePatientSearch = (e) => {
    e.preventDefault();
    const patient = mockPatients[searchPatientId];
    if (patient) {
      setSelectedPatient({ ...patient, id: searchPatientId });
    } else {
      alert('Patient not found');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAssignments([...assignments, {
      ...formData,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      medicineName: medicines.find(m => m.id === formData.medicineId)?.name,
      date: new Date().toISOString()
    }]);
    setFormData({
      medicineId: '',
      dosageAmount: '',
      dosageUnit: '',
      frequency: '',
      duration: '',
      visitNotes: ''
    });
  };

  return (
    <div className="space-y-6">
      {!selectedPatient ? (
        // Patient Search Screen
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Search Patient</h2>
          <form onSubmit={handlePatientSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Patient ID (e.g., P001)"
              value={searchPatientId}
              onChange={(e) => setSearchPatientId(e.target.value)}
              className="flex-1 p-3 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#2D2D2D] text-white rounded-lg hover:bg-[#A68763] transition-colors"
            >
              <FaSearch />
            </button>
          </form>
        </motion.div>
      ) : (
        // Patient Details and Prescription Screen
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Patient Summary */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-[#2D2D2D]">
                  {selectedPatient.name}
                </h2>
                <p className="text-gray-600">ID: {selectedPatient.id} | Age: {selectedPatient.age}</p>
              </div>
              <button
                onClick={() => setSelectedPatient(null)}
                className="text-[#A68763] hover:text-[#2D2D2D]"
              >
                Back to Search
              </button>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Chronic Conditions</h3>
                <p className="text-sm text-gray-600">{selectedPatient.chronicConditions}</p>
              </div>
              <div>
                <h3 className="font-semibold">Allergies</h3>
                <p className="text-sm text-gray-600">{selectedPatient.allergies}</p>
              </div>
              <div>
                <h3 className="font-semibold">Ongoing Medications</h3>
                <p className="text-sm text-gray-600">{selectedPatient.ongoingMedications}</p>
              </div>
              <div>
                <h3 className="font-semibold">Recent Visits</h3>
                <p className="text-sm text-gray-600">{selectedPatient.recentVisits}</p>
              </div>
            </div>
          </div>

          {/* Updated Prescription Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-md space-y-4">
            <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">New Prescription</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                  Medicine
                </label>
                <select
                  required
                  value={formData.medicineId}
                  className="w-full p-2 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763]"
                  onChange={(e) => setFormData({...formData, medicineId: e.target.value})}
                >
                  <option value="">Select Medicine</option>
                  {medicines.map(medicine => (
                    <option key={medicine.id} value={medicine.id}>
                      {medicine.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                    Dosage Amount
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.1"
                    value={formData.dosageAmount}
                    className="w-full p-2 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763]"
                    onChange={(e) => setFormData({...formData, dosageAmount: e.target.value})}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                    Unit
                  </label>
                  <select
                    required
                    value={formData.dosageUnit}
                    className="w-full p-2 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763]"
                    onChange={(e) => setFormData({...formData, dosageUnit: e.target.value})}
                  >
                    <option value="">Unit</option>
                    {dosageUnits.map(unit => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                  Frequency
                </label>
                <select
                  required
                  value={formData.frequency}
                  className="w-full p-2 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763]"
                  onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                >
                  <option value="">Select Frequency</option>
                  {frequencyOptions.map(freq => (
                    <option key={freq.value} value={freq.value}>
                      {freq.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                  Duration
                </label>
                <select
                  required
                  value={formData.duration}
                  className="w-full p-2 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763]"
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                >
                  <option value="">Select Duration</option>
                  {durationOptions.map(duration => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
                Visit Notes
              </label>
              <textarea
                required
                rows="3"
                value={formData.visitNotes}
                placeholder="Enter visit summary and notes..."
                className="w-full p-2 border border-[#D7C9AE] rounded-lg focus:ring-2 focus:ring-[#A68763]"
                onChange={(e) => setFormData({...formData, visitNotes: e.target.value})}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#2D2D2D] text-white rounded-lg hover:bg-[#A68763] transition-colors"
            >
              Assign Medicine
            </button>
          </form>

          {/* Prescription History */}
          {assignments.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">Prescription History</h3>
              <div className="space-y-3">
                {assignments.filter(a => a.patientId === selectedPatient.id).map((assignment, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{assignment.medicineName}</p>
                        <p className="text-sm text-gray-600">
                          {assignment.dosageAmount} {assignment.dosageUnit} - {assignment.frequency} for {assignment.duration}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(assignment.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <FaFileAlt className="inline mr-2" />
                      {assignment.visitNotes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AssignMedicines; 