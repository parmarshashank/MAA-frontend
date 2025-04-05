import apiClient from '../config/api.config';

class MedicineService {
  // Create a new medicine
  async createMedicine(medicineData) {
    try {
      const response = await apiClient.post('/medicines', medicineData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get all medicines for a pharmacist
  async getPharmacistMedicines(pharmacistId) {
    try {
      const response = await apiClient.get(`/medicines/pharmacist/${pharmacistId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get all medicines for a hospital
  async getHospitalMedicines(hospitalId) {
    try {
      const response = await apiClient.get(`/medicines/hospital/${hospitalId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update a medicine
  async updateMedicine(medicineId, updateData) {
    try {
      const response = await apiClient.patch(`/medicines/${medicineId}`, updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Delete a medicine
  async deleteMedicine(medicineId) {
    try {
      const response = await apiClient.delete(`/medicines/${medicineId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Search medicines
  async searchMedicines(query, hospitalId) {
    try {
      const response = await apiClient.get('/medicines/search', {
        params: {
          query,
          hospitalId,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new MedicineService(); 