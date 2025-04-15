
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import ExpandedRouteOptimizer from "@/components/RouteOptimizer/ExpandedRouteOptimizer";

const RouteOptimizerPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Route Optimizer | CyberPing</title>
      </Helmet>
      <div className="p-6">
        <h1 className="text-2xl font-tech mb-6 text-white">Route Optimizer</h1>
        <ExpandedRouteOptimizer />
      </div>
    </Layout>
  );
};

export default RouteOptimizerPage;
