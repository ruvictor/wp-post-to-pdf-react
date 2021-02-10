import React, { Component } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Quixote from './components/WPpdf';
import './App.css';

class App extends Component {

  state = {
    post: {
      postTitle: '',
      postImage: '',
      postText: '',
      postAuthor: ''
    },
    isLoaded: false
  }

  componentDidMount() {
    fetch("http://localhost/wp-json/wp/v2/posts/1?_embed")
      .then(res => res.json())
        .then(
          (wpResponse) => {
            
            this.setState({
              ...this.state,
              post: {
                postTitle: wpResponse.title.rendered,
                postImage: wpResponse._embedded["wp:featuredmedia"][0].source_url,
                postText: wpResponse.content.rendered,
                postAuthor: wpResponse._embedded.author[0].name
              },
              isLoaded: true
            })
          },
          (error) => {
            this.setState({
                isLoaded: false,
                error
            });
          }
        )
  }

  render(){
    return (
      <div className="App">
        <PDFViewer>
          <Quixote />
        </PDFViewer>
      </div>
    );
  }
}

export default App;
