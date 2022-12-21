import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const WideBanner = ( {wideBanner}) => {
  return (
    <div className="wide-banner-container">
      <div >
        <p className="beats-solo">{wideBanner.smallText}</p>
        <h3>{wideBanner.midText}</h3>
        <h1>{wideBanner.largeText1}</h1>
        <img className="wide-banner-image" src={ urlFor(wideBanner.image) } alt="macbook pro"></img>

        <div>
          <Link href='/product/${wideBanner.product}'>
            <button type="button">{wideBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>description</h5> 
            <p>{wideBanner.desc}</p>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default WideBanner
