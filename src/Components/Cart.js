import React, {useEffect, useState} from "react";
import { auth, fs } from "../Firebase/Config";
import { CartProducts } from "./CartProducts";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const Cart = () => {
  
  

    // state of cart products
    const [cartProducts, setCartProducts]=useState([]);

    // getting cart products from firestore collection and updating the state
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);     
                   // console.log('successfully got from firestore', newCartProduct);               
                })
            }
            else{
                console.log('user is not signed in to retrieve cart');
            }
        })
    },[])

    //console.log("from Cart page",JSON.stringify(cartProducts));

    // getting the qty from cartProducts in a seperate array
    const qty = cartProducts.map(cartProduct=>{
        return cartProduct.qty;
    })

    // reducing the qty in a single value
    const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

    const totalQty = qty.reduce(reducerOfQty,0);
    
    //console.log("Total",totalQty);
    
    // getting the TotalProductPrice from cartProducts in a seperate array
    const price = cartProducts.map((cartProduct)=>{
         return cartProduct.TotalProductPrice;
    })
    
    // reducing the price in a single value
    const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;
    
    const totalPrice = price.reduce(reducerOfPrice,0);
    

    // global variable
    let Product;
    
    // cart product increase function
    const cartProductIncrease=(cartProduct)=>{
        // console.log(cartProduct);
        Product=cartProduct;
        Product.qty=Product.qty+1;
        Product.TotalProductPrice=Product.qty*Product.price;
        // updating in database
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    console.log('increment added');
                })
            }
            else{
                console.log('user is not logged in to increment');
            }
        })
    }

    // cart product decrease functionality
    const cartProductDecrease =(cartProduct)=>{
        Product=cartProduct;
        if(Product.qty > 1){
            Product.qty=Product.qty-1;
            Product.TotalProductPrice=Product.qty*Product.price;
             // updating in database
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                        console.log('decrement');
                    })
                }
                else{
                    console.log('user is not logged in to decrement');
                }
            })
        }
    }

    //Charging payment
    const history = useHistory();
    const handleToken = async(token) => {
        //console.log(token);
        const cart = {name: 'All Products', totalPrice}
        const response = await axios.post('http://localhost:8080/checkout',{
            token,
            cart
        })
        console.log(response);
        let {status}=response.data;
       // console.log(status);
        if(status==='success'){
            history.push('/');
            toast.success('Your order has been placed successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });

              const uid = auth.currentUser.uid;
              const carts = await fs.collection('Cart ' + uid).get();
              for(var snap of carts.docs){
                  fs.collection('Cart ' + uid).doc(snap.id).delete();
              }
                            
        }
        else {
            alert('Something went wrong in Checkout');
        }

    }
    

    return (
        <>
        {cartProducts.length > 0 && (
            <div className='container-fluid'>
                <h1 className='text-center'>Cart</h1>
                <hr className="container my-4" /> 
                <div className='products-box'>
                <div className='cart-product'>
                  <div className='product-desc title'> Item Description </div>
                  <div className='product-pricedesc title'> Item Price</div>
                  <div className='product-itemdesc title'> Item Count</div>
                  <div className='product-itemtotaldesc title'> Total Price</div>
                  
                </div>
                <hr className="my-4" />
                    <CartProducts cartProducts={cartProducts}
                       cartProductIncrease={cartProductIncrease}
                       cartProductDecrease={cartProductDecrease} 
                    />
                </div>
                <div className='summary-box'>
                        <h5>Cart Summary</h5>
                        <br></br>
                        <div>
                        Total No of Products: <span>{totalQty}</span>
                        </div>
                        <div>
                        Total Price to Pay: <span>$ {totalPrice}</span>
                        </div>
                        <br></br>
                        <StripeCheckout
                            stripeKey='pk_test_51JgNKpJVZuOwWUJeuWOeRMNysQf3hsf7qfKDkdLzXbaEsywnpzDLhIgwMKszNa3OMvtKOlT4Ci6c2Uq09ug6Q90900W2kS0R5Z'
                            token={handleToken}
                            billingAddress
                            shippingAddress
                            name='All Products'
                            amount={totalPrice * 100}                        
                        ></StripeCheckout> 
                                                                                                                                       
                    </div>  
            </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container text-center'> <h3>No products to show </h3></div>
            ) }

        </>
    )
}

