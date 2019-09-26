import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getFirstName } from '../../util/helpers';
import style from './header-component.scss';

const HeaderComponent = props => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    return (
        <header>

            <div className={style.left}>
                <div className={style.appIcon}>
                    <img src="/static/rejection-icon.png" />
                </div>
                <div className={style.appTitle}>
                    <div className={style.rejection}>Rejection</div>
                    <div className={style.description}>You gotta lose to win</div>
                </div>                        
            </div>

            <div className={style.middle}>
                <div className={style.label}>Score</div>
                <div className={style.score} data-test="score">{props.score}</div>
            </div>

            {props.isLoaded ? (
                <div className={style.right}>
                    {props.isSignedIn ? (<React.Fragment>                    
                        <div
                            className={style.avatar}
                            onMouseEnter={() => setShowUserMenu(true)}
                            onMouseLeave={() => setShowUserMenu(false)}>

                            <img src={props.user.photoURL} data-test="avatar"/>

                            {showUserMenu ? (
                                <div className={style.userMenu}>
                                    <ul>
                                        <li><a href="#" onClick={props.signOut}>
                                            Sign Out
                                        </a></li>
                                    </ul>
                                </div>
                            ) : null}

                        </div>
                        <div className={style.displayName} data-test="name">
                            { getFirstName(props.user.displayName) }
                        </div>
                    </React.Fragment>) : (
                        <div>
                            <a href="#" onClick={props.signIn}>Sign In</a>
                        </div>
                    )}

                </div>
            ) : null}

        </header>
    );
};

HeaderComponent.propTypes = {
    user: PropTypes.object,
    isSignedIn: PropTypes.bool,
    isLoaded: PropTypes.bool,    
    score: PropTypes.number,
    signIn: PropTypes.func,
    signOut: PropTypes.func,
};

export default HeaderComponent;