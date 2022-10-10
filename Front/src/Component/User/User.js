import { useEffect, useState } from "react";
import farmerServices from "../../Services/farmer.services";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AddToCart from "./AddToCart";
import UserNavBar from "./UserNavBar";

function User() {

    const [products, setProducts] = useState([])
    const [isReRender, setIsReRender] = useState(true)

    const init = () => {
        farmerServices.getProductList()
            .then(response => {
                console.log('Printing Products data', response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    useEffect(() => {
        init()
    }, [])

    const priceAscending = () => {
        var data = products.sort((a, b) => a.pricePerUnit - b.pricePerUnit)
        setProducts(data)
        setIsReRender(false)
        setTimeout(() => {
            setIsReRender(true)
        }, 1);
    }

    const quantityAscending = () => {
        var data = products.sort((a, b) => a.quantity - b.quantity)
        setProducts(data)
        setIsReRender(false)
        setTimeout(() => {
            setIsReRender(true)
        }, 1);
    }

    const quantityDescending = () => {
        var data = products.sort((a, b) => b.quantity - a.quantity)
        setProducts(data)
        setIsReRender(false)
        setTimeout(() => {
            setIsReRender(true)
        }, 1);
    }

    const priceDescending = () => {
        var data = products.sort((a, b) => b.pricePerUnit - a.pricePerUnit)
        setProducts(data)
        setIsReRender(false)
        setTimeout(() => {
            setIsReRender(true)
        }, 1);
    }

    const nameAscending = () => {
        var data = products.sort((a, b) => a.stockItem.localeCompare(b.stockItem))
        setProducts(data)
        setIsReRender(false)
        setTimeout(() => {
            setIsReRender(true)
        }, 1);
    }

    const nameDescending = () => {
        var data = products.sort((a, b) => b.stockItem.localeCompare(a.stockItem))
        setProducts(data)
        setIsReRender(false)
        setTimeout(() => {
            setIsReRender(true)
        }, 1);
    }

    return (

        <div>
            <UserNavBar />

            <div className="container mt-2">
                <div class="dropdown-center btn-group">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sort By Descending
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" onClick={() => priceDescending()}>Price Descending</a></li>
                        <li><a class="dropdown-item" href="#" onClick={() => quantityDescending()}>Quantity Descending</a></li>
                        <li><a class="dropdown-item" href="#" onClick={() => nameDescending()}>Name Descending</a></li>
                    </ul>
                </div>


                <div class="dropdown-center btn-group" style={{marginLeft : '950px'}}>
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sort By Ascending
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" onClick={() => priceAscending()}>Price Ascending</a></li>
                        <li><a class="dropdown-item" href="#" onClick={() => quantityAscending()}>Quantity Ascending</a></li>
                        <li><a class="dropdown-item" href="#" onClick={() => nameAscending()}>Name Ascending</a></li>
                    </ul>
                </div>
            </div>

            <div className="container mt-2">
                {isReRender ? <Row xs={1} sm={2} md={5} className="g-4">
                    {products.map((p) => (
                        <Col key={p.id}>
                            <Card>
                                <Card.Img variant="top" src={`http://localhost:8080/FarmersMarketplace/admin/${p.id}`} />
                                <Card.Body className="text-center">
                                    <Card.Title>{p.stockItem}</Card.Title>
                                    <Card.Text>
                                        Amount: INR <div className="fw-bold">{p.pricePerUnit}</div>
                                    </Card.Text>
                                    <AddToCart productId={p.id} />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                    :
                " "    
            }

                <div className="text-center text-muted" style={{ marginTop: '100px', marginBottom: '35px' }}>
                    Copyright &copy; 2022 &mdash; FarmersMarket
                </div>
            </div>
        </div>

    );

}

export default User;