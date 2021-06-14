import './Login.css';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../Context/AuthContext';
import axios from 'axios';

function Login() {
    const history = useHistory();
    const context = useContext(AuthContext);
    var query = new URLSearchParams(useLocation().search);
    var qlogout = query.get("logout");
    useEffect(() => {
        if (qlogout == "success") {
            toast("You have logged out succesfully!");
        }
    }, [qlogout]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [errors, setErrors] = useState([]);

    const handleSubmit = function (e) {
        setErrors([]);
        e.preventDefault();
        axios.post("http://localhost:5000/login/", {
            email: email,
            password: password
        })
            .then(function (response) {
                if (rememberMe) {
                    localStorage["email"] = email;
                    localStorage["token"] = response.data.accessToken;
                    sessionStorage.removeItem("email");
                    sessionStorage.removeItem("token");
                }
                else {
                    sessionStorage["email"] = email;
                    sessionStorage["token"] = response.data.accessToken;
                    localStorage.removeItem("email");
                    localStorage.removeItem("token");
                }
                context.setEmail(email);
                context.setToken(response.data.accessToken);
                context.setIsLoggedIn(true);
                history.push("/");
            })
            .catch(function (error) {
                if (!error.response) {
                    setErrors(["Cannot connect to server.Please try again later."]);
                    return;
                }
            });
    };

    return (
        <Card className="card-login">
            <Card.Body className="p-sm-4">
                <ToastContainer />
                <h1 className="text-center">Login</h1>
                <Alert variant="danger" className={errors.length == 0 ? "d-none" : ""}>
                    Please try again.
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email}
                            onInput={(e) => setEmail(e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                            onInput={(e) => setPassword(e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                <div className="text-center mt-3">
                    <Link to="/register">Register as a new user</Link>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Login;
