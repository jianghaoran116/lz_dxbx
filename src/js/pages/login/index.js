import React, { Component } from "react"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import TweenOne from 'rc-tween-one';
import {
  Form, Icon, Input, Button,
} from 'antd';

import { login } from '../../redux/user/actions'
import "../../common/config"

import styles from "../../../style/pages/login"

class GridLayout {
  constructor(rect, width, height) {
    this.gridX = Math.floor(width / rect);
    this.gridY = Math.floor(height / rect);
    this.cellWidth = width / this.gridX;
    this.cellHeight = height / this.gridY;
    this.grid = [];
    for (let i = 0; i < this.gridY; i += 1) {
      this.grid[i] = [];
      for (let s = 0; s < this.gridX; s += 1) {
        this.grid[i][s] = [];
      }
    }
  }

  getCells = (e) => {
    const gridArray = [];
    const w1 = Math.floor((e.x - e.radius) / this.cellWidth);
    const w2 = Math.ceil((e.x + e.radius) / this.cellWidth);
    const h1 = Math.floor((e.y - e.radius) / this.cellHeight);
    const h2 = Math.ceil((e.y + e.radius) / this.cellHeight);
    for (let c = h1; c < h2; c += 1) {
      for (let l = w1; l < w2; l += 1) {
        gridArray.push(this.grid[c][l]);
      }
    }
    return gridArray;
  }

  hasCollisions = t => (
    this.getCells(t).some(e => e.some(v => this.collides(t, v)))
  )

  collides = (t, a) => {
    if (t === a) {
      return false;
    }
    const n = t.x - a.x;
    const i = t.y - a.y;
    const r = t.radius + a.radius;
    return n * n + i * i < r * r;
  }

  add = (value) => {
    this.getCells(value).forEach((item) => {
      item.push(value);
    });
  }
}

const getPointPos = (width, height, length) => {
  const grid = new GridLayout(150, width, height);
  const posArray = [];
  const num = 500;
  const radiusArray = [20, 35, 60];
  for (let i = 0; i < length; i += 1) {
    let radius;
    let pos;
    let j = 0;
    for(let j =0; j< num; j+=1) {
      radius = radiusArray[Math.floor(Math.random() * radiusArray.length)];
      pos = { x: Math.random() * (width - radius * 2) + radius, y: Math.random() * (height - radius * 2) + radius, radius };
      if (!grid.hasCollisions(pos)) {
        break;
      }
    }
    posArray.push(pos);
    grid.add(pos);
  }
  return posArray;
};

const getDistance = (t, a) => (Math.sqrt((t.x - a.x) * (t.x - a.x) + (t.y - a.y) * (t.y - a.y)));

class Point extends React.PureComponent {
  render() {
    const { tx, ty, x, y, opacity, backgroundColor, radius, ...props } = this.props;
    let transform;
    let zIndex = 0;
    let animation = { 
      y: (Math.random() * 2 - 1) * 20 || 15, 
      duration: 3000, 
      delay:Math.random() * 1000,
      yoyo: true,
      repeat: -1,
    };
    if (tx && ty) {
      if (tx !== x && ty !== y) {
        const distance = getDistance({ x, y }, { x: tx, y: ty });
        const g = Math.sqrt(2000000 / (0.1 * distance * distance));
        transform = `translate(${g * (x - tx) / distance}px, ${g * (y - ty) / distance}px)`;
      } else if (tx === x && ty === y) {
        transform = `scale(${80 / radius})`;
        animation = { y: 0, yoyo: false, repeat: 0, duration: 300 };
        zIndex = 1;
      }
    }
    return (
      <div
        style={{
          left: x - radius,
          top: y - radius,
          width: radius * 1.8,
          height: radius * 1.8,
          opacity,
          zIndex,
          transform,
        }}
        {...props}
      >
        <TweenOne
          animation={animation}
          style={{
            backgroundColor,
          }}
          className={styles[`linked-animate-demo-block-child`]}
        />
      </div>

    );
  }
}

@connect(
  state=>state.user.toJS(),
  {login}
)
class Login extends Component {
  static defaultProps = {
    className: 'linked-animate-demo',
  };

  num = 60;// 点的个数

  constructor(props) {
    super(props);
    this.state = {
      data: getPointPos(1920, 1080, this.num).map(item => ({
        ...item,
        opacity: Math.random() * 0.2 + 0.05,
        backgroundColor: `rgb(${Math.round(Math.random() * 95 + 160)},255,255)`,
      })),
      tx: 0,
      ty: 0,
      user: "",
      pwd: ""
    };
  }

  onMouseMove = (e) => {
    const cX = e.clientX;
    const cY = e.clientY;
    const boxRect = this.box.getBoundingClientRect();
    const pos = this.state.data.map((item) => {
      const { x, y, radius } = item;
      return { x, y, distance: getDistance({ x: cX - boxRect.x, y: cY - boxRect.y }, { x, y }) - radius };
    }).reduce((a, b) => {
      if (!a.distance || a.distance > b.distance) {
        return b;
      }
      return a;
    });
    if (pos.distance < 60) {
      this.setState({
        tx: pos.x,
        ty: pos.y,
      });
    } else {
      this.onMouseLeave();
    }
  }

  onMouseLeave = () => {
    this.setState({
      tx: 0,
      ty: 0,
    });
  }

  
  handleChange = (key, e)=> {
    this.setState({
      [key]: e.target.value
    })
  }

  handleLogin = (event)=> {
    event.persist()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    this.props.login({'user': this.state.user, 'pwd': this.state.pwd})
  }

  render() {
    const { className } = this.props;
    const { data, tx, ty } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles[`${className}-wrapper`]}>
        {
          this.props.redirectTo?
            <Redirect push to={this.props.redirectTo} />
          :
            null
        }
        <div
          className={styles[`${className}-box`]}
          ref={(c) => { this.box = c; }}
          onMouseMove={this.onMouseMove}
          onMouseLeave={this.onMouseLeave}
        >
          {data.map((item, i) => (
            <Point {...item} tx={tx} ty={ty} key={i.toString()} className={styles[`${className}-block`]} />
          ))}
        </div>

        <div className={styles[`login-wrap`]}>
          <div className={styles[`login-content`]}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                  placeholder="Username" 
                  onChange={e=>this.handleChange('user', e)}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                  type="password" placeholder="Password" 
                  onChange={e=>this.handleChange('pwd', e)}
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" 
                style={{"width": "100%"}}
                onClick={this.handleLogin}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: 'normal_login' })(Login);