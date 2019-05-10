import React, { Component } from "react";
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';

import styles from '../../style/pages/nomatch'

class NoMatch extends Component {

  render() {
    return (
        <div className={styles.nomatch}>
          <div className={styles.nomatch_content}>
            <div className="texty-demo">
              <Texty>404</Texty>
            </div>
          </div>
        </div>
    );
  }
}

export default NoMatch;