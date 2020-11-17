import React, { useState, useEffect, useContext, useRef } from "react";
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import SocketIOContext from '../utils/socket.io';

const Home = () => {
  const socket = useContext(SocketIOContext);

  const [data, setData] = useState([]);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    socket.on('hello', (message) => {
      console.log('[Hello] ', message);
    });

    socket.on('data.saved', (datum) => {
      setData([...data, datum]);
      console.log('[data.saved] ', datum, data);
    });
    
  }, [data]);

  useEffect(() => {
    socket.on('data.saved', payload => {
      setMessageCount(messageCount + 1);
      document.title = `${messageCount} new messages have been emitted`;
      console.log(`[message.count] ${messageCount} new messages have been emitted`);
    });
  }, [messageCount]);

  const loadData = async () => {
    const response = await fetch('http://127.0.0.1:4000/api/data');
    const json = await response.json();
    console.log('[DATA] ', json, json.data);
    setData(json.data);
    console.log(json.data);
  }

  const renderDatum = ({ _id, name, sex, age, longitude, latitude, altitude }) => {
    return (
      <Table.Row key={_id}>
        <Table.Cell>{ name }</Table.Cell>
        <Table.Cell>{ sex }</Table.Cell>
        <Table.Cell>{ age }</Table.Cell>
        <Table.Cell>{ longitude }</Table.Cell>
        <Table.Cell>{ latitude }</Table.Cell>
        <Table.Cell>{ altitude }</Table.Cell>
      </Table.Row>
    );
  }

  return (
    <div>
      <h1>HOME</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>Sex</Table.HeaderCell>
            <Table.HeaderCell>Longitude</Table.HeaderCell>
            <Table.HeaderCell>Latitude</Table.HeaderCell>
            <Table.HeaderCell>Altitude</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((datum) => renderDatum(datum))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Home;
