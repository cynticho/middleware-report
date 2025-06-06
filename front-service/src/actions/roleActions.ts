export interface Role {
  id?: number;
  label: string;
  description?: string;
}

const BASE_URL = 'http://server.dicap.lan:8087/role';

// --- GET all roles ---
export async function fetchAll(): Promise<Role[]> {
  const res = await fetch(BASE_URL, { cache: 'no-store' });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to load roles');
  }

  return res.json();
}

// --- POST create a new Role ---
export async function create(role: Role): Promise<Role> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(role),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create Role');
  }

  return res.json();
}

// --- PUT update Role ---
export async function update(id: number, role: Role): Promise<Role> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(role),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to update Role');
  }

  return res.json();
}

// --- DELETE Role ---
export async function remove(id: number): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to delete Role');
  }

  return true;
}
