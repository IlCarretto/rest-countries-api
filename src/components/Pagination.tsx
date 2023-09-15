import React, {useState} from 'react'
import styled from 'styled-components';
import { Country } from '../type';

interface IProps {
    totalPages: number;
    currPage: number;
    setCurrPage: React.Dispatch<React.SetStateAction<number>>;
    currentCountries: Country[] | undefined;
}

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 50px;
`

const Button = styled.button`
    width: 50px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const PrevButton = styled(Button)`
    border-radius: 4px 0 0 4px;
`

const NextButton = styled(Button)`
    border-radius: 0 4px 4px 0;
`

const PageBox = styled.div`
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const Pagination = ({totalPages, currPage, setCurrPage, currentCountries}: IProps) => {

    const handleNextPage = () => {
        if (currPage < totalPages) {
            setCurrPage((prevPage) => prevPage + 1);
        }
    }

    const handlePrevPage = () => {
        if (currPage > 1) {
            setCurrPage((prevPage) => prevPage - 1);
        }
    }

  return (
    <PaginationContainer className='pagination mt-5'>
        <PrevButton disabled={currPage === 1 || (currentCountries && currentCountries.length < 8)} onClick={handlePrevPage}>Prev</PrevButton>
        <PageBox className='curr-page'>{currPage}</PageBox>
        <NextButton disabled={currPage === totalPages || (currentCountries && currentCountries.length < 8)} onClick={handleNextPage}>Next</NextButton>
    </PaginationContainer>
  )
}

export default Pagination