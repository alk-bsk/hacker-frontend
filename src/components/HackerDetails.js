import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import '../assets/css/Hacker.css';
import Aloke from '../assets/images/Aloke.jpg'

export default function HackerDetails({history}) {
    const [hackers,setHackers]=useState();
    const [err,setErr]=useState();
    let {id}=useParams();

    useEffect(() => {
        let user = sessionStorage.getItem("cred-user");
        if (!user) {
            history.push('/');
        }else{
            axios.get(`/hacker/${id}`).then(res=>{
                setErr()
                setHackers(res.data);
            }).catch(error=>setErr(error.message));
        }
    }, [])
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
                            <li onClick={()=>sessionStorage.removeItem("cred-user")}><Link to='/'><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container text-center">
                <br/>
            <div class="row">
                {err && <h2>{err}</h2>}
                {hackers && 
                <div class="col-lg-12">
                 <img class="img-circle" src={Aloke} alt="Generic placeholder image" width="140" height="140" />
                 <h1>{hackers.Name}</h1>
                 <ul>
                     <li><p>{"Profile Link : " +hackers["Profile Link"]}</p></li>
                     <li><p>{"Location : " +hackers["Location"]}</p></li>
                     <li><p>{"Education : " +hackers["Education"]}</p></li>
                     <li><p>{"Challenges solved : " +hackers["Challenges solved"]}</p></li>
                     <li><p>{"Solutions submitted : " +hackers["Solutions submitted"]}</p></li>
                     <li><p>{"Solution accepted : " +hackers["Solution accepted"]}</p></li>
                     <li><p>{"Overall Rank : " +hackers["Overall Rank"]}</p></li>
                     <li><p>{"Followers : " +hackers["Followers"]}</p></li>
                     <li><p>{"Following : " +hackers["Following"]}</p></li>
                     <li><p>{"Competitive Percentile : " }</p>
                        <ul>
                            <li>{"Data Structures : "+hackers["Competitive Percentile"]["Data Structures"]}</li>
                            <li>{"Algorithms : "+hackers["Competitive Percentile"]["Algorithms"]}</li>
                            <li>{"C++ : "+hackers["Competitive Percentile"]["C++"]}</li>
                            <li>{"Java : "+hackers["Competitive Percentile"]["Java"]}</li>
                            <li>{"Python : "+hackers["Competitive Percentile"]["Python"]}</li>
                            <li>{"HTML : "+hackers["Competitive Percentile"]["HTML"]}</li>
                            <li>{"Javascript : "+hackers["Competitive Percentile"]["Javascript"]}</li>
                            
                        </ul>
                     </li>
                     <li><p>{"No of votes : " +hackers["No of votes"]}</p></li>
                     <li><p>{"Timestamp : " +hackers["Timestamp"]}</p></li>
                     <li><p>{"Device type : " +hackers["Device type"]}</p></li>
                 </ul>
                </div>
                }

            </div>
            </div><br />
            </div>
    )
}