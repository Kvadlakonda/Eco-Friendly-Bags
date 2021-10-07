import React from "react";

export const SingleProduct = ({singleProduct, addToCart}) => {
   
    const handleAddToCart=()=>{
        console.log("from Single product",singleProduct);
        addToCart(singleProduct);
    }   

    return (
        <div className='product'>
            <div className='product-img'>
                <img src={singleProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{singleProduct.title}</div>
            <div className='product-text description'>{singleProduct.description}</div>
            <div className='product-text price'>$ {singleProduct.price}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleAddToCart} >ADD TO CART</div>
        </div> 
    )
}


