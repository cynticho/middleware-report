

"use client";

import Swal from 'sweetalert2';
import { fetchCities, deleteCity } from '@/actions/cityActions';
import { cn } from "@/lib/utils";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_ActionMenuItem,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
} from 'material-react-table';
import { Box, Button, IconButton } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

import { Edit, Delete } from '@mui/icons-material';

//example data type
type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

type City = {
  id?: number;
  label: string;
  description?: string;
};

// columns définis **en dehors** du composant pour éviter `useMemo`
const columns: MRT_ColumnDef<City>[] = [
  {
    accessorKey: 'id', //access nested data with dot notation
    header: 'Id',
    size: 150,
  },
  {
    accessorKey: 'label',
    header: 'label',
    size: 150,
  },
  {
    accessorKey: 'description',
    header: 'description',
    size: 200,
  },
];

// data également défini hors composant

const data: Promise<City[]> = fetchCities();
const datap: Person[] = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Omaha',
    state: 'Nebraska',
  },
];

const Example = ({ className }: { className?: string;}) => {
  const table = useMaterialReactTable({
    columns,
    data,
    
  });

  return (
    <div
          className={cn(
            "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card", className,
          )}
        >
          <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
            Cities
          </h2>
    <MaterialReactTable
      columns={columns}
      data={data}
      
      enableRowActions
      // enableRowSelection
      renderRowActionMenuItems={({ row, table }) => [
        
        <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
          icon={<Edit />}
          key="edit"
          label="Edit"
          onClick={() => console.info('Edit')}
          table={table}
        />,
        <MRT_ActionMenuItem
          icon={<Delete />}
          key="delete"
          label="Delete"
          // onClick={() => console.info('Delete')}
          onClick={() => {
        Swal.fire({
          title: 'Confirm ?',
          text: `Do you really want to delete the city ${row.getValue('label')} ?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'yes, Delete',
          cancelButtonText: 'No, Deny',
        }).then((result) => {
          if (result.isConfirmed) {
            // deleteCity({row.getValue('id')});
            console.info('Deleted', row.original);
            Swal.fire('Deleted !', 'successfully deleted ...', 'success');
          }else
          Swal.fire('aborted !', 'deleting aborded ...', 'error');
        });
      }}
          table={table}
        />,
      ]}
    />
    </div>
  );

};

export default Example;
