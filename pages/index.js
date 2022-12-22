import React from 'react'
import Link from 'next'

import { client } from '../lib/client'
import { Product, FooterBanner, WideBanner} from '../components'

const Home = ( {products, bannerData}) => (
    <div>
      <WideBanner wideBanner={bannerData.length && bannerData[0] }/>
      { console.log( "Banner Item:",bannerData)}
      <div className="products-heading">
        <h2>Wide Selling Products</h2>
        <p>Apple. Inc, New Line up every year!</p>
      </div>
      

      <div className="products-container">        
        {products?.map((product) => <Product key={product._id} product={product} />)}       
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]}/>    
    </div>

)


export const getServerSideProps = async() => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type =="banner"]';
  const bannerData = await client.fetch(bannerQuery); 

  return {
    props: {products, bannerData }
  }
}
export default Home


