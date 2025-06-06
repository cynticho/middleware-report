
"use client";

import Swal from 'sweetalert2';
import { fetchAll, remove, update, create } from '@/actions/roleActions';
import { cn } from "@/lib/utils";



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

type Role = {
  id: number;
  label: string;
  description: string;
};


const columns: MRT_ColumnDef<Role>[] = [
  { accessorKey: 'id', header: 'Id', size: 150 },
  { accessorKey: 'label', header: 'label', size: 150 },
  { accessorKey: 'description', header: 'description', size: 200 },
];

const Role = ({ className }: { className?: string }) => {
  const [data, setData] = useState<Role[] | null>(null);
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
    
    const { value: formValues } = await Swal.fire({
      title: 'New Role',
      html: `
        <div style="text-align: right">
          <label for="swal-label">Label</label>
          <input id="swal-label" class="swal2-input" placeholder="Role label" />

          <label for="swal-description">Description</label>
          <input id="swal-description" class="swal2-input" placeholder="Description" />
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Create',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      preConfirm: () => {
        const label = (document.getElementById('swal-label') as HTMLInputElement).value;
        const description = (document.getElementById('swal-description') as HTMLInputElement).value;


        if (!label) {
                Swal.showValidationMessage('Role label is required');
              }
        
              return { label, description };
      }
    });

    if (formValues) {
      const newRole = await create(formValues);
      setData(prev => prev ? [newRole, ...prev] : [newRole]);
      Swal.fire('Success', 'Role created successfully', 'success');
    }
  } catch (error: any) {
    Swal.fire('Error', error.message || 'Failed while creating Role', 'error');
  }
}


  const handleDelete = async (id: number) => {
        await remove(id);
        setData((prev) => prev.filter((c) => c.id !== id));
  }


async function handleUpdate(agency: Role) {
  try {
    const { value: formValues } = await Swal.fire({
      title: 'Update Role',
      html: `
        <div style="text-align: right">
          <label for="swal-label">Label</label>
          <input id="swal-label" class="swal2-input" placeholder="Nom" value="${agency.label}" />

          <label for="swal-description">Description</label>
          <input id="swal-description" class="swal2-input" placeholder="Description" value="${agency.description || ''}" />


        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      preConfirm: () => {
        const label = (document.getElementById('swal-label') as HTMLInputElement).value;
        const description = (document.getElementById('swal-description') as HTMLInputElement).value;


        if (!label) {
          Swal.showValidationMessage('Role label is required');
          return;
        }
         

        // return { label, description, cityId };
        
        return {
          label,
          description
        };

      }
    });

    if (formValues) {
      const updatedAgency = await update(agency.id, formValues);
      setData(prev => prev.map(c => (c.id === agency.id ? updatedAgency : c)));
      Swal.fire('Success', 'Update done successfully', 'success');
    }
  } catch (error) {
    Swal.fire('Error', error.message || 'Failed while updating Role', 'error');
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
                text: `Do you really want to delete the Agency ${row.getValue('label')} ?`,
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

export default Role;
