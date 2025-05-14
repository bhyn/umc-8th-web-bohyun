import { useQuery } from '@tanstack/react-query';
import { getLpList } from '../apis/lp';
import { QUERY_KEY } from '../constants/key';
import useGetLpList from "../hooks/useGetLpList"
import {useState} from "react";

const HomePage = () => {
    const [search, setSearch]= useState("매투");

    const{data, isPending, isError} = useGetLpList({
        search,
    });

    if(isPending){
        return <div>Loading...</div>
    }

    if(isError){
        return <div>ERROR</div>
    }
    return (
        <div>
            <input value={search} onChange={(e)=>setSearch(e.target.value)}/>

            {data?.data.data.map((lp)=><h1>{lp.title}</h1>)}
        </div>
        
    )
}

export default HomePage;