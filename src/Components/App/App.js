
// NOTE

// GO TO STEP 90!!

// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchResults : [ { name: "name1", artist: "artist1", album: "album1", id: "id1" },
                        { name: "name2", artist: "artist2", album: "album2", id: "id2" },
                        { name: "name3", artist: "artist3", album: "album3", id: "id3" }],
      playlistName : "Playlist One",
      playlistTracks : [{name: "playlist1" , artist: "playlistartist1", album: "playlistalbum", id: "id4"},
                        {name: "playlist2" , artist: "playlistartist2", album: "playlistalbum", id: "id5"},
                        {name: "playlist3" , artist: "playlistartist3", album: "playlistalbum", id: "id6"}] 
  }
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
}

addTrack(track) {
  let tracks = this.state.playlistTracks;
  if (tracks.find(savedTrack => savedTrack.id === track.id)) {
    return;
  }
  tracks.push(track);
  this.setState({ playlistTracks : tracks });
}

removeTrack(track) {
  let tracks = this.state.playlistTracks;
  let filtered_tracks = tracks.filter(savedTrack => savedTrack.id !== track.id);
  this.setState({ playlistTracks : filtered_tracks });
}

updatePlaylistName(name) {
  this.setState({ playlistName: name});
}

savePlaylist() {
  const trackUris = this.state.playlistTracks.map(track => track.uri);
}

search(term) {
  Spotify.search(term).then(searchResults => {
    this.setState({searchResults: searchResults})
  })
}
  
render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack} /> 
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
