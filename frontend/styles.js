export default `
  body {
    font-size: 16px;
    line-height: 1.4;
    max-width: 600px;
    margin: 0 auto;
  }

  .visuallyhidden {
    position: absolute !important;
    height: 1px; 
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap; /* added line */
  }

  .wrapper {
    transform: translateZ(0);
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

  .rating .rating__options {
    display: flex;
  }

  .rating__options .rating__option {
    opacity: 0.3;
  }

  .rating__options .rating__option--selected {
    opacity: 1;
  }

  @keyframes slide-in {
    0% {
      transform: translate3d(0, -60px, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slide-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(0, -60px, 0);
    }
  }

  .notification {
    position: fixed;
    top: 8px;
    right: 8px;
    z-index: 100;

    max-width: 320px;
    padding: 12px 18px;
    border-radius: 4px;

    font-size: 13px;
    line-height: 18px;
    color: #f6f6f6;
    background: hsl(0,0%,20%);

    animation: slide-in 0.2s ease-out;
    animation-fill-mode: forwards;
  }

  .notification--timesout {
    animation: slide-out 0.2s ease-out;
    animation-delay: 3s;
    animation-fill-mode: forwards;
  }

  .notification svg {
    display: block;
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