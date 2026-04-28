import axios from 'axios';
import { serverUrl } from '../environment/environment';

// Action Types
export const FETCHED_MUSICS = "FETCHED_MUSICS";
export const FETCHED_MUSICS_ERROR = "FETCHED_MUSICS_ERROR";
export const ADD_MUSIC_ERROR = "ADD_MUSIC_ERROR";
export const UPDATE_MUSIC_ERROR = "UPDATE_MUSIC_ERROR";
export const DELETE_MUSIC_ERROR = "DELETE_MUSIC_ERROR";

// 🔐 AUTH HEADER
const getAuthHeader = () => ({
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
});

// GET (Public)
export function fetchMusics() {
    return dispatch => {
        axios.get(serverUrl + 'musics')
            .then(res => dispatch({
                type: FETCHED_MUSICS,
                payload: res.data
            }))
            .catch(error => dispatch({
                type: FETCHED_MUSICS_ERROR,
                payload: error
            }));
    };
}

// POST (Admin only)
export function addMusic(music) {
    return dispatch => {
        axios.post(serverUrl + 'musics', music, getAuthHeader())
            .then(() => dispatch(fetchMusics()))
            .catch(error => dispatch({
                type: ADD_MUSIC_ERROR,
                payload: error
            }));
    };
}

// PUT (Admin only)
export function updateMusic(music) {
    return dispatch => {
        axios.put(serverUrl + 'musics', music, getAuthHeader())
            .then(() => dispatch(fetchMusics()))
            .catch(error => dispatch({
                type: UPDATE_MUSIC_ERROR,
                payload: error
            }));
    };
}

// DELETE (Admin only)
export function deleteMusic(id) {
    return dispatch => {
        axios.delete(serverUrl + 'musics/' + id, getAuthHeader())
            .then(() => dispatch(fetchMusics()))
            .catch(error => dispatch({
                type: DELETE_MUSIC_ERROR,
                payload: error
            }));
    };
}