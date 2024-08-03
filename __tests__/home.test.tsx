import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Home from "../src/app/(pages)/page"

describe("home", () => {
  it("renders a heading", () => {
    render(<Home />)
    screen.debug()

    const heading = screen.getByRole("heading", {
      name: /Test/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
