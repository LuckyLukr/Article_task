import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe("react-assignment app", () => {
    describe("when clicking on More comments button", () => {
        it("after loading should display more comments", () => {
            const {getByText} = render(<App/>);

            fireEvent.click(getByText('More comments'),  {button: 1});

            waitFor(() => expect(getByText('Splendid!')).toBeInTheDocument());
        })
    })

    describe("when clicking on Hide comments button", () => {
        it("should hide aditional comments", () => {
            const {getByText, queryByText} = render(<App/>);

            fireEvent.click(getByText('More comments'),  {button: 1});
            waitFor(() => fireEvent.click(getByText('Hide comments'),  {button: 1}));

            expect(queryByText('Excelent!')).not.toBeInTheDocument();
        })
    })
});