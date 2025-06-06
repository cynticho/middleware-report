export interface City {
  id?: number; // required for PUT, optional for POST
  label: string;
  description?: string;
}

const BASE_URL = 'http://server.dicap.lan:8084/city';

// --- GET all cities ---
export async function fetchCities(): Promise<City[]> {
  const res = await fetch(BASE_URL, { cache: 'no-store' });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to load cities');
  }

  return res.json();
}

// --- POST create a new city ---
export async function createCity(city: City): Promise<City> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(city),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create city');
  }

  return res.json();
}

// --- PUT update city ---
export async function updateCity(id: number, city: City): Promise<City> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(city),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to update city');
  }

  return res.json();
}

// --- DELETE city ---
export async function deleteCity(id: number): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to delete city');
  }

  return true;
}
