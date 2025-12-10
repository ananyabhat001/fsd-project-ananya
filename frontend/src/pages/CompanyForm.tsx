import React, { useState, useEffect } from 'react';
import { apiCreate, apiUpdate } from '../services';

export default function CompanyForm({ editing, onClose, onSuccess }: any) {
  const [form, setForm] = useState({
    company_name:'',
    email_id:'',
    company_code:'',
    website:''
  });
  const [err,setErr] = useState('');

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  async function submit(e:any) {
    e.preventDefault();
    setErr('');

    if (form.company_name.trim().length < 5)
      return setErr('Company name must be >= 5 characters.');

    if (!form.email_id.includes('@'))
      return setErr('Invalid email.');

    try {
      if (editing) await apiUpdate(editing.id, form);
      else await apiCreate(form);
      onSuccess();
    } catch (e:any) {
      setErr(JSON.stringify(e.response?.data || e));
    }
  }

  return (
    <form onSubmit={submit}>
      <h3>{editing ? 'Edit Company' : 'Add Company'}</h3>

      {err && <div style={{color:'red',marginBottom:10}}>{err}</div>}

      <input className='input' placeholder='Company Name'
        value={form.company_name} onChange={e=>setForm({...form,company_name:e.target.value})} />

      <input className='input' placeholder='Email'
        value={form.email_id} onChange={e=>setForm({...form,email_id:e.target.value})} />

      <input className='input' placeholder='Company Code'
        value={form.company_code} onChange={e=>setForm({...form,company_code:e.target.value})} />

      <input className='input' placeholder='Website'
        value={form.website} onChange={e=>setForm({...form,website:e.target.value})} />

      <div style={{marginTop:10,textAlign:'right'}}>
        <button type='button' className='button' onClick={onClose}>Cancel</button>
        <button type='submit' className='btn-primary button' style={{marginLeft:8}}>Save</button>
      </div>
    </form>
  );
}
