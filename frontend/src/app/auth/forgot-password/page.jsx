"use client";

import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "../components/AuthLayout";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import EmailVerifyModal from "../email-verify/EmailVerifyModal";

const ForgotPasswordPage = () => {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [targetEmail, setTargetEmail] = useState("");
  const router = useRouter();

  return (
    <AuthLayout>
      <Col xs={12} lg={6} className="d-flex justify-content-center">
        <Row className="my-5">
          <Col sm={10} xl={12} className="m-auto">
            <h1 className="fs-2">Forgot Password?</h1>
            <h5 className="fw-light mb-4">
              To create new password, enter your email address below.
            </h5>

            <ForgotPasswordForm
              onForgotSuccess={(email) => {
                setTargetEmail(email);
                setShowVerifyModal(true);
              }}
            />

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

      <EmailVerifyModal
        show={showVerifyModal}
        onHide={() => setShowVerifyModal(false)}
        email={targetEmail}
        mode="forgot"
        onVerifySuccess={() => {
          setShowVerifyModal(false);
          router.push(`/auth/reset-password?email=${targetEmail}`);
        }}
      />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
