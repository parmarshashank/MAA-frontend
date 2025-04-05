import apiClient from '../config/api.config';

class PrescriptionService {
  // Create a new prescription
  async createPrescription(prescriptionData) {
    try {
      const response = await apiClient.post('/prescriptions', prescriptionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get prescriptions for a doctor
  async getDoctorPrescriptions(doctorId) {
    try {
      const response = await apiClient.get(`/prescriptions/doctor/${doctorId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get prescriptions for a patient
  async getPatientPrescriptions(patientId) {
    try {
      const response = await apiClient.get(`/prescriptions/patient/${patientId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Add medication items to a prescription
  async addPrescriptionItems(prescriptionId, items) {
    try {
      const response = await apiClient.post(`/prescriptions/${prescriptionId}/items`, { items });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get medication schedule for a prescription item
  async getMedicationSchedule(prescriptionItemId) {
    try {
      const response = await apiClient.get(`/prescriptions/items/${prescriptionItemId}/schedule`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update medication schedule status
  async updateScheduleStatus(scheduleId, status, acknowledgedAt = new Date()) {
    try {
      const response = await apiClient.patch(`/prescriptions/schedule/${scheduleId}`, {
        status,
        acknowledgedAt: acknowledgedAt.toISOString(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get all pending medication schedules for a patient
  async getPatientPendingSchedules(patientId) {
    try {
      const response = await apiClient.get(`/prescriptions/patient/${patientId}/pending-schedules`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new PrescriptionService(); 