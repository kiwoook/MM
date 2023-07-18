import React, { useState, useEffect } from 'react'
import customAxios from '../../lib/customAxios';
import axios from 'axios';
import { partydto } from '../../data/partyresponsedto';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../loading/loading';
import { useRecoilValue } from 'recoil';
import { ottInfomation } from '../../atoms';



const PartyFind = () => {
    const [selectedOTT, setSelectedOTT] = useState<string>("all"); // 선택된 OTT 정보를 저장하는 상태 변수
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [partyData, setPartyData] = useState<any[]>();
    const ottInfo = useRecoilValue(ottInfomation);
    const navigate = useNavigate();


    useEffect(() => {
        console.log(selectedOTT);
    }, [selectedOTT])

    const handleOTTSelection = (OTTId: string) => {
        // 선택된 OTT의 ID를 추가 또는 제거하여 상태를 업데이트합니다.
        setSelectedOTT(OTTId);
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            let res;
            if (selectedOTT === "all") {
                res = await customAxios.get(`http://localhost:8000/api/party/`)
                console.log(res);
            } else {
                // 시작날짜, 끝나는 날짜를 안받으면 예외처리해야함.
                // res = await axios.get(`http://localhost:8000/api/party/search?otttype=${selectedOTT}&startdate=${"2023-06-12"}&enddate=${"2023-07-12"}`);
                res = await customAxios.get(`http://localhost:8000/api/party/search?ottType=${selectedOTT}`);

            }
            setPartyData(res.data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setPartyData([]);
            setIsLoading(false);
        }
    }

    const toDetailParty = () => {
        navigate('')
    }

    const joinParty = async (id: number) => {
        try{
            customAxios.post(`api/party/join/${id}`)
        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <div className="flex gap-4 mt-10">
                    {/* OTT 분류 */}
                    <label
                        className={`inline-block rounded px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out ${selectedOTT === "all" ? 'border-2 border-blue-500 text-blue-500' : 'border-2 border-info text-info'
                            } hover:border-info-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-info-600 focus:border-info-600 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10`}
                    >
                        <input
                            type="checkbox"
                            value={"all"}
                            defaultChecked={selectedOTT === "all"}
                            onChange={() => handleOTTSelection("all")}
                            className="hidden"
                        />
                        전체
                    </label>
                    {ottInfo.map((OTT: any) => (
                        <label
                            key={OTT.name}
                            className={`inline-block rounded px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out ${selectedOTT === OTT.name ? 'border-2 border-blue-500 text-blue-500' : 'border-2 border-info text-info'
                                } hover:border-info-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-info-600 focus:border-info-600 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10`}
                        >
                            <input
                                type="checkbox"
                                value={OTT.name}
                                defaultChecked={selectedOTT === OTT.name}
                                onChange={() => handleOTTSelection(OTT.name)}
                                className="hidden"
                            />
                            {OTT.korean}
                        </label>
                    ))}
                </div>
                <div>
                    <button onClick={fetchData} className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full">
                        검색
                    </button>
                </div>
                {/* 리스트 표시 */}
                {isLoading ? (
                    <Loading loading={isLoading} />
                ) : (
                    <>
                        {partyData &&
                            <div className='flex flex-wrap justify-center gap-10 pt-20 pr-60 pl-60  sm:w-auto'>{
                                partyData
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
                                                <div onClick={() => joinParty(data.id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    참가하기
                                                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                </div>
                                            </div>
                                        </div>


                                    ))}</div>}
                    </>


                )}

            </div>
        </>
    );
};

export default PartyFind;