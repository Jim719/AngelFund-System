import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  tabs: {
    background: '#fff',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};

class SwipeTable extends React.Component {
  state = {
    index: 0,
  };

  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  render() {
    const { index } = this.state;

    return (
      <div>
        <Tabs value={index} fullWidth onChange={this.handleChange} style={styles.tabs}>
          <Tab label="專案資料" />
          <Tab label="投資者資訊" />
        </Tabs>

        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
          <div >slide n°1</div>
          <div style={Object.assign({},  styles.slide2)}>
            slide n°2
            <Select value={10} autoWidth={false}>

            </Select>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default SwipeTable;