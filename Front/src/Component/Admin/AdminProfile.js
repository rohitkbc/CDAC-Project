import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import toast from 'react-hot-toast';
import adminServices from "../../Services/admin.services";

function AdminProfile() {
    const [isDisabled, setIsDisabled] = useState(true)
    const [userId, setUserId] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');
    const [isadmin, setIsAdmin] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        var val = localStorage.getItem('user-token');
        var object = JSON.parse(val);
        setUserId(object.userId)
        adminServices.getSpecificUserDetails(object.userId)
        .then(response => {
            console.log(response.data);
            setAddress(response.data.firstname)
            setPassword(response.data.lastname)
            setFirstname(response.data.email)
            setLastname(response.data.password)
            setPhoneNo(response.data.address)
            setEmail(response.data.phoneNo)
        })
        .catch(error => {
            console.log(error);
        })
    }

    const updateProfile = () => {
        setIsDisabled(false)
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
                toast.success('Profile Updated! Log-In Again...',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                )
                setTimeout(() => {
                    navigate("/")
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
                <div className="container h-100">
                    <div className="row justify-content-sm-center h-100">
                        <div className="col-xxl-6 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                            <div className="text-center my-4">
                                <img src="https://img.freepik.com/free-vector/hand-drawn-farmers-market-logo_23-2149329270.jpg?w=2000" alt="logo" width="100" style={{ borderRadius: '50px' }} />
                            </div>
                            <div className="card shadow-lg">
                                <div className="card-body px-5 pt-5">
                                    <h1 className="fs-4 card-title fw-bold mb-4">Admin Profile</h1>

                                    <div className="row g-3">
                                        <div className="col mb-3">
                                            <label className="mb-2 text-muted" htmlFor="firstname">First Name</label>
                                            <input id="firstname" type="text" className="form-control" name="firstname" required
                                                value={firstname} disabled={isDisabled}
                                                onChange={(e) => setFirstname(e.target.value)}
                                            />

                                        </div>

                                        <div className="col mb-3">
                                            <label className="mb-2 text-muted" htmlFor="lastname">Last Name</label>
                                            <input id="lastname" type="text" className="form-control" name="lastname" required
                                                value={lastname} disabled={isDisabled}
                                                onChange={(e) => setLastname(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col mb-3">
                                            <label className="mb-2 text-muted" htmlFor="email">E-Mail Address</label>
                                            <input id="email" type="email" className="form-control" name="email" required
                                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                value={email} disabled={isDisabled}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <div className="col mb-3">
                                            <label className="mb-2 text-muted" htmlFor="password">Password</label>
                                            <input id="password" type="text" className="form-control" name="password" required
                                                value={password} disabled={isDisabled}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col mb-3">
                                            <label className="mb-2 text-muted" htmlFor="phone">Phone No.</label>
                                            <input id="phone" type="tel" className="form-control" name="phone" required
                                                pattern="[0-9]{10}"
                                                value={phoneNo} disabled={isDisabled}
                                                onChange={(e) => setPhoneNo(e.target.value)}
                                            />
                                        </div>
                                        <div className="col mb-3">
                                            <label className="mb-2 text-muted" htmlFor="Address">Address</label>
                                            <input id="Address" type="test" className="form-control" name="Address" required
                                                value={address} disabled={isDisabled}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                    </div>


                                    <div className="align-items-center d-flex">
                                        <button type="submit" className="btn btn-primary" onClick={() => navigate('/admin/')}>
                                            Go Back
                                        </button>
                                        {isDisabled ?
                                            <button type="submit" className="btn btn-success ms-auto" onClick={() => updateProfile()}>
                                                Update Profile
                                            </button>

                                            :

                                            <button type="submit" className="btn btn-success ms-auto" onClick={() => updateUser()}>
                                                Save Data
                                            </button>
                                        }
                                    </div>

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

    export default AdminProfile;