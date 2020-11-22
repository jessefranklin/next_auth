import React from 'react'
import Link from 'next/link'
import { logOutUser } from '../../lib/auth'

const Layout = ({ title, children, auth }) => {
    const { user = {} } = auth || {};
    return (
        <div className="root">
            <nav className="navbar">
                <span>Welcome, <strong>{user.name || 'Guest'}</strong></span>
                <div>
                    <Link href='/'><a>Home</a></Link>
                    {user.email ? (
                        <>
                            <Link href='/profile'><a>Profile</a></Link>
                            <button onClick={logOutUser}>Logoout</button>
                        </>
                    ) : (
                        <>
                            <Link href='/login'><a>Login</a></Link>
                        </>
                    )}
                </div>
            </nav>
            <h1>{title}</h1>
            {children}
            <style jsx>{`
                .root {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                }
                .navbar {
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                }
                a {
                    margin-right: 0.5rem;
                }
                button {
                    text-decoration: underline;
                    passing: 0;
                    font: inherit;
                    background: transparent;
                    border-style: none; 
                    color: rgb(0,0, 238);
                }
            `}</style>
        </div>
    )
}

export default Layout;