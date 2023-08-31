'use client'

import { db } from '@/app/shared/firebaseConfig';
import PinsList from '@/components/PinsList';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'next/navigation'
import { React, useEffect, useState } from 'react'

export default function page() {

    const param = useParams();
    const [userData, setUserData] = useState({});
    const [pinsList, setPinsList] = useState([]);
    const [userFound, setUserFound] = useState(false);

    useEffect(() => {
        getUserPins();
        getUserInfo(param.user.replace('%40', "@"));
    }, [])

    const getUserInfo = async (email) => {

        const q = query(collection(db, 'users'), where("email", "==", email));

        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            if (doc) {
                setUserData(doc.data());
                setUserFound(true);
            }
            else {
                setUserFound(false);
            }
        })
    }

    const getUserPins = async () => {
        const q = query(collection(db, 'posts'), where("email", "==", param.user.replace('%40', "@")));

        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            setPinsList(pinsList => [...pinsList, doc.data()]);
        })
    }

    console.log("usedata", userData);
    console.log("userpins", pinsList);

    return (
        <div className="contianer">
            <div className="container flex flex-col items-center justify-center w-full p-5">
                <img src={userData?.image} alt="" className="md:w-44 md:h-44 w-40 h-40 rounded-full" />
                <h1 className="text-2xl mt-5 mb-2 font-bold text-gray-900">{userData.username}</h1>
                <h3 className="font-semibold text-xl text-gray-700">{userData.email}</h3>
                <div className="w-fit flex gap-4 flex-row my-5">
                    <button className="bg-gray-300 text-lg font-bold text-black rounded-full py-3 px-5 ">share</button>
                    {
                        userData?.email ?
                            <button className="bg-gray-300 text-lg font-bold text-black rounded-full py-3 px-5 ">follow</button>
                            :
                            null
                    }
                </div>
                <div className="contianer w-fit flex flex-row gap-3">
                    <button className="bg-gransparent border-b-2 font-semibold border-gray-800 p-2">created</button>
                    <button className="bg-gransparent font-semibold border-gray-800 p-2">followers</button>
                </div>
            </div>

            <div className="contaianer w-full items-center justify-center p-5 bg-slate-200 flex flex-col">
                {
                    pinsList.length > 0 ?
                        <PinsList data={pinsList} />
                        :
                        <div className="container mt-40 text-center w-full">
                            <h1 className="font-bold text-4xl text-center text-gray-700">No post yet</h1>
                        </div>

                }
            </div>

        </div>
    )
}