import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

export default function Header () {
  return (
    <div>
      <Jumbotron>
        <hr className="my-2" />
        <p>Aby poznać aktualne ceny skontaktuj się z nami pod numerem 000000000</p>
        <hr className="my-2" />
      </Jumbotron>
    </div>
  )
}