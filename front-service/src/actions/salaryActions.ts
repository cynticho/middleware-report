export interface Salary {
  index: number;  // ← utilisé comme id
  base: number;
  total: number;
};


const BASE_URL = 'http://server.dicap.lan:8086/salary';

export async function fetchAll(): Promise<Salary[]> {
  const res = await fetch(BASE_URL, { cache: 'no-store' });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to load salaries');
  }

  return res.json();
}

// --- POST create a new salary ---
export async function create(salary: Salary): Promise<Salary> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(salary),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create salary');
  }

  return res.json();
}

// --- PUT update salary ---
export async function update(id: number, salary: Salary): Promise<Salary> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(salary),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to update salary');
  }

  return res.json();
}

// --- DELETE salary ---
export async function remove(id: number): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to delete salary');
  }

  return true;
}
