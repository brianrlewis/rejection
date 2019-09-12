import React from 'react';
import { connect } from 'react-redux';
import { isAuthComplete } from '../user-auth/complete-reducer';
import { initialize as initAuth } from '../user-auth/user-auth-reducer';
import QuestionList from '../questions/question-list-component';
import SubmitQuestion from '../questions/submit-question-component';
import Header from './header-component';
import style from './index.scss';
import { initDb } from './../firebase/firebase-client';

class Home extends React.Component {
    static async getInitialProps(ctx) {
        const serverRendered = !process.browser;
  
        return {
            dbConfig: serverRendered ? {
                apiKey: process.env.FIREBASE_APIKEY,
                authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                databaseURL: process.env.FIREBASE_DB_URL,
                projectId: process.env.FIREBASE_PROJECT_ID,
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
                messagingSenderId: process.env.FIREBASE_MESS_SENDER_ID,
            } : null
        };
    }

    componentDidMount() {
        if (this.props.dbConfig !== null) {
            initDb(this.props.dbConfig);
            this.props.initAuth();
        }
    }

    render() {
        const props = this.props;

        return (
            <div>

                <Header/>

                {props.isLoaded ? (
                    <div className={style.content}>
                        <SubmitQuestion/>
                        <QuestionList/>
                    </div>   
                ) : (
                    <div className={style.loader}>
                        <img src="/static/loader.svg" />
                        <div className={style.message}>Loading...</div>
                    </div>    
                )}

            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoaded: isAuthComplete(state),
});

const mapDispatchToProps = {
    initAuth,
};
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);