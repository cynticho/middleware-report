
"use client";

import Swal from 'sweetalert2';
import { fetchAll, remove, update, create } from '@/actions/employeeActions';
import { cn } from "@/lib/utils";

import { fetchAll as agencyFetch } from '@/actions/agencyActions';
import { fetchAll as salaryFetch } from '@/actions/salaryActions';
import { fetchAll as roleFetch } from '@/actions/roleActions';
import { EmployeeSkeleton } from "@/components/Tables/employee/skeleton";

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

type Salary = {
  index: number;
  base?: number;
  total?: number;
};

type Role = {
  id?: number;
  label: string;
  description?: string;
}

type Person = {
id?: number;
name: string;
email: string;
phone: string;
nic: string;
sex: 'M' | 'F';
}

type Employee ={
id?: number;
matricule: string;
salary: Salary;
role: Role;
person: Person;
agency: Agency;
}



const columns: MRT_ColumnDef<Employee>[] = [
  { accessorKey: 'id', header: 'Id', size: 150 },
  { accessorKey: 'matricule', header: 'matricule', size: 150 },

  { accessorKey: 'person.name', header: 'name', size: 150 },
  { accessorKey: 'person.email', header: 'email', size: 150 },
  { accessorKey: 'person.phone', header: 'phone', size: 150 },
  { accessorKey: 'person.nic', header: 'nic', size: 150 },
  { accessorKey: 'person.sex', header: 'sex', size: 4 },

  { accessorKey: 'salary.index', header: 'salary index', size: 25 },
  { accessorKey: 'role.label', header: 'role', size: 150 },
  { accessorKey: 'agency.label', header: 'agency', size: 150 },
];

