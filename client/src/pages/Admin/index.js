import React from "react";
import PageTitle from "../../components/PageTitle";
import { Tabs } from "antd";
import MoviesList from "./MoviesList";
import TheatresList from "./TheatresList";

function Admin() {
  return (
    <div>
      <PageTitle title="Admin" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Filme" className="custom-tab ml-2" key="1">
            <MoviesList />
        </Tabs.TabPane>
<tabBarStyle></tabBarStyle>
        <Tabs.TabPane tab="Cinematografe"className="text-white" key="2">
            <TheatresList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;
