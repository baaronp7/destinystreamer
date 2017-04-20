var React = require('react');
var Link = require('react-router-dom').Link;
var connect = require('react-redux').connect;
var createReactClass = require('create-react-class');

var Layout = createReactClass({
    _handleClick: function() {
        alert();
    },
    render: function() {
        var custom = this.props.custom;
        return (
            <html>
                <head>
                    <title>{custom.title}</title>
                    <link rel='stylesheet' href='css/style.css' />
                </head>
                <body>
                    {this.props.children}
                    <script dangerouslySetInnerHTML={{
                        __html: 'window.PROPS=' + JSON.stringify(custom)
                    }} />
                    <script src='/bundle.js' />
                </body>
            </html>
        );
    }
});

var wrapper = connect(
    function(state) {
        return { custom: state };
    }
);

module.exports = wrapper(Layout);
