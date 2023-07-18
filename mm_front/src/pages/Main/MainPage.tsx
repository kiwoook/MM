import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components"
import { motion, AnimatePresence, useTransform, useSpring, useScroll, MotionValue, useInView } from "framer-motion"
import tving from "../../assets/TVING.png"
import netflix from "../../assets/netflix.png"
import wavve from "../../assets/wavve.png"
import apple_tv from "../../assets/apple_tv.png"
import coupang_play from "../../assets/coupang_play.png"
import laftel from "../../assets/laftel.png"
import WATCHA from "../../assets/WATCHA.png"
import disney_plus from "../../assets/disney_plus.png"
import { useRecoilValue } from 'recoil'
import { ottInfomation } from '../../atoms'
import ParallaxText from '../../components/ParallaxText'



// 타이틀 섹션
const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white;
    stroke-width: 2;
  }
`;

const GridBox = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const OTTBox = styled(motion.div)`
  display: flex;
  align-items: center;
  place-self: center;
  border-radius: 35px;
`;

// 이용 방법 섹션

const UsingBox = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 350px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  cursor: pointer;
`

const UsingOverlayBox = styled(motion.div)`
    display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 350px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`

const Overlay = styled(motion.div)``;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const PriceDiv = styled(motion.div)`
  grid-column: 1 / -1;
`;

const ottBoxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const titleVariants = {
  start: {
  },
  end: {
    transition: {
      type: "Inertia",
      duration: 1.5,
      delayChildren: 0.2,
      staggerChildren: 0.8,
    },
  },
}

const titleSpanVariants = {
  start: {
    opacity: 0,
    y: -25,
  },
  end: {
    opacity: 1,
    y: 0
  },
}

const ottVariants = {
  start: {
    opacity: 0,
    scale: 1.5,
    y: 10,
  },
  end: {
    opacity: 1,
    scale: 1.5,
    y: 0,
  },
};

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const Section = ({ index, children }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);
  return (
    <section className='h-screen justify-center items-center flex flex-col' ref={ref}>
      {children}
    </section>
  )
}

