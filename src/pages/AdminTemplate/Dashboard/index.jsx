import React, { useState } from "react";
import DashboardCard from "./DashboardCard";
import { useSelector, useDispatch } from "react-redux";
import { getDashboard } from "./DashboardCard/slice";
import { useEffect } from "react";

const Dashboard = () => {
  const state = useSelector((state) => state.getDashboardReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDashboard());
  }, []);
  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-secondary">Welcome back, Admin</p>
      </div>
      <div className="row">
        <DashboardCard
          title="Total Users"
          value={state.totalUsers}
          icon={<i className="bi bi-people-fill"></i>}
          bg="bg-primary-subtle"
        />
        <DashboardCard
          title="Total Movies"
          value={state.totalMovies}
          icon={<i className="bi bi-film"></i>}
          bg="bg-primary-subtle"
        />
        <DashboardCard
          title="Theatre systems"
          value={state.totalTheatres}
          icon={<i className="bi bi-building"></i>}
          bg="bg-primary-subtle"
        />
        <DashboardCard
          title="Role Types"
          value={state.totalRoles}
          icon={<i className="bi bi-shield-lock"></i>}
          bg="bg-primary-subtle"
        />
      </div>
    </div>
  );
};

export default Dashboard;
