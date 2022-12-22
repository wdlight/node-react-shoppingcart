import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';



const Context = createContext();

export const StateContext = ( {children}) => {
  // State Functions
  const [showCart, setShowCart] = useState (false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty]  = useState(1);
  

  
  // find current selected Item
  let foundProduct;
  let index;


  const onAdd = ( product, quantity ) => {
    const checkProductInCart = cartItems.find((item)=> item._id == product._id);

    setTotalPrice( (prevTotalPrice ) => prevTotalPrice + product.price * quantity )
    setTotalQuantities( ( prevTotalQuantities) => prevTotalQuantities + quantity)
    if ( checkProductInCart ) {      

      const updatedCartItems = cartItems.map ((cartProduct ) => {
        if ( cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems( updatedCartItems);
      
    } else {
      product.quantity = quantity;      
      setCartItems( [...cartItems, { ...product}] );
    }

    console.log(`${qty} ${product.name} added `)
    toast.success(`${qty} ${product.name} added to the cart. `
      , {
          style: {
              border: "1px solid green",
              padding: "16px",
              color: "green",
          },
          duration : 2000,
        }
      );

  }


  const incQty = () => { 
    setQty( (prevQty) => prevQty + 1 );
  }
  const decQty = () => { 
    setQty( (prevQty) => {
      if ( prevQty - 1 < 1 ) return 1;    
      
      return  prevQty - 1 ;
    }
      
    )
  }

const notify = () => toast('Here is your toast.');


// Remove x 버튼 처리
const onRemove = (product) => {
  foundProduct = cartItems.find( (item) => item._id === product._id);  
  const newCartItems = cartItems.filter((item) => item._id !== product._id)

  setTotalPrice( (prevTotalPrice) => prevTotalPrice - product.price * product.quantity)
  setTotalQuantities( (prevTotalQuantities) => prevTotalQuantities -  product.quantity)

  setCartItems( newCartItems)
  
  toast.success( `{product.name}아이템이 삭제 되었습니다.`)
  notify();

}



  // cart에서의 +, - 처리 function
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find( (item) =>item._id === id)
    index = cartItems.findIndex( (product) => product._id === id )
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if ( value == 'inc'){
      
      // set cartItems update.
      setCartItems( [...newCartItems, {...foundProduct, quantity: foundProduct.quantity+1  }]) 
      setTotalPrice( (prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities( prevTotalQuantity => prevTotalQuantity + 1)

    }else if ( value =='dec'){
      if ( foundProduct.quantity > 1 ){
        
        // set cartItems update.
        setCartItems( [...newCartItems, {...foundProduct, quantity: foundProduct.quantity-1  }]) 
        setTotalPrice( (prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities( prevTotalQuantity => prevTotalQuantity - 1)
      }
      else
        toast.success( " 삭제 icon을 눌러서 삭제해 주세요. ")
      
    }
  }

  return ( 
    <Context.Provider 
      value={ {
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalQuantities,
        setTotalPrice,
    }} >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);