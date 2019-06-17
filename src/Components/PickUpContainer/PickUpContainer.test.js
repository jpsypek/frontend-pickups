import React from 'react'
import { shallow, mount, render } from 'enzyme'
import PickUpContainer from './PickUpContainer'
import EventFilter from "../EventFilter/EventFilter"

describe('PickUpContainer', () => {
  const wrapper = mount(<PickUpContainer />)
  wrapper.setState({loggedIn: true})
  it('Container renders nested components', () =>
    const filter = wrapper.find(EventFilter).first()
    expect(filter.exists())toBe(true)
  })
})
