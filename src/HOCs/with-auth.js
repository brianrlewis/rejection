import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initDb } from '../features/firebase/firebase-client';
import { initialize as initAuth } from '../features/user-auth/user-auth-reducer';

const withEnv = WrappedComponent => {
    const WrappedComponentWithEnv = class WithEnv extends Component {
        static async getInitialProps(ctx) {
            const passthroughProps = WrappedComponent.getInitialProps
                ? await WrappedComponent.getInitialProps(ctx)
                : {};

            return {
                dbConfig: {
                    apiKey: process.env.FIREBASE_APIKEY,
                    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                    databaseURL: process.env.FIREBASE_DB_URL,
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
                    messagingSenderId: process.env.FIREBASE_MESS_SENDER_ID,
                },
                ...passthroughProps
            };
        }

        componentDidMount() {
            initDb(this.props.dbConfig);
            this.props.initAuth();     
        }

        render() {
            return <WrappedComponent {...this.props}/>;
        }
    }

    const mapDispatchToProps = {
        initAuth,
    };
    
    return connect(
        null,
        mapDispatchToProps
    )(WrappedComponentWithEnv);
};

export default withEnv;