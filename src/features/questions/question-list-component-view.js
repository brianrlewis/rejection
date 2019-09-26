import React from 'react';
import PropTypes from 'prop-types';
import Question from './question-component';
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

QuestionListComponent.propTypes = {
    questions: PropTypes.array,
    updateQuestion: PropTypes.func,
    removeQuestion: PropTypes.func,
};

export default QuestionListComponent;