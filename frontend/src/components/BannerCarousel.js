import React, {useEffect, useState} from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader.js'
import Message from './Message.js'
import {listBanners} from '../actions/bannerActions.js'
const BannerCarousel = () => {
    const dispatch = useDispatch()

    const bannerList = useSelector(state => state.bannerList)
    const {loading, error, banners} = bannerList

    useEffect(()=>{
        dispatch(listBanners())
        //console.log(banners)
    },[dispatch])
  return loading ? <Loader />: error ? <Message variant='danger'>{error}</Message> : (
      <Carousel pause="hover" className="bg-dark">
          {
          banners.map(banner => (
              <Carousel.Item key={banner._id}>
                  <Image src={banner.image} alt={banner._id} fluid />
              </Carousel.Item>
          ))
          }
      </Carousel>
  )
}

export default BannerCarousel
