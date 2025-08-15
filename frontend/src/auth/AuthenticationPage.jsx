import React from "react";
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";

export function AuthenticationPage() {
  return (
    <div className="auth-container">
      <SignedOut>
        <SignIn
          routing="path"
          path="/sign-in"
          appearance={{
            elements: {
              logoBox: {
                transform: "scale(4.0)", // enlarges the logo
                margin: "20px", // keeps spacing nice
                padding: "5px",
              },
              card: {
                padding: "32px", // more breathing space
              },
            },
            variables: {
              fontSize: "15px", // bigger text
            },
          }}
        />
        <SignUp routing="path" path="/sign-up" />
      </SignedOut>
      <SignedIn>
        <div className="redirect-message">
          <p>You are already signed in.</p>
        </div>
      </SignedIn>
    </div>
  );
}
