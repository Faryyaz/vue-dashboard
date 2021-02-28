import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import axios from 'axios'

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
        setPreload(state, user) {
            state.preload.user = user;
            // console.log(state.preload);
        }
    },
    actions: {
        authenticate({
            commit
        }, { email, password }: { email: string; password: string }) {
            let fullName: any = ['', ''],
                firstName = '',
                lastName = '';
            //@TODO retrive user role
            return firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    if (userCredential) {
                        fullName = userCredential.user?.displayName !== '' ? userCredential.user?.displayName?.split(' ') : [];

                        if (fullName) {
                            firstName = fullName[0];
                            lastName = fullName[1];
                        }

                        commit('setPreload', {
                            email: userCredential.user?.email,
                            firstName: firstName,
                            lastName: lastName
                        });

                        return Promise.resolve(Object.assign({}, userCredential));
                    }
                });
        }
    },
    modules: {
    }
})
