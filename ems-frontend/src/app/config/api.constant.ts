export const BASE_URL = '/api'

export const API = {
    SIGNUP: BASE_URL+'/auth/signup',
    LOGIN:BASE_URL+'/auth/login',
    GET_EMPLOYEES: BASE_URL+'/employees',
    GET_EMPLOYEE: (empId: number) => `${BASE_URL}/employees/${empId}`,
    DELETE_EMPLOYEE: (empId: number) => `${BASE_URL}/employees/${empId}`,
    CREATE_EMPLOYEE: BASE_URL+'/employees',
    UPDATE_EMPLOYEE: (empId: number) => `${BASE_URL}/employees/${empId}`,
} 