import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextField from '../../components/text-field-component';
import StatusField from '../../components/status-field-component';
import { addQuestion } from './questions-reducer';
import { Statuses } from '../../../config/config';
import style from './submit-question-component.scss';

const SubmitQuestionComponent = props => {
    const [question, setQuestion] = useState('');
    const [askee, setAskee] = useState('');
    const [status, setStatus] = useState(Statuses.ACCEPTED);

    const submit = () => {
        if (question === '') {
            alert('You cannot submit an empty question');
        } else {
            props.addQuestion({
                question, askee, status
            });
            setQuestion('');
            setAskee('');
        }
    };

    return (
        <div className={style.wrapper}>
            <div className={style.layout}>
                <div className={style.question}>         
                    <TextField
                        width="100"
                        placeholder="New question"
                        data-test="new-question"
                        value={question}
                        onChange={setQuestion}
                        onEnterPressed={submit}/>
                </div>
                <div className={style.other}>        
                    <TextField
                        className={style.askee}
                        placeholder="Askee"
                        data-test="new-askee"
                        value={askee}
                        onChange={setAskee}
                        onEnterPressed={submit}/>            
                    <StatusField
                        name="editStatus"
                        data-test="new-status"
                        value={status}
                        onChange={setStatus}
                        onEnterPressed={submit}/>
                    <button
                        type="button"
                        name="submit"
                        data-test="submit-question"
                        onClick={submit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    addQuestion
};

export default connect(
    null,
    mapDispatchToProps
)(SubmitQuestionComponent);