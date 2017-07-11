import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    maxWidth: '800px',
    margin: '0 auto'
  },

  header: {
    fontFamily: 'arial',
    textAlign: 'center'
  },

  trainBoard: {
    background: 'black',
    padding: '1.5em 2.5em'
  },

  trainList: {
    listStyleType: 'none',
    fontSize: '24px',
    fontFamily: 'courier',
    color: '#f46242',
    paddingLeft: 0,
    margin: 0
  },

  trainListItem: {
    color: '#f46242',
    display: 'flex',
  },

  trainName: {
    textAlign: 'left',
    flex: '1'
  },

  timeUntil: {
    textAlign: 'right',
  },

  clock: {
    width: '100%',
    textAlign: 'center',
    color: '#f46242',
    fontFamily: 'arial',
    fontSize: '30px',
    marginTop: '1em'
  }
});

module.exports = class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextTrains: this.props.nextTrains,
      time: this.props.time
    };
  }

  render() {
    console.log(this.props.time)
    const { nextTrains } = this.state;
    const { time } = this.props;
    
    return (
      <div className={css(styles.container)}>
          <h2 className={css(styles.header)}>Next trains</h2>
          <div className={css(styles.trainBoard)}>
            <ul className={css(styles.trainList)}>
              {nextTrains.map((train, ind) => {
                if (ind < 2) {
                  return (
                    <li className={css(styles.trainListItem)} key={ind}>
                      <span className={css(styles.trainName)}>{ind + 1}. {train.name}</span> 
                      <span className={css(styles.timeUntil)}>{train.timeToNext} min</span>
                    </li>
                  )
                }

                return null;
              })}
            </ul>
            <div className={css(styles.clock)}>{time}</div>
          </div>
      </div>
    );
  }
}

