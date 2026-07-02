import React from 'react'

const DashboardCard = ({ title, value, icon, bg }) => {
   return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className={`card border-0 shadow-sm ${bg}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h6 className="text-muted mb-2">{title}</h6>

              <h2 className="fw-bold">{value}</h2>
            </div>

            <div className="fs-1">
              {icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DashboardCard