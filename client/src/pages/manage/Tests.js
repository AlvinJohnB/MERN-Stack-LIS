import React from 'react'
import {Table} from 'react-bootstrap'

export default function Tests() {
  return (
    <div className = 'container-fluid mt-4'>
        <h4>Tests</h4>

        <Table size='sm' hover responsive>
        <thead className="table-secondary">
          <tr>
            <th className="">Test code</th>
            <th className="">Test name</th>
            <th className="">Show</th>
            <th className="">Section</th>
            <th className="">Ref male</th>
            <th className="">Ref female</th>
            <th className="">Unit</th>
            <th className="mob text-center">Price</th>
            <th className="mob text-center">Disc. price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        {/* <tbody>{orders.length > 0 && displayOrders}</tbody> */}
      </Table>

    </div>
  )
}
