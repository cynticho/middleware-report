export interface City {
  id?: number;
  label: string;
  description?: string;
}

export interface Agency {
  id?: number;
  label: string;
  description?: string;
  city: City;
}

export interface Salary {
  index: number;  // ← utilisé comme id
  base?: number;
  total?: number;
};

export interface Role {
  id?: number;
  label: string;
  description?: string;
}

export interface Person {
  id?: number;
  name: string;
  email: string;
  phone: string;
  nic: string;
  sex: 'M' | 'F';
}

export interface Employee {
  id?: number;
  matricule: string;
  salary: Salary;
  role: Role;
  person: Person;
  agency: Agency;
}

const BASE_URL = 'http://server.dicap.lan:8081/employee';

// --- GET all employees ---
export async function fetchAll(): Promise<Employee[]> {
  const res = await fetch(BASE_URL, { cache: 'no-store' });

  if (!res.ok) {
    let errorMessage = 'Failed to load employees';
    try {
      const text = await res.text();
      errorMessage = text;
    } catch (e) {}
    throw new Error(errorMessage);
  }

  return res.json();
}

// --- POST create a new employee ---
export async function create(employee: Employee): Promise<Employee> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });

  if (!res.ok) {
    let errorMessage = 'An error occurred while creating employee';
    try {
      const text = await res.text();
      errorMessage = text;
    } catch (e) {}
    throw new Error(errorMessage);
  }

  return res.json();
}

// --- PUT update employee ---
export async function update(id: number, employee: Employee): Promise<Employee> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });

  if (!res.ok) {
    let errorMessage = 'An error occurred while updating employee';
    try {
      const text = await res.text();
      errorMessage = text;
    } catch (e) {}
    throw new Error(errorMessage);
  }

  return res.json();
}

// --- DELETE ---
export async function remove(id: number): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    let errorMessage = 'An error occurred while deleting employee';
    try {
      const text = await res.text();
      errorMessage = text;
    } catch (e) {}
    throw new Error(errorMessage);
  }

  return true;
}
