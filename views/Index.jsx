var React = require('react');
var connect = require('react-redux').connect;
var createReactClass = require('create-react-class');

var Index = createReactClass({
    render: function() {
        var custom = this.props.custom;
        return (
            <div>
                <h1>{custom.title}</h1>
                <div dangerouslySetInnerHTML={{__html: custom.content}}></div>
            </div>
        );
    }
});

var wrapper = connect(
    function(state) {
        return { custom: state };
    }
);

module.exports = wrapper(Index);
