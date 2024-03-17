import React, { useEffect, useState } from 'react'
import { BsImages } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'
// import { add_banner, get_banner, messageClear, update_banner } from '../../store/Reducers/bannerReducer'; 
import { add_banner, get_banners, messageClear, update_banner } from '../../store/Reducers/bannerReducer';
import { useSelector, useDispatch } from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import toast from 'react-hot-toast'
import { overrideStyle } from '../../utils/utils'


const AddBanner = () => {
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const { productId } = useParams()
    const [imageShow, setImageShow] = useState('')
    const [image, setImage] = useState('')
    const { loader, successMessage, errorMessage, banner } = useSelector(state => state.banner)

    const imageHandle = (e) => {
        const files = e.target.files
        const length = files.length;

        if (length > 0) {
            setImage(files[0])
            setImageShow(URL.createObjectURL(files[0]))
        }
    }

    const add = (e) => {
        e.preventDefault()
        const fromData = new FormData()
        fromData.append('productId', productId)
        fromData.append('banner', image)
        dispatch(add_banner(fromData))
    }
    const update = (e) => {
        e.preventDefault()
        const fromData = new FormData()
        fromData.append('banner', image)
        dispatch(update_banner({ info: FormData, bannerId:banner._id }))
    }
    useEffect(() => {
        if (errorMessage) {
            toast.success(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())

            setImageShow([])
            setImage([])

        }
    }, [successMessage, errorMessage])

    useEffect(() => {
        dispatch(get_banners(productId))
    }, [productId])

    return (
        <div className='px-2 lg:px-7 pt-5 '>
            <div className='w-full p-20  bg-[#fff] rounded-md'>
                <div className='flex justify-between items-center pb-4 mx-10'>
                    <h1 className='text-[#000000] text-xl font-semibold'>Add Banner</h1>
                    <Link className='bg-red-500 hover:shadow-blue-500/50 hover:shadow-lg text-black rounded-sm px-7 py-2 my-2 ' to='/seller/dashboard/banners'>{productId}Banners</Link>
                </div>
                {
                    !banner && <div>
                        <form onSubmit={add}>
                            <div className=' mb-4'>
                                <label className='flex justify-center text-black items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-fulltext-[#000000]  border-slate-700 rounded-md' htmlFor="image">
                                    <span><BsImages /></span>
                                    <span className='' >select banner image</span>
                                </label>
                                <input required onChange={imageHandle} className='hidden' type="file" id='image' />
                            </div>
                            {
                                imageShow && <div className='mb-4'>
                                    <img className='w-full h-auto' src={imageShow} alt="image" />
                                </div>
                            }
                            <button disabled={loader ? true : false} className='bg-red-500 ml-14 w-[190px] hover:shadow-black-500/20 hover:shadow-lg text-black rounded-md px-7 py-2 mb-3'>
                                {
                                    loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'update banner'
                                }
                            </button>

                        </form>
                    </div>
                }
                {
                    banner && <div>
                        <div>
                            {
                                <div className='mb-4'>
                                    <img className='w-full h-auto' src={banner.banner} alt="image" />
                                </div>
                            }

                        </div>
                        <form onSubmit={update}>
                            <div className=' mb-4'>
                                <label className='flex justify-center text-black items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-fulltext-[#000000]  border-slate-700 rounded-md' htmlFor="image">
                                    <span><BsImages /></span>
                                    <span className='' >select banner image</span>
                                </label>
                                <input required onChange={imageHandle} className='hidden' type="file" id='image' />
                            </div>
                            {
                                imageShow && <div className='mb-4'>
                                    <img className='w-full h-auto' src={imageShow} alt="image" />
                                </div>
                            }
                            <button disabled={loader ? true : false} className='bg-red-500 ml-14 w-[190px] hover:shadow-black-500/20 hover:shadow-lg text-black rounded-md px-7 py-2 mb-3'>
                                {
                                    loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'update banner'
                                }
                            </button>

                        </form>
                    </div>
                }
            </div>
        </div>
    )
}

export default AddBanner
