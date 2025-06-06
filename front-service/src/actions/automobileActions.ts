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

export interface Automobile {
  id?: number;
  immatriculation: string;
  code: string;
  type: 'SIMPLE' | 'VIP';
  capacity: number;
  agency: Agency;
}


const BASE_URL = 'http://server.dicap.lan:8085/automobile';

// --- GET all automobiles ---
export async function fetchAll(): Promise<Automobile[]> {
  const res = await fetch(BASE_URL, { cache: 'no-store' });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to load automobiles');
  }

  return res.json();
}

// --- POST create a new automobile ---
export async function create(automobile: Automobile): Promise<Automobile> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(automobile),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create automobile');
  }

  return res.json();
}

// --- PUT update automobile ---
export async function update(id: number, automobile: Automobile): Promise<Automobile> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(automobile),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to update automobile');
  }

  return res.json();
}

// --- DELETE  ---
export async function remove(id: number): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to delete automobile');
  }

  return true;
}
