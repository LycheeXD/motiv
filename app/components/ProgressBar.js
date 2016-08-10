import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {goal} from '../actions/goalActionCreator.js'

import {Line} from 'rc-progress';
const SPACE = "............";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: [],
      benchGoal: 0
    };
  }

  componentDidMount() {
    this.setState({
      progress: this.props.progress
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      progress: nextProps.progress
    });
  }

  renderProgressBar() {
    if(this.state.progress && Array.isArray(this.state.progress)) {
      return _.map(this.state.progress, (goal, index) => {
        return (
          <div key={index}>
            <Line percent={(goal.current / goal.target) * 100} strokeWidth={2} />
            <div>
              <strong>{goal.name} goal:</strong> {goal.target} {SPACE}
              <strong>{goal.name} now:</strong> {goal.current} {SPACE}
              <strong>Line Progress:</strong> {(goal.current / goal.target) * 100}%
            </div><br/>
          </div>
       );
     });
    } else {
      return undefined;
    }
  }

  handleInput(event) {
    event.preventDefault();
    console.log('benchGoal', this.state.benchGoal)
    this.props.dispatch(goal(this.state.benchGoal))
  }

  handleChange(event) {
    this.setState({
      benchGoal: event.target.value
    })
  }

  render() {
    const progressBar = this.renderProgressBar();
      return (
        <div>
          {progressBar}
          <div className="container">
            <form onSubmit={this.handleInput.bind(this)}>
              <h4>Bench Goal</h4>
              <label>Enter value:</label>
              <input type="number" name="lbs" id="lbs" placeholder="Lbs"
                     value={this.state.benchGoal} onChange={this.handleChange.bind(this)}  />
              <button type="submit">Submit</button>

            </form>

          </div>
        </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    progress: state.goals.progress
  };
}

export default connect(mapStateToProps)(ProgressBar);
