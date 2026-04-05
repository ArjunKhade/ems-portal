

export const BASE_URL = 'http://localhost:8081'

export const API = {
    SIGNUP: BASE_URL+'/auth/signup',
    LOGIN:BASE_URL+'/auth/login',
    GET_EMPLOYEES: BASE_URL+'/api/employees',
    GET_EMPLOYEE_BY_ID : (empId: number) => `${BASE_URL}/api/employees/${empId}`,
    DELETE_EMPLOYEE_BY_ID: (empId: number) => `${BASE_URL}/api/employees/${empId}`,
    CREATE_EMPLOYEE: BASE_URL+'/api/employees',
    UPDATE_EMPLOYEE: BASE_URL+'/api/employees',
} 