import React, {useState, useEffect} from "react";
import {fs, auth} from "../Firebase/Config";
import {SingleProduct} from "./SingleProduct";
import { toast } from 'react-toastify';

export const Products = (props) => {

     // getting current user uid
     function GetUserUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }

    const uid = GetUserUid();

        // state of products
        const [products, setProducts]=useState([]);
        const getProducts = async ()=>{
            const products = await fs.collection('Products').get();
            const productsArray = [];
            for (var snap of products.docs){
                var data = snap.data();
                data.ID = snap.id;
                productsArray.push({
                    ...data
                })
                if(productsArray.length === products.docs.length){
                    setProducts(productsArray);
                }
            }
        }

        useEffect(()=>{
            getProducts();
        },[])

        // globl variable to add extra field qty and total price of that item
        let Product;

        // add to cart
        const addToCart = (product) => {
            if (uid!==null) {
                //  console.log("from Products page", product);
                    if(product.qty === 1) {
                        toast.info('this product is already in your cart', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                        });
    
                    } 
                    else{ 
                        Product=product;
                        Product['qty']=1;
                      //  Product['TotalProductPrice']= (parseFloat(Product.qty*Product.price).toFixed(2)) ;
                        Product['TotalProductPrice']= Product.qty*Product.price ;
                        fs.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
                            console.log('successfully added to cart');
                        })
    
                    }
    
                }
            else{
                props.history.push('./login')
            }
        }
    


    
    return (
        <>
        <div>
            {products.length > 0 && (
                <div className='container'>
                    <h1 className='text-center'>Products</h1>
                    <hr className="my-4" /> 
                    <div className="products-box">
                      {products.map((singleProduct) => (
                        <SingleProduct key = {singleProduct.ID} singleProduct={singleProduct} addToCart={addToCart}> </SingleProduct>
                      ))}
                    </div>
                </div>
            )}
            {products.length < 1 && (
                <div className='container'>Please wait....</div>
            )}
        </div>
        </>
    )
}

export default Products