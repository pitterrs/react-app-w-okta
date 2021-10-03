import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Card,
  Container,
  Col,
  Row,
  Form,
  Accordion,
  Button,
} from "@deere/ux.uxframe-react";
//import { FormControl, InputLabel, Input, Grid } from "@deere/fuel-react";
import { Helmet } from "react-helmet";
import { TableContainer } from "../components/TableContainer.js";
import useApi from "./Utils/useApi";
import "../App.css";

const initialValue = {
  purch: "",
};

const ScheduleSearch = () => {
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Purch.Group", accessor: "ekorg" },
      { Header: "Plant", accessor: "WERKS" },
      { Header: "Plant Desc.", accessor: "PLANT_NAME" },
      { Header: "MRP Area", accessor: "BERID" },
      { Header: "MRP Desc.", accessor: "BERTX" },
      { Header: "Purch.group", accessor: "EKGRP" },
      { Header: "Purch.Doc.", accessor: "EBELN" },
      { Header: "Purch. Item", accessor: "EBELP" },
      { Header: "Ship Date", accessor: "CALC_SHIP_DATE" },
    ],
    []
  );
  const [values, setValues] = useState(initialValue);
  const [data, setData] = useState([]);
  const mountRef = useRef(null);
  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("");
  const [load, loadInfo] = useApi({
    debounceDelay: 0,
    url: "/ScheduleLines",
    method: "get",
    params: {
      EBELN: search || undefined,
    },
    onCompleted: (response) => {
      setData(response.data);
    },
  });

  console.log({ load });

  useEffect(() => {
    load({
      debounced: mountRef.current,
    });
  }, [search]);

  function onChange(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
    setSearch1(value);
  }

  function onSubmit(ev) {
    ev.preventDefault();
    setSearch(search1);
  }

  return (
    <div className="uxf-main-container">
      <div className="container-fluid-aux">
        <Row className="mb-2">
          <Col>
            <h2 className="h3 mt-4">Schedule Lines </h2>
          </Col>
        </Row>

        <Accordion>
          <Accordion.Item id="accordionItem1" title="Search Parameters">
            <Form id="basicForm" onSubmit={onSubmit}>
              <Form.Group controlId="formGridName">
                <Form.Label className="uxf-label">Purchase Order</Form.Label>
                <Form.Control
                  type="text"
                  name="purchase"
                  className="label-plant"
                  onChange={onChange}
                />

                <Form.Label className="uxf-label">Purchase Item</Form.Label>
                <Form.Control type="text" name="purchase-item" className="label-plant" />

                <Form.Label className="uxf-label">
                  Schedule Line Number
                </Form.Label>
                <Form.Control type="text" name="schedule-line" className="label-plant" />

                <Form.Label className="uxf-label">Material</Form.Label>
                <Form.Control type="text" name="material" className="label-plant" />

                <Form.Label className="uxf-label">Plant</Form.Label>
                <Form.Control type="text" name="plant" className="label-plant" />

                <Form.Label className="uxf-label">MRP Area</Form.Label>
                <Form.Control type="text" name="mrp" className="label-plant" />

                <Form.Label className="uxf-label">MRP Controller</Form.Label>
                <Form.Control type="text" name="mpr-control" className="label-plant" />

                <Form.Label className="uxf-label">Purchasing Group</Form.Label>
                <Form.Control type="text" name="purch-group" className="label-plant" />

                <Form.Label className="uxf-label">Ship Date</Form.Label>
                <Form.Control type="date" name="ship-date" className="label-plant" />

                <Form.Label className="uxf-label">Ship Status</Form.Label>
                <Form.Control type="text" name="ship-status" className="label-plant" />
              </Form.Group>
              <div className="button">
                <Button type="submit">Search</Button>
              </div>
            </Form>
          </Accordion.Item>
        </Accordion>
      </div>
      <Helmet>
        <html lang="en" />
      </Helmet>

      <Container fluid>
        <Row className="mb-2">
          <Col>
            <Card>
              <TableContainer columns={columns} data={data} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ScheduleSearch;
