import React from 'react'
import { shallow, mount, render } from 'enzyme'
import HomePage from './HomePage'

describe("HomePage Component", () => {
 it('should render without throwing an error', () => {
   expect(shallow(<HomePage />).find('h2').exists()).toBe(true)
 })
})
