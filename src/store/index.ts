import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        preload: {
            user: {
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
        },

        unsetUserProfile(state) {
            state.preload.user = {
                email: '',
                firstName: '',
                lastName: '',
                role: ''
            }
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

                // remove the user profile state
                commit('unsetUserProfile');
            } catch (error) {

                //something wrong
                console.error(error);
            }
        },

        async fetchUserProfile({ commit }, user) {
            try {
                // fetch user profile
                const userProfile = await fb.usersCollection.doc(user.uid).get();

                if (userProfile) {
                    // set user profile in state
                    commit('setUserProfile', userProfile.data());
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
