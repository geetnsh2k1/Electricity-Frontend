import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'current', headerName: 'current', width: 200 },
  { field: 'power', headerName: 'power', width: 200 },
  { field: 'turned_on', headerName: 'turned_on', width: 200 },
  { field: 'voltage', headerName: 'voltage', width: 200 },
  { field: 'span', headerName: 'span', width: 200 },
];

export default function DataTable({props}) {
  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(props)
    console.log('hola', props)
    return () => {
      
    }
  }, [])
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
