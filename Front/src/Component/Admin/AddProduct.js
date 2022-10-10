import { useEffect, useState } from 'react';
import adminServices from '../../Services/admin.services';
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import AdminNavBar from './AdminNavBar';

function AddProduct(props) {
    const [stockItem, setStockItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [pricePerUnit, setPricePerUnit] = useState('');
    const [category, setCategory] = useState('');
    const { farmerId } = useParams();
    const navigate = useNavigate();
    const [categories, SetCategories] = useState([])

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        adminServices.getCategory()
            .then(response => {
                console.log('Printing Category data', response.data);
                SetCategories(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    var id;
    const addProduct = (e) => {
        e.preventDefault();
        const product = { stockItem, quantity, pricePerUnit, category }
        console.log(product)
        console.log('Another Component Value: ', props.id)

        if (farmerId) {
            id = farmerId
        } else {
            id = props.id
        }
        adminServices.addProduct(product, id)
            .then(response => {
                console.log('Product added', response.data)
                toast.success('Product Added. Auto-Redirecting....',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                )
                setTimeout(() => {
                    if (farmerId) {
                        navigate('/admin/productslist')
                    } else {
                        window.location.reload();
                    }
                }, 2500)
            })
            .catch(error => {
                console.log('Something went wrong', error)
                toast.error('Something went wrong!',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                )
            })
    }
    return (
        <div>
            { farmerId ? <AdminNavBar /> : "" }
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xxl-6 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="text-center my-4">
                            <img src="https://img.freepik.com/free-vector/hand-drawn-farmers-market-logo_23-2149329270.jpg?w=2000" alt="logo" width="100" style={{ borderRadius: '50px' }} />
                        </div>
                        <div className="card shadow-lg">
                            <div className="card-body px-5 pt-5">
                                <h1 className="fs-4 card-title fw-bold mb-4">Add New Product</h1>
                                <form onSubmit={(e) => addProduct(e)}>

                                    <div className="row g-3">
                                        <div className="col mb-3">
                                            <label className="mb-2 text-muted" htmlFor="stockItem">Product Name</label>
                                            <input id="stockItem" type="text" className="form-control" name="stockItem" required autoFocus
                                                value={stockItem}
                                                onChange={(e) => setStockItem(e.target.value)}
                                            />

                                        </div>

                                        <div className="col mb-3">
                                            <label className="mb-2 text-muted" htmlFor="quantity">Quantity</label>
                                            <input id="quantity" type="number" className="form-control" name="quantity" required
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col mb-3">
                                            <label className="mb-2 text-muted" htmlFor="pricePerUnit">Price Per Unit</label>
                                            <input id="pricePerUnit" type="number" className="form-control" name="pricePerUnit" required
                                                value={pricePerUnit}
                                                onChange={(e) => setPricePerUnit(e.target.value)}
                                            />
                                        </div>

                                        <div className="col mb-3">

                                            <label className="mb-2 text-muted" htmlFor="categoryData">Select Category</label>
                                            <select className="form-select" aria-label="Default select example" name="categoryData"
                                                onChange={(event) => {
                                                    setCategory(event.target.value);
                                                }}
                                            >
                                                <option value="" defaultValue>Open Menu</option>
                                                {
                                                    categories.map(c => (
                                                        <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>
                                                    ))
                                                }
                                            </select>

                                        </div>

                                    </div>
                                    <div className="align-items-center d-flex">
                                        <button type="submit" className="btn btn-primary">
                                            Add New Product
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="text-center mt-4 text-muted">
                            Copyright &copy; 2022 &mdash; FarmersMarket
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;