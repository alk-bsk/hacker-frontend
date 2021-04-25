import React, { useEffect, useState } from 'react';
import {Link,NavLink} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import '../assets/css/Hacker.css';
import Aloke from '../assets/images/Aloke.jpg'

export default function HackerDetails({history}) {
    const [hackers,setHackers]=useState();
    const [err,setErr]=useState();
    const [active,setActive]=useState("home");
    let {id}=useParams();

    useEffect(() => {
        let user = sessionStorage.getItem("cred-user");
        if (!user) {
            history.push('/');
        }else{
            axios.get(`/hacker/${id}`).then(res=>{
                setErr();
                setHackers(res.data);
            }).catch(error=>setErr(error.message));
        }
    }, [history, id])
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
                            <li onClick={()=>sessionStorage.removeItem("cred-user")}><Link to='/'><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container text-center">
                <br/>
            <div className="row">
                {err && <h2>{err}</h2>}
                {hackers && 
                <div className="col-lg-12">
                 <img className="img-circle" src={Aloke} alt="Generic placeholder" width="140" height="140" />
                 <h1>{hackers.Name}</h1>
                 <table className="table table-bordered table-striped" style={{backgroundColor:"#94ad87a8"}}>
                <thead>
                    <tr>
                    <th scope="col">Key points</th>
                    <th scope="col">Details</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    <tr>
                    <th scope="row">Profile Link : </th>
                    <td>{hackers["Profile Link"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">Location : </th>
                    <td>{hackers["Location"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">Education : </th>
                    <td>{hackers["Education"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">Challenges solved : </th>
                    <td>{hackers["Challenges solved"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">Solutions submitted : </th>
                    <td>{hackers["Solutions submitted"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">Solution accepted : </th>
                    <td>{hackers["Solution accepted"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">Overall Rank : </th>
                    <td>{hackers["Overall Rank"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">Followers : </th>
                    <td>{hackers["Followers"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">Following : </th>
                    <td>{hackers["Following"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">Competitive Percentile : </th>
                    <td>
                        
                        <table className="table table-bordered table-striped" >
                        <thead>
                            <tr>
                            <th scope="col">Subject</th>
                            <th scope="col">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                    <th scope="row">Data Structures : </th>
                    <td>{hackers["Competitive Percentile"]["Data Structures"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">Algorithms : </th>
                    <td>{hackers["Competitive Percentile"]["Algorithms"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">C++ : </th>
                    <td>{hackers["Competitive Percentile"]["C++"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">Java : </th>
                    <td>{hackers["Competitive Percentile"]["Java"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">Python : </th>
                    <td>{hackers["Competitive Percentile"]["Python"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">HTML : </th>
                    <td>{hackers["Competitive Percentile"]["HTML"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">Javascript : </th>
                    <td>{hackers["Competitive Percentile"]["Javascript"]}</td>
                    </tr>
                        </tbody>
                        </table>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">No of votes : </th>
                    <td>{hackers["No of votes"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">Timestamp : </th>
                    <td>{hackers["Timestamp"]}</td>
                    </tr>
                    <tr>
                    <th scope="row">Device type : </th>
                    <td>{hackers["Device type"]}</td>
                    </tr>
                </tbody>
                </table>
                </div>
                }

            </div>
            </div><br />
            </div>
    )
}