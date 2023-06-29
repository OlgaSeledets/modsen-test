import { css } from "@emotion/css"

export const subheaderSelect = css`
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 4px;
`
export const errorMessage = css`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  min-width: 254px;
  text-align: center;
  font-size: 18px;
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

export const loadingMessage = css`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  font-size: 18px;
`
