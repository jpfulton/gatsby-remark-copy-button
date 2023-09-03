import type { GatsbyBrowser } from "gatsby";
import "./styles.css";

declare global {
  interface Window {
    copyToClipboard: (str: string, button: HTMLButtonElement) => void;
  }
}

export const onClientEntry: GatsbyBrowser["onClientEntry"] = () => {
  window.copyToClipboard = (str, button) => {
    if (!button) return;

    // prevent multiple immediate clicks on this operation
    const lockAttributeName = "data-copy-button-in-progress";
    if (button.getAttribute(lockAttributeName) === null)
      button.setAttribute(lockAttributeName, "false");

    if (button.getAttribute(lockAttributeName) === "true") return;

    const copyIcon = button.querySelector(".copy-icon") as HTMLElement;
    const successIcon = button.querySelector(".success-icon") as HTMLElement;

    if (button.getAttribute(lockAttributeName) === "false") {
      // set tag local lock variable
      button.setAttribute(lockAttributeName, "true");

      navigator.clipboard.writeText(str).then(
        () => {
          // clipboard success operation
          copyIcon.style.display = "none";
          successIcon.style.display = "block";

          setTimeout(() => {
            successIcon.style.display = "none";
            copyIcon.style.display = "block";

            // unset tag local lock variable
            button.setAttribute(lockAttributeName, "false");
          }, 2000);
        },
        () => {
          // clipboard failure operation
          console.log("Failed to copy content to clipboard.");

          // unset tag local lock variable
          button.setAttribute(lockAttributeName, "false");
        }
      );
    }
  };
};
