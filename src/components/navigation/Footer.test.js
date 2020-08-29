import React from "react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "mutationobserver-shim";
import App from "../../App";
import AuthState from "../context/auth/AuthState";
import AlertState from "../context/alert/AlertState";
import ExpanderState from "../context/expander/ExpanderState";
import NavigationState from "../context/navigation/NavState";
import CardsState from "../context/cards/CardsState";

function renderWithContext(node) {
  return render(
    <AlertState>
      <AuthState>
        <NavigationState>
          <ExpanderState>
            <CardsState>
              <MemoryRouter>{node}</MemoryRouter>
            </CardsState>
          </ExpanderState>
        </NavigationState>
      </AuthState>
    </AlertState>
  );
}

window.HTMLElement.prototype.scrollIntoView = jest.fn();

test("<Footer/> renders correct", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  const FooterComponent = getByTestId("FooterComponent");

  expect(FooterComponent).toBeInTheDocument();
  expect(FooterComponent).toBeVisible();
  expect(FooterComponent).toContainElement(getByTestId("FooterLogo"));
  expect(FooterComponent).toContainElement(getByTestId("FooterItemGDPR"));
  expect(FooterComponent).toContainElement(getByTestId("FooterItemImprint"));

  expect(getByTestId("FooterLogo")).toHaveAttribute("href", "/#Start");
  expect(getByTestId("FooterItemGDPR")).toHaveAttribute("href", "/gdpr/#top");
  expect(getByTestId("FooterItemImprint")).toHaveAttribute(
    "href",
    "/imprint/#top"
  );
});

test("on click <NavLogo/> app displays ", () => {
  const { queryByTestId } = renderWithContext(<App />);

  expect(queryByTestId("LandingComponent")).toBeInTheDocument();

  fireEvent.click(queryByTestId("LandingComponentLinkToLogin"));
  expect(queryByTestId("LandingComponent")).not.toBeInTheDocument();

  fireEvent.click(queryByTestId("FooterLogo"));
  expect(queryByTestId("LandingComponent")).toBeInTheDocument();
});
