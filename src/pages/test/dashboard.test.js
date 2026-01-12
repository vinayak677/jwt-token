import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../Dashboard";

let mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// mock fetch
global.fetch = jest.fn();

describe("Dashboard page", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    localStorage.setItem("token", "fakeToken123");
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("render heading", () => {
    render(
        <Dashboard />
    );

    expect(screen.getByText(/logged in successfully/i)).toBeInTheDocument();
  });

  test("fetches and displays user data", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        role: "admin",
        name: "Admin",
        email: "admin@gmail.com",
      }),
    });

    render(
        <Dashboard />
    );

    await waitFor(() => {
      expect(screen.getByText("ADMIN")).toBeInTheDocument();
      expect(screen.getByText("Name:")).toBeInTheDocument();
      expect(screen.getByText("Admin")).toBeInTheDocument();
      expect(screen.getByText("admin@gmail.com")).toBeInTheDocument();
    });
  });

  test("logout functionality",async()=>{
    fetch.mockResolvedValueOnce({
      json: async ()=>({
        role: "customer",
        name: "User",
        email: "customer@gmail.com"
      })
    })

    render(
        <Dashboard />
    )

    const logoutButton = screen.getByText(/Logout/)
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("token")).toBeNull()
    expect(localStorage.getItem("role")).toBeNull()
  })
});
