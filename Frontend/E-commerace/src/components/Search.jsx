import React, { useEffect } from 'react'
import { useContext,useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/admin_assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';
const Search = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const location = useLocation(); // Get current location or path 
    const [visibale,setVisibale]=useState(false);

    useEffect(() => {
        if(location.pathname.includes('collection') ){
            setVisibale(true);
        }
        else{
            setVisibale(false);
        }
    },[location]) // This will run every time the location changes, you can add any logic here that needs to be executed on route change

  return showSearch && visibale ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='py-2 inline-flex items-center justify-center border border-gray-400 px-5  my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
        <img className='w-4 items-end' src={assets.search_icon} alt="" />
    </div>
      <img  className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" onClick={() => setShowSearch(false)} />
    </div>
  ) : null
}

export default Search
