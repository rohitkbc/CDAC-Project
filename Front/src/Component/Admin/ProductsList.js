import { useEffect, useState } from 'react';
import farmerServices from '../../Services/farmer.services';
import { useNavigate } from "react-router-dom";
import AddProduct from './AddProduct'
import adminServices from '../../Services/admin.services';
import AdminNavBar from './AdminNavBar';
import toast, { Toaster } from 'react-hot-toast';

function ProductsList() {
    const [products, setProducts] = useState([])
    const [farmers, setFarmers] = useState([])
    const [categories, SetCategories] = useState([])
    const [farmerId, setFarmerId] = useState('');
    const [modalId, setModalId] = useState('')
    const [newName, setNewName] = useState('')
    const [newQuantity, setNewQuantity] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [newCat, setNewCat] = useState('')

    let formdata = new FormData();
    const onFileChange = (e) => {
        console.log(e.target.files[0])
        if (e.target && e.target.files[0]) {
            formdata.append('imgFile', e.target.files[0])
        }
    }

    const handleSubmit = (id) => {

        adminServices.addProductImage(formdata, id)
            .then(response => {
                console.log('Image Uploaded', response.data)
                toast.success('Image Uploaded. Auto-Redirecting....',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                )
                setTimeout(() => {
                    window.location.reload();
                }, 2500)
            })
            .catch(error => {
                console.log("Something went wrong", error)
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
    const navigate = useNavigate();
    const init = () => {
        farmerServices.getProductList()
            .then(response => {
                console.log('Printing Products data', response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })

        farmerServices.farmersList()
            .then(response => {
                console.log('Printing farmers data', response.data);
                setFarmers(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        adminServices.getCategory()
            .then(response => {
                console.log('Printing Category data', response.data);
                SetCategories(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        console.log('Printing id', id);
        farmerServices.removeProduct(id)
            .then(response => {
                console.log('product deleted successfully', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const updateData = (id) => {
        if (newName === "" || newQuantity === "" || newPrice === "" || newCat === "") {
            console.log("Empty")
            toast.error('Something went wrong!',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
            return;
        }

        formdata.append('stockitem', newName)
        formdata.append('priceperunit', newPrice)
        formdata.append('quantity', newQuantity)
        formdata.append('catid', newCat)

        adminServices.updateProduct(id, formdata)
            .then(response => {
                console.log("Updated", response)
                toast.success('Product Updated. Auto-Redirecting....',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                )
                setTimeout(() => {
                    window.location.reload();
                }, 2500)

            })
            .catch(error => {
                console.log("Something went wrong", error)
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

    const updateModalData = (id, newName, newQuantity, newPrice, newCat) => {
        setModalId(id)
        setNewName(newName)
        setNewCat(newCat)
        setNewPrice(newPrice)
        setNewQuantity(newQuantity)
    }

    return (
        <div>
            <AdminNavBar />
            <div className="container">
                <h3 className='mt-2'>List of Products</h3>
                <hr />
                <div>
                    {/* Modal Button */}
                    <a className="btn btn-primary mb-3 " data-bs-toggle="modal" href="#exampleModalToggle" role="button">Add New Product</a>

                    {/* 1st  Modal Component */}
                    <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalToggleLabel">Choose Farmer</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <select className="form-select" aria-label="Default select example" name="id"
                                        onChange={(event) => {
                                            setFarmerId(event.target.value);
                                        }}
                                    >
                                        <option value="" defaultValue>Open This Select Menu</option>
                                        {
                                            farmers.map(f => (
                                                <option key={f.farmerId} value={f.farmerId}>{f.firstname + ' ' + f.lastname}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Go To Next Step</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 2st  Modal Component */}
                    <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalToggleLabel2">Add New Product</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <AddProduct id={farmerId} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="button" className="btn btn-primary mb-3 float-end" onClick={() => { navigate("/admin") }}>Go To Back Page</button>
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Product Id</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price per Unit</th>
                                <th>Category</th>
                                <th>Image</th>
                                <th className='text-center'>Functions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(p => (
                                    <tr key={p.id}>
                                        <td>{(products.indexOf(p) + 1)}</td>
                                        <td>{p.stockItem}</td>
                                        <td>{p.quantity}</td>
                                        <td>{p.pricePerUnit}</td>
                                        <td>{p.category.categoryName}</td>
                                        <td>
                                            <figure>
                                                <img src={`http://localhost:8080/FarmersMarketplace/admin/${p.id}`} alt='productImage' width={75} />
                                                <figcaption> {p.imagePath} </figcaption>
                                            </figure>
                                        </td>
                                        <td className='text-center'>


                                            {/* Modal Trigger for product update */}
                                            <button type="button" className="btn btn-info mx-1" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal1" onClick={() => updateModalData(p.id, p.stockItem, p.quantity, p.pricePerUnit, p.category.categoryId)}>Update
                                            </button>

                                            {/* Modal Component for product update */}
                                            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Update Product</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">



                                                            <div className="row mb-3">
                                                                <div className="col">
                                                                    <input type="text" className="form-control" placeholder="New product name" aria-label="New Product Name"
                                                                        value={newName}
                                                                        onChange={(e) => setNewName(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <input type="number" className="form-control" placeholder="New product quantity" aria-label="New Product Quantity"
                                                                        value={newQuantity}
                                                                        onChange={(e) => setNewQuantity(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <input type="text" className="form-control" placeholder="New Price" aria-label="New Price"
                                                                        value={newPrice}
                                                                        onChange={(e) => setNewPrice(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="col">

                                                                    <select className="form-select" aria-label="Default select example" name="categoryData" value={newCat}
                                                                        onChange={(event) => {
                                                                            setNewCat(event.target.value);
                                                                        }}
                                                                    >
                                                                        {
                                                                            categories.map(c => (
                                                                                <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>
                                                                            ))
                                                                        }
                                                                    </select>


                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary" onClick={() => updateData(modalId)}>Save Data</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Modal Trigger for add image */}
                                            <button type="button" className="btn btn-success mx-3" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal" onClick={() => setModalId(p.id)}>Add Image
                                            </button>

                                            {/* Modal Component  for add image */}
                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Add Image</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">

                                                            <form>
                                                                <div className="mb-3">
                                                                    <input className="form-control" type="file" id="formFile" onChange={onFileChange} />
                                                                </div>
                                                            </form>

                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary" onClick={() => handleSubmit(modalId)}>Upload Image</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="btn btn-danger ml-2" onClick={() => {
                                                handleDelete(p.id);
                                            }}>Delete</button>
                                        </td>
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

export default ProductsList;