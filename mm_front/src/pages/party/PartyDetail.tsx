import React, {useState} from 'react'
import customAxios from '../../lib/customAxios'
import { useParams } from 'react-router-dom'
import { partydto } from '../../data/partyresponsedto'

const PartyDetail = () => {
    let { id } = useParams();
    // 게시물 정보 받아오기

    const [partyInfo, setPartyInfo] = useState<Object>();

   let data = partydto.filter((data) => data.id === 1)[0];

    

    customAxios.get(`api/party/${id}`).then((res) => {
        console.log(res);
        setPartyInfo(res.data);
    }).catch((err) => {
        console.log(err);
    })


    return (
        <>
            
        </>
    )
}

export default PartyDetail