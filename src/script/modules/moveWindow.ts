export function moveWindow() :void
{
  const messageBox = document.getElementsByClassName("message-box")[0] as HTMLElement;
  // ウィンドウの移動を管理
  const MoveWindow =
  {
    start:
    {
      x: 0,
      y: 0,
    },
    start_window:
    {
      x: 0,
      y: 0,
    }
  }

  let onDragging = false;
  let toMoveWindow :boolean = true;
  const fps = 30;

  messageBox.addEventListener("mousedown", event =>
  {
    startMovingWindow(event);
  })

  document.addEventListener("mousemove", event =>
  {
    continueMovingWindow(event);
  })

  document.addEventListener("mouseup", () =>
  {
    endMovingWindow(event);
  })

  messageBox.addEventListener("touchstart", event =>
  {
    startMovingWindow(event);
  })

  messageBox.addEventListener("touchmove", event =>
  {
    continueMovingWindow(event);
  })

  messageBox.addEventListener("touchend", event =>
  {
    endMovingWindow(event);
  })

  const startMovingWindow = function (event :Event) :void
  {
    const mouseEvent = event as MouseEvent;
    MoveWindow.start.x = mouseEvent.clientX;
    MoveWindow.start.y = mouseEvent.clientY;
    MoveWindow.start_window.x = Number(messageBox.getBoundingClientRect().x);
    MoveWindow.start_window.y = Number(messageBox.getBoundingClientRect().y);

    onDragging = true;
  }

  const continueMovingWindow = function (event :Event) :void
  {
    if (toMoveWindow && onDragging)
    {
      const mouseEvent = event as MouseEvent;
      messageBox.style.left = String(MoveWindow.start_window.x + mouseEvent.clientX - MoveWindow.start.x) + "px";
      messageBox.style.top = String(MoveWindow.start_window.y + mouseEvent.clientY - MoveWindow.start.y) + "px";
      toMoveWindow = false;

      setTimeout(() =>
      {
        toMoveWindow = true;
      }, 1000 / fps);
    }
  }

  const endMovingWindow = function (event :Event) :void
  {
    onDragging = false;
  }
}
