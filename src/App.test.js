import React from "react";
import App from "./App";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("renders App without crashing", () => {
  const { getByTestId } = render(<App />);

  const AppComponent = getByTestId("AppComponent");

  expect(AppComponent).toBeInTheDocument();
  expect(AppComponent).toBeVisible();
  expect(AppComponent).toContainElement(getByTestId("NavbarComponent"));
  expect(AppComponent).toContainElement(getByTestId("MainComponent"));
  expect(AppComponent).toContainElement(getByTestId("FooterComponent"));
});
