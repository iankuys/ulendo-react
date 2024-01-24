import React from 'react'

export default function TaskCard({field1, field2, field3, cond}) {

  const style = {
    boxShadow: cond ? '0 0 3px 3px yellow' : 'none'
  };

  return (
    <>
        <div className="card mx-3 my-2" style= {style}>
            <div className="card-body">
                <h5 className="card-title">{field1}</h5>
                <p className="card-text">{field2}</p>
                <p className="card-text">{field3}</p>
            </div>
        </div>
    </>
  )
}
