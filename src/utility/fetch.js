export const patchEventFetch = (event) => {
  return fetch(`http://localhost:3000/api/v1/events/${event.id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("pickUpLogin")}`
      },
      body: JSON.stringify(event)
  })
}

export const postEventFetch = (event) => {
  return fetch(`http://localhost:3000/api/v1/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("pickUpLogin")}`
    },
    body: JSON.stringify(event)
  })
}

export const deleteEventFetch = (id) => {
  return fetch(`http://localhost:3000/api/v1/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem("pickUpLogin")}`
    },
    body: JSON.stringify({id})
  })
}

export const postUserEventFetch = (eventId) => {
  return fetch('http://localhost:3000/api/v1/user_events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      user_event: {
        user_id: localStorage.getItem("pickUpUser"),
        event_id: eventId
      }
    })
  })
}

export const deleteUserEventFetch = (id) => {
  return fetch(`http://localhost:3000/api/v1/user_events/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem("pickUpLogin")}`
    },
    body: JSON.stringify({id})
  })
}

export const postUserFetch = (email, password, first_name, last_name, bio) => {
  return fetch('http://localhost:3000/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      user: {
        email,
        password,
        first_name,
        last_name,
        bio
      }
    })
  })
}

export const getEventsFetch = () => {
  return fetch('http://localhost:3000/api/v1/events', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("pickUpLogin")}`
    }
  })
}

export const postLoginFetch = (email, password) => {
  return fetch('http://localhost:3000/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      user: {email, password}
    })
  })
}
