"use client"
import { login, registerUser } from '@/actions'
import clsx from 'clsx'
import Link from 'next/link'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'



type FormInput = {
name:string;
email:string;
password:string;
}

export const RegisterForm = () => {
    const [errorMessage, seterrorMessage] = useState('')
    
    const {
    register,
    handleSubmit, formState: { errors }
    } = useForm<FormInput>()

    
    const onSubmit:SubmitHandler<FormInput> = async(data:FormInput) => {
        seterrorMessage('')
        const {name, email, password} = data
        //server action
       const resp = await registerUser(name, email, password);    
       
       if(!resp.ok){
        seterrorMessage(resp.message!)
          return
       }
       console.log({resp});

       await login(email.toLowerCase(), password);
       window.location.replace('/')
       
       
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {/* {
            errors.name?.type === 'required' && <span className="text-red-500">* El nombre es requerido</span>
        } */}

        <label htmlFor="email">Nombre Completo</label>
        <input
          className={clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
           { 'border-red-500' : errors.name?.type === 'required'}
          )}
          type="text" 
          autoFocus
          {...register('name', {required: true})}
          
          />
        <label htmlFor="email">Correo electrónico</label>
        <input
           className={clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
           { 'border-red-500' : errors.email?.type === 'required'}
          )}
          type="email" 
          {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
          />


        <label htmlFor="email">Contraseña</label>
        <input
           className={clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
           { 'border-red-500' : errors.password?.type === 'required'}
          )}
          type="password" 
        {...register('password', {required: true,minLength: 6})}
          />

       
            <span className="text-red-500 m-1 font-bold">{errorMessage}</span>
     
        <button
            type="submit"
          className="btn-primary">
          Crear Cuenta
        </button>


        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/login" 
          className="btn-secondary text-center">
      Ingresar
        </Link>

      </form>
  )
}
