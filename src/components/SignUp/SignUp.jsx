import React, { useMemo } from 'react'
import { Checkbox, Button } from 'antd'
import { Link } from 'react-router-dom'




  

import AppController from '../../services/AppController'

import classes from './SignUp.module.scss'

export default function SignUp() {
  const f = useMemo(() => {
    let contr = new AppController(classes)
    return contr.classesToCssModulesFormat.bind(contr)
  }, [])
  

  return (
    <div className={f('sign-up')}>
      <div className={f('sign-up-header')}>Create new account</div>
      <form className={f('sign-up__form')} onSubmit={console.log('submit')}>
        <label className={f('sign-up__label')} htmlFor="Username">
          <div>Username</div>
          <input placeholder="Username" className={f('sign-up__input')} name="Username" id="Username" type="text" />
        </label>
        <label className={f('sign-up__label')} htmlFor="Email">
          <div>Email address</div>
          <input placeholder="Email address" className={f('sign-up__input')} name="Email" id="Email" type="text" />
        </label>
        <label className={f('sign-up__label')} htmlFor="Password">
          <div>Password</div>
          <input placeholder="Password" className={f('sign-up__input')} name="Password" id="Password" type="text" />
        </label>
        <label className={f('sign-up__label')} htmlFor="Password2">
          <div>Repeat Password</div>
          <input placeholder="Password" className={f('sign-up__input')} name="Password2" id="Password2" type="text" />
        </label>
        <div className={f('hor-line')}></div>
        <Checkbox className={f('sign-up__checkbox')}>I agree to the processing of my personal 
information</Checkbox>
        <Button className={f('sign-up__btn')} type="primary" block>Create</Button>
        <div className={f('sign-up__text')}>Already have an account? <Link to='/sign-in' className={f('link')}>Sign In</Link>.</div>
      </form>
        
      
    </div>
  )
}
