import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isLoaded } from '../questions/questions-reducer';
import QuestionList from '../questions/question-list-component';
import SubmitQuestion from '../questions/submit-question-component';
import Header from './header-component';
import style from './home.scss';
import withEnv from '../../HOCs/with-auth';
import { compose } from 'lodash/fp';

const Home = props => (
    <React.Fragment>

        <Header/>

        {props.isLoaded ? (
            <div className={style.content}>
                <SubmitQuestion/>
                <QuestionList/>
            </div>   
        ) : (
            <div className={style.loader}>
                <img src="/static/loader.svg"/>
                <div className={style.message}>Loading...</div>
            </div>
        )}

    </React.Fragment>
);

const mapStateToProps = state => ({
    isLoaded: isLoaded(state)
});

const withStore = connect(
    mapStateToProps,
    null,
);

Home.propTypes = {
    isLoaded: PropTypes.bool
};

export default compose(
    withEnv,
    withStore
)(Home);
