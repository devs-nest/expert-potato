export const testFile = {
  challenge_id: '1',
  folder_name: 'Day01',
  content: `
  import { render, screen } from "@testing-library/react";
import React from "react";
import App from "../App";


it("should contains the heading 1", () => {
  render(<App />);
  const heading = screen.getByText(/Hello! I am using React/i);
  expect(heading).toBeInTheDocument();
});

it("should contains a button", () => {
  render(<App />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

it("button name is create", () => {
  render(<App />);
  const button = screen.getByRole("button");
  expect(button).toHaveTextContent("Day 01");
}); 
  `
}
