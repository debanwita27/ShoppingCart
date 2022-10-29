import React, { useEffect } from 'react';
import Axios from 'axios';

export const ItemsContext = React.createContext()

export async function addItemToDB(item) {
  const resp = await Axios.post('http://localhost:4000/admin/items', item, {
    headers: {
      'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkZmNiNjE3YjI4NjQwMDNmYjNkODcwIn0sImlhdCI6MTY1ODgzMzgxNCwiZXhwIjoxNjU4ODM3NDE0fQ.ITL0nsMlMuu1amBNa4oHEFYxCbBBgxx1YW3x3aLK8tc'
    }
  })

  if (resp.status !== 200) {
    console.log("couldn't add item :(")
    return false
  }

  return true
}

export async function updateItemInDB(item) {
  const resp = await Axios.put(`http://localhost:4000/admin/items/${item._id}`, item)
  if (resp.status !== 200) return null
  return resp.data
}

export async function deleteItemInDB(id) {
  const resp = await Axios.delete(`http://localhost:4000/admin/items/${id}`)
  if (resp.status !== 200) return null
  return resp.data
}

export function ItemsProvider({ children }) {
  const [items, setItems] = React.useState([])

  useEffect(() => {
    const fetchItemsFromServer = async () => {
      const resp = await Axios.get('http://localhost:4000/admin/items')
      if (resp.status !== 200) {
        console.log(":(")
        return []
      }

      return resp.data.items
    }

    fetchItemsFromServer().then(items => setItems(items))
  }, [])


  return <ItemsContext.Provider value={{ items, setItems }}>
    {children}
  </ItemsContext.Provider>
}
