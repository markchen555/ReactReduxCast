import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

import SearchBar from './components/search_bar';

const API_KEY = 'AIzaSyAuQCVeNfKhtRk9KlChQPT1nO27DPO_5Ss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('Game')
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
       });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300); // throttle user input to trigger videoSearch every 300 m/s.
    return (
      <div className="container">
        <div>
          <SearchBar onSearchTermChange={ videoSearch } />
        </div>
        <div className="row">
          <VideoDetail video={ this.state.selectedVideo } />
          <VideoList 
          onVideoSelect = { selectedVideo => this.setState({ selectedVideo })}
          videos={ this.state.videos } />
        </div>
      </div>
    );
  }
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
