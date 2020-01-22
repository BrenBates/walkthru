import React from 'react';
import { Col, Row, Container } from "../components/Grid";
import JumboTron from "../components/Jumbotron";

function NoMatch() {
    return (
        <Container fluid>
            <Row>
                <Col size="md-12">
                    <JumboTron>
                        <h1>404 Page Not Found</h1>
                    </JumboTron>
                </Col>
            </Row>
        </Container>
    );
}

export default NoMatch;