"use client";

import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import AuthLayout from "../components/AuthLayout";
import SignUpForm from "./components/SignUpForm";
import EmailVerifyModal from "@/app/auth/email-verify/EmailVerifyModal";

export default function SignUpPage() {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  return (
    <AuthLayout>
      <Col xs={12} lg={6} className="m-auto">
        <Row className="my-5">
          <Col sm={10} xl={8} className="m-auto">
            <h2>Sign up for your account!</h2>
            <p className="lead mb-4">Nice to see you! Please Sign up with your account.</p>

            <SignUpForm
              onSignUpSuccess={(email) => {
                setRegisteredEmail(email);
                setShowVerifyModal(true);
              }}
            />

            <div className="mt-4 text-center">
              <span>
                Already have an account?{" "}
                <Link href="/auth/sign-in" className="text-primary">
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
        email={registeredEmail}
        mode="register"
        onVerifySuccess={() => {
          setShowVerifyModal(false);
          toast.success("Account verified successfully!");
          window.location.href = "/auth/sign-in";
        }}
      />
    </AuthLayout>
  );
}
