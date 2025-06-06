'use client';

import { useEffect, useState } from 'react';
import { create } from '@/actions/agencyActions';


import { fetchCities } from '@/actions/cityActions';
import { PencilSquareIcon, GlobeIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";

import { ShowcaseSection } from "@/components/Layouts/showcase-section";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type AgencyFormProps = {
  agency?: {
    id: number;
    label: string;
    description: string;
    city: { id: number; label: string; description: string };
  };
  onSuccess?: () => void;
};

export default function AgencyForm({ agency, onSuccess }: AgencyFormProps) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cities, setCities] = useState<{ id: number; label: string; description: string }[]>([]);


 

  useEffect(() => {
    const loadCities = async () => {
      try {
        const result = await fetchCities();
        setCities(result);
      } catch (err) {
        console.error('Failed to load cities:', err);
      }
    };

    loadCities();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const label = formData.get('label') as string;
    const description = formData.get('description') as string;
    const cityId = Number(formData.get('cityId')); 

    if (!label.trim()) {
      setError('Label is required');
      return;
    }

    if (!cityId) {
      setError('City selection is required');
      return;
    }


    try {
      const result = await create({
        label,
        description,
        city: { id: cityId, label: '', description: '' }
      });
      setSuccess('Agency created successfully');
      onSuccess?.();
    } catch (err: any) {
      console.error('Error creating agency:', err);
      setError(err.message || 'Failed to create agency');
    }
  };

  return (
    <div className="col-span-12 xl:col-span-5">
      <ShowcaseSection title="New Agency" className="!p-7">
        <form onSubmit={handleSubmit}>
          <InputGroup
            className="mb-5.5"
            type="text"
            name="label"
            label="Label"
            placeholder="Agency name"
            defaultValue={agency?.label || ''}
            icon={<PencilSquareIcon />}
            iconPosition="left"
            height="sm"
          />

          <InputGroup
            className="mb-5.5"
            type="text"
            name="description"
            label="Description"
            placeholder="Description"
            defaultValue={agency?.description || ''}
            icon={<PencilSquareIcon />}
            iconPosition="left"
            height="sm"
          />

          

          <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">city</InputLabel>
        <Select
          label="City"
          // onChange={handleChange}

          labelId="city-label"
    id="city"
    name="cityId"
    defaultValue={agency?.city?.id || ''}
        >
          {cities.map((city) => (
      <MenuItem key={city.id} value={city.id}>
        {city.label}
      </MenuItem>
    ))}
        </Select>
      </FormControl>
    </Box>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mt-2">{success}</p>}

          <div className="flex justify-end gap-3 mt-4">
            <button
              className="rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
              type="submit"
            >
              {agency ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </ShowcaseSection>
    </div>
  );
}
