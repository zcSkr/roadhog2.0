import React from "react";
import { Icon, List, Badge } from "antd-mobile";

import SvgIcon from 'common/component/SvgIcon';
import styles from "./styles.less";

const Item = List.Item;


export default function MyCenter({ member, loading, orderstatis, onButtonClick, usecases }) {

  let authText = (member ? (member.authStatus == 0 ? "实名认证" : member.authStatusText) : "");

  return (
    <div className={styles.normal + " mycenter" }>
      <div className={styles.userZone}>
        <div className={styles.user}>
          <div className={styles.img}>
            <img src={member ? member.wx_headImgUrl : null} alt='' />
          </div>
          <div className={styles.name}>
            <p>
              <span>{member ? member.nickname : null}</span>
            </p>
            <div className={styles.account}>
              {member ? member.memberNo : null}
            </div>
          </div>
          {
            member ? (
              <div className={styles.verification}
                onClick={() => onButtonClick("verification", member.id)}>
                <span className={styles.text}>{authText}</span>
                <Icon type="right" size="md" />
              </div>
            ) : null
          }
        </div>
      </div>
      <div className={styles.orderZone}>
        <div className={styles.all}>
          <cite>我的订单</cite>
          <div
            className={styles.more}
            onClick={() => onButtonClick("order", "")}>
            <span>全部订单</span>
          </div>
        </div>
        <ul className={styles.nav}>
          <li>
            <div
              className={styles.item}
              onClick={() => onButtonClick("order", 0)}>
              <div className={styles.icon}>
              {
                  orderstatis ? 
                  <Badge text={orderstatis.status0}>
                    <SvgIcon type={SvgIcon.glyphs.daifukuan} />
                  </Badge>
                 : <SvgIcon type={SvgIcon.glyphs.daifukuan} />
              }
              </div>
              <span>待付款</span>
            </div>
          </li>
          <li>
            <div
              className={styles.item}
              onClick={() => onButtonClick("order", 1)}>
              <div className={styles.icon}>
                {
                  orderstatis ? 
                  <Badge text={orderstatis.status1}>
                    <SvgIcon type={SvgIcon.glyphs.daishouhuo} />
                  </Badge>
                 : <SvgIcon type={SvgIcon.glyphs.daishouhuo} />
                }
              </div>
              <span>待收货</span>
            </div>
          </li>
          <li>
            <div
              className={styles.item}
              onClick={() => onButtonClick("comment")}>
              <div className={styles.icon}>
                <SvgIcon type={SvgIcon.glyphs.daipingjia} />
              </div>
              <span>评价晒图</span>
            </div>
          </li>
        </ul>
      </div>
      <List className={styles.itemsZone}>
        <Item
          thumb={<SvgIcon type={SvgIcon.glyphs.yue} style={{ fill: "#FF7E45" }} />}
          arrow="horizontal"
          onClick={() => onButtonClick("balance")}
          extra={member ? `${member.balance} 元` : "-- 元"}>
          余额
        </Item>
        <Item
          thumb={<SvgIcon type={SvgIcon.glyphs.jifen} style={{ fill: "#C568F5" }} />}
          arrow="horizontal"
          onClick={() => onButtonClick("points")}
          extra={member ? member.points : "--"}>
          积分
        </Item>
      </List>
      <List className={styles.itemsZone}>
        <Item
          thumb={<SvgIcon type={SvgIcon.glyphs.dizhi} style={{ fill: "#00C670" }} />}
          arrow="horizontal"
          onClick={() => onButtonClick("address")}>
          我的地址
        </Item>
        <Item
          thumb={<SvgIcon type={SvgIcon.glyphs.fuwu} style={{ fill: "#51BBE0" }} />}
          arrow="horizontal"
          onClick={() => onButtonClick("service")}>
          服务中心
        </Item>
      </List>
      <List className={styles.itemsZone}>
        <Item
          thumb={<SvgIcon type={SvgIcon.glyphs.guanyu} style={{ fill: "#FFD700" }} />}
          arrow="horizontal"
          onClick={() => onButtonClick("about")}>
          关于系统
        </Item>
      </List>
    </div>
  );
}

