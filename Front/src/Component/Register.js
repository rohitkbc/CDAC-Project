import { useState } from "react";
import adminServices from "../Services/admin.services";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');
    const [isAdmin, setIsAdmin] = useState(Boolean)
    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();
        setIsAdmin('false')
        const user = { email, password, firstname, lastname, phoneNo, address, isAdmin }
        console.log(user)

        adminServices.register(user)
            .then(respose => {
                console.log("User Registered", respose.data)
                toast.success('User Registered! Auto-Redirecting....',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                )
                setTimeout(() => {
                    console.log("User Registered")
                    navigate('/')
                }, 2500)
            })
            .catch(error => {
                console.log('Something Went Wrong', error);
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
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xxl-6 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="text-center my-4">
                            <img src="https://img.freepik.com/free-vector/hand-drawn-farmers-market-logo_23-2149329270.jpg?w=2000" alt="logo" width="100" style={{ borderRadius: '50px' }} />
                        </div>
                        <div className="card shadow-lg">
                            <div className="card-body px-5 pt-5">
                                <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
                                <form onSubmit={(e) => registerUser(e)}>

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
                                            <input id="password" type="password" className="form-control" name="password" required
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

                                    <p className="form-text text-muted mb-3">
                                        By registering you agree with our terms and condition.
                                    </p>

                                    <div className="align-items-center d-flex">
                                        <button type="submit" className="btn btn-primary">
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer py-1 border-0">
                                <div className="text-center mb-4">
                                    Already have an account? <a href="/" className="text-dark">Login</a>
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

export default Register;