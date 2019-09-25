import React from 'react';
import render from 'riteway/render-component';
import { describe } from 'riteway';
import Header from './header-component-view';
import { setUser } from '../user-profile/user-profile-reducer';
import { getFirstName } from '../../util/helpers';

describe('header-component', async assert => {
    const user = setUser({
        displayName: 'Darth Vader',
        photoURL: 'a-galaxy-far-away',
    }).payload;

    const score = 123;

    const $ = render(<Header
                        user={user}
                        isSignedIn={true}
                        isLoaded={true}
                        score={score}/>);

    assert({
        given: 'user prop',
        should: 'render the first name',
        actual: $('[data-test=name]').html().trim(),
        expected: getFirstName(user.displayName),
    });

    assert({
        given: 'user prop',
        should: 'render the avatar',
        actual: $('[data-test=avatar]').attr('src').trim(),
        expected: user.photoURL,
    });

    assert({
        given: 'score prop',
        should: 'render the score',
        actual: $('[data-test=score]').html().trim(),
        expected: String(score),
    });
});