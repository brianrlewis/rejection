import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../user-auth/user-auth-reducer';
import { getUser, isSignedIn } from '../user-profile/user-profile-reducer';
import { getScore } from '../questions/questions-reducer';
import style from './header-component.scss';

const Header = props => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    const getFirstName = name => name != null
        ? name.split(' ')[0]
        : ''

    return (
        <header>

            <div className={style.left}>
                <div className={style.appIcon}><img src="/static/rejection-icon.png" /></div>
                <div className={style.appTitle}>
                    <div className={style.rejection}>Rejection</div>
                    <div className={style.description}>You gotta lose to win</div>
                </div>                        
            </div>

            <div className={style.middle}>
                <div className={style.label}>Score</div>
                <div className={style.score}>{ props.score }</div>
            </div>

            <div className={style.right}>
                {props.isSignedIn ? (<React.Fragment>                    
                    <div
                        className={style.avatar}
                        onMouseEnter={() => setShowUserMenu(true)}
                        onMouseLeave={() => setShowUserMenu(false)}>

                        <img src={props.user.photoURL} />

                        {showUserMenu ? (
                            <div className={style.userMenu}>
                                <ul>
                                    <li><a href="#" onClick={props.signOut}>Sign Out</a></li>
                                </ul>
                            </div>
                        ) : ''}

                    </div>
                    <div className={style.displayName}>
                        { getFirstName(props.user.displayName) }
                    </div>
                </React.Fragment>) : (
                    <div>
                        <a href="#" onClick={props.signIn}>Sign In</a>
                    </div>
                )}

            </div>

        </header>
    );
};

const mapStateToProps = state => ({
    user: getUser(state),
    isSignedIn: isSignedIn(state),
    score: getScore(state)
});
  
const mapDispatchToProps = {
    signIn,
    signOut
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);