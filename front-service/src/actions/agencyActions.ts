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
const BASE_URL = 'http://server.dicap.lan:8083/agency';

// --- GET all agencies ---
export async function fetchAll(): Promise<Agency[]> {
  const res = await fetch(BASE_URL, { cache: 'no-store' });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to load agencies');
  }

  return res.json();
}

// --- POST create a new agency ---
export async function create(agency: Agency): Promise<Agency> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(agency),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create agency');
  }

  return res.json();
}

// --- PUT update agency ---
export async function update(id: number, agency: Agency): Promise<Agency> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(agency),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to update agency');
  }

  return res.json();
}

// --- DELETE agency ---
export async function remove(id: number): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to delete agency');
  }

  return true;
}
