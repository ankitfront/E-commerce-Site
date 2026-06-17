import React from 'react'
import { assets } from '../assets/admin_assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="md-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            E-commerce website built with React and Node.js
          </p>
        </div>
        <div>
          <p className="text-xl font-medium md-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600 mt-4">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy and Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium md-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600 mt-4">
            <li>+1 234 567 890</li>
            <li>contact@example.com</li>
            <li>123 Main Street, City, Country</li>
          </ul>
        </div>
        <div className="col-span-3 text-center">
            <hr />
            <p className="py-5 text-sm text-center">Copyright 2024@ forever.com All Right Reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer
