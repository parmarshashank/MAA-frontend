export const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  PHARMACIST: 'pharmacist',
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Hospital Administrator',
  [ROLES.DOCTOR]: 'Doctor',
  [ROLES.PHARMACIST]: 'Pharmacist',
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    'manage_doctors',
    'manage_pharmacists',
    'manage_hospitals',
    'view_system_data',
  ],
  [ROLES.DOCTOR]: [
    'manage_patients',
    'manage_prescriptions',
    'manage_caretakers',
    'view_medicines',
    'assign_medicines',
  ],
  [ROLES.PHARMACIST]: [
    'manage_medicines',
    'manage_inventory',
  ],
};

export const ROLE_REDIRECTS = {
  [ROLES.ADMIN]: '/admin/dashboard',
  [ROLES.DOCTOR]: '/doctor/dashboard',
  [ROLES.PHARMACIST]: '/pharmacist/dashboard',
}; 