import { css } from "@emotion/css"

export const subheader = css`
  display: flex;
  margin-bottom: 1.5rem;
  height: 1.9rem;
  align-items: center;
`

export const bookCount = css`
  animation: appear 2s;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
