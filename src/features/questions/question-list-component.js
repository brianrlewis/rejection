import { connect } from 'react-redux';
import QuestionList from './question-list-component-view';
import {
    getQuestions,
    removeQuestion,
    updateQuestion,
} from './questions-reducer';

const mapStateToProps = state => ({
    questions: getQuestions(state)
                .sort((a, b) => b.timestamp - a.timestamp),
});
  
const mapDispatchToProps = {
    removeQuestion,
    updateQuestion,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(QuestionList);
  