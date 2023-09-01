'use client'
import { LoginContext } from '@/context/LoginContext';
import { UserContext } from '@/context/userContext'
import { BsCloudUpload } from 'react-icons/bs'
import React, { useContext, useState } from 'react'
import Spinner from '@/components/Spinner';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { app, db } from '../shared/firebaseConfig';
import { toast } from 'react-toastify';

export default function page() {

    const { userData, setUserData } = useContext(UserContext);
    const { isLogedIn, setIsLogedIn } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        file: '',
        link: ''
    })


    const postId = Date.now().toString();
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate().toString();
    const hours = currentDate.getHours().toString();
    const minutes = currentDate.getMinutes().toString();
    const seconds = currentDate.getSeconds().toString();

    let n, v;

    function handle(e) {
        n = e.target.name;
        v = e.target.value;
        setFormData({ ...formData, [n]: v });
    }

    function handleFile(e) {
        setFormData({ ...formData, file: e.target.files[0] })
    }

    function OnSave(e) {
        e.preventDefault();
        setLoading(true);
        uploadFile();
    }

    const showToast = () => {
        toast.success('post created succesfully');
    };

    const storage = getStorage(app);

    async function uploadFile() {
        const storageRef = ref(storage, 'images/' + formData.file.name);
        uploadBytes(storageRef, formData.file).then((snapshot) => {
        }).then((res) => {
            getDownloadURL(storageRef).then(async (url) => {
                const postData = {
                    title: formData.title,
                    description: formData.description,
                    link: formData.link,
                    image: url,
                    author: userData?.displayName,
                    authorImg: userData?.photoURL,
                    email: userData?.email,
                    id: postId
                }

                await setDoc(doc(db, 'posts', postId), postData).then((res) => {
                    setLoading(false);
                    setFormData({
                        title: '',
                        description: '',
                        file: '',
                        link: ''
                    });
                    showToast();
                })
            })
        })
    }

    return !userData?.email ? (
        <div className="container w-full h-screen flex flex-col items-center justify-center">
            <Spinner size={30} color={'blue'} />
        </div>
    )
        : (
            <div className="w-full md:p-5 h-screen bg-slate-100 items-center justify-center">

                <div className="contianer md:w-10/12 p-2 md:p-8 rounded-lg h-fit md:h-[84%] bg-white shadow-xl md:mt-5 flex md:flex-row flex-col mx-auto">
                    <h1 className="text-4xl text-center md:hidden my-10 font-bold text-gray-800">Create</h1>
                    <div className="container md:w-5/12 p-5">

                        <label htmlFor="postimg">
                            <div className="container h-96 flex flex-col items-center justify-center md:h-full mx-auto w-full border-4 border-dotted">
                                {
                                    formData.file ? (
                                        <img src={window.URL.createObjectURL(formData.file)} alt='' className='w-full' />
                                    )
                                        :
                                        (
                                            <BsCloudUpload className='text-gray-500' size={50} />
                                        )
                                }
                            </div>
                        </label>

                        <input type="file" name="postimg" hidden onChange={handleFile} id="postimg" />

                    </div>
                    <form className="container md:w-7/12 p-5">

                        <div className="container my-8 w-fit gap-3 p-2 flex justify-center items-center flex-row">
                            <img src={userData?.photoURL} alt="" className="w-14 h-14 m-auto rounded-full" />
                            <h2 className="text-xl font-semibold text-gray-700">{userData?.displayName}</h2>
                        </div>

                        <div className="w-full my-6">
                            <h1 className="text-2xl font-bold text-gray-600">Title</h1>
                            <input type="text" name='title' value={formData.title} onChange={handle} placeholder='title...' className="border-b-4 border-gray-400 p-3 bg-transparent rounded-md w-full focus:outline-none my-3" />
                        </div>

                        <div className="w-full my-6">
                            <h1 className="text-2xl font-bold text-gray-600">Description</h1>
                            <textarea type="text" name='description' value={formData.description} onChange={handle} placeholder='description...' className="border-b-4 border-gray-400 resize-none p-3 bg-transparent rounded-md w-full focus:outline-none my-3" />
                        </div>

                        <button className="p-3 bg-blue-500 font-bold text-white w-full text-center flex items-center justify-center text-xl rounded-md" onClick={OnSave}>{loading ? <Spinner size={10} color={'white'} /> : "save"}</button>

                    </form>
                </div>
            </div>
        )
}
