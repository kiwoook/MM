import axios from 'axios'
import React, { useState, useEffect } from 'react'
import customAxios from '../../lib/customAxios'
import { Link, useNavigate } from 'react-router-dom';


const MyParty = () => {
  // 파티 전체 개별 조회, 파티 생성, 파티 삭제, 구간 파티 찾기

  const [myPartyList, setMyPartyList] = useState<any[]>([]);

  const getMyParty = async () => {
    try {
      const res = await customAxios.get("api/party/myparty");
      setMyPartyList(res.data);
    } catch (err) {
      console.log(err);
      setMyPartyList([]);
    }
  }

  const deleteParty = async (id: number) => {
    try {
      const res = await customAxios.delete(`api/party/${id}`);
      getMyParty();
    } catch (err) {
      console.log(err)
        ;
    }
  }

  useEffect(() => {
    getMyParty();
  }, []);

  return (
    <>

      <div className="h-screen pt-10">
        <div className='flex flex-col items-center justify-center content-center mt-20 ml-80 mr-80 gap-10 pt-20 pr-60 pl-60 sm:w-auto border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
          <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">내 파티</h5>
          {
            myPartyList.length > 0 ? (
              myPartyList
                .map((data: any) => (
                  <div key={data.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/party/${data.id}`}>
                      <img className="rounded-t-lg" src="" alt="" />
                    </Link>
                    <div className="p-5">
                      <Link to={`/party/${data.id}`}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.ottType}</h5>
                      </Link>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.startDate} - {data.endDate}</p>
                      {data.creatorUserId}
                    </div>
                    <div className='p-5'>
                      <button type="button" onClick={() => deleteParty(data.id)} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">파티 삭제</button>
                    </div>
                  </div>
                ))
            ) : (
              <div>파티가 존재하지 않습니다.</div>
            )
          }</div>
      </div>
    </>
  )
}

export default MyParty