import { connect } from 'react-redux';
import { signIn, signOut } from '../user-auth/user-auth-reducer';
import { getScore } from '../questions/questions-reducer';
import {
    getUser,
    isSignedIn,
    isLoaded
} from '../user-profile/user-profile-reducer';
import HeaderComponent from './header-component-view';

const mapStateToProps = state => ({
    user: getUser(state),
    isSignedIn: isSignedIn(state),
    isLoaded: isLoaded(state),
    score: getScore(state),
});
  
const mapDispatchToProps = {
    signIn,
    signOut,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HeaderComponent);