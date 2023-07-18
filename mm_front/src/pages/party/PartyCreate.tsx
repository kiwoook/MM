import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import customAxios from '../../lib/customAxios';
import { useNavigate } from 'react-router-dom';
import PaymentModal from '../../components/paymentModal';
import { AnimatePresence, motion } from 'framer-motion'
import styled from "styled-components"
import { useRecoilValue } from 'recoil';
import { ottInfomation } from '../../atoms';


const steps = [
  { id: 1, title: 'OTT 선택' },
  { id: 2, title: '시작 날짜 선택' },
  { id: 3, title: '정보 확인' },
];



declare global {
  interface Window {
    IMP: any;
  }
}

const PartyCreate = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedOTT, setSelectedOTT] = useState('WAVVE');
  const [startDate, setStartDate] = useState<Date>(new Date());
  let [endDate, setEndDate] = useState<Date>();
  const [date, setDate] = useState<any>(new Date());
  const [selectRange, setSelectRange] = useState<boolean>(false);
  const [selectMonth, setSelectMonth] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState<Boolean>(false);
  const ottInfo : any[] = useRecoilValue(ottInfomation);
  const navigate = useNavigate();
  const selectMonthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleOTTSelection = (ott: string) => {
    setSelectedOTT(ott);
  };

  const handleSelectMonth = (e: any) => {
    setSelectMonth(e.target.value);
  }

  const plusMonth = (date: Date) => {

    let plusDate = new Date(date);
    plusDate.setMonth(plusDate.getMonth() + selectMonth);
    endDate = plusDate;
    return plusDate.getFullYear() + "년 " + (plusDate.getMonth() + 1) + "월 " + plusDate.getDate() + "일";
  }

  const handleCreateParty = () => {
    if (!selectedOTT || !startDate) {
      setErrorMessage('Please select OTT and choose start/end dates.');
      return;
    }

    // POST request to localhost:8000/party
    customAxios.post('api/party', {
      ottType: selectedOTT,
      startDate: startDate,
      endDate: endDate,
    })
      .then(response => {
        // Handle successful response
        console.log(response.data);
        // Reset form state
        setSelectedOTT('wavve');
        setErrorMessage('');
        navigate("/myparty");
      })
      .catch(error => {
        // Handle error
        console.error(error);
        console.log("반환값 확인 :" + selectedOTT, startDate, endDate);
        setErrorMessage('Failed to create party. Please try again.');
      });
  };

  const paymentModalVariants = {
    initial: {
      opactiy: 1,
      scale: 0
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
    leaving: {
      opacity: 0,
      scale: 0,
      y: -20
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className='w-full h-full flex-col shadow-xl'>
        <div className="flex justify-center mb-8 mt-10">

          <ul className="relative m-0 flex list-none justify-between overflow-hidden p-0 transition-[height] duration-200 ease-in-out">

            {steps.map((step) => (
              <li
                key={step.id} className={`${step.id === 3 ? 'w-[10rem]' : 'w-[15rem]'} flex-auto bg-[#FFFF]
                }`}
              >
                <div className={`flex items-center pl-2 leading-[1.3rem] no-underline ${step.id !== 3 ? 'after:ml-2 after:h-px after:w-full after:flex-1 after:bg-[#e0e0e0]' : ''}    after:content-[''] hover:bg-[#f9f9f9] focus:outline-none dark:after:bg-neutral-600   dark:hover:bg-[#3b3b3b]`}>
                  <span className={`my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full ${currentStep === step.id ? 'bg-blue-500' : 'bg-[#ebedef]'} text-sm font-medium text-[#40464f]`}>
                    {step.id}
                  </span>
                  <span className={`font-medium ${currentStep === step.id ? 'text-blue-500' : 'text-neutral-500'} after:flex after:text-[0.8rem] after:content-[data-content] dark:text-neutral-300`}>
                    {step.title}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>


        {currentStep === 1
          && <>
            <div className="grid grid-cols-3 gap-4 mt-20">
              {ottInfo.map((OTT: any) => (
                <button
                  key={OTT.name}
                  className={`${selectedOTT === OTT.name ? 'bg-blue-500' : 'bg-blue-200'} rounded px-4 py-2 text-white`}
                  onClick={() => handleOTTSelection(OTT.name)}
                >
                  {OTT.korean}
                </button>
              ))}
            </div>
          </>}
        {currentStep === 2 &&
          <div className='flex flex-col justify-center items-center'>
            <div >
              <span>시작 날짜 선택</span>
              <Calendar onChange={setDate} value={date} selectRange={selectRange} />
            </div>
            <div className='mt-20'>
              <span>기간 선택</span>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleSelectMonth} value={selectMonth}>
                {selectMonthList.map((item) => (
                  <option value={item} key={item}>
                    {item}개월
                  </option>
                ))}
              </select>
            </div>
          </div>}
        {currentStep === 3
          && <>
            OTT : {ottInfo.find((ott: any) => ott.name === selectedOTT).korean} <br />
            시작 날짜 : {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일 <br />
            종료 날짜 : {plusMonth(date)} <br />
            월 {(ottInfo.find((ott: any) => ott.name === selectedOTT).price)}원 결제
            <button className="mt-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleCreateParty}>
              파티 만들기
            </button>
          </>}
        <div className='flex mt-20 items-center justify-center mb-10'>
          {currentStep > 1 && (
            <button className="px-4 py-2  bg-gray-500 text-white rounded" onClick={handlePrevStep}>
              이전
            </button>
          )}
          {currentStep < 3 ? (
            <button className="px-4 py-2 ml-4 bg-blue-500 text-white rounded" onClick={handleNextStep}>
              다음
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* OTT 정보들도 넘겨줘야함. */}
      <AnimatePresence>
        {showModal ? (
          <PaymentModal open={showModal} onClose={() => { setShowModal(false) }} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default PartyCreate