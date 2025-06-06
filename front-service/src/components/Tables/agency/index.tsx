
"use client";

import Swal from 'sweetalert2';
import { fetchAll, remove, update, create } from '@/actions/agencyActions';
import { cn } from "@/lib/utils";

import ModalWrapper from "@/components/modals/ModalWrapper";
import AgencyForm from '@/components/forms/agencyForm';
import { fetchCities } from '@/actions/cityActions';

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

const columns: MRT_ColumnDef<Agency>[] = [
  { accessorKey: 'id', header: 'Id', size: 150 },
  { accessorKey: 'label', header: 'label', size: 150 },
   { accessorKey: 'city.label', header: 'city', size: 150 },
  { accessorKey: 'description', header: 'description', size: 200 },
];

const Agency = ({ className }: { className?: string }) => {
  // const [cities, setCities] = useState<Agency[]>([]);
  const [data, setData] = useState<Agency[] | null>(null);
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
    const cities = await fetchCities();

    const cityOptions = cities.map(
      (city) => `<option value="${city.id}">${city.label}</option>`
    ).join('');

    const { value: formValues } = await Swal.fire({
      title: 'New Agency',
      html: `
        <div style="text-align: right">
          <label for="swal-label">Label</label>
          <input id="swal-label" class="swal2-input" placeholder="Nom" />

          <label for="swal-description">Description</label>
          <input id="swal-description" class="swal2-input" placeholder="Description" />

          <label for="swal-city">City</label>
          <select id="swal-city" class="swal2-input" style="width: 80%; background-color: #f0f0f0; color: #333;">${cityOptions}</select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Create',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      preConfirm: () => {
        const label = (document.getElementById('swal-label') as HTMLInputElement).value;
        const description = (document.getElementById('swal-description') as HTMLInputElement).value;
        const cityId = Number((document.getElementById('swal-city') as HTMLSelectElement).value);

        if (!label) {
          Swal.showValidationMessage('Agency label is required');
          return;
        }
        if (!cityId) {
          Swal.showValidationMessage('City selection is required');
          return;
        }

        const city = cities.find(c => c.id === cityId);
        if (!city) {
          Swal.showValidationMessage('Selected city is invalid');
          return;
        }

        return {
          label,
          description,
          city: {
            id: city.id,
            label: city.label,
            description: city.description || '',
          }
        };
      }
    });

    if (formValues) {
      const newAgency = await create(formValues);
      setData(prev => prev ? [newAgency, ...prev] : [newAgency]);
      Swal.fire('Success', 'Agency created successfully', 'success');
    }
  } catch (error) {
    Swal.fire('Error', error.message || 'Failed to load cities or create agency', 'error');
  }
}


  const handleDelete = async (id: number) => {
        await remove(id);
        setData((prev) => prev.filter((c) => c.id !== id));
  }


async function handleUpdate(agency: Agency) {
  try {
    // 1. Récupération asynchrone des villes
    const cities = await fetchCities();

    // 2. Préparer les options du select avec la ville sélectionnée par défaut
    const cityOptions = cities.map(
      (city) => `<option value="${city.id}" ${city.id === agency.city?.id ? 'selected' : ''}>${city.label}</option>`
    ).join('');

    // 3. Afficher la modale avec SweetAlert2
    const { value: formValues } = await Swal.fire({
      title: 'Update Agency',
      html: `
        <div style="text-align: right">
          <label for="swal-label">Label</label>
          <input id="swal-label" class="swal2-input" placeholder="Nom" value="${agency.label}" />

          <label for="swal-description">Description</label>
          <input id="swal-description" class="swal2-input" placeholder="Description" value="${agency.description || ''}" />


          <div style="text-align: left">
          <label for="swal-city">City</label>
          <select id="swal-city" class="swal2-input" style="width: 80%; background-color: #f0f0f0; color: #333;">${cityOptions}</select>
          </div>
          
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      preConfirm: () => {
        const label = (document.getElementById('swal-label') as HTMLInputElement).value;
        const description = (document.getElementById('swal-description') as HTMLInputElement).value;
        const cityId = Number((document.getElementById('swal-city') as HTMLSelectElement).value);

        if (!label) {
          Swal.showValidationMessage('Agency label is required');
          return;
        }
         if (!cityId) {
          Swal.showValidationMessage('City selection is required');
          return;
        }

        // return { label, description, cityId };
        
        return {
          label,
          description,
          city: {
            id: cityId,
            label: '',
            description: '',
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
  } catch (error) {
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

        
          {/* <ModalWrapper
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
              </div>
            }
          >
            <AgencyForm/>
          </ModalWrapper> */}
        
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

export default Agency;
