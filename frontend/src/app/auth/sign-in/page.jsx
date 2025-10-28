"use client";

import { Col, Row } from 'react-bootstrap';
import Link from "next/link";
import AuthLayout from "../components/AuthLayout";
import SignInForm from "./components/SignInForm";

export default function SignInPage() {
  return (
    <AuthLayout>
        <Col xs={12} lg={6} className="m-auto">
          <Row className="my-5">
            <Col sm={10} xl={8} className="m-auto">
              <h1 className="fs-3">Login into EduVerse Admin Dashboard!</h1>
              <p className="lead mb-4">Nice to see you! Please log in with your admin account.</p>
              <SignInForm />
              <div className="mt-4 text-center">
                <span>
                  Don&apos;t have an account? <Link href="/auth/sign-up">Signup here</Link>
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </AuthLayout>
  );
}
