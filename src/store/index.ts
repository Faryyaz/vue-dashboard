import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'

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
            for(const property in state.preload.user) {
                if (user[property] !== '' && user[property] !== undefined) {
                    (state.preload.user as any)[property] = user[property];
                }
            }
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
        }, { email, password, vm }: { email: string; password: string; vm: Vue }) {
            try {
                // sign user in
                const { user } = await fb.auth.signInWithEmailAndPassword(email, password);

                // fetch user profile and set in state
                if (user) {
                    dispatch('fetchUserProfile', user)
                }
            } catch (error) {
                if (error) {
                    if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                        const errorMessage = 'The email or password is incorrect. Please try again.';
                        vm.$root.$emit('failed-notification', errorMessage);
                    } else {
                        vm.$root.$emit('failed-notification', error.message);
                    }
                }
            }
        },

        async logout() {
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
