import React from "react";
import uuid from 'react-uuid';
import classess from "./chart.module.css";

function Chart(props) {

  const { searchKeyword } = props;
  return (
    <div className={classess.mwb_bar}>
      <table className={classess.q_graph}>
        <tbody>
          {
            searchKeyword.map((value) => {
              return (
                <tr className={`${classess.qtr} ${classess.q1}`} key={uuid()}>
                  <th scope='row' className={`${classess.qtr} ${classess.headData}`}>
                    {value.keyword}
                  </th>
                  <td className={`${classess.sent} ${classess.bar} ${classess.qtr}`} style={{ height: value.count * 10 }}></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <div className={classess.ticks}>
        <div className={classess.tick}>
          <p className={classess.priceLst}>15</p>
        </div>
        <div className={classess.tick}>
          <p className={classess.priceLst}>10</p>
        </div>
        <div className={classess.tick}>
          <p className={classess.priceLst}>5</p>
        </div>
        <div className={`${classess.tick}`}>
          <p className={classess.priceLst}>0</p>
        </div>
      </div>
    </div>
  );
}

export default Chart;
