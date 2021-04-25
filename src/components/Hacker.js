import React, { useEffect, useState } from 'react';
import {Link, NavLink} from 'react-router-dom';
import axios from '../api/axiosConfig';
import HackerCard from './HackerCard';
import '../assets/css/Hacker.css';

export default function Hacker({ history,top }) {
    const [hackers,setHackers]=useState();
    const [err,setErr]=useState();
    const [active,setActive]=useState("home");
    const [topHack,setTopHack]=useState(3);

    useEffect(() => {
        setErr("");
        let user = sessionStorage.getItem("cred-user");
        if (!user) {
            history.push('/');
        }else{
            let url="";
            if(top){
                url=`/hackers-rank/${3}`
            }else{
                url="/hackers"
            }
            axios.get(url).then(res=>{
                setHackers(res.data);
            }).catch(error=>setErr(error.message));
        }
    }, [history,top])

    const fetchData=(data)=>{
        setTopHack(data);
        axios.get(`/hackers-rank/${data}`).then(res=>{
            setHackers(res.data);
        }).catch(error=>setErr(error.message));
    }

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
                        <Link className="navbar-brand" to="/hackers">
                        Hackers Rank
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li className={active==="home"?"active":""} onClick={()=>setActive("home")}>
                            <NavLink to="/hackers" activeClassName="active">Home</NavLink></li>
                            <li className={active==="top"?"active":""} onClick={()=>setActive("top")}>
                                <NavLink to="/topHackers" activeClassName="active">Top hackers</NavLink></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href><span className="glyphicon glyphicon-user"></span>{sessionStorage.getItem("cred-user")}</a></li>
                            <li onClick={()=>sessionStorage.removeItem("cred-user")}><Link to="/"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container text-center">
                <br/>
            {top?<span>
                <form className="form-inline">
                    <div className="form-group">
                        <label ><h1>Top Hackes : </h1></label>
                       
                    </div>
                   
                    <select className="form-control" value={topHack} onChange={(e)=>fetchData(e.target.value)}>
                            <option >1</option>
                            <option defaultValue>3</option>
                            <option >10</option>
                            <option >50</option>
                            <option>All</option>
                        </select>
                </form><hr/>
                </span>
            :null}
           
            <br/>
            <div className="row">
                {err && <h2>{err}</h2>}
                {hackers && hackers.map((hack,index)=><Link  key={index} to={`/hackers/${hack._id}`}>
                    <HackerCard hacker={hack}/></Link>)}

            </div>
            </div><br />
            </div>
    )
}