import {render,screen,fireEvent} from "@testing-library/react";
import Admin from "../Admin"

let mockNavigate = jest.fn();

jest.mock("react-router-dom",()=>({
    ...jest.requireActual("react-router-dom"),
    useNavigate:()=>mockNavigate
}));

describe("Admin page",()=>{

    beforeEach(()=>{
        mockNavigate.mockClear();
    })


    test("render header",()=>{
        render(
                <Admin />
        )

        expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
    })

    test("render subheader",()=>{
        render(
            <Admin />
        )

        expect(screen.getByText("Manage users, settings, reports")).toBeInTheDocument();
    })

    test("back button workd",()=>{
        render(
            <Admin />
        )

        let backButton = screen.getByText("Back");
        fireEvent.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith("/dashboard")
    })
})