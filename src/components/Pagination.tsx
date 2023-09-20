import React from 'react'
import styled from 'styled-components';
import { Country } from '../type';

interface PageInfo {
    prevPage: number;
    currentPage: number;
    nextPage: number;
}

interface IProps {
    totalPages: number;
    currPages: PageInfo;
    setCurrPages: React.Dispatch<React.SetStateAction<PageInfo>>;
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
    cursor: pointer;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    &:hover {
        opacity: .5;
    }
`

const Pagination = ({totalPages, currPages, setCurrPages, currentCountries}: IProps) => {

    const { prevPage, currentPage, nextPage } = currPages;

    function formatPages(operator: string) {
        setCurrPages((prevState) => {
          if (operator === '+') {
            return {
              prevPage: prevState.prevPage + 1,
              currentPage: prevState.currentPage + 1,
              nextPage: prevState.nextPage + 1
            };
          } else if (operator === '-') {
            return {
              prevPage: prevState.prevPage - 1,
              currentPage: prevState.currentPage - 1,
              nextPage: prevState.nextPage - 1
            };
          } else if (operator === "1") {
            return {
                prevPage: 0,
                currentPage: 1,
                nextPage: 2
            }
          } else {
            return {
                prevPage: totalPages - 1,
                currentPage: totalPages,
                nextPage: totalPages + 1
            }
          }
        });
      }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            formatPages("+");
        }
      };

      const handlePrevPage = () => {
        if (currentPage > 1) {
            formatPages("-");
        }
      };

  return (
    <PaginationContainer className='pagination mt-5'>
        <PrevButton disabled={currentPage === 1 || (currentCountries && currentCountries.length < 8)} onClick={handlePrevPage}>Prev</PrevButton>
        <PageBox onClick={() => formatPages("1")} className={`${currentPage < 3 && "d-none"} page-num first`}>1</PageBox>
        <PageBox onClick={() => formatPages("-")} className={`${prevPage < 1 && "d-none"} page-num prev`}>{prevPage}</PageBox>
        <PageBox className='page-num current'>{currentPage}</PageBox>
        <PageBox onClick={() => formatPages("+")} className={`${nextPage >= totalPages && "d-none"} page-num next`}>{nextPage}</PageBox>
        <PageBox onClick={() => formatPages("total")} className={`${currentPage === totalPages && 'd-none'} page-num last`}>{totalPages}</PageBox>
        <NextButton disabled={nextPage > totalPages || (currentCountries && currentCountries.length < 8)} onClick={handleNextPage}>Next</NextButton>
    </PaginationContainer>
  )
}

export default Pagination