import { css } from "@emotion/css"

export const subheaderSelect = css`
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 4px;
`

export const message = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
`

export const errorMessage = css`
  min-width: 254px;
  text-align: center;
  animation: appear 3s;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
