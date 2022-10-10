import { useEffect, useState } from 'react';
import adminServices from '../../Services/admin.services';
import AdminNavBar from './AdminNavBar';
import { useNavigate } from "react-router-dom";

function OrderDetails() {

    const navigate = useNavigate()
    const [order, setOrder] = useState([])

    const init = () => {
        adminServices.orderDetails()
            .then(response => {
                console.log("Order Details", response.data)
                setOrder(response.data)
            })
            .catch(error => {
                console.log("Something Went Wrong", error)
            })
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <div>
            <AdminNavBar />
            <div className="container">
                <h3 className='mt-2'>List of Order Details</h3>
                <hr />
                <div>
                    <button type="button" className="btn btn-primary mb-3 float-end" onClick={() => { navigate("/admin") }}>Go To Back Page</button>
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Order Id</th>
                                <th>Product Name</th>
                                <th>Customer Name</th>
                                <th>Phone No.</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Payment Status</th>
                                <th>Delivery Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.map(o => (
                                    <tr key={order.indexOf(o)}>
                                        <td>{o.orders.orderId}</td>
                                        <td>{o.orderItem}</td>
                                        <td>{o.orders.user.firstname+" "+o.orders.user.lastname}</td>
                                        <td>{o.orders.user.phoneNo}</td>
                                        <td>{o.orders.user.email}</td>
                                        <td>{o.orders.user.address}</td>
                                        <td>{o.quantity}</td>
                                        <td>{o.amount}</td>
                                        <td>{o.orders.paymentStatus ? "Done" : "Pending"}</td>
                                        <td>{o.orders.deliveryDate}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
                <div className="text-center text-muted" style={{ marginTop: '100px', marginBottom: '35px' }}>
                    Copyright &copy; 2022 &mdash; FarmersMarket
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;