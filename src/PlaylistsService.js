const { Pool } = require('pg');
const { mapDBToModelPlaylist } = require('./utils');
 
class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsInPlaylist(playlistId, userId) {
    const Playlistquery = {
      text: `SELECT id, name
        FROM playlists
        WHERE owner = $1 AND id = $2`,
      values: [userId, playlistId],
    };
    const result = await this._pool.query(Playlistquery);
    const playlistResult = { playlist: result.rows.map(mapDBToModelPlaylist)[0] };
    const songsQuery = {
      text: `SELECT playlist_songs.song_id as id,songs.title,songs.performer
              FROM playlist_songs
              LEFT JOIN songs ON songs.id = playlist_songs.song_id
              WHERE playlist_songs.playlist_id = $1 `,
      values: [playlistId],
    };
    const songsResult = await this._pool.query(songsQuery);
    playlistResult.playlist.songs = songsResult.rows;
    console.log(playlistResult);
    return playlistResult;
  }
}

module.exports = PlaylistsService;
