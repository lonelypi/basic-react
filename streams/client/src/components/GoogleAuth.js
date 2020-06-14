import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'


class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {

      window.gapi.client.init({

        //Here in clientID go my key of google auth api.
        clientId: 'ID-API',
        scope: 'email'

      }).then(() => {
        
        this.auth = window.gapi.auth2.getAuthInstance()
        this.onAuthChange( this.auth.isSignedIn.get() )
        this.auth.isSignedIn.listen(this.onAuthChange)

      })

    })

  }

  onAuthChange = (isSignedIn) => {
      if (isSignedIn) {
        this.props.signIn(this.auth.currentUser.get().getId())
      } else {
        this.props.signOut()
      }

  }

  onSignIn = () => {
    this.auth.signIn()

  }

  onSignOut = () => {
    this.auth.signOut()

  }

  renderAuthButton() {
    if ( this.props.isSignedIn === null ) {
      return null

    } else if ( this.props.isSignedIn ) {
      return (

          <button onClick={this.onSignOut} className='ui button red google'>
            <i className='google icon' />
              Sign out.
          </button>

      )

    } else {
      return (

          <button onClick={this.onSignIn} className='ui button red google'>
            <i className='google icon' />
              Sign In with Google.
          </button>

      )
    }

  }

  render() {
    return <div className='item'>{ this.renderAuthButton() }</div>
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn }

}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)