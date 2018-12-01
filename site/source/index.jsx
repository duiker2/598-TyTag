import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

// Include your new Components here
import Home from './components/Home/Home.jsx';
import Tag from './components/Tag/Tag.jsx';
import Title from './components/Title/Title.jsx';

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss');

render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tag" component={Tag} />
            <Route exact path="/title" component={Title} />
        </Switch>
    </Router>,
    document.getElementById('app')
);
