import React, { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import createStore from '../redux/store';

class MyApp extends App {
    constructor(props) {
        super(props);
    }

    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        return { pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Fragment>
                <Head>
                    <title>Rejection App</title>
                </Head>        
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>            
            </Fragment>
        );
    }
}

export default withRedux(createStore)(MyApp);
