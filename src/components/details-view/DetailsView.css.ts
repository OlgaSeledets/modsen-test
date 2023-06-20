import { css } from "@emotion/css"

export const bookImg = css`
  width: 17rem;
  height: 23rem;
  border-radius: 0.5rem;
  background-color: #4A4E69;
  border: 1px solid rgba(0, 0, 0, 0.75);
  box-shadow: -4px 4px 10px 0px rgba(0, 0, 0, 0.75);
`

export const descriptionText = css`
  max-width: 70rem;
  min-width: 17rem;
`

export const descriptionTextCategories = css`
  margin-bottom: 0.5rem;
`

export const descriptionTextTitle = css`
  font-size: 22px;
  margin-bottom: 0.5rem;
`

export const descriptionTextAuthors = css`
  margin-bottom: 1.5rem;
`

export const descriptionTextDescription = css`
  text-align: justify;
  font-size: 18px;
`

export const detailsView = css`
  display: flex;

  @media (max-width: 664px) {
    display: block;
  }
`

export const imgContainer = css`
  width: 17rem;
  margin-right: 3rem;
  margin-bottom: 1rem;

  @media (max-width: 664px) {
    width: 100%;
    text-align: center;
  }
`
