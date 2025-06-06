'use client';

import { useState } from 'react';
import { createCity } from '@/actions/cityActions';

import { PencilSquareIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";


type CityFormProps = {
  city?: { id: number; label: string; description: string };
  onSuccess?: () => void;
};


export default function CityForm({ city, onSuccess }: CityFormProps) {

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData(e.currentTarget);
    const label = formData.get('label') as string;
    const description = formData.get('description') as string;

    if (!label.trim()) {
        console.error('Label is required');
      setError('Label is required');
      return;
    }

    try {
      const result = await createCity({ label, description });
      console.log('City created successfully:', result);
      setSuccess('City created successfully');
      formData.set('label','description');
    } catch (err: any) {
      console.error('Error creating city:', err);
      console.error('Failed to create city');
      setError(err.message || 'Failed to create city');
    }
  };

  return (
    <div className="col-span-12 xl:col-span-5 ">
      <ShowcaseSection title="New City" className="!p-7">
        <form onSubmit={handleSubmit}>
          <InputGroup
            className="mb-5.5"
            type="text"
            name="label"
            label="Label"
            placeholder="City name"
            defaultValue={city?.label || ''}
            icon={<PencilSquareIcon />}
            iconPosition="left"
            height="sm"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mt-2">{success}</p>}

          <InputGroup
            className="mb-5.5"
            type="text"
            name="description"
            label="Description"
            placeholder="your description here"
            defaultValue={city?.description || ''}
            icon={<PencilSquareIcon />}
            iconPosition="left"
            height="sm"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              className="rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
              type="submit"
            >
              {city ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </ShowcaseSection>
    </div>
  );
}
