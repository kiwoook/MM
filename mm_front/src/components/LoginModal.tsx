import React from 'react'
import KakaoLoginImg from '../assets/kakao_login.png'
import NaverLoginImg from '../assets/naver_login.png'
import GoogleLoginImg from '../assets/google_login.png'

interface Props {
    open: Boolean,
    onClose: () => void
}

const LoginModal = ({open, onClose}:Props) => {

    return (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-1/3 my-6 mx-auto max-w-2xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t text-center">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-1 text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    로그인
                  </button>
                </div>
                {/*body*/}
                <div className="flex justify-center flex-col gap-4 justify-items-center items-center p-5">
                 
                    <a href='http://localhost:8000/oauth2/authorization/naver?redirect_uri=http://localhost:3000/oauth/redirect'>
                      <img src={NaverLoginImg} width={200}/>
                    </a>
                    <a href='http://localhost:8000/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth/redirect'>
                      <img src={KakaoLoginImg} width={200}/>
                    </a>
                    <a href='http://localhost:8000/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth/redirect'>
                      <img src={GoogleLoginImg} width={200}/>
                    </a>
                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default LoginModal