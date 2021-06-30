import React from "react";
import classess from "./chart.module.css";

function Chart(props) {
  return (
    <div className={classess.mwb_bar}>
      <table className={classess.q_graph}>
        <tbody>
          <tr className={`${classess.qtr} ${classess.q1}`}>
            <th scope='row' className={`${classess.qtr} ${classess.headData}`}>
              Lorem
            </th>
            <td
              className={`${classess.sent} ${classess.bar} ${classess.qtr}`}
            >
              <p className={classess.price}>
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <div className={classess.ticks}>
        <div className={classess.tick}>
          <p className={classess.priceLst}>25</p>
        </div>
        <div className={classess.tick}>
          <p className={classess.priceLst}>20</p>
        </div>
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
