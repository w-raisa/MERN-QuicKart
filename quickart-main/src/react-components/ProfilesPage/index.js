import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import userPicture from '../../images/defaultUserPicture.jpg';
import store from '../../store';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { getProfile } from '../../actions/settingsActions';
import { loadOnePosts } from '../../actions/postsActions';
import { posts } from '../../allPosts';
import './styles.css';

/* Component for the User Profile Page */
class ProfilesPage extends React.Component {
  state = {
    postings: [],
    tags: [],
    date: '',
  };
  isAdmin = '';

  componentDidMount() {
    this.loadState();
  }

  async loadState() {
    let reduxState = store.getState();
    let userID = reduxState['loginState']['id'];
    await this.props.getProfile(userID);

    //settingsState should be stored here
    reduxState = store.getState();

    //This check needs to be updated for admin
    let userType = reduxState['loginState']['accType'];
    this.isAdmin = userType === 'admin';
    console.log(this.isAdmin);
    this.setState(reduxState['settingsState']);
  }


  // const reportedPosts = this.state.user_posts.map(post => (
  //   <div className='post backgroundWhite'>
  //     <div className='lefttGridPost'>
  //       <Link to='/profile'>
  //         <img className='circleImgPosts' src={userPicture} alt='' />
  //         <h4 className='postUser'>{post.name}</h4>
  //       </Link>
  //     </div>
  //     <div className='rightGridPost'>
  //       <h4>{post.reason}</h4>
  //       <p className='smallMargin'>
  //         {post.reportDescription}
  //       </p>
  //       <Link to={{ pathname: '/DetailPosting/' + post.linkToPost}}
  //        className='btn btnDefault-report'>
  //         View Reported Posting
  //       </Link> 
  //     </div>
  //   </div>
  // ));

  render() {
    const dateFormatData = this.state.postings.map(allPost => {
      const formatter = { year: 'numeric', month: 'long', day: 'numeric' };
      const newDate = new Date(allPost.postEndDate).toLocaleDateString(
        [],
        formatter
      );
      allPost.postEndDate = newDate.toString();
    });

    const allUserPosts = this.state.postings.map(post => (
      <div className='backgroundWhite'>
        <div>
          <h4>
            {
              //Need to change the 'to' so it links to the actual post link
            }
            {/* <Link className='addSomeMargin' to='/posts'>
              {post.title}
            </Link> */}
            <Link to={{ pathname: '/DetailPosting/' + post._id}} className='addSomeMargin'>
              {post.title}
            </Link> 
          </h4>
          <h6 className='addSomeMargin'>{post.postEndDate}</h6>
          <p className='addSomeMargin'>{post.description}</p>
        </div>
      </div>
    ));

    const postings = (
      <div className='profile-posts'>
        <div className='profile-post-title'>
          <h2 className='textDefaultColor addSomeMargin'>Posts</h2>
        </div>
      </div>
    );

    const niche = (
      <div>
        <h2 className='textDefaultColor addSomeMargin'>Niche</h2>
        <p className='addSomeMargin'>
          {this.state.niche}
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. */}
        </p>
      </div>
    );

    const tags = (
      <div className='informationColour'>
        <div className='tagBar2'>
          <h2 className='textDefaultColor'> Tags </h2>
        </div>
      </div>
    );

    const allTags = this.state.tags.map(tag => (
      <Button
        size='small'
        variant='outlined'
        href=''
        startIcon={<AddIcon />}
        className={'tagOption-' + tag}
      >
        {tag}
      </Button>
    ));

    const userReports = (
      <Link to='/userReports' className='btn btnDefault'>
        User Reports
      </Link>
    );

    return (
      <section className='mainBackground-profile'>
        <div className='containerProfile'>
          <div className='profileArea'>
            <div className='buttons smallMargin'>
              <Link to='/editProfile' className='btn btnDefault'>
                Edit Profile
              </Link>
              {this.isAdmin ? userReports : ''}
            </div>

            <div className='profile-top backgroundDefault'>
              <img className='profileImg' src={userPicture} alt='' />
              {/* <h1>Johnson Smith</h1>
              <p>Toronto, ON</p> */}
              <h1>{this.state.name}</h1>
              <p>{this.state.location}</p>
            </div>

            <div className='profile-about backgroundGrey '>
              <h2 className='textDefaultColor addSomeMargin'>Biography</h2>

              <p className='addSomeMargin'>{this.state.biography}</p>
              {this.isAdmin ? '' : niche}
              {this.isAdmin ? '' : tags}
              <ul className='tagbaritems'>{this.isAdmin ? '' : allTags}</ul>
            </div>
            {this.isAdmin ? '' : postings}
            {this.isAdmin ? '' : allUserPosts}
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(
  connect(null, { loadOnePosts, getProfile, setAlert })(ProfilesPage)
);
