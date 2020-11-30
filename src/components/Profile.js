import React from "react";
import '../style/style.css'
import {logout} from "../services/UserService";
/*
 When a user logins/registers, we navigate to this Profile page -- the User's username is
  displayed to confirm credentials (via Http session obj, setAttribute in User controller).
 */
//This shpuld probably be the parent component of UserView, AnonymousView, AdminView...
export default class Profile extends React.Component {


    state = {
        currentUser: {
            username: '',
            firstName: '',
            lastName: ''
        }
        //TODO: user's friends & movies list:
        //movies: []  // user's liked movies
        //thought: friends, array of other User obj?
    }

//when component is loaded, fetch the specific User.
    //state of currentUser has associated cookies & a current Http session
    componentDidMount() {
        fetch(`http://localhost:8080/currentUser`, {
            method: 'GET',
            credentials: "include"  //must pass cookie to participate in a session
        }).then(response => response.json())
            .then(currentUser => this.setState({
                                                   currentUser: currentUser
                                               }))
    } //TODO: handle rejection

    // logout = () =>
    //     //go out to server to log out
    //     fetch(`http://localhost:8080/logout`, {
    //         method: 'POST',
    //         credentials: "include"
    //     }).then(response => this.props.history.push('./home')) //no need to have json body
    //just logs User (w/ associated cookies) out of current HttpSession

    logout = () =>
        logout().then(status=> {
            this.props.history.push('/')
        })


    render() {
        return (
            <div className={"container-fluid"}>
                <h1> Profile </h1>
                <h2 id="loggedUser">Currently logged in as: {this.state.currentUser.username} </h2>
                {/*thought: could map through added/liked movies array & generate movie grid here*/}
                <br/>
                <button className="btn danger" onClick={this.logout}>
                    Logout
                </button>
            </div>
        )
    }

}
