'use client'
import { auth, db } from '@/app/shared/firebaseConfig';
import PinItem from '@/components/PinItem';
import PinsList from '@/components/PinsList';
import Spinner from '@/components/Spinner';
import { LoginContext } from '@/context/LoginContext';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

export default function page() {

    const user = useParams();
    const [userData, setUserData] = useState([]);
    const { isLogedIn, setIsLogedIn } = useContext(LoginContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()

    const param = useParams();

    function logOut() {
        signOut(auth).then(() => {
            setIsLogedIn(false);
            router.push('/login');
        })
    }

    useEffect(() => {
        getUsersPosts();
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const uid = user.uid;
                setUserData(user);
                setIsLoading(false);
            }
            else {
                null
            }
        });
    }, []);


    if (!userData) {
        router.push('/login');
    }

    async function getUsersPosts() {
        const q = query(collection(db, 'posts'), where("email", "==", param.user.replace("%40", "@")));

        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            setData(data => [...data, doc.data()]);
            ;
        })
    }


    return isLoading ?
        <div className="container w-full h-screen flex flex-col items-center justify-center">
            <Spinner size={20} color={'blue'} />
        </div>
        :
        (
            <div className="cotnainer w-full flex py-5 gap-4 flex-col items-center justify-center">

                <img src={userData.photoURL} alt="" className="w-44 h-44 rounded-full" />
                <h1 className="text-2xl font-bold text-gray-800">{userData.displayName}</h1>
                <h1 className="text-lg font-semibold text-gray-800">{userData.email}</h1>

                <div className="container w-fit mx-auto p-5 flex flex-row gap-4">
                    <button onClick={() => { logOut() }} className="bg-gray-300 text-lg font-bold text-black rounded-full py-3 px-5 ">log out</button>
                </div>

                <div className="contianer w-fit flex flex-row gap-3">
                    <button className="bg-gransparent border-b-2 font-semibold border-gray-800 p-2">created</button>
                    <button className="bg-gransparent font-semibold p-5">saved</button>
                </div>

                <div className="container bg-slate-200 w-full">
                    <PinsList data={data} isUser={true} />
                </div>

            </div>
        )

}
