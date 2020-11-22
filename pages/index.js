import React from 'react'
import Layout from '../components/Layout/'
import Link from 'next/link'
import { authInitialProps } from '../lib/auth'

export default function index(props) {
    return (
        <Layout title="Home" {...props}>
            <div>
                <Link href={'/profile'}><a>Go to profile</a></Link>
            </div>
        </Layout>
    )
}

index.getInitialProps = authInitialProps();
