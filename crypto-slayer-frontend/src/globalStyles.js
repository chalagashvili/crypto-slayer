import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 18;
        text-decoration: none;
        letter-spacing:  0.6px;
    }

    body {
        margin: 0;
    }

    a {
        color: #FFF;
    }
`
