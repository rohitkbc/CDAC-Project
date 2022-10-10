import { useEffect, useState } from 'react';
import farmerServices from '../../Services/farmer.services';
import { useNavigate} from "react-router-dom";
import AdminNavBar from './AdminNavBar';

function FarmersList() {

    const [farmers, setFarmers] = useState([]);
    const navigate = useNavigate();

    const init = () => {
        farmerServices.farmersList()
            .then(response => {
                console.log('Printing farmers data', response.data);
                setFarmers(response.data);
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
        farmerServices.removeFarmer(id)
            .then(response => {
                console.log('employee deleted successfully', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    return (
        <div>
            <AdminNavBar />
            <div className="container">
                <h3 className='mt-2'>List of Farmers</h3>
                <hr />
                <div>

                    <button type="button" className="btn btn-primary mb-3" onClick={() => navigate('/admin/addnewfarmer')}>Add New Farmer</button>
                    <button type="button" className="btn btn-primary mb-3 float-end" onClick={() => { navigate("/admin") }}>Go To Back Page</button>
                    <table className="table table-bordered table-striped text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th>Farmer Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone No.</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th className='text-center'>Functions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                farmers.map(f => (
                                    <tr key={f.farmerId}>
                                        <td>{farmers.indexOf(f) + 1}</td>
                                        <td>{f.firstname}</td>
                                        <td>{f.lastname}</td>
                                        <td>{f.phoneNo}</td>
                                        <td>{f.email}</td>
                                        <td>{f.address}</td>
                                        <td className='text-center'>
                                            <button type="button" className="btn btn-info mx-1" onClick={() =>
                                                navigate(`/admin/updatefarmer/${f.farmerId}`)}>Update</button>

                                            <button type="button" className="btn btn btn-success mx-3" onClick={() =>
                                                navigate(`/admin/addproduct/${f.farmerId}`)}>Add Product</button>

                                            <button className="btn btn-danger ml-2" onClick={() => {
                                                handleDelete(f.farmerId);
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
            </div>
            <div className="text-center  text-muted" style={{marginTop: '100px', marginBottom: '35px'}}>
                Copyright &copy; 2022 &mdash; FarmersMarket
            </div>
        </div>
    );
}

export default FarmersList;