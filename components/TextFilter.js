import React from 'react';
import TextField from 'material-ui/lib/text-field';

export default React.createClass({

  // getInitialState() {
  //   return {
  //     value: '',
  //   };
  // },

  handleChange (event)  {
    // console.log("value " + event.target.value)
    this.props.onInputChanges(event.target.value)
  },

  render() {
    return (
      <div>
        <TextField
          defaultValue=''
          onChange={this.handleChange}
          hintText="filter list by name"
        />
      </div>
    );
  }
})
