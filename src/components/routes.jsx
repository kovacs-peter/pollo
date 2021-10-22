import React, { useState } from 'react';
import Layout from './layout/layout';
import Login from "./login";

const Routes = () => {
    const [user, setUser] = useState(null)
    
    if (user) return <Layout />
    return <Login />;   
}

export default Routes;
