import { Button } from "@/client/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      Home Page
      <Link to="/login">
        <Button>
          Login
        </Button>
      </Link>
    </div>
  )
}

export const Component = Home;