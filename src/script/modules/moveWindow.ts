export function moveWindow() :void
{
  const messageBox = document.getElementsByClassName("message-box")[0];
  const messageBox__caption = document.getElementsByClassName("message-box__caption")[0];
  // ウィンドウの移動を管理
  const MoveWindow =
  {
    start: {
      x: 0,
      y: 0,
    },
    start_window: {
      x: 0,
      y: 0,
    }
  }

  let onDragging = false;
  let toMoveWindow :boolean = true;
  const fps = 30;

  messageBox__caption.addEventListener("mousedown", event =>
  {
    startMovingWindow(event);
  })

  document.addEventListener("mousemove", event =>
  {
    continueMovingWindow(event);
  })

  document.addEventListener("mouseup", event =>
  {
    endMovingWindow(event);
  })

  messageBox__caption.addEventListener("touchstart", event =>
  {
    startMovingWindow(event);
  })

  document.addEventListener("touchmove", event =>
  {
    continueMovingWindow(event);
  })

  document.addEventListener("touchend", event =>
  {
    endMovingWindow(event);
  })

  const startMovingWindow = function (event :Event) :void
  {
    const mouseEvent = event as MouseEvent;
    MoveWindow.start.x = mouseEvent.clientX;
    MoveWindow.start.y = mouseEvent.clientY;
    MoveWindow.start_window.x = messageBox.getBoundingClientRect().x;
    MoveWindow.start_window.y = messageBox.getBoundingClientRect().y;

    onDragging = true;
  }

  const continueMovingWindow = function (event :Event) :void
  {
    if (toMoveWindow && onDragging)
    {
      const mouseEvent = event as MouseEvent;
      (messageBox as HTMLElement).style.left = `${MoveWindow.start_window.x + mouseEvent.clientX - MoveWindow.start.x}px`;
      (messageBox as HTMLElement).style.top = `${MoveWindow.start_window.y + mouseEvent.clientY - MoveWindow.start.y}px`;
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
