import { css } from "@emotion/css"
  
export const card = css`
  width: 13rem;
  height: 18rem;
  border-radius: 0.5rem;
  position: relative;
  background-color: #4A4E69;
  border: 1px solid rgba(0, 0, 0, 0.75);
  box-shadow: -4px 4px 10px 0px rgba(0, 0, 0, 0.75);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`

export const cardImg = css`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
`

export const cardText = css`
  left: 0;
  right: 0;
  height: 7rem;
  background: linear-gradient(0deg, #181818 60%, rgba(0, 0, 0, 0) 100%);
  color: #F2E9E4;
  border-radius: 0 0 0.5rem 0.5rem;
  position: absolute;
  z-index: 1;
  bottom: 0;
  padding: 0.5rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
`

export const cardTextCategories = css`
  color: #f2f2f2;
  font-size: smaller;
`

export const cardTextTitle = css`
  color: #ffffff;
  font-size: large;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const cardTextAuthor = css`
  color: #b7b7b7;
`

export const nonclickable = css`
  pointer-events: none;
`