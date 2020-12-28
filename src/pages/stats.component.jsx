import React from 'react';

import StatsTable from '../components/stats-table.component';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: this.props.match.params.path
    }
  }

  render() {
    return (
      <StatsTable {...this.state} />
    )
  }
}

export default Stats;