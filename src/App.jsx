import "./App.css";
import "../node_modules/@syncfusion/ej2-react-grids/styles/material.css";
import React, { useState, useEffect } from "react";
import { registerLicense } from "@syncfusion/ej2-base";
import * as Realm from "realm-web";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent
} from "@syncfusion/ej2-react-grids";
import { Edit, Inject, Toolbar } from "@syncfusion/ej2-react-grids";

registerLicense(process.env.REACT_APP_SYNCFUSION_KEY);

function App() {
  const [dataSet, setDataSet] = useState([]);

  const getData = async () => {
    const app = new Realm.App({ id: "react_test-lgozx" });
    // Get the API key from the local environment
    const apiKey =
      "1y5k3beSRjSg9dlTMucCZfsFseg10SLCeryPHi8RaLjk5Qxg8py2J5kB2o6tTB7Q";
    if (!apiKey) {
      throw new Error("Could not find a Realm Server API Key.");
    }
    const credentials = Realm.Credentials.serverApiKey(apiKey);
    try {
      const user = await app.logIn(credentials);
      const allData = await user.functions.getDataTesting();
      setDataSet(allData);
      console.log(allData);
    } catch (err) {
      console.error("Failed to log in", err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <GridComponent
          dataSource={dataSet}
          editSettings={{
            allowEditing: true,
            allowAdding: true,
            allowDeleting: true
          }}
          toolbar={["Add", "Edit", "Delete", "Update", "Cancel"]}
        >
          <ColumnsDirective>
            <ColumnDirective field="name" width="200" />
            <ColumnDirective field="id" width="300" />
          </ColumnsDirective>
          <Inject services={[Edit, Toolbar]} />
        </GridComponent>
      </header>
    </div>
  );
}

export default App;
