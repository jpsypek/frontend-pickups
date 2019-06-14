import React from 'react'
import { shallow, mount, render } from 'enzyme'
import UserLogin from './UserLogin'

describe("UserLogin Component", () => {
 it('renders an email input', () => {
   expect(shallow(<UserLogin />).find('#email-login').exists()).toBe(true)
 })
})

describe('Email input', () => {
  it('should respond to change event and change the email state of the UserLogin Component', () => {
   const wrapper = shallow(<UserLogin />);
   wrapper.find('#email-login').simulate('change', {target: {name: 'email', value: 'testing@gmail.com'}});

  expect(wrapper.state('email')).toEqual('testing@gmail.com');
  })
 })

describe('Password input', () => {
  it('should respond to change event and change the password state of the UserLogin Component', () => {
   const wrapper = shallow(<UserLogin />);
   wrapper.find('#password-login').simulate('change', {target: {name: 'password', value: 'password'}});

  expect(wrapper.state('password')).toEqual('password');
  })
 })
