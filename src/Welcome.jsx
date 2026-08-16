function Welcome ({user, name = "Guest"}) {
    return (
        <>
         <h2>Welcome back {name}</h2>
         <p>You are {user.age} years old.</p>
        </>
       
    )
} 
export default Welcome;