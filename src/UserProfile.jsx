import { useState, useEffect } from "react";

function UserProfile({userId}) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const controller = new AbortController();

        async function loadUser() {
            try {
              const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
                signal: controller.signal
               });
               if(!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`);
               }
               const data = await res.json();
               setUser(data)
            } catch (err) {
                if(err.name !== "AbortError") console.error(err)
             
            }
        }
        loadUser();
        return() => controller.abort();
    }, [userId])

    return <div>{user ? <h3>Name: {user.name}</h3> : <p>Loading profile...</p>}</div>
}
export default UserProfile