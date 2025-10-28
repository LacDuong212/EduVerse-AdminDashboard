"use client";

import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AuthLayout from "../components/AuthLayout";
import ResetPasswordForm from "./components/ResetPasswordForm";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <AuthLayout>
      <Col xs={12} lg={6} className="d-flex justify-content-center">
        <Row className="my-5">
          <Col sm={10} xl={12} className="m-auto">
            <h1 className="fs-2">Reset Password</h1>
            <h5 className="fw-light mb-4">
              To reset your password, enter a new password below.
            </h5>

            <ResetPasswordForm email={email} />

            <div className="mt-4 text-center">
              <span>
                Remembered your password?
                <Link href="/auth/sign-in" className="text-primary ms-1">
                  Sign in here
                </Link>
              </span>
            </div>
          </Col>
        </Row>
      </Col>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
