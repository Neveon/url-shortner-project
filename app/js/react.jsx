const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input:''
    };
    
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  
  render(){
    return(
      <div>
        <h1 className="text-center">API Project: URL Shortner Microservice</h1>
        <br/><br/>
        
        <h3 className="text-center">Short URL Creation</h3>
        <div className="text-center">
          <p>Example: &nbsp;<code>POST [this_project_url]/api/shorturl/new/<b>https://www.google.com</b></code></p>
        </div>
        <div className="text-center">
          <h6 className="text-center">Website entered:</h6>
          <p className="text-center">{this.state.input}</p>
          <br/>
          <form action="/api/shorturl/new" method="POST" >
            <input value = {this.state.input}
          onChange = {this.handleChange.bind(this)} placeholder="URL to be shortened"
              name="original_url" />
          &nbsp;&nbsp;<input type="submit" className="btn-default" value="Post URL"/>
          </form>
        </div>
        <br/> <br/>
        <h3 className="text-center">Short URL Example:</h3>
        <div className="text-center">
          <p>Try me: &nbsp;<a href="https://neveon-url-short.glitch.me/api/shorturl/6903">[this_project_url]/api/shorturl/<b>6903</b></a></p>
          <br/>
          <h3>Will Redirect to:</h3>
          <div><p>https://www.youtube.com</p></div>
        </div>
        <footer className="text-center">by <a href="https://github.com/neveon">Neveon</a></footer>
      </div>
    );
  }
}

ReactDOM.render(<App/>,document.getElementById('app'));
