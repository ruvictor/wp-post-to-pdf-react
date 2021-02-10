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

            // filter post text
            const postContent = wpResponse.content.rendered.replace(/<\/?[^>]+(>|$)/g, "");
            
            this.setState({
              ...this.state,
              post: {
                postTitle: wpResponse.title.rendered,
                postImage: wpResponse._embedded["wp:featuredmedia"][0].source_url,
                postText: postContent,
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
    const { postTitle, postImage, postText, postAuthor } = this.state.post;
    return (
      <div className="App">
        {this.state.isLoaded ? 
        (<PDFViewer>
          <Quixote
            postTitle={postTitle}
            postImage={postImage}
            postText={postText}
            postAuthor={postAuthor}
          />
        </PDFViewer>) : 'PDF Loading...' }
      </div>
    );
  }
}

export default App;
