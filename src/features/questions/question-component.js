import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StatusIcon from '../../components/status-icon-component';
import StatusField from '../../components/status-field-component';
import TextField from '../../components/text-field-component';
import moment from 'moment';
import {
    FaRegEdit,
    FaRegTrashAlt,
    FaRegSave,
    FaTimes,
} from 'react-icons/fa';
import style from './question-component.scss';

const QuestionComponent = ({ question, onRemove, onUpdate }) => {
    const [inEditMode, setEditMode] = useState(false);
    const [updatedQuestion, setUpdatedQuestion] = useState(question.question);
    const [updatedAskee, setUpdatedAskee] = useState(question.askee);
    const [updatedStatus, setUpdatedStatus] = useState(question.status);

    const beginEdit = () => {
        setEditMode(true);
    };

    const cancelEdit = () => {
        setUpdatedQuestion(question.question);
        setUpdatedAskee(question.askee);
        setUpdatedStatus(question.status);
        setEditMode(false);
    };

    const saveChanges = () => {
        onUpdate(question.id, {
            question: updatedQuestion,
            askee: updatedAskee,
            status: updatedStatus,
        });
        setEditMode(false);
    };

    const timestamp = moment(question.timestamp).format('M/D/YYYY HH:mm:ss');

    return (
        <div className={style.wrapper} data-test="question-wrapper">
            <div className={style.controls}>
                {!inEditMode ? (<React.Fragment>
                    <span className={style.controlItem} data-test="edit">
                        <FaRegEdit title="Edit" onClick={beginEdit}/>     
                    </span>
                    <span className={style.controlItem}>
                        <FaRegTrashAlt title="Remove" onClick={() => onRemove(question.id)}/> 
                    </span> 
                </React.Fragment>) : (<React.Fragment>
                    <span className={style.controlItem}>
                        <FaTimes title="Cancel" onClick={cancelEdit}/>     
                    </span>
                    <span className={style.controlItem}>
                        <FaRegSave title="Save" onClick={saveChanges}/>     
                    </span>                
                </React.Fragment>)}
            </div>
            <div className={style.header}>
                <StatusIcon status={question.status} size="25"/>                
                <span className={style.status} data-test="status">
                    {inEditMode
                        ? (<StatusField
                            value={updatedStatus}
                            onChange={setUpdatedStatus} />
                        )
                        : question.status}                    
                </span>

                {question.askee != '' ? (<React.Fragment>    
                    <span className={style.by}>by</span>
                    <span className={style.askee} data-test="askee">
                        {inEditMode 
                            ? (<TextField                
                                value={updatedAskee}
                                onChange={setUpdatedAskee} />
                            )
                            : question.askee}                        
                    </span>                
                </React.Fragment>) : ''}
            </div>
            {!inEditMode ? (
                <div className={style.timestamp}>{ timestamp }</div>
            ) : ''}
            <div className={style.question} data-test="question">
                {inEditMode 
                    ? (<TextField            
                        value={updatedQuestion}
                        onChange={setUpdatedQuestion} />
                    )
                    : question.question}
            </div>
        </div>
    );
};

QuestionComponent.propTypes = {
    question: PropTypes.object,
    onUpdate: PropTypes.func,
    onRemove: PropTypes.func,
};

export default QuestionComponent;