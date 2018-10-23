import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDevelopers, addDeveloper } from '../store/allDevelopers';
import { UNASKED, LOADING, LOADED, ERROR } from '../store';

class AllDevelopers extends Component {
  constructor(props) {
    super(props);
    this.state = { halfSeconds: 0 };
  }
  componentDidMount = async () => {
    // setTimeout(() => this.setState({ loadingState: `LOADED` }), 3000);
    const removeMe = setInterval(
      () => this.setState({ halfSeconds: this.state.halfSeconds + 1 }),
      400
    );
    await this.props.getDevelopers();
    clearInterval(removeMe);
  };

  render = () => {
    let periods = '';
    for (let i = 0; i < this.state.halfSeconds + 3; i++) {
      periods += '.';
    }
    switch (this.props.status) {
      case UNASKED:
        return <h1>No one wants to see any developers, I guess...</h1>;
      case LOADING: {
        return <h1 id="all-developers-loading-h1">{`LOADING` + periods}</h1>;
      }
      case LOADED: {
        return (
          <div id="all-developers-loaded-div">
            {this.props.allDevelopers.map(developer => {
              return (
                <div key={developer.id} className="all-developers-map-div">
                  <h1>{developer.firstName + ` ` + developer.lastName}</h1>
                  <img src={developer.imageURL} />
                </div>
              );
            })}
          </div>
        );
      }
      case ERROR: {
        return <h1>We have an error...</h1>;
      }
      default: {
        return <h2>hit default state</h2>;
      }
    }
  };
}

const mapStateToProps = state => ({
  allDevelopers: state.allDevelopers.collection,
  status: state.allDevelopers.status,
});
const mapDispatchToProps = { addDeveloper, getDevelopers };

export default connect(mapStateToProps, mapDispatchToProps)(AllDevelopers);
