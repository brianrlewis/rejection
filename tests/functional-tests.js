import { Selector, ClientFunction } from 'testcafe';
import { appTitle, Statuses } from '../config/config';
import {
    getTestQuestions,
    getTestQuestionsExpectedScore,
} from '../src/util/testing';
import { last } from 'lodash';

fixture`Rejection App`.page('http://localhost:3010/');

test('CRUD operations', async t => {
    await t.expect(Selector('head title').textContent)
            .eql(appTitle);

    const questions = getTestQuestions();

    const submitQuestion = async question => {
        const statusSelect = Selector('select[data-test=new-status]');   
        await t
            .typeText(Selector('input[data-test=new-question]'), question.question)
            .typeText(Selector('input[data-test=new-askee]'), question.askee)
            .click(statusSelect).click(statusSelect.find('option').withText(question.status))
            .click(Selector('button[data-test=submit-question]'))
            .expect(Selector('[data-test=question-wrapper]').nth(0).textContent)
                .contains(question.question)
            .expect(Selector('[data-test=question-wrapper]').nth(0).textContent)
                .contains(question.askee)
            .expect(Selector('[data-test=question-wrapper]').nth(0).textContent)
                .contains(question.status);
    };

    // Submit all questions and verify that all fields are rendered properly
    await Promise.all(questions.map(submitQuestion));

    // Verify that the number of questions rendered matches the number submitted
    await t.expect(Selector('[data-test=question-wrapper]').count)
            .eql(questions.length);

    // Verify that the correct score has been rendered
    await t.expect(Selector('[data-test=score]').textContent)
            .eql(String(getTestQuestionsExpectedScore()));

    // Edit the most recently submitted question and verify that all changes
    // are properly rendered. Questions are rendered in descending order
    const wrapper = Selector('[data-test=question-wrapper]').nth(0);
    const latestQuestion = last(questions);
    const updatedQuestion = {
        question: 'random question',
        askee: 'nobody',
        status: Object.values(Statuses).find(x => x !== latestQuestion.status)
    };

    const statusSelect = wrapper.find('select[data-test=edit-status]');  
    await t.click(wrapper.find('[data-test=edit]'))
            .typeText(wrapper.find('[data-test=edit-question]'), updatedQuestion.question)
            .typeText(wrapper.find('[data-test=edit-askee]'), updatedQuestion.askee)
            .click(statusSelect).click(statusSelect.find('option').withText(updatedQuestion.status))
            .click(wrapper.find('[data-test=save]'))
            .expect(wrapper.find('[data-test=question]').textContent).contains(updatedQuestion.question)
            .expect(wrapper.find('[data-test=askee]').textContent).contains(updatedQuestion.askee)
            .expect(wrapper.find('[data-test=status]').textContent).contains(updatedQuestion.status);
     
    // Remove a question and verify that 1 less question is rendered
    await t.click(Selector('[data-test=remove]'))
            .expect(Selector('[data-test=question-wrapper]').count)
            .eql(questions.length - 1);     
});