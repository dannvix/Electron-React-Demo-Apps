var App = React.createClass({
  render: function() {
    return (
      <ul>
        <li><a href="https://github.com/atom/electron">Electon</a> v{process.versions["electron"]}</li>
        <li><a href="https://www.chromium.org">Chromium</a> v{process.versions["chrome"]}</li>
        <li><a href="https://github.com/nodejs/io.js">io.js</a> {process.version}</li>
        <li><a href="https://github.com/facebook/react">React</a> v{React.version}</li>
      </ul>
    );
  }
});
