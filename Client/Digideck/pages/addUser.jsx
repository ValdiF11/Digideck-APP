import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/preloader";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <section className="container" id="login-section">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2 my-5">
            <div className="row">
              <div className="col-12 col-md-6 border-end p-5 text-center">
                {" "}
                {/* Centering the image */}
                <img src="logo.png" width="300px" alt="sofa" className="mx-auto d-block" />
              </div>
              <div className="col-12 col-md-6 p-5 text-left">
                <div className="form-signin m-auto">
                  <form
                    onSubmit={async function formOnSubmit(event) {
                      event.preventDefault();
                      try {
                        // 1. request ke server
                        const response = await axios({
                          method: "POST",
                          url: import.meta.env.VITE_API_BASE_URL + "/add-user",
                          data: {
                            email: email,
                            password: password,
                            username: username,
                          },
                        });
                        console.log(response);
                        // 2. save token ke local
                        localStorage.acces_token = response.data.acces_token;
                        // 3. redirect
                        navigate("/login");
                      } catch (error) {
                        const errMsg = error.response.data.message;
                        Swal.fire({
                          title: `Error!`,
                          text: errMsg,
                          icon: `error`,
                        });
                      }
                    }}
                    id="login-form"
                  >
                    <h1 className="h3 mb-3 text-center">Sign Up</h1> {/* Centering the heading */}
                    <div className="mb-3 mt-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-email">Username</label>
                        <label className="text-danger text-end fw-bold">*</label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="login-email"
                        placeholder="Enter Username"
                        autoComplete="off"
                        name="email"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                      />
                    </div>
                    <div className="mb-3 mt-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-email">Email</label>
                        <label className="text-danger text-end fw-bold">*</label>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        id="login-email"
                        placeholder="Enter email address ..."
                        autoComplete="off"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-password">Password</label>
                        <label className="text-danger text-end fw-bold">*</label>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        id="login-password"
                        placeholder="Enter your password ..."
                        autoComplete="off"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                    <button className="btn btn-lg btn-primary rounded-pill w-100 p-2" type="submit">
                      Sign Up
                    </button>
                  </form>

                  <div className="mb-3 text-center pt-4">
                    <p>
                      Already have an account?<Link to={"/Login"}> Login</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
