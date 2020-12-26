import React from 'react';
import { faCaretRight, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DropDownNav = (props) => {
    const { list } = props;
    return (
        <div>
            <a href={list.link} title={list.type}>{list.type}</a>
            { (typeof (list.sublist) !== "undefined") ?  <FontAwesomeIcon icon={faCaretUp} className="arrowUp" />
             : <div></div>}
            { (typeof (list.sublist) !== "undefined") ? <ul>
                {
                    list.sublist.map((item) => 
                        <li>
                            <a href={item.link} title={item.type}>{item.type}</a>
                            {
                                (typeof (item.sublist) !== 'undefined')
                                    ? <FontAwesomeIcon icon={faCaretRight} className="arrowRight" />
                                    : <div></div>
                            }
                            {
                                (typeof (item.sublist) !== 'undefined')
                                    ? <div className="subType">
                                        <ul>
                                            {
                                                item.sublist.map((subitem) => 
                                                    <li><a href={subitem.link} title={subitem.type}>{subitem.type}</a></li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                    : <div></div>
                            }
                        </li>
                    )
                }
            </ul> : <div></div>}
        </div>
    )
}
