import { isAuthenticated } from '../auth'
import Layout from '../core/Layout'
import { Link } from 'react-router-dom'
import { getPurchaseHistory } from './apiUser'
import { useEffect, useState } from 'react'
import moment from 'moment'
const Dashboard = () => {
    const { user: { name, email, role, _id } } = isAuthenticated()
    const token = isAuthenticated().token
    const [history, setHistory] = useState([])

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            console.log(data)
            if (data.error) console.log(data.error)
            else setHistory(data)
        })
    }
    useEffect(() => {
        init(_id, token)
    }, [])
    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header" style={{ backgroundColor: '#001233', color: '#EFE0CA', padding: '10px' }}>User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item" style={{ backgroundColor: '#EFE0CA', color: '#001233' }}>
                        <Link style={{ backgroundColor: '#EFE0CA' }} className={`nav-link`} to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item" style={{ backgroundColor: '#EFE0CA', color: '#001233' }}>
                        <Link style={{ backgroundColor: '#EFE0CA' }} className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>
                    </li>

                </ul>

            </div>
        )
    }

    const userInfo = () => {
        return (<div className="card mb-5">
            <h3 style={{ backgroundColor: '#001233', color: '#EFE0CA' }} className="card-header">User Information</h3>
            <ul className="list-group">
                <li style={{ backgroundColor: '#EFE0CA', color: '#001233' }} className="list-group-item">{name}</li>
                <li style={{ backgroundColor: '#EFE0CA', color: '#001233' }} className="list-group-item">{email}</li>
                <li style={{ backgroundColor: '#EFE0CA', color: '#001233' }} className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
            </ul>

        </div>)
    }

    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header" style={{ backgroundColor: '#001233', color: '#EFE0CA' }}>Purchase history</h3>
                <ul className="list-group">
                    <li style={{ backgroundColor: '#EFE0CA', color: '#001233' }} className="list-group-item">
                        {console.log(history)}
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>Product price: Rs.{p.price}</h6>
                                                <h6>Product Quantity: Rs.{p.count}</h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(p.createdAt).fromNow()}
                                                </h6>
                                                <br></br>
                                                {console.log(p)}
                                            </div>
                                        );
                                    })}
                                    <h6 className='badge btn-dark'>Total amount: Rs.{h.amount}</h6><br></br>
                                    
                                    
                                        <h6 className='badge btn-primary'>Status: {h.status}</h6>
                                    
                                    
                                    
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };



    return (
        <Layout title="Dashboard" description={`Hello ${name}!`} className="container">
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;
