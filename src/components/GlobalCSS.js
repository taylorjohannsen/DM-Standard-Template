import { css } from "@emotion/core"

// file all the global css like colors for classes that pull from the json data
const globalCSS = ({ theme }) => css`
  header {
    background-color:  ${theme.colors.secondary};
    color: black
  }
  h1 {
    background-color: ${theme.colors.tertiary}
  }
  body {
    background-color:  ${theme.colors.primary};
    padding: 0;
    margin: 0;
    font-family: sans-serif
  }
  .mobileButton {
    background-color:  ${theme.colors.accent1};
  }
  .dropDownLink {
    background-color:  ${theme.colors.accent1};
  }

  .dropDownLink:hover {
    background-color:  ${theme.colors.accent2};
  }

  .slideButton:hover {
    background-color:  ${theme.colors.accent2} !important;
  }


  .dropDownLink {
    color: ${theme.colors.text}
}
  .headerContainer {
    border-bottom: 2px solid ${theme.colors.accent1};
  }
  .slideButton:hover {
    background-color:  ${theme.colors.accent2};
}
`
export default globalCSS