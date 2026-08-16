import { useState, useEffect } from 'react'

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const FetchUsers = async () => {
            try {
               setLoading(true);
               setError(null);
               const res = await fetch('https://jsonplaceholder.typicode.com/users', {
                signal: controller.signal
               });
               if(!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`);
               }
               const data = await res.json();
               setUsers(data)
            } catch (err) {
                if(err.name !== "AbortError") (
                    setError(err.message)
                )
            } finally {
                setLoading(false)
            }
        } 
        FetchUsers();
        return() => controller.abort();
    },[]);
    if(loading) return <p>Loading users...</p>
    if(error) return <p>Error: {error}</p>
  return (
    <div>
        <h2>UserList</h2>
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name} ({user.email})</li>
            ))}
        </ul>
    </div>
  )
}
