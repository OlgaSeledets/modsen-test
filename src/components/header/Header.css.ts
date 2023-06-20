import { css } from "@emotion/css"

export const header = css`
  padding: 1rem 0;
  margin-bottom: 1.5rem;
  background-color: #282A2B;
`

export const headerContainer = css`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 1rem;
`

export const logo = css`
  width: 4rem;
  height: 4rem;
`

export const title = css`
  color: #fff;
  font-size: xx-large;
  margin: 0 1rem;
`

export const search = css`
  height: 1.9rem;
`

export const searchSelect = css`
  border-right: 1px solid rgba(127, 127, 127, 0.5);
`

export const searchInput = css`
  height: 100%;
  width: 40vw;
  margin: 0;
  border: none;
  outline: none;
  vertical-align: middle;
`

export const searchBtn = css`
  height: 100%;
  font-size: smaller;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  width: 3rem;
  margin: 0;
  border: none;
  border-left: 1px solid rgba(127, 127, 127, 0.5);
  vertical-align: middle;
  cursor: pointer;
  background-color: #fff;
`