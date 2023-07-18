import React, { useEffect, useState } from 'react'
import customAxios from '../lib/customAxios';
import { useNavigate } from 'react-router-dom';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { motion } from "framer-motion"


interface Props {
    open: Boolean,
    onClose: () => void,
}


const PaymentModal = ({ open, onClose }: Props) => {
    const { IMP } = window;
    IMP.init("imp35127031");

    const postCodePopup = useDaumPostcodePopup("https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

    const [email, setEmail] = useState<String>();
    const [name, setName] = useState<string | number | readonly string[] | undefined>();
    const [address, setAddress] = useState<string | number | readonly string[] | undefined>();
    const [phoneNum, setPhoneNum] = useState<string | number | readonly string[] | undefined>("");
    const [postCode, setPostCode] = useState<string | number | readonly string[] | undefined>();
    const [errorMessage, setErrorMessage] = useState('');

    // 이메일 받아올 수 있음.
    // 이름 이름, 주소, 전번, postCode 내가 받아와야함.

    const navigate = useNavigate();

    const handlePayBtn = () => {
        const requestPay = () => {
            IMP.request_pay({
                pg: "kcp.INIBillTst",
                pay_method: 'card',
                merchant_uid: 'party' + new Date().getTime(),
                name: "이름 지정",
                amount: 64900,                         // 숫자 타입
                buyer_email: email,
                buyer_name: name,
                buyer_tel: phoneNum,
                buyer_addr: address,
                buyer_postcode: postCode
            })
        }

        requestPay();
    }

    const getUserinfo = async () => {
        await customAxios.get("api/v1/users")
            .then((res) => {
                setEmail(res.data.body.user.email)
            }).catch((err) => {
                alert("다시 로그인해주세요.");
                navigate("/");
            })
    }

    const handleComplete = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setPostCode(data.zonecode);
        setAddress(fullAddress);
    }

    const handleClick = () => {
        postCodePopup({ onComplete: handleComplete })
    }

    const handlePhoneNum = (e: any) => {
        setPhoneNum(e.target.value)

        const regex = /^01([0|1|6|7|8|9])([0-9]{7,8})$/;

        if (!regex.test(e.target.value)) {
            setErrorMessage('잘못된 휴대폰 번호입니다.');
        } else {
            setErrorMessage("");
        }
    }



    useEffect(() => {
        getUserinfo();
    }, [])

    const paymentModalVariants = {
        initial: {
            opactiy: 1,
            scale: 0,
            rotateZ : 0,
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotateZ : 360
        },
        leaving: {
            opacity: 0,
            scale: 0,
            y: -20
        }
    }

    return (
        <motion.div variants={paymentModalVariants} initial="initial" animate="visible" exit="leaving" className=" overflow-x-hidden overflow-y-auto inset-0 z-50 fixed min-w-screen min-h-screen flex items-center justify-center px-5 pb-10 pt-16">

            <div className="w-full mx-auto rounded-lg bg-gray-50 shadow-2xl p-5 text-gray-700 max-w-xl">
                <div className="w-full pt-1 pb-5 ">

                    <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                        <i className="mdi mdi-credit-card-outline text-3xl"></i>
                    </div>

                </div>
                <div className="mb-10">
                    <h1 className="text-center font-bold text-xl uppercase">결제 정보</h1>
                </div>

                <div className="mb-3">
                    <label className="font-bold text-sm mb-2 ml-1">이름</label>
                    <div>
                        <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="홍길동" type="text" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="font-bold text-sm mb-2 ml-1">휴대폰 번호</label>
                    <div>
                        <input value={phoneNum} onChange={handlePhoneNum} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="010-0000-0000" type="text" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="font-bold text-sm mb-2 ml-1">주소</label>
                    <div>
                        <button type="button" onClick={handleClick}>주소 찾기</button>
                    </div>
                    <div>
                        <input value={address} className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="주소" type="text" />
                    </div>
                    <label className="font-bold text-sm mb-2 ml-1">상세 주소</label>
                    <div>
                        <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="상세 주소" type="text" />
                    </div>
                </div>
                <div className="mb-10">
                    <label className="font-bold text-sm mb-2 ml-1">우편 번호</label>
                    <div>
                        <input value={postCode} className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="000" type="text" />
                    </div>
                </div>

                {
                    !errorMessage &&
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">{errorMessage}</strong>
                    </div>
                }
                <div className='flex flex-row'>
                    <button onClick={onClose} className="block mr-5 w-1/2 max-w-xs mx-auto bg-red-400 hover:bg-red-500 focus:bg-red-500 text-white rounded-lg px-3 py-3 font-semibold"><i className="mdi mdi-lock-outline mr-1"></i> 취소하기</button>

                    <button onClick={handlePayBtn} className="block ml-5 w-1/2 max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"><i className="mdi mdi-lock-outline mr-1"></i> 결제하기</button>
                </div>
            </div>
            <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

        </motion.div>

    )
}

export default PaymentModal