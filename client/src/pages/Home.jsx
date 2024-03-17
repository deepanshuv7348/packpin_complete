import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Heders from '../components/Headers'
import Banner from '../components/Banner'
import Categorys from '../components/Categorys'
import FeatureProducts from '../components/products/FeatureProducts'
import Products from '../components/products/Products'
import Footer from '../components/Footer'
import { get_products } from '../store/reducers/homeReducer'
import Slidex from '../components/Slidex'
import Feature from './Feature'




const Home = () => {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.home)

    useEffect(() => {
        dispatch(get_products())
    }, [])

    return (
        <div className='w-full'>
            <Heders />
            <Banner />
            <div className='py-5'>
                <FeatureProducts products={products} name='Feature Products' />
            </div>
            <div className='mb-3'>
                <Slidex />
            </div>
            <div className='bg-[#d9d9d9] xs:py-0 py-10 border-none'>
                <Feature />
                <FeatureProducts products={products} />
            </div>
            <Footer />
        </div>
    )
}

export default Home