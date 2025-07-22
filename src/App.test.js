import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Smart Goal Planner heading", () => {
  render(<App />);
  const heading = screen.getByText(/Smart Goal Planner/i);
  expect(heading).toBeInTheDocument();
});
