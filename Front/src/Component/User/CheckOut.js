import { useEffect, useState } from "react";
import userServices from "../../Services/user.services";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import EmptyCart from "./EmptyCart";
import UserNavBar from "./UserNavBar";
import { useNavigate } from "react-router-dom";

function CheckOut() {
    const [cart, setCart] = useState([])
    const [totalAmount, setTotalAmout] = useState('')
    const [user, setUser] = useState([])
    const [empty, setEmpty] = useState(false)

    const navigate = useNavigate()
    const init = () => {

        var val = localStorage.getItem('user-token')
        var object = JSON.parse(val);
        setUser(object)

        userServices.checkOut()
            .then(response => {
                console.log("Got response from checkout", response.data)
                setCart(response.data)

                var sum = 0;
                response.data.forEach(data => {
                    sum += parseInt(data.amount)
                });

                setTotalAmout(sum);

                if (response.data.length === 0) {
                    setEmpty(true)
                }

            })
            .catch(error => {
                console.log("Something went wrong", error)
                setEmpty(true)
            })
    }

    const removeItem = (id) => {
        console.log(id)
        userServices.removeItem(id)
            .then(response => {
                console.log("Item Removed", response.data)
                init()
            })
            .catch(error => {
                console.log("Something went wrong", error)
            })
    }

    useEffect(() => {
        init()
    }, [])

    const buyItems = () => {
        console.log("hi")
        userServices.placeOrder()
            .then(response => {
                console.log("Order Placed", response.data)
            })
            .catch(error => {
                console.log("Something went wrong", error)
            })
    }

    return (
        <div>
            <UserNavBar />
            <div className="container">
                <h3 className='mt-3 mb-3'>Cart Details</h3>
                <hr />
                {

                    empty ? <EmptyCart /> : <div> <table className="table table-bordered table-striped text-center table-hover" style={{ verticalAlign: 'middle' }}>
                        <thead className="thead-dark">
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price per Unit</th>
                                <th>Amount</th>
                                <th className='text-center'>Image</th>
                                <th className='text-center'>Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map(c => (
                                    <tr key={cart.indexOf(c)}>
                                        <td>{c.item}</td>
                                        <td>{c.qty}</td>
                                        <td>{c.price}</td>
                                        <td>{c.amount}</td>
                                        <td className="text-center">
                                            <img src={`http://localhost:8080/FarmersMarketplace/admin/${c.id}`} alt='productImage' width={75} />
                                        </td>
                                        <td>
                                            <button className="btn btn-danger ml-2" onClick={() => { removeItem(cart.indexOf(c)) }}>Remove Item</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <p className="fs-2">Total Amount: {totalAmount}</p>
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end me-5">
                            {/* <button className="btn btn-primary btn-lg" onClick={() => buyItems()}>Place Order</button> */}
                            <button className="btn btn-primary btn-lg" onClick={() => navigate('/user/payment', { state: {totalAmount} })}>Place Order</button>
                        </div>
                    </div>

                }



                <div>
                    <Row md={4} >
                        <Col>
                            <Card>
                                <Card.Body className="ms-4">
                                    <Card.Title>Delivery Address: </Card.Title>
                                    <Card.Text>
                                        Name: {user.firstname + " " + user.lastname}
                                        <br />
                                        Address: {user.address}
                                        <br />
                                        Email: {user.email}
                                        <br />
                                        Phone No.: {user.phoneNo}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className="text-center text-muted" style={{ marginTop: '100px', marginBottom: '35px' }}>
                    Copyright &copy; 2022 &mdash; FarmersMarket
                </div>
            </div>
        </div>
    );
}

export default CheckOut;