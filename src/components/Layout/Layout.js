import React, {Component} from 'react';
import './Layout.css';
import Person from '../Person/Person';

class Layout extends Component {
  constructor(props) {
    super(props);
  }

  buildLayout() {
    let sideA = [];
    let sideB = [];
    let people = this.props.people;
    let index = 0;

    people.forEach((item) => {
      if (index < ((people.length) / 2)) {
        sideA.push(
          <li key={item.key} className="layout__item layout__item--side-a"><Person name={item.name} /></li>
        );
      }
      else {
        sideB.push(
          <li key={item.key} className="layout__item layout__item--side-b">
            <div className="layout__icon"><i className="fa fa-comments" aria-hidden="true"></i></div>
            <div className="layout__person-container"><Person name={item.name} /></div>
          </li>
        );
      }

      index++;
    });

    if (people.length % 2 === 1) {
      sideB.push(
        <li key='' className="layout__item layout__item--side-b layout__item--empty">
          <div className="layout__icon"><i className="fa fa-comments" aria-hidden="true"></i></div>
        </li>
      );
    }

    return {
      sideA: sideA,
      sideB: sideB,
    };
  }

  render() {
    let items = this.buildLayout();

    return (
      <div className="layout flex-center-block">
        <ul className="layout__list layout__list--side-a">{items.sideA}</ul>
        <ul className="layout__list layout__list--side-b">{items.sideB}</ul>
      </div>
    );

  }
}

export default Layout;
