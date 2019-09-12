import React from 'react';
import { connect } from 'react-redux';
import Question from './question-component';
import {
    getQuestions,
    removeQuestion,
    updateQuestion,
} from './questions-reducer';
import style from './question-list-component.scss';

const QuestionListComponent = props => (        
    <div className={style.wrapper}>
        {props.questions.map(question => (
            <Question
                question={question}
                key={question.id}
                onUpdate={(id, fields) => props.updateQuestion({ id, fields })}
                onRemove={props.removeQuestion}/>
        ))}
    </div>
);

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
)(QuestionListComponent);
  