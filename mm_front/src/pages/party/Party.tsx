import React,{useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Party = () => {
  const [link, setLink] = useState<String>("");
  const navigate = useNavigate();

  const toCreate = () => {
    setLink("create");
    navigate('./create');
  }

  const toFind = () => {
    setLink("find");
    navigate('./find');
  }
  // 파티 만들기, 파티 찾기 버튼 만들어야함.
  return (
    <>
      <div className='h-screen pt-10'>
        <div className='flex justify-center content-center mt-20 '>
          <button onClick={toFind} className={`text-pink-500 border border-pink-500 hover:bg-pink-500 ${link === 'find' ? 'bg-pink-500 text-white' : ''} hover:text-white active:bg-pink-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`} type="button"
          >
            파티 찾기
          </button>
          <button onClick={toCreate} className={`text-pink-500 border border-pink-500 hover:bg-pink-500 ${link === 'create' ? 'bg-pink-500 text-white' : ''} hover:text-white active:bg-pink-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`} type="button"
          >
            파티 만들기
          </button>
        </div>
        
          <div className='flex justify-center '>
          <div className='w-fit'>
           
           <Outlet/>
          
         </div>
          </div>
      </div>
      
    </>
  )
}

export default Party