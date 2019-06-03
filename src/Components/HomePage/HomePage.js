import React from 'react'

const HomePage = (props) => {

  const {loggedIn} = props
  
  return(
    <div>
      {loggedIn ? <p>logged in</p> : <p>not logged in</p>}
    </div>
  )
}

export default HomePage
