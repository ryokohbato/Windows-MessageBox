export function iconEvents() :void
{
  const messageBox = document.getElementsByClassName("message-box")[0];

  const closeIconElement = messageBox.getElementsByClassName("close")[0];
  closeIconElement.addEventListener("click", () =>
  {
    messageBox.classList.add("is-invisible");
  })

  const minIconElement = messageBox.getElementsByClassName("min")[0];
  minIconElement.addEventListener("click", () =>
  {
    messageBox.classList.add("is-invisible");
  })
}