import { useState } from "react";
import userServices from "../../Services/user.services";
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

function AddToCart(pid) {
    const [showCartBox, setShowCartBox] = useState(false)
    const [show, setShow] = useState(false)

    let formdata = new FormData();
    const addMe = (e) => {
        e.preventDefault()

        if (e.target.buy_quantity.value === "") {
            console.log("empty")
            setShowCartBox(false)
            return;
        }

        console.log("Quantity: ", e.target.buy_quantity.value, pid)
        formdata.append('qty', e.target.buy_quantity.value)
        userServices.addToCart(pid.productId, formdata)
            .then(response => {
                console.log("Added", response.data)
            })
            .catch(error => {
                console.log("Something went wrong", error)
            })

        setShowCartBox(false)

        toast.success('Product Added to Cart!',
        {
            position: 'bottom-right',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                height: '50px',
                fontSize: '15px'
            },
        })
    }
    return (
        <div>
            {
                showCartBox ?
                    <form onSubmit={addMe}>
                        <div className="row">
                            <div className="col-4">
                                <input type="number" className="form-control form-control-sm" name="buy_quantity" style={{ width: "4rem" }} />
                            </div>
                            <div className="col">
                                <button className="btn btn-primary btn-sm">Add To Cart</button>
                            </div>
                        </div>
                    </form>
                    :
                    <button type="button" className="btn btn-primary" onClick={() => { setShowCartBox(!showCartBox) }}>Buy Product</button>
            }
        </div>
    );
}

export default AddToCart;