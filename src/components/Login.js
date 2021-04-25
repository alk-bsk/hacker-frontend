import React,{useState,useEffect} from 'react';
import axios from '../api/axiosConfig';
import '../assets/css/login.css';

function Login({history}) {
    const [user,setUser]=useState();
    const [pass,setPass]=useState();
    const [confPass,setConfPass]=useState();
    const[signup,setSignup]=useState(true);
    const [msg,setMsg]=useState();
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        setLoading(false);
        setMsg();
    },[])

    const clickSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        if(signup){
            axios.post('/signup',{user,pass:pass}).then(res=>{
                setMsg("successfully sign up.")
                setSignup(false);
                setLoading(false);
            }).catch(err=>{
                setMsg("user already exist.");
                setLoading(false);
            });
        }else{
            axios.post('/signin',{user,pass:pass}).then(res=>{
                if(res.data.length>0){
                    setLoading(false);
                    sessionStorage.setItem("cred-user",res.data[0].user);
                    history.push("/hackers");
                }else{
                    setMsg("Invalid credentials !");
                    setLoading(false);
                }
            }).catch(err=>setMsg(err.message));
        }
    }

    return (
        <div className="main-w3layouts wrapper">
            {signup?<h1>Hacker Sign Up</h1>:<h1>Hacker Sign In</h1>}
            <div className="main-agileinfo">
                <div className="agileits-top">
                    <form >
                        <input type="text" name="Username" 
                        placeholder="Username" onChange={(e)=>setUser(e.target.value)}
                        />
                        <br />
                        <input  type="password" name="password"
                         placeholder="Password" onChange={(e)=>setPass(e.target.value)}
                         />
                        <br />
                        {signup?
                        <input  type="password" name="password"
                         placeholder="Confirm Password" onChange={(e)=>setConfPass(e.target.value)}
                         />
                        :null}
                        <div className="wthree-text">
                            <div className="clear"> </div>
                            {confPass && confPass !==pass && <p className="mt-2">password and confirm password is not same.</p> }
                            {msg && <p className="mt-2">{msg}</p>}
					    </div>
                        <input type="submit" value={loading?"Loading....!":signup?"SIGNUP":"SIGNIN"} 
                        disabled={signup?user && pass && confPass?false:true
                        :user && pass?false:true}
                        onClick={(e)=>clickSubmit(e)}/>


                        <p className="gotoLink" onClick={()=>{setSignup(!signup);setMsg()}}>
                            {signup?<u>Go to sign in</u>:<u>Go to sing up</u>}
                        </p>
				    </form>
                </div>
		</div>

        <ul className="colorlib-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
	</div>
    );


}

export default React.memo(Login);
