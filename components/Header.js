'use client'
import { auth, db } from '@/app/shared/firebaseConfig';
import { LoginContext } from '@/context/LoginContext';
import { UserContext } from '@/context/userContext';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { HiArrowSmRight, HiBell, HiMenu, HiSearch } from 'react-icons/hi'
import { RxCross2 } from 'react-icons/rx'

export default function Header() {


    const { userData, setUserData } = useContext(UserContext);
    const { isLogedIn, setIsLogedIn } = useContext(LoginContext);
    const [showNavs, setShowNavs] = useState(false);
    const [search, setSearch] = useState('');

    const path = usePathname();

    if (path == '/login') {
        return null;
    }


        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                let data = {
                    username: user.displayName,
                    email: user.email,
                    image: user.photoURL
                }
                await setDoc(doc(db, 'users', uid), data);
                setUserData(user);
            }
            else {
                null
            }
        });

    return !userData?.email ? (
        <div className="contianer w-11/12 bg-white shadow-md rounded-e-2xl p-5 my-5">
            <div className="container flex flex-row gap-5 w-fit ms-auto">
                <Link className='font-bold text-gray-700 text-lg' href={'/login'}>sign in</Link>
                <Link className='font-bold flex items-center justify-center flex-row gap-2 text-blue-500 text-lg' href={'/login'}>sign up <HiArrowSmRight size={27} /></Link>
            </div>
            <div className="contianer md:w-7/12 mt-8 p-2">
                <h1 className="text-gray-8-900 text-3xl md:text-6xl font-ibm leading-tight font-semibold">Share Your <span className="text-blue-500 text-4xl md:text-7xl">Imaginations</span> </h1>
                <p className="md:text-lg text-md font-semibold leading-8 my-6 mt-8 md:w-8/12 font-ubantu text-gray-600">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quod, culpa sint accusantium sunt similique
                </p>
            </div>
        </div>
    )
        :
        (
            <div className='bg-slate-100'>

                <div className="container w-full md:items-center md:justify-center p-3 flex flex-col md:flex-row gap-5">

                    <div className="flex flex-row w-fit gap-4">
                        {
                            showNavs ? <RxCross2 className='cursor-pointer' onClick={(() => { setShowNavs(false) })} size={30} />
                                :
                                <HiMenu className='md:hidden block cursor-pointer' onClick={(() => { setShowNavs(true) })} size={30} />
                        }
                        <Link href={'/'}><img src="https://pngimg.com/d/pinterest_PNG62.png" alt="" className="w-20" /></Link>
                    </div>

                    <div className="container shadow-lg bg-white ms-auto rounded-xl items-center justify-center px-5 p-1 w-4/12 hidden md:flex md:flex-row">
                        <Link href={`search-user/${search}`}><HiSearch className='text-gray-700' size={30} /></Link>
                        <input type="text" onChange={(e) => { setSearch(e.target.value) }} placeholder='search by email...' className="w-full p-3 focus:outline-none" />
                    </div>

                    <div className="container ms-auto  items-center justify-center w-fit hidden md:flex flex-row gap-6">
                        <Link className='font-bold flex flex-row gap-2 text-blue-500 text-lg' href={'/'}>home </Link>
                        <Link className='font-bold flex flex-row gap-2 text-blue-500 text-lg' href={'/create'}>create</Link>
                        <Link className='font-bold flex flex-row gap-2 text-blue-500 text-lg' href={'/'}>explore</Link>
                        <HiBell size={30} className='text-slate-700 mx-auto' />
                        {
                            userData?.photoURL ? <Link href={`/profile/${userData.email}`}><img src={userData.photoURL} alt="" className="rounded-full mx-auto w-8 h-8" /></Link>
                                :
                                <Link className='font-bold flex items-center justify-center flex-row gap-2 mx-auto text-blue-500 px-6 py-4 hover:bg-blue-600 rounded-xl hover:text-white text-lg' href={'/login'}>sign in <HiArrowSmRight size={27} /></Link>
                        }
                    </div>

                    {
                        showNavs ? (<div>
                            <div className="container bg-white mx-auto rounded-xl items-center justify-center px-5 p-3 md:w-6/12 flex flex-row">
                                <HiSearch className='text-gray-700' size={30} /> <input type="text" placeholder='search something...' className="w-full p-3 focus:outline-none" />
                            </div>

                            <div className="container mx-auto w-fit flex flex-col md:flex-row gap-6">
                                <Link className='font-bold flex items-center justify-center flex-row gap-2 text-blue-500 text-lg' href={'/'}>home </Link>
                                <Link className='font-bold flex items-center justify-center flex-row gap-2 text-blue-500 text-lg' href={'/create'}>create</Link>
                                <Link className='font-bold flex items-center justify-center flex-row gap-2 text-blue-500 text-lg' href={'/'}>explore</Link>
                                <HiBell size={30} className='text-slate-700 mx-auto' />
                                {
                                    userData?.photoURL ? <Link href={`/profile/${userData.email}`}><img src={userData.photoURL} alt="" className="rounded-full mx-auto w-8 h-8" /></Link>
                                        :
                                        <Link className='font-bold flex items-center justify-center flex-row gap-2 mx-auto text-blue-500 px-6 py-4 hover:bg-blue-600 rounded-xl hover:text-white text-lg' href={'/login'}>sign in <HiArrowSmRight size={27} /></Link>
                                }
                            </div>
                        </div>)
                            :
                            null
                    }

                </div>

            </div>
        )
}
