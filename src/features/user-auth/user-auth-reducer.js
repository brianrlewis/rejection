import dsm from 'redux-dsm';

const SIGNED_OUT = 'signed out';
const SIGNED_IN = 'signed in';
const AUTHENTICATING = 'authenticating';
const ERROR = 'sign-in error';

const actionStates = ['initial', SIGNED_OUT,
    ['sign in', AUTHENTICATING,
      ['report sign in failure', ERROR,
          ['handle sign in failure', SIGNED_OUT]
      ],
      ['report sign in success', SIGNED_IN,
          ['sign out', SIGNED_OUT]
      ]
    ],
    ['report sign in success', SIGNED_IN,
      ['sign out', SIGNED_OUT]
    ]
];

export const slice = 'userAuth';

export const initialize = () => ({
  type: 'userAuthentication/initialize'
});

export const {
    actionCreators: {
      signIn,
      signOut,
      reportSignInFailure,
      handleSignInFailure,
      reportSignInSuccess,
    },
    reducer,
} = dsm({
    component: 'user-auth-stuff',
    description: 'authenticate user',
    actionStates,
});