import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import LoginModal from './LoginModal';
import { getCookie, delCookie } from '../utils/cookie';
import puzzle_logo from "../assets/puzzle_logo.png"
import styled from "styled-components"
import { motion } from "framer-motion"

interface loginState {
    isLogin: Boolean,
    logout: () => void
}

const Svg = styled.svg`
   
width : 225px;
height : 55px;
object-fit: 'cover';

path {
  stroke : black;
  stroke-width: 2;      
}
`

const Header = ({ isLogin, logout }: loginState) => {
    const [showModal, setShowModal] = useState<Boolean>(false);

   

    const svg = {
        start: { pathLength: 0, fill: "rgba(210, 195, 254, 0)" },
        end: {
            fill: "rgba(210, 195, 254, 1)",
            pathLength: 1,
        },
    };


    return (
        <>
            <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 left-0 border-b h-20 border-gray-200 dark:border-gray-600 fixed">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center">

                        <Svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" className='w-full h-full' style={{ shapeRendering: "geometricPrecision", textRendering: "geometricPrecision", fillRule: "evenodd", clipRule: "evenodd" }}>
                            <g transform="translate(0, -10) scale(0.25)"><motion.path variants={svg}
                                initial="start"
                                animate="end"
                                transition={{
                                    default: { duration: 1, delay: 1 },
                                    fill: { duration: 1, delay: 1 },
                                }} d="M 99.5,49.5 C 124.502,49.3334 149.502,49.5 174.5,50C 201.411,53.0795 218.744,67.5795 226.5,93.5C 244.318,95.4834 250.152,104.817 244,121.5C 239.578,126.293 234.078,128.793 227.5,129C 214.437,159.712 191.104,173.879 157.5,171.5C 157.167,156.485 157.501,141.485 158.5,126.5C 171.137,132.013 179.137,128.18 182.5,115C 180.667,106.5 175.5,101.333 167,99.5C 164.021,100.547 161.188,101.881 158.5,103.5C 157.626,95.6022 156.626,87.7689 155.5,80C 147.5,79.3333 139.5,79.3333 131.5,80C 136.516,94.3135 131.516,100.647 116.5,99C 113,98.1667 110.833,96 110,92.5C 109.24,88.7745 109.407,85.1078 110.5,81.5C 107.015,79.9064 103.348,79.2397 99.5,79.5C 99.5,69.5 99.5,59.5 99.5,49.5 Z" /></g>
                            <g transform="translate(0, -10) scale(0.25)"><motion.path variants={svg}
                                initial="start"
                                animate="end"
                                transition={{
                                    default: { duration: 1, delay: 2 },
                                    fill: { duration: 1, delay: 2 },
                                }} d="M 113.5,152.5 C 126.67,150.671 132.67,156.338 131.5,169.5C 135.135,170.114 138.802,170.448 142.5,170.5C 142.563,191.34 142.563,212.34 142.5,233.5C 128.167,233.5 113.833,233.5 99.5,233.5C 99.5,212.5 99.5,191.5 99.5,170.5C 102.206,170.425 104.873,170.092 107.5,169.5C 105.548,162.353 107.548,156.687 113.5,152.5 Z" /></g>
                            <g transform="translate(0, -10) scale(0.25)"><motion.path variants={svg}
                                initial="start"
                                animate="end"
                                transition={{
                                    default: { duration: 1, delay: 3 },
                                    fill: { duration: 1, delay: 3 },
                                }} d="M 234.5,50.5 C 248.833,50.5 263.167,50.5 277.5,50.5C 278.013,96.5183 279.179,142.518 281,188.5C 281.703,193.738 283.87,198.238 287.5,202C 292.003,204.39 296.669,206.39 301.5,208C 303,209.5 304.5,211 306,212.5C 309.918,227.721 304.251,236.054 289,237.5C 261.045,234.552 243.045,219.552 235,192.5C 234.5,172.169 234.333,151.836 234.5,131.5C 247.178,130.652 253.511,123.819 253.5,111C 253.154,106.115 251.654,101.615 249,97.5C 244.736,94.368 240.069,92.0347 235,90.5C 234.5,77.1708 234.333,63.8375 234.5,50.5 Z" /></g>
                            <g transform="translate(0, -10) scale(0.25)"><motion.path variants={svg}
                                initial="start"
                                animate="end"
                                transition={{
                                    default: { duration: 1, delay: 4 },
                                    fill: { duration: 1, delay: 4 },
                                }} d="M 340.5,55.5 C 347.018,54.1229 352.185,56.1229 356,61.5C 358.511,67.0871 357.678,72.0871 353.5,76.5C 357.687,78.0652 362.02,78.7319 366.5,78.5C 366.667,114.835 366.5,151.168 366,187.5C 361.697,208.477 349.864,223.644 330.5,233C 324.388,235.557 318.054,236.557 311.5,236C 315.663,228.551 316.496,220.718 314,212.5C 313.226,210.061 311.726,208.227 309.5,207C 315.72,202.726 319.553,196.892 321,189.5C 322.845,152.53 323.678,115.53 323.5,78.5C 327.98,78.7319 332.313,78.0652 336.5,76.5C 330.262,68.0783 331.595,61.0783 340.5,55.5 Z" /></g>
                            <g transform="translate(0, -10) scale(0.25)"><motion.path variants={svg}
                                initial="start"
                                animate="end"
                                transition={{
                                    default: { duration: 1, delay: 5 },
                                    fill: { duration: 1, delay: 5 },
                                }} d="M 384.5,50.5 C 418.835,50.3333 453.168,50.5 487.5,51C 481.312,61.5611 481.812,72.0611 489,82.5C 491.234,84.6998 493.734,86.5331 496.5,88C 469.833,126 443.167,164 416.5,202C 438.419,203.976 460.419,204.809 482.5,204.5C 479.496,215.303 481.496,225.136 488.5,234C 456.5,234.667 424.5,234.667 392.5,234C 378.09,228.907 371.923,218.741 374,203.5C 374.725,201.051 375.725,198.717 377,196.5C 403.29,158.754 429.457,120.92 455.5,83C 433.242,81.1767 410.909,80.1767 388.5,80C 385.333,78.1667 382.833,75.6667 381,72.5C 380.333,66.1667 380.333,59.8333 381,53.5C 382.145,52.3636 383.312,51.3636 384.5,50.5 Z" /></g>
                            <g transform="translate(0, -10) scale(0.25)"><motion.path variants={svg}
                                initial="start"
                                animate="end"
                                transition={{
                                    default: { duration: 1, delay: 6 },
                                    fill: { duration: 1, delay: 6 },
                                }} d="M 502.5,50.5 C 543.5,50.5 584.5,50.5 625.5,50.5C 625.953,61.2702 625.453,71.9369 624,82.5C 596.202,122.597 568.035,162.43 539.5,202C 569.116,203.903 598.782,204.737 628.5,204.5C 628.5,214.5 628.5,224.5 628.5,234.5C 590.832,234.667 553.165,234.5 515.5,234C 503.392,230.384 497.058,222.217 496.5,209.5C 496.247,203.998 497.747,198.998 501,194.5C 526.833,157.333 552.667,120.167 578.5,83C 553.225,81.2368 527.891,80.2368 502.5,80C 492.347,75.5585 489.18,68.0585 493,57.5C 495.529,54.1151 498.696,51.7818 502.5,50.5 Z" /></g>
                            <g transform="translate(0, -10) scale(0.25)"><motion.path variants={svg}
                                initial="start"
                                animate="end"
                                transition={{
                                    default: { duration: 1, delay: 7 },
                                    fill: { duration: 1, delay: 7 },
                                }} d="M 632.5,50.5 C 646.833,50.5 661.167,50.5 675.5,50.5C 675.618,101.177 676.284,151.844 677.5,202.5C 700.142,203.744 722.809,204.41 745.5,204.5C 745.5,214.5 745.5,224.5 745.5,234.5C 716.831,234.667 688.165,234.5 659.5,234C 646.033,231.356 637.199,223.522 633,210.5C 632.5,157.168 632.333,103.834 632.5,50.5 Z" /></g>
                            <g transform="translate(0, -10) scale(0.25)"><motion.path variants={svg}
                                initial="start"
                                animate="end"
                                transition={{
                                    default: { duration: 1, delay: 8 },
                                    fill: { duration: 1, delay: 8 },
                                }} d="M 755.5,50.5 C 792.167,50.5 828.833,50.5 865.5,50.5C 865.5,60.5 865.5,70.5 865.5,80.5C 843.444,80.3573 821.444,81.0239 799.5,82.5C 798.167,122.5 798.167,162.5 799.5,202.5C 822.111,203.972 844.778,204.639 867.5,204.5C 867.5,214.5 867.5,224.5 867.5,234.5C 838.498,234.667 809.498,234.5 780.5,234C 767.426,231.224 759.259,223.391 756,210.5C 755.5,157.168 755.333,103.834 755.5,50.5 Z" /></g>
                            <g transform="translate(0, -10) scale(0.25)"><motion.path variants={svg}
                                initial="start"
                                animate="end"
                                transition={{
                                    default: { duration: 1, delay: 9 },
                                    fill: { duration: 1, delay: 9 },
                                }} d="M 810.5,124.5 C 829.167,124.5 847.833,124.5 866.5,124.5C 866.5,134.5 866.5,144.5 866.5,154.5C 847.833,154.5 829.167,154.5 810.5,154.5C 810.5,144.5 810.5,134.5 810.5,124.5 Z" /></g>
                        </Svg>


                    </Link>
                    <div className="flex md:order-2 ml-10">
                        {isLogin ? <button type="button" onClick={() => logout()} data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            로그아웃</button> : <button type="button" onClick={() => setShowModal(true)} data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            로그인</button>}
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">메인화면</Link>
                            </li>
                            <li>
                                <Link to="/party" className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>파티 시작</Link>
                            </li>
                            <li>
                                <Link to="/myparty" className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>내 파티</Link>
                            </li>
                            <li>
                                <Link to="/community" className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>커뮤니티</Link>
                            </li>
                            <li>
                                <Link to="/guide" className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>가이드</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {showModal ? (
                <LoginModal open={showModal} onClose={() => { setShowModal(false) }} />
            ) : null}
        </>

    )
}

export default Header