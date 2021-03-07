import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from 'vue-router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        preloadInitialized: false,
        preload: {
            user: {
                id: '',
                email: '',
                firstName: '',
                lastName: '',
                role: ''
            }
        }
    },
    mutations: {
        setUserProfile(state, user) {
            state.preload.user = user;
            state.preloadInitialized = true;
        },

        unsetUserProfile(state) {
            state.preload.user = {
                id: '',
                email: '',
                firstName: '',
                lastName: '',
                role: ''
            }
            state.preloadInitialized = false;
        }
    },
    actions: {
        async authenticate({
            dispatch
        }, { email, password }: { email: string; password: string }) {
            try {
                // sign user in
                const { user } = await fb.auth.signInWithEmailAndPassword(email, password);

                // fetch user profile and set in state
                if (user) {
                    dispatch('fetchUserProfile', user)
                }
            } catch (error) {

                //something wrong
                console.error(error);
            }
        },

        async logout({ commit }) {
            try {

                // firebase sign out
                await fb.auth.signOut();

            } catch (error) {

                //something wrong
                console.error(error);
            }
        },

        async fetchUserProfile({ commit }, user) {
            try {
                // fetch user profile
                const userProfile = await fb.usersCollection.doc(user.uid).get();
                const uid = { id: user.uid };
                let userData = {}
                if (userProfile) {
                    userData = { ...uid, ...userProfile.data()}
                    // set user profile in state
                    commit('setUserProfile', userData);
                }
            } catch (error) {

                //something wrong
                console.error(error);
            }
        }
    },
    modules: {
    }
})
