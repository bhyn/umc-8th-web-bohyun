import { useQuery } from '@tanstack/react-query';
import { getLpList } from '../apis/lp';
import { QUERY_KEY } from '../constants/key';
import useGetLpList from "../hooks/queries/useGetLpList"
import {useState, useEffect} from "react";
import { useInView } from 'react-intersection-observer';
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList"
import { PAGINATION_ORDER } from '../enums/common';
import LpCard from '../components/LpCard/LpCard';
import LpCardSkeletonList from '../components/LpCard/LpCardSkeletonList';




const HomePage = () => {
    const [search, setSearch]= useState("뽀야");

    const {data,isFetching,hasNextPage,isPending, fetchNextPage, isError} = useGetInfiniteLpList(50,search,PAGINATION_ORDER.desc)
    const lps = data


    const { ref, inView } = useInView({
    threshold: 0,
});


    useEffect(()=>{
        if(inView){
            fetchNextPage();
        }
    },[inView, isFetching, hasNextPage, fetchNextPage])
    
    console.log(lps);
    return (
        <div className="mt-20">
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className=""/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {isPending && <LpCardSkeletonList count={20}/>}         
            {lps?.pages?.map((page)=>page.data.data)
            ?.flat()
            ?.map((lp)=>(
            <LpCard key={lp.id} lp={lp}/>
            ))}
            {isFetching && <LpCardSkeletonList count={20}/>}
            </div>
            <div ref={ref} className="h-10 w-full bg-red-500">
            </div>
        </div>
    )
}

export default HomePage;