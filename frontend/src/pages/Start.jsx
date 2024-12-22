import React from 'react';
import logo from '../assets/20241220_120512.png'
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div>
      <div className='bg-cover  bg-right bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1721797027/assets/a8/5e653a-7f01-4e73-a555-7e13ef45347b/original/Airports--Reserve-35.png)] h-screen    flex justify-between flex-col bg-black '>

        <img src={logo} alt="" className='w-20 ml-2 h-25' />

        <div className='bg-transparent p-6'>

          <h2 className='text-[#1E2029] text-3xl font-semibold px-2 py-3'>Get started with Caber</h2>

          <Link to='/login' className='flex items-center justify-center w-full bg-[#9A6AFF] text-[#1E2029] py-3 rounded-xl text-xl font-semibold'>Continue</Link>

        </div>
      </div>
    </div>
  )
}



export default Start