const MainPage = () => {
  const section1Ref = useRef(null)
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section1View = useInView(section1Ref);
  const isInottView = useInView(section2Ref);
  const section3View = useInView(section3Ref);
  const section4View = useInView(section4Ref);
  const [visible, setVisible] = useState(1);
  const [currentSection, setCurrentSection] = useState(0);
  const [ottName, setOttName] = useState<string>();
  const [usingId, setUsingId] = useState<string>();
  const ottInfo = useRecoilValue(ottInfomation);
  const ottNameArray = ["티빙", "넷플릭스", "웨이브", "애플 티비", "쿠팡 플레이", "왓챠", "디즈니 플러스", "라프텔"]
  const { scrollYProgress }: any = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };
  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  const box = {
    invisible: {
      y: -20,
      opacity: 0,
      scale: 1,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
  };

  const path = {
    start: {
      pathLength: 0,
      fill: "rgba(0,0,0,0)"
    },
    end: {
      pathLength: 1,
      fill: "rgba(0,0,0,1)",

    },
  };

  const handleOTT = (ottIdx: any) => {
    setOttName(ottNameArray[ottIdx]);
  }

  useEffect(() => {
    if (usingId) {
      disableScroll();
    }
    return () => {
      enableScroll();
    };
  }, [usingId])

  return (
    <>
      <section className="h-screen top-20 justify-center items-center flex flex-col">
        <div>
          <motion.div ref={section1Ref} variants={titleVariants} initial="start" animate={section1View ? "end" : "start"} className='flex justify-center flex-col'>
            <motion.span variants={titleSpanVariants} className='text-4xl'>OTT 매치 메이킹 서비스</motion.span>
            <motion.span variants={titleSpanVariants} className='font-bold text-8xl'>퍼즐</motion.span>
          </motion.div>
          <Svg width="400" height="auto" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" >
            <g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
              <motion.path variants={path} transition={{
                default: { duration: 5 },
                fill: { duration: 1, delay: 1 },
              }} initial="start" animate="end" d="M5467.2,4970.7c-87.3-23.4-236.5-80.9-330.2-125.7c-724.3-360-1062.9-1156.7-828.6-1955.5l12.8-49h-634.8c-357.9,0-679.5-10.7-732.8-23.4c-315.3-72.4-585.8-345.1-658.2-660.3c-12.8-51.1-23.4-381.3-23.4-737V776.5l-108.6,31.9c-283.3,85.2-654,74.6-954.3-25.6C676.5,606.1,244.1,124.7,129-416.4c-42.6-208.8-38.3-536.8,12.8-739.2c89.5-353.6,308.9-690.2,590.1-903.2c434.5-328,930.9-417.5,1493.2-264.1l46.9,12.8v-862.7c0-788.1,4.3-875.5,40.5-992.7c78.8-257.7,234.3-434.5,483.5-549.6l125.7-59.6l1033.1-6.4c1003.3-4.3,1035.2-4.3,1103.4,38.3c95.9,59.6,153.4,161.9,153.4,276.9c0,98-6.4,112.9-155.5,321.7c-268.4,383.4-204.5,952.2,144.9,1273.8c470.8,432.4,1246.1,294,1531.6-274.8c178.9-362.1,138.5-747.7-119.3-1080c-147-191.7-127.8-391.9,46.9-513.3l72.4-49l1267.4,6.4l1269.6,6.4l127.8,61.8c164,80.9,347.2,264.1,428.2,428.1l61.8,127.8l6.4,1256.8c4.3,1224.8,4.3,1258.9-38.3,1327.1c-98,157.6-306.7,202.4-460.1,95.8c-44.7-29.8-121.4-83.1-168.3-115c-289.7-198.1-745.5-196-1054.4,2.1c-415.4,266.3-566.6,837.1-338.7,1282.4c98,191.7,334.4,392,543.2,464.4c336.6,117.2,660.3,59.6,962.8-168.3c61.8-46.9,147-91.6,187.4-100.1c110.8-21.3,253.5,42.6,319.5,140.6l53.3,78.8l-6.4,1041.7l-6.4,1041.6l-59.6,125.7c-115,249.2-291.8,404.7-549.6,483.5c-117.2,36.2-204.5,40.5-1003.3,40.5c-824.4,0-873.3,2.1-858.4,38.3c87.3,227.9,95.9,722.1,14.9,975.6c-166.1,519.7-579.4,933-1099.2,1099.1C6131.8,5017.6,5678.1,5026.1,5467.2,4970.7z M6070,4342.3c189.6-40.5,340.8-123.5,483.5-266.3c147-144.8,225.8-294,268.4-494.2c51.1-245,2.1-517.6-127.8-711.5c-32-44.7-85.2-125.7-121.4-178.9c-55.4-83.1-63.9-110.8-55.4-198.1c8.5-108.6,55.4-187.5,151.3-257.7c57.5-44.7,85.2-44.7,1244-51.1c896.8-2.1,1199.3-10.6,1237.6-32c100.1-51.1,108.6-117.2,108.6-773.2c0-570.9-2.1-609.2-36.2-594.3c-342.9,132.1-864.8,95.9-1233.3-85.2c-622-304.6-994.8-988.4-903.2-1663.6c93.7-702.9,626.3-1273.8,1312.2-1405.9c268.4-51.1,423.9-40.5,813.7,49l46.9,10.7v-811.6c0-664.6-6.4-826.5-32-888.3c-55.4-134.2-78.8-136.3-1001.2-136.3c-451.6,0-820.1,2.1-820.1,6.4c0,4.3,17,59.6,36.2,123.5c29.8,87.4,38.3,189.6,38.3,434.6c0,304.6-2.1,328-66,507c-153.4,426-438.8,749.8-828.6,941.5c-411.1,202.4-841.4,227.9-1267.4,76.7c-247.1-87.4-391.9-183.2-607.1-396.2c-308.9-306.7-453.7-632.7-472.9-1065.1c-8.5-191.7-2.1-268.4,34.1-421.8c23.4-104.4,44.7-191.7,44.7-198.1c0-21.3-1190.7-6.4-1252.5,14.9c-136.3,46.9-132.1,6.4-132.1,1278.1c0,1124.7-2.1,1158.8-44.7,1246.1c-23.4,51.1-74.6,110.8-112.9,136.3c-89.5,55.4-257.7,57.5-334.4,4.3c-29.8-19.2-112.9-76.7-185.3-123.5C2076-1703,1901.3-1747.7,1658.5-1735c-168.3,8.5-210.9,19.2-351.5,87.3C891.6-1441,676.5-1012.8,768.1-576.2c42.6,206.6,121.4,355.7,268.4,502.7c353.6,353.6,888.3,385.5,1295.1,78.8c61.8-46.9,140.6-95.9,176.8-108.7c136.3-46.8,317.4,38.4,381.3,181.1c38.3,83.1,42.6,149.1,42.6,1033.1v945.8l61.8,61.8l61.8,61.8h924.5c538.9,0,954.3,8.5,996.9,21.3c42.6,10.6,108.6,55.4,149.1,95.9c61.8,63.9,72.4,91.6,80.9,196c8.5,119.3,4.3,127.8-98,266.3c-178.9,242.8-206.6,328.1-206.6,624.1c0,245,2.1,262,68.2,400.5c121.4,255.6,289.7,419.6,524,509.1C5705.8,4374.3,5859.1,4387.1,6070,4342.3z" />
            </g></g>
          </Svg>
        </div>
        <div >
          {/* <ParallaxText baseVelocity={10}>PUZZLE</ParallaxText> */}
        </div>
      </section>
      <section className='h-[100vh] justify-center items-center flex flex-col'>
        <motion.div className='mb-10' initial="invisible" animate={isInottView ? 'visible' : 'invisible'} variants={box}><span className='text-4xl font-bold text-gray-900 dark:text-white'>다양한 플랫폼 지원</span></motion.div>
        <GridBox className='h-1/2 w-1/2' ref={section2Ref} variants={ottBoxVariants} initial="start" animate={isInottView ? "end" : "start"} >
          {
            [tving, netflix, wavve, apple_tv, coupang_play, WATCHA, disney_plus, laftel].map((i, idx) => (
              <OTTBox className='w-1/3' variants={ottVariants}
                key={idx + 1} onClick={() => handleOTT(idx)}>
                <motion.img src={i} whileTap={{ scale: 0.8 }} whileHover={{ scale: 1.3 }} className='cursor-pointer' />
              </OTTBox>
            ))
          }
          <PriceDiv className="flex justify-center items-center" variants={ottVariants} key={ottName}>
            {
              ottName ?
                <span>{ottName}의 가격은 다음과 같아요!</span>
                :
                <span>플랫폼을 클릭하면 가격을 볼 수 있어요!</span>

            }
          </PriceDiv>
        </GridBox>
      </section>
      <section className='h-[100vh] justify-center items-center flex flex-col'>
        <motion.div initial="invisible" animate={section3View ? 'visible' : 'invisible'} variants={box}><span className='text-4xl font-bold text-gray-900 dark:text-white'>간단한 사용방법</span></motion.div>
        <motion.div ref={section3Ref} variants={ottBoxVariants} initial="start" animate={section3View ? "end" : "start"} className='w-full flex-row flex justify-evenly mt-20 ml-32 mr-32'>
          <UsingBox onClick={() => setUsingId('1')} key={'1'} layoutId='1' whileHover={{ scale: 1.1 }}><span>1. OTT 선택</span></UsingBox>
          <UsingBox onClick={() => setUsingId('2')} key={'2'} layoutId='2' whileHover={{ scale: 1.1 }}><span>2. 날짜 지정과 이용 기간 선택</span></UsingBox>
          <UsingBox onClick={() => setUsingId('3')} key={'3'} layoutId='3' whileHover={{ scale: 1.1 }}><span>3. 결제</span></UsingBox>
          <UsingBox onClick={() => setUsingId('4')} key={'4'} layoutId='4' whileHover={{ scale: 1.1 }}><span>4. 파티 확인</span></UsingBox>

          <AnimatePresence>
            {
              usingId ? (
                <Overlay className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" variants={overlay}
                  onClick={() => setUsingId(undefined)}
                  initial="hidden"
                  animate="visible"
                  exit="exit">
                  <UsingOverlayBox  onClick={() => setUsingId(usingId)} key={usingId} layoutId={usingId}>

                    {
                      usingId === '1' ? (<>버튼을 눌러 OTT를 선택하세요!</>) : null
                    }
                    {
                      usingId === '2' ? (<>2</>) : null
                    }
                    {
                      usingId === '3' ? (<>3</>) : null
                    }
                    {
                      usingId === '4' ? (<>4</>) : null
                    }

                  </UsingOverlayBox>
                </Overlay>
              ) :
                null
            }
          </AnimatePresence>
        </motion.div>
      </section>
      <Section index={5}>
        <motion.div initial="invisible" animate={section4View ? 'visible' : 'invisible'} variants={box}><span className='text-4xl font-bold text-gray-900 dark:text-white'>당신의 자리를 끼워 맞출게요</span></motion.div>
        <div ref={section4Ref} className='mt-20'>
          <a href="#_" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">시작하기</span>
            <span className="relative invisible">시작하기</span>
          </a>
        </div>
      </Section>
      <motion.div className='bg-[#d2c3fe] fixed h-[1vh] left-0 right-0 bottom-[0vh]' style={{ scaleX }} />
    </>
  )
}

export default MainPage