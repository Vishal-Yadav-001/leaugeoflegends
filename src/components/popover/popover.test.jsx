import { render, screen, waitFor } from "@testing-library/react"
import BasicPopover from "./popover.component";

describe("POPOVER",()=>{

    test("Open popover",async()=>{
        render( <BasicPopover anchorEl={anchorEl} openPopover={openPopover} closePopover={closePopover}>
           This is a pop over
        </BasicPopover>);
    await  waitFor(()=>{
        expect(screen.getByText("This is a pop over")).toBeInTheDocument();
      }) 
    })
});

const anchorEl =true;
const openPopover = (event)=>{
return null;
}
const closePopover = (event)=>{
    return null;
    }