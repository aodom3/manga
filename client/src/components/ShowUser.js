import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { Button } from 'reactstrap';

class ShowUser extends Component {
    state = {
        user: [],
        userRemoved: false,
      };
    
      componentWillMount() {
        if (this.props.match.params) {
          const { userId } = this.props.match.params;
          axios.get(`/api/users/${userId}`).then(res => {
            this.setState({ user: res.data });
          });
        }
      }
    
      updateUser = updatedUser => {
        const userId = this.state.user._id;
        axios
          .patch(`/api/users/${userId}`, {
            user: updatedUser,
          })
          .then(res => {
            const resUser = res.data;
            this.setState({ user: resUser });
          });
      };
    
      deleteUser = deletedUser => {
        const userId = this.state.user._id;
    
        axios.delete(`/api/users/${userId}`).then(() => {
          this.setState({ userRemoved: true });
        });
      };
    
      handleDeleteUser = e => {
        e.preventDefault();
        this.deleteUser();
      };
    
      render() {
        if (this.state.userRemoved) return <Redirect to={`/`} />;
    
        return (
          <div class="form">
            <div>
              <h3>Account Information</h3>
              <h6>{this.state.user.userName}</h6>
          
            
           
              <div class="center">
                <Button color="warning" onClick={this.handleDeleteUser}>Delete User</Button>{' '}
              </div>
                <div>
                <Link to={`/user/${this.props.match.params.userId}/pic`}><Button color="info" size="lg" block>Submit</Button>{' '}
                </Link>
              </div>
            </div>
          </div>
       
            
        )
      }
    }

export default ShowUser