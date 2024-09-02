import type { MetaFunction } from "@remix-run/node";
import { LandingPage } from "~/components/landing-page";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return <LandingPage />;
}
