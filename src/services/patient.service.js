import apiClient from '../config/api.config';

class PatientService {
  // Create a new patient
  async createPatient(patientData) {
    try {
      const response = await apiClient.post('/patients', patientData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get patient details
  async getPatient(patientId) {
    try {
      const response = await apiClient.get(`/patients/${patientId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update patient details
  async updatePatient(patientId, updateData) {
    try {
      const response = await apiClient.patch(`/patients/${patientId}`, updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Add/Update caretaker for a patient
  async updateCaretaker(patientId, caretakerData) {
    try {
      const response = await apiClient.post(`/patients/${patientId}/caretaker`, caretakerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get patient's caretaker details
  async getCaretaker(patientId) {
    try {
      const response = await apiClient.get(`/patients/${patientId}/caretaker`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update patient's Firebase token for notifications
  async updateFirebaseToken(patientId, firebaseToken) {
    try {
      const response = await apiClient.patch(`/patients/${patientId}/firebase-token`, {
        firebaseToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Search patients
  async searchPatients(query) {
    try {
      const response = await apiClient.get('/patients/search', {
        params: { query },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get all patients under a caretaker
  async getCaretakerPatients(caretakerId) {
    try {
      const response = await apiClient.get(`/caretakers/${caretakerId}/patients`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new PatientService(); 