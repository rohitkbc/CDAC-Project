import { useEffect, useState } from "react";
import adminServices from "../../Services/admin.services";
import AdminNavBar from "./AdminNavBar";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
function UsersList() {

    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');
    const [isadmin, setIsAdmin] = useState(Boolean)
    const init = () => {
        adminServices.getUsersList()
            .then(response => {
                console.log("Got all users list", response.data);
                setUsers(response.data)
            })
            .catch(error => {
                console.log("something went wrong", error);
            })
    }
    useEffect(() => {
        init()
    }, [])

    const updateUserData = (u) => {
        console.log(u);
        setUserId(u.userId)
        setEmail(u.email)
        setPassword(u.password)
        setFirstname(u.firstname)
        setLastname(u.lastname)
        setPhoneNo(u.phoneNo)
        setAddress(u.address)
        setIsAdmin(u.isadmin)
    }

    const updateUser = () => {
        if (userId === "" || email === "" || password === "" || firstname === "" || lastname === "" || phoneNo === "" || address === "" || isadmin === "") {
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

        const data = { userId, email, password, firstname, lastname, phoneNo, address, isadmin }
        adminServices.updateUser(userId, data)
            .then(response => {
                console.log("User Updated", response.data);
                toast.success('User Updated! Auto-Redirecting....',
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

    return (
        <div>
            <AdminNavBar />
            <div className="container">
                <h3 className='mt-2'>List of Users Details</h3>
                <hr />
                <div>
                    <button type="button" className="btn btn-primary mb-3 float-end" onClick={() => { navigate("/admin") }}>Go To Back Page</button>
                    <table className="table table-bordered table-striped text-center table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>User Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone No.</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Is admin?</th>
                                <th>Password</th>
                                <th>Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(u => (
                                    <tr key={users.indexOf(u)}>
                                        <td>{u.userId}</td>
                                        <td>{u.firstname}</td>
                                        <td>{u.lastname}</td>
                                        <td>{u.phoneNo}</td>
                                        <td>{u.email}</td>
                                        <td>{u.address}</td>
                                        <td>{u.isadmin ? "Yes" : "No"}</td>
                                        <td>{u.password}</td>
                                        <td>

                                            {/* Modal Trigger for User Update */}
                                            <button type="button" className="btn btn-success mx-1" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal1" onClick={() => updateUserData(u)}>Update
                                            </button>

                                            {/* Modal Component for User Update */}
                                            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">

                                                            <div className="row g-3">
                                                                <div className="col mb-3">
                                                                    <label className="mb-2 text-muted" htmlFor="firstname">First Name</label>
                                                                    <input id="firstname" type="text" className="form-control" name="firstname" required autoFocus
                                                                        value={firstname}
                                                                        onChange={(e) => setFirstname(e.target.value)}
                                                                    />

                                                                </div>

                                                                <div className="col mb-3">
                                                                    <label className="mb-2 text-muted" htmlFor="lastname">Last Name</label>
                                                                    <input id="lastname" type="text" className="form-control" name="lastname" required
                                                                        value={lastname}
                                                                        onChange={(e) => setLastname(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row g-3">
                                                                <div className="col mb-3">
                                                                    <label className="mb-2 text-muted" htmlFor="email">E-Mail Address</label>
                                                                    <input id="email" type="email" className="form-control" name="email" required
                                                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                                        value={email}
                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                    />
                                                                </div>

                                                                <div className="col mb-3">
                                                                    <label className="mb-2 text-muted" htmlFor="password">Password</label>
                                                                    <input id="password" type="text" className="form-control" name="password" required
                                                                        value={password}
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row g-3">
                                                                <div className="col mb-3">
                                                                    <label className="mb-2 text-muted" htmlFor="phone">Phone No.</label>
                                                                    <input id="phone" type="tel" className="form-control" name="phone" required
                                                                        pattern="[0-9]{10}"
                                                                        value={phoneNo}
                                                                        onChange={(e) => setPhoneNo(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="col mb-3">
                                                                    <label className="mb-2 text-muted" htmlFor="Address">Address</label>
                                                                    <input id="Address" type="test" className="form-control" name="Address" required
                                                                        value={address}
                                                                        onChange={(e) => setAddress(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary" onClick={() => updateUser()}>Save Data</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

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

export default UsersList;