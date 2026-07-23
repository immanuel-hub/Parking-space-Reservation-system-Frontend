import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function SpacesPage() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    async function loadSpaces() {
      const response = await axiosClient.get('/parking-spaces/');
      setSpaces(response.data);
    }
    loadSpaces();
  }, []);

  return (
    <div>
      <h1>Parking Spaces</h1>
      <div style={{ display: 'grid', gap: '12px' }}>
        {spaces.map((space) => (
          <div key={space.id} style={{ border: '1px solid #ccc', padding: '12px' }}>
            <p>Space #{space.space_number}</p>
            <p>Status: {space.status}</p>
            <p>{space.is_taken ? 'Taken' : 'Available'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}