import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import CardComp from './CardComp';
import Container from 'reactstrap/lib/Container';

export default function Header () {
  return (
    <div>
        <Container >
          <CardComp />
          <CardComp />
          <CardComp />
          <CardComp />
        </Container>
    </div>
  )
}