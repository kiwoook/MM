import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import {useRecoilValue, useSetRecoilState} from "recoil"
import styled from "styled-components"

import Header from './components/Header';
import MainPage from './pages/Main/MainPage';
import MyParty from './pages/myparty/MyParty';
import Guide from './pages/guide/Guide';
import Community from './pages/community/Community';
import LoginRedirectHandler from './pages/login/LoginRedirectHandler';
import Loading from './pages/loading/loading'
import Party from './pages/party/Party'
import { delCookie, getCookie } from './utils/cookie';
import customAxios from './lib/customAxios';
import axios from 'axios';
import PartyCreate from './pages/party/PartyCreate';
import PartyFind from './pages/party/PartyFind';
import PartyDetail from './pages/party/PartyDetail';
import { ottInfomation } from './atoms';




function App() {
  const acessToken: string = getCookie("access_token");
  const [loading, setLoding] = useState(false);
  const [isLogin, setIsLogin] = useState<Boolean>(false)
  const ottInfo = useRecoilValue(ottInfomation);
  const setOttInfo = useSetRecoilState(ottInfomation);

  // 유저 정보불러오기
  const getUserInfo = async () => {

    await customAxios
      .get("api/v1/users")
      .then((res) => {
        setIsLogin(true);
      }).catch((err) => {
        console.log(err);
        setIsLogin(false);
      })
  }

  const getOttInfo = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/party/ott");
      setOttInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    //로딩 시키기
    setLoding(true);
    getOttInfo();
    //로그인 인증 관련
    if (acessToken === undefined || acessToken == 'null') {
      setLoding(false);
      return;
    } else {
      getUserInfo();
    }
    //로딩 해제
    setLoding(false);
  }, [])

  return (
    loading ? <Loading loading={loading} /> :
      (<div className='scrollbar-hide'>
        <Header isLogin={isLogin} logout={() => {
          setIsLogin(false);
          axios.defaults.headers.common['Authorization'] = null;
          delCookie("acess_token", { path: '/' });
        }} />
        < Routes >
          <Route path="/" element={<MainPage />} />
          <Route path="/party" element={<Party />}>
            <Route path="find" element={<PartyFind  />} />
            <Route path="create" element={<PartyCreate/>} />
            <Route path=":id" element={<PartyDetail />} />
          </Route>
          <Route path="/myparty" element={<MyParty />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/community" element={<Community />} />
          <Route path="/oauth/redirect" element={<LoginRedirectHandler login={() => {
            setIsLogin(true);
          }} />} />
        </Routes >
      </div >)
  );
}

export default App;
