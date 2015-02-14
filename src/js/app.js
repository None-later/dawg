/** @jsx React.DOM */

var App = React.createClass({displayName: "App",
  render: function () {
    return (
      React.createElement("h2", null, "I am the sub-header")
    )
  }
});

React.render(React.createElement(App, null), document.body); 
