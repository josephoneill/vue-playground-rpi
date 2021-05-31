let touchStartX = 0;
let touchStartY = 0;

let touchEndX = 0;
let touchEndY = 0;

const determineGesture = (callback) => {
  const distX = touchEndX - touchStartX;
  const distY = touchEndY - touchStartY;
  const horizontalGesture = Math.abs(distX) > Math.abs(distY);
  let gestureDirection = '';

  if (distX > 0 && horizontalGesture) {
    gestureDirection = 'right';
  }

  if (distX < 0 && horizontalGesture) {
    gestureDirection = 'left';
  }

  if (distY > 0 && !horizontalGesture) {
    gestureDirection = 'down';
  }

  if (distY < 0 && !horizontalGesture) {
    gestureDirection = 'up';
  }

  callback(gestureDirection);
}

const onTouchStart = (event) => {
  touchStartX = event.changedTouches[0].screenX;
  touchStartY = event.changedTouches[0].screenY;
}

const onTouchEnd = (event, callback) => {
  touchEndX = event.changedTouches[0].screenX;
  touchEndY = event.changedTouches[0].screenY;

  determineGesture(callback);
}

export function bindGestureHandler(el, callback) {
  el.addEventListener('touchstart', onTouchStart);
  el.addEventListener('touchend', (event) => onTouchEnd(event, callback));
}
