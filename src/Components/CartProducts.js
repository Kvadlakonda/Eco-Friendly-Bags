import React from "react";
import {SingleCartProduct} from "./SingleCartProduct";

export const CartProducts = ({cartProducts, cartProductIncrease, cartProductDecrease}) => {
    return cartProducts.map((cartProduct)=>(
        <SingleCartProduct key={cartProduct.ID} cartProduct={cartProduct}
          cartProductIncrease={cartProductIncrease}
          cartProductDecrease={cartProductDecrease}

        />
    ))
}

