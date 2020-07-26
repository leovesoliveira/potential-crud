import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home'
import Create from './pages/Create'
import Edit from './pages/Edit'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/edit/:id" component={Edit} />
        </BrowserRouter>
    );
}
