var React = require('react');
var connect = require('react-redux').connect;
var createReactClass = require('create-react-class');

var Index = createReactClass({
    render: function() {
        var custom = this.props.custom;
        var tagName = "";
        return (
            <div>
                {custom.posts.map(post =>
                    <div key={post.ID} className={((obj) => {for(k in obj) { return obj[k].name; }})(post.tags)} dangerouslySetInnerHTML={{__html: post.content}}></div>
                )}
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
