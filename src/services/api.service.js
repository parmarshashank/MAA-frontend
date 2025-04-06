import apiClient from '../config/api.config';

// Admin Services
export const adminService = {
  register: async (adminData) => {
    const response = await apiClient.post('/api/admin/register', adminData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await apiClient.post('/api/admin/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/api/admin/me');
    return response.data;
  },

  createDoctor: async (doctorData) => {
    const response = await apiClient.post('/api/admin/doctors', doctorData);
    return response.data;
  },

  createPharmacist: async (pharmacistData) => {
    const response = await apiClient.post('/api/admin/pharmacists', pharmacistData);
    return response.data;
  }
};

// Hospital Services
export const hospitalService = {
  getAll: async () => {
    const response = await apiClient.get('/api/hospitals');
    return response.data;
  },

  create: async (hospitalData) => {
    const response = await apiClient.post('/api/hospitals', hospitalData);
    return response.data;
  },

  update: async (id, hospitalData) => {
    const response = await apiClient.put(`/api/hospitals/${id}`, hospitalData);
    return response.data;
  }
};

// Doctor Services
export const doctorService = {
  register: async (doctorData) => {
    const response = await apiClient.post('/api/auth/register/doctor', doctorData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await apiClient.post('/api/auth/login/doctor', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },

  getPatients: async () => {
    const response = await apiClient.get('/api/patients');
    return response.data;
  },

  createPatient: async (patientData) => {
    const response = await apiClient.post('/api/patients', patientData);
    return response.data;
  },

  getPrescriptions: async () => {
    const response = await apiClient.get('/api/prescriptions');
    return response.data;
  },

  getPatientPrescriptions: async (patientId) => {
    const response = await apiClient.get(`/api/prescriptions/patient/${patientId}`);
    return response.data;
  },

  createPrescription: async (prescriptionData) => {
    const response = await apiClient.post('/api/prescriptions', prescriptionData);
    return response.data;
  }
};

// Pharmacist Services
export const pharmacistService = {
  register: async (pharmacistData) => {
    const response = await apiClient.post('/api/auth/register/pharmacist', pharmacistData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await apiClient.post('/api/auth/login/pharmacist', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },

  getMedicines: async () => {
    const response = await apiClient.get('/api/medicines');
    return response.data;
  },

  createMedicine: async (medicineData) => {
    const response = await apiClient.post('/api/medicines', medicineData);
    return response.data;
  },

  updateMedicine: async (id, medicineData) => {
    const response = await apiClient.put(`/api/medicines/${id}`, medicineData);
    return response.data;
  }
};

// Error Handler
export const handleApiError = (error) => {
  const errorMessage = error.response?.data?.message || 'An error occurred';
  
  switch (error.response?.status) {
    case 401:
      throw new Error('Unauthorized: Please login again');
    case 403:
      throw new Error('Forbidden: You do not have permission to perform this action');
    case 404:
      throw new Error('Not Found: The requested resource does not exist');
    default:
      throw new Error(errorMessage);
  }
}; 