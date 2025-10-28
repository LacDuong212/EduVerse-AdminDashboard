"use client";

import { Col, Container, Row } from "react-bootstrap";

export default function AuthLayout({ children }) {
  return (
    <main>
  <section className="p-0 d-flex align-items-center position-relative overflow-hidden min-vh-100">
    <Container fluid>
      <Row className="min-vh-100">
        <Col xs={12} lg={6} className="d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 min-vh-100">
          <div className="p-3 p-lg-5">
            <div className="text-center">
              <h2 className="fw-bold">Welcome to our largest community</h2>
              <p className="mb-0 h6 fw-light">Let's learn something new today!</p>
            </div>
            <img src="/images/02.svg" className="mt-5" alt="element" />
          </div>
        </Col>
        {children}
      </Row>
    </Container>
  </section>
</main>
  );
}
