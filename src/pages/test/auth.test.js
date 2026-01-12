import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import Auth from "../Auth";

let mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

global.fetch = jest.fn();

describe("Auth page", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    localStorage.setItem("token", "fakeToken");
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("render login form by default", () => {
    render(<Auth />);

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("switch to register form", () => {
    render(<Auth />);
    let registerLinkButton = screen.getByText(/Register/i);
    fireEvent.click(registerLinkButton);

    expect(
      screen.getByRole("heading", { name: /register/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("form user to type email and password", () => {
    render(<Auth />);

    let emailInput = screen.getByPlaceholderText("Email");
    let passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "admin@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });

    expect(emailInput.value).toBe("admin@gmail.com");
    expect(passwordInput.value).toBe("admin123");
  });

  test("renders email and password input fields", () => {
    render(<Auth />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });


  test("form submit",async()=>{
    fetch.mockResolvedValueOnce({
        ok:true,
        json:async()=>({
            token:"fakeToken"
        })
    })
    
    render(<Auth />)
    
    let emailField= screen.getByPlaceholderText("Email")
    let passField= screen.getByPlaceholderText("Password")
    
    fireEvent.change(emailField,{target:{value:"v@gmail.com"}})
    fireEvent.change(passField,{target:{value:"123"}})
    fireEvent.click(screen.getByRole("button",{name:/Login/i}));
    
    await waitFor(()=>{
      expect(fetch).toHaveBeenCalled();
    })
    
})
});
