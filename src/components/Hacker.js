import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from '../api/axiosConfig';
import HackerCard from './HackerCard';
import '../assets/css/Hacker.css';

export default function Hacker({ history }) {
    const [hackers,setHackers]=useState();
    const [err,setErr]=useState();

    useEffect(() => {
        let user = sessionStorage.getItem("cred-user");
        if (!user) {
            history.push('/');
        }else{
            axios.get('/hackers').then(res=>{
                console.log(res.data)
                setHackers(res.data);
            }).catch(error=>setErr(error.message));
        }
    }, [history])
    return(
        <div>
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">
                        Hackers Rank
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li className="active"><Link to="/hackers">Home</Link></li>
                            <li><a href="#">About</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#"><span className="glyphicon glyphicon-user"></span>{sessionStorage.getItem("cred-user")}</a></li>
                            <li onClick={()=>sessionStorage.removeItem("cred-user")}><Link to="/"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container text-center">
                <br/>
            <div class="row">
                {err && <h2>{err}</h2>}
                {hackers && hackers.map((hack,index)=><Link  key={index} to={`/hackers/${hack._id}`}>
                    <HackerCard hacker={hack}/></Link>)}

            </div>
            </div><br />
            </div>
    )
}