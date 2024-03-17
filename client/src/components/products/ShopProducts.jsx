import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'
import Ratings from '../Ratings'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { add_to_card, messageClear, add_to_wishlist } from '../../store/reducers/cardReducer'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Details from '../../pages/CardDetals'


const style = {
    position: 'absolute',
    top: '50%',
    left: '83%',
    transform: 'translate(-50%, -50%)',
};


const ShopProducts = ({ styles, products }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { successMessage, errorMessage } = useSelector(state => state.card)

    const add_card = (id) => {
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity: 1,
                productId: id
            }))
        } else {
            navigate('/login')
        }
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [errorMessage, successMessage])

    const add_wishlist = (pro) => {
        dispatch(add_to_wishlist({
            userId: userInfo.id,
            productId: pro._id,
            name: pro.name,
            price: pro.price,
            image: pro.images[0],
            discount: pro.discount,
            rating: pro.rating,
            slug: pro.slug
        }))
    }


    return (
        <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-4 md-lg:grid-cols-2 md:grid-cols-2' : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2'} justify-center items-center px-1 py-3 bg-slate-300`}>
            {
                products.map((p, i) => <div key={i} className='flex flex-col justify-center items-center h-[480px] my-2 box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; xs:mb-2 w-[319px] xs:ml-1 xs:w-[180px] xs:h-[300px]  border p-2 bg-[#ffffff] rounded-3xl xs:rounded-xl   group transition-all duration-500 hover:shadow-md '>
                    <div className='relative overflow-hidden'>
                        <Link to={`/product/details/${p.slug}`}><img className='sm:w-full w-[298px] h-[315px]  xs:w-[164px] xs:rounded-lg rounded-3xl  xs:h-[175px]' src={p.images[0]} alt="product images" ></img></Link>
                        <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                            <li onClick={() => add_wishlist(p)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><AiFillHeart /></li>
                            <Link to={`/product/details/${p.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all' ><FaEye /></Link>
                            <li onClick={() => add_card(p._id)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><AiOutlineShoppingCart /></li>

                        </ul>
                    </div>

                    <div className='xs:my-2 my-4'>

                        <span class='capitalize line-clamp-2 text-sm xs:text-[10px] font-lato bg-aquamarine xs:w-[150px] w-72'><span className='capitalize w-[100%] font-bold text-sm  xs:text-[12px]'>{p.name}</span>  {p.description}</span>

                        <div className='flex xs:mt-1 my-2 xs:text-[10px]'>
                            <span className='mr-2 xs:mt-[-6px] mt-[-3px] font-lato text-slate-500 text-sm xs:text-[10px]'>By:Shop</span>
                            <Ratings ratings={p.rating} />
                        </div>

                        <div className='flex mt-4 xs:mt-0 justify-between' >
                            <div className='flex mt-[-10px] flex-col'>
                                {
                                    <span className="text-black xs:text-[12px]  text-[1.62em]   w-[auto] font-bold">₹{p.price - Math.floor((p.price * p.discount) / 100)}</span>
                                }

                                <div className='flex'>
                                    {
                                        p.discount !== 0 ? <>
                                            <span className='line-through text-black text-[0.625em] xs:mt-[2px] xs:text-[8px] xs:mr-1'>₹{p.price}</span>
                                            <span className="text-[0.75em] xs:text-[10px] text-[green]  font-bold ">(-{p.discount}%)</span>
                                        </> : <span className="text-[0.75em] text-[green] font-bold ">Price : {p.price}</span>
                                    }
                                </div>

                            </div>
                            <li onClick={() => add_card(p._id)} className='w-[36px] h-[36px] xs:w-[28px] xs:h-[28px] mr-[-40px]  cursor-pointer text-white bg-red-500  text-bold flex justify-center items-center rounded-full  transition-all xs:hidden'><AiOutlineShoppingCart /></li>
                            <Link onClick={handleOpen}><button className=' xs:h-[30px] xs:mt-1 xs:w-[75px] xs:text-xs  w-[119px] h-[40px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 xs:rounded-md rounded-full text-white'>Buy Now</button> </Link>
                        </div>

                    </div>
                </div>)
            }
            < Modal open={open} onClose={handleClose} >
                <Box sx={style}>
                    <Typography  >
                        <Details />

                    </Typography>

                    <Typography  >
                    </Typography>
                </Box>
            </Modal>
        </div>

    )
}

export default ShopProducts