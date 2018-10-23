import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

export default class AllDevelopers extends Component {
  constructor(props) {
    super(props);
    this.state = { loadingState: `LOADING`, devs: [], halfSeconds: 0 };
  }
  componentDidMount = async () => {
    setTimeout(() => this.setState({ loadingState: `LOADED` }), 3000);
    const removeMe = setInterval(
      () => this.setState({ halfSeconds: this.state.halfSeconds + 1 }),
      400
    );
    const allDevs = await Axios.get(`/api/developers`);
    this.setState({ devs: allDevs.data });
  };

  render = () => {
    let periods = '';
    for (let i = 0; i < this.state.halfSeconds + 3; i++) {
      periods += '.';
    }
    switch (this.state.loadingState) {
      case `LOADING`: {
        return <h1>{`LOADING` + periods}</h1>;
      }
      case `LOADED`: {
        return (
          <div>
            <h1>
              {this.state.devs[1].firstName + ' ' + this.state.devs[1].lastName}
            </h1>
            <img src={this.state.devs[1].imageURL} />
          </div>
        );
      }
    }
  };

  componentWillUnmount = () => {
    removeMe();
  };
}