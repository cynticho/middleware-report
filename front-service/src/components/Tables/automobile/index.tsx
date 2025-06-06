
"use client";

import Swal from 'sweetalert2';
import { fetchAll, remove, update, create } from '@/actions/automobileActions';
import { cn } from "@/lib/utils";

import { fetchAll as agencyFetch } from '@/actions/agencyActions';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_ActionMenuItem,
} from 'material-react-table';

import { Edit, Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';

type City = {
  id: number;
  label: string;
  description: string;
};

type Agency = {
  id: number;
  label: string;
  description: string;
  city: City;
};

type Automobile = {
  id: number;
  immatriculation: string;
  code: string;
  type: 'SIMPLE' | 'VIP';
  capacity: number;
  agency: Agency;
}


const columns: MRT_ColumnDef<Automobile>[] = [
  { accessorKey: 'id', header: 'Id', size: 150 },
  { accessorKey: 'immatriculation', header: 'immatriculation', size: 150 },
  { accessorKey: 'code', header: 'code', size: 150 },
  { accessorKey: 'type', header: 'type', size: 150 },
  { accessorKey: 'agency.label', header: 'agency', size: 150 },
  { accessorKey: 'capacity', header: 'capacity', size: 200 },
];

const Automobile = ({ className }: { className?: string }) => {
  // const [cities, setCities] = useState<Automobile[]>([]);
  const [data, setData] = useState<Automobile[] | null>(null);
  const [error, setError] = useState<string | null>(null);




  // useEffect(() => {
  //   const loadCities = async () => {
  //     const data = await fetchCities();
  //     setCities(data);
  //   };
  //   loadCities();
  // }, []);

  useEffect(() => {
    fetchAll()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  // Ajoute la fonction create (à adapter à ton backend)


async function handleAdd() {
  try {
    const agencies = await agencyFetch();

    const agencyOptions = agencies.map(
      (agency) => `<option value="${agency.id}">${agency.label}</option>`
    ).join('');

    const { value: formValues } = await Swal.fire({
      title: 'New Agency',
      html: `
        <div style="text-align: right">
          <label for="swal-immatriculation">immatriculation</label>
          <input id="swal-immatriculation" class="swal2-input" placeholder="Nom" />

          <label for="swal-code">code</label>
          <input id="swal-code" class="swal2-input" placeholder="Description" />

          <p><label for="swal-capacity">capacity</label>
          <input id="swal-capacity" type="number" class="swal2-input" placeholder="capacity" min="5" /></p>

          <p style="text-align: center"><label for="swal-type">type</label>
          <select id="swal-type" class="swal2-input">
            <option value="SIMPLE">SIMPLE</option>
            <option value="VIP">VIP</option>
          </select></p>

          <p style="text-align: center"><label for="swal-agency">agency</label>
          <select id="swal-agency" class="swal2-input" style="width: 80%; background-color: #f0f0f0; color: #333;">${agencyOptions}</select></p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Create',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      preConfirm: () => {
        const immatriculation = (document.getElementById('swal-immatriculation') as HTMLInputElement).value;
        const code = (document.getElementById('swal-code') as HTMLInputElement).value;
        const agencyId = Number((document.getElementById('swal-agency') as HTMLSelectElement).value);
        const type = (document.getElementById('swal-type') as HTMLSelectElement).value;
        const capacity = Number((document.getElementById('swal-capacity') as HTMLSelectElement).value);

        if (!immatriculation) {
          Swal.showValidationMessage('immatriculation vehicle is required');
          return;
        }
        if (!code) {
          Swal.showValidationMessage('code vehicle is required');
          return;
        }

        // const city = cities.find(c => c.id === cityId);
        if (!agencyId) {
          Swal.showValidationMessage('Agency Selection  is required');
          return;
        }

        return {
          immatriculation,
          code,
          type,
          capacity,
          agency: {
            id: agencyId
          }
        };
      }
    });

    if (formValues) {
      const newAgency = await create(formValues);
      setData(prev => prev ? [newAgency, ...prev] : [newAgency]);
      Swal.fire('Success', ' created successfully', 'success');
    }
  } catch (error: any) {
    Swal.fire('Error', error.message || 'Failed creating ...', 'error');
  }
}


  const handleDelete = async (id: number) => {
        await remove(id);
        setData((prev) => prev.filter((c) => c.id !== id));
  }


async function handleUpdate(agency: Automobile) {
  try {
    const agencies = await agencyFetch();

    const agencyOptions = agencies.map(
      (agency) => `<option value="${agency.id}">${agency.label}</option>`
    ).join('');

    const { value: formValues } = await Swal.fire({
      title: 'Update Automobile',
      html: `
        <div style="text-align: right">
          <label for="swal-immatriculation">immatriculation</label>
          <input id="swal-immatriculation" class="swal2-input" placeholder="Nom" value="${agency.immatriculation}" />

          <label for="swal-code">code</label>
          <input id="swal-code" class="swal2-input" placeholder="Description" value="${agency.code}" />

          <p><label for="swal-capacity">capacity</label>
          <input id="swal-capacity" type="number" class="swal2-input" placeholder="capacity" min="5" value="${agency.capacity}" /></p>

          <p style="text-align: center"><label for="swal-type">type</label>
          <select id="swal-type" class="swal2-input" style="width: 80%; background-color: #f0f0f0; color: #333;">
            <option value="SIMPLE">SIMPLE</option>
            <option value="VIP">VIP</option>
          </select></p>

          <p style="text-align: center"><label for="swal-agency">agency</label>
          <select id="swal-agency" class="swal2-input" style="width: 80%; background-color: #f0f0f0; color: #333;">${agencyOptions}</select></p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      preConfirm: () => {
        const immatriculation = (document.getElementById('swal-immatriculation') as HTMLInputElement).value;
        const code = (document.getElementById('swal-code') as HTMLInputElement).value;
        const agencyId = Number((document.getElementById('swal-agency') as HTMLSelectElement).value);
        const type = (document.getElementById('swal-type') as HTMLSelectElement).value;
        const capacity = Number((document.getElementById('swal-capacity') as HTMLSelectElement).value);

        if (!immatriculation) {
          Swal.showValidationMessage('immatriculation vehicle is required');
          return;
        }
        if (!code) {
          Swal.showValidationMessage('code vehicle is required');
          return;
        }

        // const city = cities.find(c => c.id === cityId);
        if (!agencyId) {
          Swal.showValidationMessage('Agency Selection  is required');
          return;
        }

        return {
          immatriculation,
          code,
          type,
          capacity,
          agency: {
            id: agencyId
          }
        };
      }
    });

    if (formValues) {
      // 4. Envoyer la mise à jour vers le backend
      const updatedAgency = await update(agency.id, formValues);
      setData(prev => prev.map(c => (c.id === agency.id ? updatedAgency : c)));
      Swal.fire('Success', 'Update done successfully', 'success');
    }
  } catch (error: any) {
    Swal.fire('Error', error.message || 'Failed to load cities or update agency', 'error');
  }
}


  

  const table = useMaterialReactTable({
    columns,
     data: data || [], // Evite l'erreur si `cities` est null
  });

  if (error) return <div className="text-red-500">Error : {error}</div>;
  if (!data) return null; // <-- Suspense gère ce cas via fallback

  return (
    <>
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        {/* Cities{" "} */}

        <Button
  variant="contained"
  color="secondary"
  startIcon={<AddIcon />}
  onClick={handleAdd}
>
  Add
</Button>

        
      </h2>
    
    <div

      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowActions
        renderRowActionMenuItems={({ row, table }) => [
          <MRT_ActionMenuItem
            icon={<Edit />}
            key="edit"
            label="Edit"
            onClick={() => handleUpdate(row.original)}
            table={table}
          />,
          <MRT_ActionMenuItem
            icon={<Delete />}
            key="delete"
            label="Delete"
            onClick={() => {
              Swal.fire({
                title: 'Confirm ?',
                text: `Do you really want to delete the automobile ${row.getValue('immatriculation')} ?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Delete',
                cancelButtonText: 'No, Deny',
                // timer: 2000,
                // timerProgressBar: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  try {
                    handleDelete(row.original.id);
                  console.info('Deleted', row.original);
                  Swal.fire('Deleted!', 'Successfully deleted ...', 'success');
                  } catch (error: any) {
        Swal.fire('Error', error.message, 'error');
      }
                } else {
                  Swal.fire('Aborted!', 'Deleting aborted ...', 'error');
                }
              });
            }}
            table={table}
          />,
        ]}
      />
    </div>
    </>
  );
};

export default Automobile;
