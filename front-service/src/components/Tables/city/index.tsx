
"use client";

import Swal from 'sweetalert2';
import { fetchCities, deleteCity, updateCity } from '@/actions/cityActions';
import { cn } from "@/lib/utils";

import ModalWrapper from "@/components/modals/ModalWrapper";
import CityForm from '@/components/forms/cityForm';

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

const columns: MRT_ColumnDef<City>[] = [
  { accessorKey: 'id', header: 'Id', size: 150 },
  { accessorKey: 'label', header: 'label', size: 150 },
  { accessorKey: 'description', header: 'description', size: 200 },
];

const City = ({ className }: { className?: string }) => {
  // const [cities, setCities] = useState<City[]>([]);
  const [cities, setCities] = useState<City[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [user, setUser] = useState({
    nom: 'Jean Dupont',
    email: 'jean.dupont@email.com'
  });


  // useEffect(() => {
  //   const loadCities = async () => {
  //     const data = await fetchCities();
  //     setCities(data);
  //   };
  //   loadCities();
  // }, []);

  useEffect(() => {
    fetchCities()
      .then(setCities)
      .catch((err) => setError(err.message));
  }, []);

  const handleDelete = async (id: number) => {
        await deleteCity(id);
        setCities((prev) => prev.filter((c) => c.id !== id));
  }



  const handleUpdate = async (city: City) => {
  const { value: formValues } = await Swal.fire({
    title: 'Update city',
    html: `
      <div style="text-align: right">
        <label for="swal-label">Label</label>
        <input id="swal-label" class="swal2-input" placeholder="Nom" value="${city.label}" />
        
        <label for="swal-description">Description</label>
        <input id="swal-description" class="swal2-input" placeholder="Description" value="${city.description || ''}" />
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Update',
    focusConfirm: false,

    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    // cancelButtonText: 'No, Deny',

    preConfirm: () => {
      const label = (document.getElementById('swal-label') as HTMLInputElement).value;
      const description = (document.getElementById('swal-description') as HTMLInputElement).value;

      if (!label) {
        Swal.showValidationMessage('City label is required');
      }

      return { label, description };
    }
  });

  if (formValues) {
    try {
      const updatedCity = await updateCity(city.id, formValues);
      setCities(prev =>
        prev.map(c => (c.id === city.id ? updatedCity : c))
      );
      Swal.fire('Success', 'Update done successfully', 'success');
    } catch (err: any) {
      Swal.fire('Error', err.message || 'Error while updating', 'error');
    }
  }
};

  

  const table = useMaterialReactTable({
    columns,
    // data: cities,
     data: cities || [], // Evite l'erreur si `cities` est null
  });

  if (error) return <div className="text-red-500">Error : {error}</div>;
  if (!cities) return null; // <-- Suspense gère ce cas via fallback

  return (
    <>
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        {/* Cities{" "} */}
        
          <ModalWrapper
            title=""
            trigger={
              <div className="my-0">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<AddIcon />}
                  >
                  New
                </Button>
                {/* <Button label="New" variant="green" shape="rounded" onClick={() => {}} /> */}
              </div>
            }
          >
            <CityForm/>
          </ModalWrapper>
        
      </h2>
    
    <div

      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      
      <MaterialReactTable
        columns={columns}
        data={cities}
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
                text: `Do you really want to delete the city ${row.getValue('label')} ?`,
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

export default City;
