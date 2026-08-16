import { useState } from "react";

const Profile = () => {
    const [user, setUser] = useState({name: "John", age: 25});

    const updateAge = () => {
        setUser(prevUser => ({...prevUser, age: prevUser.age + 5}))
    }
  return (
    <div>
      <h2>Name: {name}</h2>
      {/* <input type="text" value={name} onChange={(e) => setName(e.target.value)}/> */}
      <p>Age: {user.age}</p>
      <button onClick={updateAge}>Update Age</button>
    </div>
  )
}

export default Profile;
