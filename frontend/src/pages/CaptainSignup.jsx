import React, { useEffect, useState } from 'react';
import logo from '../assets/20241220_120541.png'
import { Link } from 'react-router-dom';


const captainSignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [captainData, setCaptainDate] = useState({})

  const [vehicalColor, setVehicalColor] = useState('')
  const [vehicalPlate, setVehicalPlate] = useState('')
  const [vehicalCapacity, setVehicalCapacity] = useState('')
  const [vehicalType, setVehicalType] = useState('')


  const submitHandller = (e) => {
    e.preventDefault()
    setCaptainDate({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    })
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }

  // useEffect(()=>{
  //   console.log(captainData)
  // },[captainData])

  return (
    <div className='bg-[#1E2029] h-screen w-full flex flex-col justify-between'>
      <div>
        <img src={logo} alt="" className='w-20 ml-3' />


        <form className='ml-5 mr-5 mb-3 mt-1'
          onSubmit={(e) => {
            submitHandller(e)
          }}>

          <h3 className='text-base mb-2 text-[#ffffff] font-medium'>What's your name</h3>

          <div className='flex gap-3 mb-3'>

            <input required type="text"
              placeholder='First name'
              className='bg-[#ffffff] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />

            <input required type="text"
              placeholder='Last name'
              className='bg-[#ffffff]  rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            />

          </div>


          <h3 className='text-base mb-2 text-[#ffffff] font-medium'>Captain's email</h3>

          <input required type="email"
            placeholder='yourid@xyz.com'
            className='bg-[#ffffff] mb-3 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />

          <h3 className='text-base font-medium mb-2 text-[#ffffff]'>Enter Password</h3>

          <input required type="password"
            placeholder='password'
            className='bg-[#ffffff] mb-3 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />

          <h3 className='text-base font-medium mb-2 text-[#ffffff]'>Vehical information</h3>

          <div className='flex gap-3 mb-3'>
            <input required type="text"
              placeholder='Vehical color'
              className='bg-[#ffffff] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
              value={vehicalColor}
              onChange={(e) => {
                setVehicalColor(e.target.value)
              }}
            />

            <input required type="text"
              placeholder='Vehical Plate'
              className='bg-[#ffffff] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
              value={vehicalPlate}
              onChange={(e) => {
                setVehicalPlate(e.target.value)
              }}
            />
          </div>

          <div className='flex gap-3 mb-3'>

            <input required type="number"
              placeholder='Vehical Capacity'
              className='bg-[#ffffff] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
              value={vehicalCapacity}
              onChange={(e) => {
                setVehicalCapacity(e.target.value)
              }}
            />

            <select required
              className='bg-[#ffffff] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
              name="" id=""
              value={vehicalType}
              onChange={(e) => {
                setVehicalType(e.target.value)
              }}
              >
                <option value="" disabled className='text-gray-600'>Vehical Type</option>
                <option value="car" >Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>

          </div>

          <button className='mt-1 mb-1 flex items-center justify-center w-full bg-[#9A6AFF] text-[#ffffff] py-3 rounded-xl text-xl font-semibold'>Create Captain Account</button>

        </form>

        <p className='text-white text-center'>Already have an account ? <Link to='/captain-login' className='text-blue-500'>Login here</Link></p>

      </div>

      <div className='p-3 mb-2'>

        <div className='border border-[#232633] w-full mb-2'></div>

        <p className='text-white text-xs p-2'>This site is protected by reCAPTCHA and the <span className='underline text-blue-500'>Google Privacy Policy</span> and <span className="underline text-blue-500">Terms of Service</span> apply</p>

      </div>

    </div>
  )
}


export default captainSignup