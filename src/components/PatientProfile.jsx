import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUserCircle, 
  FaCalendar, 
  FaClock, 
  FaVenusMars,
  FaUserShield,
  FaPrescriptionBottleAlt,
  FaPlus,
  FaTimes
} from 'react-icons/fa';
import { format } from 'date-fns';

const PatientProfile = ({ patient, onClose }) => {
  const [showAddCaretaker, setShowAddCaretaker] = useState(false);
  const [showAddPrescription, setShowAddPrescription] = useState(false);
  const [caretakerForm, setCaretakerForm] = useState({
    name: '',
    phone: '',
    relation: ''
  });
  const [prescriptionForm, setPrescriptionForm] = useState({
    medicationName: '',
    dosage: '',
    frequency: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: '',
    instructions: ''
  });

  const handleAddCaretaker = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to add the caretaker
    console.log('Adding caretaker:', caretakerForm);
    setShowAddCaretaker(false);
    setCaretakerForm({ name: '', phone: '', relation: '' });
  };

  const handleAddPrescription = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to add the prescription
    console.log('Adding prescription:', prescriptionForm);
    setShowAddPrescription(false);
    setPrescriptionForm({
      medicationName: '',
      dosage: '',
      frequency: '',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: '',
      instructions: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 relative"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-primary/50 hover:text-primary"
      >
        <FaTimes className="w-6 h-6" />
      </button>

      {/* Patient Basic Info */}
      <div className="flex items-start space-x-6 mb-8">
        <FaUserCircle className="w-16 h-16 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-background-dark">{patient.name}</h2>
          <p className="text-primary/70">Beneficiary ID: {patient.beneficiaryId}</p>
          <div className="flex items-center space-x-4 mt-2">
            <span className="flex items-center text-sm text-primary/70">
              <FaCalendar className="w-4 h-4 mr-1" />
              {format(new Date(patient.dob), 'MMM dd, yyyy')}
            </span>
            <span className="flex items-center text-sm text-primary/70">
              <FaClock className="w-4 h-4 mr-1" />
              Age: {patient.age}
            </span>
            <span className="flex items-center text-sm text-primary/70">
              <FaVenusMars className="w-4 h-4 mr-1" />
              {patient.gender}
            </span>
          </div>
        </div>
      </div>

      {/* Caretaker Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-background-dark flex items-center">
            <FaUserShield className="w-5 h-5 mr-2" />
            Caretaker Information
          </h3>
          {!patient.caretaker && !showAddCaretaker && (
            <button
              onClick={() => setShowAddCaretaker(true)}
              className="flex items-center text-primary hover:text-primary-hover"
            >
              <FaPlus className="w-4 h-4 mr-1" />
              Add Caretaker
            </button>
          )}
        </div>

        {showAddCaretaker ? (
          <form onSubmit={handleAddCaretaker} className="space-y-4">
            <input
              type="text"
              placeholder="Caretaker Name"
              value={caretakerForm.name}
              onChange={(e) => setCaretakerForm({ ...caretakerForm, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={caretakerForm.phone}
              onChange={(e) => setCaretakerForm({ ...caretakerForm, phone: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Relation to Patient"
              value={caretakerForm.relation}
              onChange={(e) => setCaretakerForm({ ...caretakerForm, relation: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover"
              >
                Save Caretaker
              </button>
              <button
                type="button"
                onClick={() => setShowAddCaretaker(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : patient.caretaker ? (
          <div className="bg-primary/5 rounded-lg p-4">
            <p className="font-medium">{patient.caretaker.name}</p>
            <p className="text-sm text-primary/70">{patient.caretaker.relation}</p>
            <p className="text-sm text-primary/70">{patient.caretaker.phone}</p>
          </div>
        ) : (
          <p className="text-primary/70">No caretaker assigned</p>
        )}
      </div>

      {/* Prescriptions Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-background-dark flex items-center">
            <FaPrescriptionBottleAlt className="w-5 h-5 mr-2" />
            Prescriptions
          </h3>
          <button
            onClick={() => setShowAddPrescription(true)}
            className="flex items-center text-primary hover:text-primary-hover"
          >
            <FaPlus className="w-4 h-4 mr-1" />
            Add Prescription
          </button>
        </div>

        {showAddPrescription && (
          <form onSubmit={handleAddPrescription} className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Medication Name"
              value={prescriptionForm.medicationName}
              onChange={(e) => setPrescriptionForm({ ...prescriptionForm, medicationName: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Dosage"
                value={prescriptionForm.dosage}
                onChange={(e) => setPrescriptionForm({ ...prescriptionForm, dosage: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Frequency"
                value={prescriptionForm.frequency}
                onChange={(e) => setPrescriptionForm({ ...prescriptionForm, frequency: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-primary/70 mb-1">Start Date</label>
                <input
                  type="date"
                  value={prescriptionForm.startDate}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, startDate: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-primary/70 mb-1">End Date</label>
                <input
                  type="date"
                  value={prescriptionForm.endDate}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, endDate: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
            <textarea
              placeholder="Special Instructions"
              value={prescriptionForm.instructions}
              onChange={(e) => setPrescriptionForm({ ...prescriptionForm, instructions: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows="3"
            />
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover"
              >
                Save Prescription
              </button>
              <button
                type="button"
                onClick={() => setShowAddPrescription(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {patient.prescriptions && patient.prescriptions.length > 0 ? (
          <div className="space-y-4">
            {patient.prescriptions.map((prescription) => (
              <div key={prescription.id} className="bg-primary/5 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{prescription.medicationName}</h4>
                    <p className="text-sm text-primary/70">
                      {prescription.dosage} - {prescription.frequency}
                    </p>
                  </div>
                  <div className="text-sm text-right text-primary/70">
                    <p>{format(new Date(prescription.startDate), 'MMM dd, yyyy')}</p>
                    <p>to</p>
                    <p>{format(new Date(prescription.endDate), 'MMM dd, yyyy')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-primary/70">No prescriptions found</p>
        )}
      </div>
    </motion.div>
  );
};

export default PatientProfile; 