import Immutable from "immutable";

let id = 1;
const $$initState = Immutable.fromJS({
  id,
  activeKey: "",
  needUpdate: false,
  dyComponent: null,
  treeData: [
    {
      "code": "consumer",
      "name": "用户",
      "isEnd": false,
      "children": [
        {
          "parentCode": "consumer",
          "code": "consumer_list",
          "name": "用户列表",
          "isEnd": true
        },
        {
          "parentCode": "consumer",
          "code": "consumer_update",
          "name": "添加/修改",
          "isEnd": true
        },
        {
          "parentCode": "consumer",
          "code": "consumer_role",
          "name": "角色管理",
          "isEnd": true
        }
      ]
    },
    {
      "code": "channel",
      "name": "渠道",
      "isEnd": false,
      "children": [
        {
          "parentCode": "channel",
          "code": "channel_list",
          "name": "渠道管理",
          "isEnd": true
        }
      ]
    },
    {
      "code": "statistic",
      "name": "数据统计",
      "isEnd": false,
      "children": [
        {
          "parentCode": "statistic",
          "code": "statistic_consumer_info",
          "name": "用户信息",
          "isEnd": true
        },
        {
          "parentCode": "statistic",
          "code": "statistic_consumer_behavior",
          "name": "用户行为",
          "isEnd": true
        }
      ]
    }
  ]
})

const leftMenuTree = function(state=$$initState, action) {
  switch(action.type) {
    case Symbol.for('SET_ACTIVEKEY'):
      return state.merge(
        {
          activeKey: action.payload
        }
      )
    case Symbol.for('SET_NEEDUPDATE'):
      return state.merge(
        {
          needUpdate: action.payload
        }
      )
    case Symbol.for('SET_COMPONENT'):
      return state.merge(
        {
          dyComponent: action.payload
        }
      )
    default:
      return state;
  }
}

export default leftMenuTree