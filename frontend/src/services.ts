import axios from 'axios';

const API = '/api/companies/';   // use relative path so Vite proxy handles requests

export async function apiList() {
  const r = await axios.get(API);
  return Array.isArray(r.data) ? r.data : (r.data.results ?? []);
}
export async function apiCreate(d:any) { return (await axios.post(API, d)).data; }
export async function apiUpdate(id:number, d:any) { return (await axios.put(`${API}${id}/`, d)).data; }
export async function apiDelete(id:number) { return axios.delete(`${API}${id}/`); }
