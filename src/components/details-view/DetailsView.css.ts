import { css } from "@emotion/css"

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
