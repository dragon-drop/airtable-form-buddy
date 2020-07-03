export default `
  body {
    font-size: 16px;
    line-height: 1.4;
    max-width: 600px;
    margin: 0 auto;
  }

  .visuallyhidden {
    position: absolute;
    opacity: 0;
  }
  
  .checkbox label {
    display: inline-block;
    position: relative;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }

  .checkbox label svg {
    display: none;
  }

  .checkbox--is-checked label svg {
    display: block;
    position: absolute;
    top: 8px;
    left: 8px;
    pointer-events: none;
  }

  .notification {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 100;

    max-width: 320px;
    padding: 16px;
    border-radius: 6px;

    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 2px;
  }

  .message {
    display: flex;
  }

  .message svg {
    width: 1.5em;
    height: 1.5em;
    margin-right: 1em;
  }
  
  .message p {
    margin-top: 0;
  }

  .with-icon {
    display: flex;
    align-items: center;
  }

  .with-icon svg {
    opacity: .5;
    margin-right: .25em;
  }

  .rule {
    margin-top: 16px;
  }

  .rule + .rule {
    padding-top: 16px;
    border-top: 1px solid hsla(0,0%,0%,0.1);
  }

  .fields {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }

  .fields > * + * {
    margin-left: .5em;
  }

  .fields input[type="text"], .fields input[type="tel"], .fields select {
    height: 32px;
    line-height: 32px;
    padding: 0 6px;
  }

  .airtable-input {
    height: 32px;
    line-height: 21px;
    padding-left: 10px;
    padding-right: 10px;
    margin: 0;
    border: none;
    border-radius: 3px;
    
    color: hsl(0,0%,20%);
    background: hsl(0,0%,95%);
  }

  textarea.airtable-input {
    width: 100% !important;
    min-height: 72px !important;
    height: auto !important;
    line-height: 1.7;
    padding: 1rem;
  }

  form.spaced,
  form.spaced > * + * {
    margin-top: 32px;
  }

  form.spaced > *:last-child {
    margin-top: 0;
  }
`