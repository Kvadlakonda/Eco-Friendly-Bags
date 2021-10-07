import React from "react";
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import {auth, fs} from "../Firebase/Config";


export const SingleCartProduct = ({cartProduct, cartProductIncrease, cartProductDecrease}) => {
    const handleCartProductIncrease=()=>{
        cartProductIncrease(cartProduct);
    }

    const handleCartProductDecrease=()=>{
        cartProductDecrease(cartProduct);
    }

    const handleCartProductDelete=()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).doc(cartProduct.ID).delete().then(()=>{
                    console.log('successfully deleted');
                })
            }
        })
    }

    return (
        <div className='cart-product'>
        <div className='product-img'>
            <img src={cartProduct.url} alt="product-img"/>
        </div>
        <div className='product-text price'>{cartProduct.title}</div>
        <div className='product-text price'>$ {cartProduct.price}</div>
    
            <div className='action-btns minus' onClick={handleCartProductDecrease} >
                <Icon icon={minus} size={20}/>
            </div>                
            <div>{cartProduct.qty}</div>               
            <div className='action-btns plus' onClick={handleCartProductIncrease}>
                <Icon icon={plus} size={20}/>
            </div>
    
        {/*<div className='product-text cart-price'>$ {(parseFloat(cartProduct.TotalProductPrice).toFixed(2))}</div> */}
        <div className='product-text cart-price'>$ {cartProduct.TotalProductPrice}</div>
        <div className='btn btn-danger btn-md cart-btn' onClick={handleCartProductDelete}>DELETE</div>            
    </div>
    )
}
