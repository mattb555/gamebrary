import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/firestore';

const FIREBASE_URL = 'https://us-central1-gamebrary-8c736.cloudfunctions.net';

export default {
    LOAD_GAMES({ commit }, gameList) {
        return new Promise((resolve, reject) => {
            axios.get(`${FIREBASE_URL}/games?games=${gameList}`)
                .then(({ data }) => {
                    commit('CACHE_GAME_DATA', data);
                    resolve();
                }).catch(reject);
        });
    },

    SAVE_LIST({ commit, state }, payload) {
        const db = firebase.firestore();

        db.collection('lists').doc(state.user.uid).set(payload, { merge: true })
            .then(() => {
                commit('SAVE_LISTS', payload);
            });
    },

    LOAD_RELEASES({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get('https://api.github.com/repos/romancm/gamebrary/releases')
                .then(({ data }) => {
                    commit('SET_RELEASES', data);
                    resolve();
                }).catch(reject);
        });
    },

    LOAD_PUBLIC_GAMES({ commit }, gameList) {
        return new Promise((resolve, reject) => {
            axios.get(`${FIREBASE_URL}/games?games=${gameList}`)
                .then(({ data }) => {
                    commit('SET_PUBLIC_GAME_DATA', data);
                    resolve();
                }).catch(reject);
        });
    },

    LOAD_GAME({ commit }, gameId) {
        return new Promise((resolve, reject) => {
            axios.get(`${FIREBASE_URL}/game?gameId=${gameId}`)
                .then(({ data }) => {
                    commit('SET_ACTIVE_GAME', data);
                    resolve();
                }).catch(reject);
        });
    },

    SEARCH({ commit, state }, searchText) {
        return new Promise((resolve, reject) => {
            axios.get(`${FIREBASE_URL}/search?search=${searchText}&platform=${state.platform.id}`)
                .then(({ data }) => {
                    commit('SET_SEARCH_RESULTS', data);
                    commit('CACHE_GAME_DATA', data);
                    resolve();
                }).catch(reject);
        });
    },

    SEND_WELCOME_EMAIL(context, additionalUserInfo) {
        return new Promise((resolve, reject) => {
            if (additionalUserInfo && additionalUserInfo.profile) {
                axios.get(`${FIREBASE_URL}/email?address=${additionalUserInfo.profile.email}&template_id=welcome`)
                    .catch(reject);
            } else {
                reject();
            }
        });
    },
};
