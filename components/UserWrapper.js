
var React = require('react');
var PropTypes = React.PropTypes;

function UserDetailsWrapper (props) {
  return (
    <div className='col-sm-6 col-sm-offset-3 center'>
      <p className='lead'>{props.header}</p>
      {props.children}
    </div>
  )
}

UserDetailsWrapper.header = {
  header: PropTypes.string.isRequired,
}

module.exports = UserDetailsWrapper;