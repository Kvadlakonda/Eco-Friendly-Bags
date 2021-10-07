import React, {useState} from "react";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/Config";
import { useHistory } from "react-router";

export const Login = () => {

    const history = useHistory();

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        //console.log(email, password);
        auth.signInWithEmailAndPassword(email,password).then(()=>{
            setSuccessMsg('Login Successfull. You will now automatically get redirected to Home page');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(()=>{
                setSuccessMsg('');
                history.push('/');
            },3000)
        }).catch(error=>setErrorMsg(error.message));

    }

    return (
        <div className="container3">
                {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
                </>}
                <form className='form-group' autoComplete="off" onSubmit={handleLogin}>
                    <br></br>  
                    <h1 className="h3 mb-3 fw-normal text-center">Customer Login</h1>
                    <hr className="my-4" /> 
                    <div className="row g-3">
                        <div className="col-6">
                            <label for="email" className="form-label">Email Address</label>
                        </div>
                        <div className="col-sm-6">
                            <input type="email" className="form-control" placeholder="" required
                            onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                        </div>
                    </div>
                    <p> </p>
                    <div className="row g-3">
                        <div className="col-6">
                            <label for="password" className="form-label">Password</label>
                        </div>
                        <div className="col-6">
                            <input type="password" className="form-control" placeholder="" required
                            onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                        </div>
                     {/*      <!-- Submit button --> */}
                    <span>Don't have an account SingUp
                            <Link to="singup"> Here</Link> </span>
                    <button
                        type="submit"
                        className="btn btn-secondary btn-lg"
                        id="submitButton"
                    >
                        Sign In
                    </button>
                    </div>
                 </form>
                 {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
                </>}
            </div>
    )
}

export default Login