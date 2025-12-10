import React, { useEffect, useState } from 'react';
import { apiList, apiDelete } from '../services';
import CompanyForm from './CompanyForm';

export default function CompanyList() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [editing, setEditing] = useState<any|null>(null);
  const [open, setOpen] = useState(false);

  async function load() { setCompanies(await apiList()); }
  useEffect(() => { load(); }, []);

  return (
    <div>
      <button className='btn-primary button' onClick={() => {setEditing(null);setOpen(true);}}>Add Company</button>

      <table className='table'>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Code</th><th>Website</th><th>Created</th><th></th>
          </tr>
        </thead>
        <tbody>
          {companies.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.company_name}</td>
              <td>{c.email_id}</td>
              <td>{c.company_code || '-'}</td>
              <td>{c.website || '-'}</td>
              <td>{new Date(c.created_time).toLocaleString()}</td>

              <td>
                <button className='button' onClick={() => {setEditing(c);setOpen(true);}}>Edit</button>
                <button className='button' style={{marginLeft:8}}
                  onClick={async()=>{await apiDelete(c.id);load();}}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <div className='backdrop'>
          <div className='modal'>
            <CompanyForm 
              editing={editing}
              onClose={()=>setOpen(false)}
              onSuccess={()=>{setOpen(false);load();}}
            />
          </div>
        </div>
      )}
    </div>
  );
}
