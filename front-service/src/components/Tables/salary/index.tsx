
"use client";

import Swal from 'sweetalert2';
import { fetchAll, remove, update, create } from '@/actions/salaryActions';
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


type Salary = {
  index: number;
  base: number;
  total: number;
};


const columns: MRT_ColumnDef<Salary>[] = [
  { accessorKey: 'index', header: 'Index', size: 150 },
  { accessorKey: 'base', header: 'Base', size: 150 },
  { accessorKey: 'total', header: 'Total', size: 200 },
];

const Salary = ({ className }: { className?: string }) => {
  const [data, setData] = useState<Salary[] | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetchAll()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);



async function handleAdd() {
  try {
    const { value: formValues } = await Swal.fire({
      title: 'New Salary',
      html: `
        <div style="text-align: right">
          <p><label for="swal-index">Index</label>
          <input id="swal-index" type="number" class="swal2-input" placeholder="Index" min="1" /></p>

          <p><label for="swal-base">Base</label>
          <input id="swal-base" type="number" class="swal2-input" placeholder="Base salary" min="1" /></p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Create',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      preConfirm: () => {
        const indexStr = (document.getElementById('swal-index') as HTMLInputElement).value;
        const baseStr = (document.getElementById('swal-base') as HTMLInputElement).value;

        const index = parseFloat(indexStr);
        const base = parseFloat(baseStr);

        if (isNaN(index) || index <= 0) {
          Swal.showValidationMessage('Index must be a number greater than 0');
          return;
        }

        if (isNaN(base) || base <= 0) {
          Swal.showValidationMessage('Base must be a number greater than 0');
          return;
        }

        const total = index * base;

        return { index, base, total };
      }
    });

    if (formValues) {
      const newSalary = await create(formValues);
      setData(prev => prev ? [newSalary, ...prev] : [newSalary]);
      Swal.fire('Success', 'Salary created successfully', 'success');
    }
  } catch (error: any) {
    Swal.fire('Error', error.message || 'Failed while creating Salary', 'error');
  }
}




  const handleDelete = async (id: number) => {
        await remove(id);
setData(prev => prev.filter((s) => s.index !== id));

  }


async function handleUpdate(salary: Salary) {
  try {
    const { value: formValues } = await Swal.fire({
      title: 'Update Salary',
      html: `
        <div style="text-align: right">
          <p><label for="swal-index">Index</label>
          <input id="swal-index" type="number" class="swal2-input" placeholder="Index" min="1" value="${salary.index}" />
          </p>

          <p><label for="swal-base">Base</label>
          <input id="swal-base" type="number" class="swal2-input" placeholder="Base salary" min="1" value="${salary.base}" /></p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      preConfirm: () => {
        const index = parseFloat((document.getElementById('swal-index') as HTMLInputElement).value);
        const base = parseFloat((document.getElementById('swal-base') as HTMLInputElement).value);

        if (isNaN(index) || isNaN(base) || index <= 0 || base <= 0) {
          Swal.showValidationMessage('Index and Base must be numbers greater than 0');
          return;
        }

        // return { label, description, cityId };

        const total = index * base;

        return { index, base, total };

      }
    });

    if (formValues) {
      const updatedSalary = await update(salary.index, formValues);
setData(prev => prev.map(s => (s.index === salary.index ? updatedSalary : s)));

      Swal.fire('Success', 'Salary updated successfully', 'success');
    }
  } catch (error: any) {
    Swal.fire('Error', error.message || 'Failed while updating Salary', 'error');
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
                text: `Do you really want to delete the Agency ${row.getValue('base')} ?`,
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
                    handleDelete(row.original.index);
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

export default Salary;
