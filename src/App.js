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
    fetch("http://localhost/wp-json/wp/v2/posts/1")
      .then(res => res.json())
        .then(
          (wpResponse) => {
            console.log(wpResponse.author);
            var authorId = wpResponse.author;
            fetch("http://localhost/wp-json/wp/v2/users/" + authorId)
              .then(res => res.json())
                .then(
                  (authorResponse) => {
                    console.log(authorResponse.name);
                    this.setState({
                      
                    })
                  }
                )
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
