import React from 'react'
import { shallow, mount, render } from 'enzyme'
import PickUpEventDetails from './PickUpEventDetails'

describe('PickUpEventDetails component', () => {
  let updateUsers = jest.fn()
  let removeUser = jest.fn()
  let removeEvent = jest.fn()
  let toggleShowEventDetails = jest.fn()
  let toggleShowEventEdit = jest.fn()
  const details = mount(<PickUpEventDetails
    time={Date.now()}
    skill_level="Beginner"
    users = {["Bill", "Jill"]}
    updateUsers={updateUsers}
    removeUser={removeUser}
    removeEvent={removeEvent}
    toggleShowEventEdit={toggleShowEventEdit}
    toggleShowEventDetails={toggleShowEventDetails}
     />)

  it('PickUpEventDetails requires correct props', () => {
    expect(details.props().updateUsers).toBeDefined()
    expect(details.props().removeUser).toBeDefined()
    expect(details.props().removeEvent).toBeDefined()
  })

})
