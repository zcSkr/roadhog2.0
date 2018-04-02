import React, { PropTypes, Component } from 'react';
import { Icon, Tabs, Drawer, List } from 'antd-mobile';
// const TabPane = Tabs.TabPane;
import { isEmpty } from 'underscore';
import { trim, startsWith } from 'underscore.string';
import styles from './styles.less';

function findTree(tree, id, parent) {
  for (var index in tree) {
    let item = tree[index];
    if (item.id == id) {
      item._nodePath = (parent && parent._nodePath) ? (parent._nodePath + ',' + item.id) : item.id;
      return item;
    } else {
      if (item.children && item.children.length > 0) {
        item._nodePath = (parent && parent._nodePath) ? (parent._nodePath + ',' + item.id) : item.id;
        let res = findTree(item.children, id, item);
        if (res) return res;
      }
    }
  }
  return null;
}

export default class PickerContent extends Component {
  constructor(props) {
    super(props);
    this.state = this.propsToState(props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.list != this.state.list || nextProps.value != this.state.value) { 
      this.setState(this.propsToState(nextProps));
    }
  }
  propsToState(props) {
    return {
      list: props.list,
      tabs: this.generate(props.list, props.value),
      value: props.value, 
    };
  }
  generate = (list, value, changeScrollTop) => {
    if (list == null) {
      return;
    }
    let tabs = [];

    let item = null;
    if (!isEmpty(value)) {
      item = findTree(list, value);
    }
    if (isEmpty(item)) {
      tabs.push({
        id: '_none',
        name: '请选择',
        layer: 1,
        selected: true,
        areas: list.map(area => {
          area._selected = false;
          return area;
        }),
      });
    } else {
      var ids = item._nodePath.split(',');
      let items = list;
      for (var i = 0; i < ids.length; i++) {
        var tmpItem = items.filter(area => area.id == ids[i])[0];
        if (isEmpty(tmpItem)) break;
        tabs.push({
          id: tmpItem.id,
          name: tmpItem.name,
          layer: tmpItem.layer,
          selected: false,
          areas: items.map(area => {
            area._selected = (tmpItem.id == area.id);
            return area;
          }),
        });
        items = tmpItem.children;
      }
      if (isEmpty(items)) {
        tabs[tabs.length - 1].selected = true;
      } else {
        tabs.push({
          id: '_none',
          name: '请选择',
          layer: tabs.length + 1,
          selected: true,
          areas: items.map(area => {
            area._selected = false;
            return area;
          }),
        });
      }
    }
    if (changeScrollTop) {
      this.changeScrollTop(tabs);
    }
    return tabs;
  }
  changeScrollTop = (tabs) => {
    var selectedTab = tabs.filter(tab => tab.selected)[0];
    setTimeout(() => {
      var selectedArea = selectedTab.areas.filter(area => area._selected)[0];
      if (selectedArea) {
        var overflowHeight = this.refs.items.scrollHeight - this.refs.items.clientHeight;
        if (overflowHeight > 0) {
          var scrollTop = selectedTab.areas.indexOf(selectedArea) * 32;
          if (scrollTop > overflowHeight) scrollTop = overflowHeight;
          this.refs.items.scrollTop = scrollTop;
        }
      } else {
        this.refs.items.scrollTop = 0;
      }
    }, 100);
  }
  handleTabChange = (activeKey) => {
    var { tabs } = this.state;
    // console.log(activeKey);
    tabs.every(tab => {
      tab.selected = false;
      if (activeKey.id == tab.id) {
        tab.selected = true;
        return false;
      }
      return true;
    })
    this.changeScrollTop(tabs);
    this.setState({ tabs })
  }
  handleItemSelected = (area) => {
    const { onChange } = this.props;
    var { list, tabs } = this.state; 
    tabs = this.generate(list, area.id, false);
    let item = findTree(list, area.id);

    let isMaxLayer = true;
    if (item._nodePath.split(',').length < tabs.length) {
      isMaxLayer = false;
      setTimeout(() => {
        this.refs.items.scrollTop = 0;
      }, 100);
    }

    this.setState({ tabs, value: area.id });
    if (isMaxLayer && onChange) {
      onChange(area.id, area);
    }
  }

  render() {
    var { tabs } = this.state;
    var selectedTab = tabs ? tabs.filter(tab => tab.selected)[0] : null;
    if (!selectedTab) {
      return (
        <div style={{textAlign:'center'}}> 
          <Icon type="loading" size="lg" />
        </div>
      );
    }
    return (
      <div className={styles.picker}> 
        <div className={styles.tabs}>
        {
          tabs.length>0?
          <Tabs 
            tabs={tabs}
            animated={true}
            activeKey={2} 
            initialPage={selectedTab.layer}
            onChange={this.handleTabChange}
            tabBarUnderlineStyle={{ borderColor: '#dd5044'}}
            tabBarActiveTextColor='#dd5044'
            renderTab={tab => <span>{tab.name}</span>}
          >
          {
            // tabs.map(tab=><TabPane key={tab.id} tab={tab.name} />)
            // tabs.map(tab=><div key={tab.id}>{tab.name}</div>)
          }
          </Tabs>:null
        }
        </div>
        <div className={styles.items} ref='items'>  
        { 
          selectedTab.areas.map(area=>{ 
            if(area._selected) {
              return <div key={area.id} className={styles.item+' '+styles.selected}><Icon type="right" size="xs" className={styles.icon} />{area.name}</div>
            } else {
              return <div key={area.id} className={styles.item} onClick={()=>this.handleItemSelected(area)}>{area.name}</div>
            } 
          })
        }
        </div>
      </div>
    );
  }
}

