export const addCart = "ADDCART";
export const increasQuantity = "INCREASQUANTITY";

export const setCart = (val) => {
    return {
        type: addCart,
        value: val
    }
}

export const setQuantity = (val) => {
    return {
        type: increasQuantity,
        value: val
    }
}