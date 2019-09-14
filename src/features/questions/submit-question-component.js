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

    const handleOnKeyPress = e => e.key === 'Enter'
        ? submit()
        : null;

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
                        value={question}
                        onChange={setQuestion}
                        onKeyPress={handleOnKeyPress}/>
                </div>
                <div className={style.other}>        
                    <TextField
                        className={style.askee}
                        placeholder="Askee"
                        value={askee}
                        onChange={setAskee}/>            
                    <StatusField
                        name="editStatus"
                        value={status}
                        onChange={setStatus} />
                    <button
                        type="button"
                        name="submit"
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