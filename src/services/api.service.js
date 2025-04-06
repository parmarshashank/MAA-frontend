import axios from '../utils/axios.config';

// Admin Services
export const adminService = {
  register: async (adminData) => {
    try {
      const response = await axios.post('/admin/register', adminData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 500) {
        throw new Error('Server error occurred during registration');
      }
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post('/admin/login', credentials);
      return response.data;
    } catch (error) {
      if (error.response?.status === 500) {
        throw new Error('Server error occurred during login');
      }
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await axios.get('/admin/me');
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Admin profile not found');
      } else if (error.response?.status === 500) {
        throw new Error('Server error occurred while fetching profile');
      }
      throw error;
    }
  },

  createDoctor: async (doctorData) => {
    try {
      const response = await axios.post('/admin/doctors', {
        name: doctorData.name,
        email: doctorData.email,
        password: doctorData.password
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 500) {
        throw new Error('Server error occurred while creating doctor account');
      }
      throw error;
    }
  },

  createPharmacist: async (pharmacistData) => {
    try {
      const response = await axios.post('/admin/pharmacists', {
        name: pharmacistData.name,
        email: pharmacistData.email,
        password: pharmacistData.password
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 500) {
        throw new Error('Server error occurred while creating pharmacist account');
      }
      throw error;
    }
  }
};

// Hospital Services
export const hospitalService = {
  getAll: async () => {
    try {
      const response = await axios.get('/hospitals');
      return response.data;
    } catch (error) {
      console.error('Hospital Service Error:', error);
      throw error;
    }
  },

  create: async (hospitalData) => {
    try {
      const response = await axios.post('/hospitals', hospitalData);
      return response.data;
    } catch (error) {
      console.error('Hospital Service Error:', error);
      throw error;
    }
  },

  update: async (id, hospitalData) => {
    try {
      const response = await axios.put(`/hospitals/${id}`, hospitalData);
      return response.data;
    } catch (error) {
      console.error('Hospital Service Error:', error);
      throw error;
    }
  }
};

// Doctor Services
export const doctorService = {
  login: async (credentials) => {
    const response = await axios.post('/auth/login/doctor', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await axios.get('/auth/me');
    return response.data;
  },

  getPatients: async () => {
    const response = await axios.get('/patients');
    return response.data;
  },

  createPatient: async (patientData) => {
    const response = await axios.post('/patients', patientData);
    return response.data;
  },

  getPrescriptions: async () => {
    const response = await axios.get('/prescriptions');
    return response.data;
  },

  getPatientPrescriptions: async (patientId) => {
    const response = await axios.get(`/prescriptions/patient/${patientId}`);
    return response.data;
  },

  createPrescription: async (prescriptionData) => {
    const response = await axios.post('/prescriptions', prescriptionData);
    return response.data;
  }
};

// Pharmacist Services
export const pharmacistService = {
  login: async (credentials) => {
    const response = await axios.post('/auth/login/pharmacist', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await axios.get('/auth/me');
    return response.data;
  },

  getMedicines: async () => {
    const response = await axios.get('/medicines');
    return response.data;
  },

  createMedicine: async (medicineData) => {
    const response = await axios.post('/medicines', medicineData);
    return response.data;
  },

  updateMedicine: async (id, medicineData) => {
    const response = await axios.put(`/medicines/${id}`, medicineData);
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