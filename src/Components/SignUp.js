import React, {useState} from "react";
import { auth,fs } from "../Firebase/Config";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SignUp = () => {

    const history = useHistory();

    const [firstName, setFistname]=useState('');
    const [lastName, setLastname]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    const handleSingup = (e) => {
        e.preventDefault();
        //console.log(firstName, lastName, email, password);
        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials);
            fs.collection('users').doc(credentials.user.uid).set({
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Password: password
            }).then(()=>{
                setSuccessMsg('Signup Successfull. You will now automatically get redirected to Login');
                setFistname('');
                setLastname('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    history.push('/login');
                },3000)
            }).catch(error=>setErrorMsg(error.message));
        }).catch((error)=>{
            setErrorMsg(error.message)
        })

    }
    

    return (
        <div className="container3">
                {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
                </>}
                <form className='form-group' autoComplete="off" onSubmit={handleSingup}>
                    <div>
                    <br></br>  
                     <h1 className="h3 mb-3 fw-normal text-center">Create Customer Account</h1>
                     <hr className="my-4"/> 
                    </div>
                        <div className="row g-3">
                            <div className="col-6">
                            <label for="name" className="form-label">First Name</label>
                            </div>
                            <div className="col-sm-6">
                            <input type="text" className="form-control" placeholder="" required
                            onChange={(e)=>setFistname(e.target.value)} value={firstName}></input>
                            </div>
                        </div>
                        <p> </p>
                        <div className="row g-3">
                           <div className="col-6">
                               <label for="lastname" className="form-label">Last Name</label>
                           </div>
                           <div className="col-sm-6">
                               <input type="text" className="form-control" placeholder=""  required
                               onChange={(e)=>setLastname(e.target.value)} value={lastName}></input>
                          </div>
                        </div>
                        <p> </p>
                        
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
                             {/* <!-- Submit button --> */}
                            <span>Already have an account Login
                            <Link to="login"> Here</Link> </span>
                            <button type="submit" className="btn btn-secondary btn-lg" id="submitButton">Create Acccount</button>
                        </div>
                </form>
                {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
                </>}
            </div>
    )
}

export default SignUp