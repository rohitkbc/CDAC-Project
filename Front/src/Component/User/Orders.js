import { useEffect, useState } from "react";
import userServices from "../../Services/user.services";
import UserNavBar from "./UserNavBar";

function Orders() {
    const [user, setUser] = useState([])
    const [order, setOrder] = useState([])

    const init = () => {

        var val = localStorage.getItem('user-token')
        var object = JSON.parse(val);
        setUser(object)

        let formdata = new FormData();
        formdata.append("userId", object.userId)

        userServices.orders(formdata)
            .then(response => {
                console.log("Got response from user orders", response.data)
                setOrder(response.data)
            })
            .catch(error => {
                console.log("Something went wrong", error)
            })

    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div>
            <UserNavBar />
            <div className="container">

                <h3 className="mt-3 mb-3">Order History</h3>
                <hr />
                <table className="table table-bordered table-striped text-center table-hover" style={{ verticalAlign: 'middle' }}>
                    <thead className="thead-dark">
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Delivery Date</th>
                            <th>Payment Status</th>
                            <th>Order Place Date</th>
                            <th className='text-center'>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.map(o => (
                                <tr key={order.indexOf(o)}>
                                    <td>{o.orderItem}</td>
                                    <td>{o.quantity}</td>
                                    <td>{o.amount}</td>
                                    <td>{o.orders.deliveryDate}</td>
                                    <td>{o.orders.paymentStatus ? "Done" : "Pending"}</td>
                                    <td>{o.orders.placeOrderDate}</td>
                                    <td className="text-center">
                                        {
                                            < img src={`http://localhost:8080/FarmersMarketplace/admin/image/${o.orderItem}`} alt='productImage' width={75} />
                                        }
                                        
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

            </div>
            <div className="text-center text-muted" style={{ marginTop: '100px' }}>
                Copyright &copy; 2022 &mdash; FarmersMarket
            </div>
        </div>
    );
}

export default Orders;