const Employee = ({ className }: { className?: string }) => {
  // 
  const [data, setData] = useState<Employee[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAll()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  


async function handleAdd() {
  try {
    const agencies = await agencyFetch();
    const roles = await roleFetch();
    const salaries = await salaryFetch();


    const agencyOptions = agencies.map(
      (agency) => `<option value="${agency.id}">${agency.label}</option>`
    ).join('');

    const roleOptions = roles.map(
      (role) => `<option value="${role.id}">${role.label}</option>`
    ).join('');

    const salaryOptions = salaries.map(
      (salary) => `<option value="${salary.index}">${salary.index}</option>`
    ).join('');

    const { value: formValues } = await Swal.fire({
      title: 'New Employee',
      html: `
        <div style="text-align: right">

        <p ><label for="swal-matricule">matricule</label>
          <input id="swal-matricule" class="swal2-input" placeholder="Nom" /></p>
</p>
          

          <p ><label for="swal-name">full name</label>
          <input id="swal-name" class="swal2-input" placeholder="full name" /></p>
</p>
          

          <p ><label for="swal-email">email</label>
          <input id="swal-email" type="email" class="swal2-input" placeholder="email" /></p>
</p>
          

          <p ><label for="swal-phone">phone</label>
          <input id="swal-phone" class="swal2-input" placeholder="phone number" /></p>
</p>
          

          <p ><label for="swal-nic">nic</label>
          <input id="swal-nic" class="swal2-input" placeholder="National id card" /></p>
</p>
          

          <p style="text-align: center"><label for="swal-sex">sex</label>
          <select id="swal-sex" class="swal2-input" style="width: 80%; background-color: #f0f0f0; color: #333;">
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select></p>

          <p style="text-align: center"><label for="swal-agency">agency</label>
          <select id="swal-agency" class="swal2-input" style="width: 80%; background-color: #f0f0f0; color: #333;">${agencyOptions}</select></p>

          <p style="text-align: center"><label for="swal-salary">salary</label>
          <select id="swal-salary" class="swal2-input" style="width: 80%; background-color: #f0f0f0; color: #333;">${salaryOptions}</select></p>

          <p style="text-align: center"><label for="swal-role">role</label>
          <select id="swal-role" class="swal2-input" style="width: 80%; background-color: #f0f0f0; color: #333;">${roleOptions}</select></p>

        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Create',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      preConfirm: () => {

        const matricule = (document.getElementById('swal-matricule') as HTMLInputElement).value;
        const name = (document.getElementById('swal-name') as HTMLInputElement).value;
        const email = (document.getElementById('swal-email') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-phone') as HTMLInputElement).value;
        const nic = (document.getElementById('swal-nic') as HTMLInputElement).value;
        const agencyId = Number((document.getElementById('swal-agency') as HTMLSelectElement).value);
        const sex = (document.getElementById('swal-sex') as HTMLSelectElement).value;
        const roleId = Number((document.getElementById('swal-role') as HTMLSelectElement).value);
        const salaryId = Number((document.getElementById('swal-salary') as HTMLSelectElement).value);

        if (!matricule || !name || !email || !phone || !nic || !agencyId|| !sex|| !salaryId|| !roleId) {
          Swal.showValidationMessage('All fields are required');
          return;
        }

        return {
          matricule,
          person: {
            name: name,
            email: email,
            nic: nic,
            phone: phone,
            sex: sex
          },
          agency: {
            id: agencyId
          },
          salary:{
            index: salaryId
          },
          role: {
            id: roleId
          }
        };
      }
    });

    if (formValues) {
      Swal.fire(formValues, formValues, 'success');
      console.log(formValues);
      const newItem = await create(formValues);
      setData(prev => prev ? [newItem, ...prev] : [newItem]);
      Swal.fire('Success', ' created successfully', 'success');
    }
  } catch (error: any) {
    Swal.fire('Error', error.message || 'Failed creating ...', 'error');
    console.log(error);
  }
}


  const handleDelete = async (id: number) => {
        await remove(id);
        setData((prev) => prev.filter((c) => c.id !== id));
  }


async function handleUpdate(agency: Employee) {
  try {
    const agencies = await agencyFetch();
    const roles = await roleFetch();
    const salaries = await salaryFetch();


    const agencyOptions = agencies.map(
  (a) => `<option value="${a.id}" ${a.id === agency.agency.id ? 'selected' : ''}>${a.label}</option>`
).join('');

const roleOptions = roles.map(
  (r) => `<option value="${r.id}" ${r.id === agency.role.id ? 'selected' : ''}>${r.label}</option>`
).join('');

const salaryOptions = salaries.map(
  (s) => `<option value="${s.index}" ${s.index === agency.salary.index ? 'selected' : ''}>${s.index}</option>`
).join('');


    const { value: formValues } = await Swal.fire({
      title: 'Update Employee',
      html: `
        <div style="text-align: right">

        <p ><label for="swal-matricule">matricule</label>
          <input id="swal-matricule" class="swal2-input" placeholder="matricule" value="${agency.matricule}"/></p>


          <p ><label for="swal-name">full name</label>
          <input id="swal-name" class="swal2-input" placeholder="full name" value="${agency.person.name}" /> </p>


          <p ><label for="swal-email">email</label>
          <input id="swal-email" type="email" class="swal2-input" placeholder="email" value="${agency.person.email}"/></p>

          <p ><label for="swal-phone">phone</label>
          <input id="swal-phone" class="swal2-input" placeholder="phone number" value="${agency.person.phone}"/></p>

          <p >
          <label for="swal-nic">nic</label>
          <input id="swal-nic" class="swal2-input" placeholder="National id card" value="${agency.person.nic}" />
          </p>
          

          <p style="text-align: center"><label for="swal-sex">sex</label>
          <select id="swal-sex" class="swal2-input" style="width: 80%; background-color: #f0f0f0; color: #333;">
            <option value="M" ${agency.person.sex === 'M' ? 'selected' : ''}>Male</option>
<option value="F" ${agency.person.sex === 'F' ? 'selected' : ''}>Female</option>

          </select></p>

          <p style="text-align: center"><label for="swal-agency">agency</label>
          <select id="swal-agency" class="swal2-input" style="width: 80%; background-color: #f0f0f0; color: #333;" value="${agency.agency.label}" >${agencyOptions}</select></p>

          <p style="text-align: center"><label for="swal-salary">salary</label>
          <select id="swal-salary" class="swal2-input" style="width: 80%; background-color: #f0f0f0; color: #333;" value="${agency.salary.index}" >${salaryOptions}</select></p>

          <p style="text-align: center"><label for="swal-role">role</label>
          <select id="swal-role" class="swal2-input" style="width: 80%; background-color: #f0f0f0; color: #333;" value="${agency.role.label}" >${roleOptions}</select></p>

        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      preConfirm: () => {
        const personId = agency.person.id;
        const matricule = (document.getElementById('swal-matricule') as HTMLInputElement).value;
        const name = (document.getElementById('swal-name') as HTMLInputElement).value;
        const email = (document.getElementById('swal-email') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-phone') as HTMLInputElement).value;
        const nic = (document.getElementById('swal-nic') as HTMLInputElement).value;
        const agencyId = Number((document.getElementById('swal-agency') as HTMLSelectElement).value);
        const sex = (document.getElementById('swal-sex') as HTMLSelectElement).value;
        const roleId = Number((document.getElementById('swal-role') as HTMLSelectElement).value);
        const salaryId = Number((document.getElementById('swal-salary') as HTMLSelectElement).value);

        if (!matricule || !name || !email || !phone || !nic || !agencyId|| !sex|| !salaryId|| !roleId) {
          Swal.showValidationMessage('All fields are required');
          return;
        }

        return {
          matricule,
          person: {
            id: personId,
            name: name,
            email: email,
            nic: nic,
            phone: phone,
            sex: sex
          },
          agency: {
            id: agencyId
          },
          salary:{
            index: salaryId
          },
          role: {
            id: roleId
          }
        };
      }
    });

    if (formValues) {
      // Swal.fire(formValues);
      // 4. Envoyer la mise à jour vers le backend
      const updatedAgency = await update(agency.id, formValues);
      setData(prev => prev.map(c => (c.id === agency.id ? updatedAgency : c)));
      Swal.fire(formValues);
      Swal.fire('Success', 'Update done successfully', 'success');
    }
  } catch (error: any) {
    Swal.fire('Error', error.message || 'An error occured', 'error');
  }
}


  

  const table = useMaterialReactTable({
    columns,
     data: data || [], // Evite l'erreur si `cities` est null
  });

  if (error) return <div className="text-red-500">Error : {error}</div>;
  if (!data) return null; // <-- Suspense gère ce cas via fallback

  return (!data)?(<EmployeeSkeleton />):(
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
                text: `Do you really want to delete the automobile ${row.getValue('matricule')} ?`,
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

export default Employee;
