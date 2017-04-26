var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = require('react-router-dom').BrowserRouter;
var NotFoundRoute = require('react-router-dom').NotFoundRoute;
var Switch = require('react-router-dom').Switch;
var Route = ReactRouter.Route;
var Layout = require('./Layout.jsx');
var NotFound = require('./NotFound.jsx');
var browserHistory = ReactRouter.browserHistory;
var Home = require('./Index.jsx');
var CharacterPreview = require('./CharacterPreview.js');
var About = require('./About.jsx');

module.exports = (
    <Layout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/widgets/character' component={CharacterPreview} />
            <Route path='/about' component={About} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Layout>
);
