import React, { useEffect, useState } from "react";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import './credit-form.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import userServices from "../../Services/user.services";
import PaymentDoneLoading from "./PaymentDoneLoading";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const PaymentForm = (props) => {
    const [number, SetNumber] = useState("");
    const [name, SetName] = useState("");
    const [month, SetMonth] = useState("");
    let [expiry, SetExpiry] = useState("");
    const [cvc, SetCvc] = useState("");
    const [focus, SetFocus] = useState("");
    const [user, setUser] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        var val = localStorage.getItem('user-token')
        var object = JSON.parse(val);
        setUser(object)

    }, [])

    const handleDate = (e) => {
        SetMonth(e.target.value);
        SetExpiry(e.target.value);
    };

    const handleExpiry = (e) => {
        SetExpiry(month.concat(e.target.value));
    };

    const sendData = (event) => {
        event.preventDefault()
        const cardDetails = { number, month, expiry, cvc }
        if (number === "4444444444443333" && month === "12" && expiry === "1225" && cvc === "654") {
            console.log(cardDetails);

            userServices.placeOrder()
                .then(response => {
                    console.log("Order Placed", response.data)
                    toast.success('Transaction Done!',
                        {
                            duration: 2500,
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                        }
                    )
                    setOrderPlaced(true)
                    setTimeout(() => {
                        navigate('/user/orders')
                    }, 3500);
                })
                .catch(error => {
                    console.log("Something went wrong", error)
                })
        } else {
            toast.error('Something went wrong!',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
        }

    }

    return (
        <div>
            {orderPlaced ? <PaymentDoneLoading /> : <div className="text-center" style={{ marginTop: "5%" }}>
                <div id="PaymentForm">
                    <Cards
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focus}
                    />
                </div>

                <br />

                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-3">
                            <form class="row g-3" onSubmit={(event) => sendData(event)}>

                                <div class="col-12">
                                    <input class="form-control"
                                        type="tel"
                                        name="number"
                                        placeholder="Card Number"
                                        value={number}
                                        maxlength="16"
                                        pattern="[0-9]+"
                                        onChange={(e) => {
                                            SetNumber(e.target.value);
                                        }}
                                        onFocus={(e) => SetFocus(e.target.name)} required />
                                </div>

                                <div class="col-12">
                                    <div class="row">
                                        <div className="col-6">
                                            <select name="expiry" class="form-select" onChange={handleDate} required >
                                                <option value="">Month</option>
                                                <option value="01">Jan</option>
                                                <option value="02">Feb</option>
                                                <option value="03">Mar</option>
                                                <option value="04">April</option>
                                                <option value="05">May</option>
                                                <option value="06">June</option>
                                                <option value="07">July</option>
                                                <option value="08">Aug</option>
                                                <option value="09">Sep</option>
                                                <option value="10">Oct</option>
                                                <option value="11">Nov</option>
                                                <option value="12">Dec</option>
                                            </select>
                                        </div>
                                        <div className="col-6">
                                            <select name="expiry" class="form-select" onChange={handleExpiry} required >
                                                <option value="">Year</option>
                                                <option value="21">2021</option>
                                                <option value="22">2022</option>
                                                <option value="23">2023</option>
                                                <option value="24">2024</option>
                                                <option value="25">2025</option>
                                                <option value="26">2026</option>
                                                <option value="27">2027</option>
                                                <option value="28">2028</option>
                                                <option value="29">2029</option>
                                                <option value="30">2030</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12">

                                    <input class="form-control"
                                        type="tel"
                                        name="cvc"
                                        placeholder="Card CVC"
                                        maxlength="3"
                                        value={cvc}
                                        pattern="\d*"
                                        onChange={(e) => {
                                            SetCvc(e.target.value);
                                        }}
                                        onFocus={(e) => SetFocus(e.target.name)} required />

                                </div>

                                <div class="col-12">
                                    <input class="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Card Name"
                                        value={name}
                                        onChange={(e) => {
                                            SetName(e.target.value);
                                        }}
                                        onFocus={(e) => SetFocus(e.target.name)} required />
                                </div>

                                <div className="text-center">
                                    <button type="submit" class="btn btn-dark">Pay INR {props.amount}</button>
                                </div>

                            </form >
                        </div>
                    </div>
                </div>

                <div>
                    <Row md={4} className="col-12">
                        <Col>
                            <Card className="text-start">
                                <Card.Body className="ms-2">
                                    <Card.Title>Your Delivery Address: </Card.Title>
                                    <Card.Text >
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
                <p style={{ fontSize: '0.75rem' }}>Use Card Number: 4444-4444-4444-3333 Exp Date: 12/25 CVC: 654</p>

            </div>}
        </div>
    );
};
export default PaymentForm;
