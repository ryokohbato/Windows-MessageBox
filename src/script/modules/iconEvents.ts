export function iconEvents() :void
{
  const messageBox = document.getElementsByClassName("message-box")[0] as HTMLElement;

  const closeIconElement = messageBox.getElementsByClassName("close")[0] as HTMLElement;
  closeIconElement.addEventListener("click", () =>
  {
    messageBox.classList.add("is-invisible");
  })

  const minIconElement = messageBox.getElementsByClassName("min")[0] as HTMLElement;
  minIconElement.addEventListener("click", () =>
  {
    messageBox.classList.add("is-invisible");
  })
}