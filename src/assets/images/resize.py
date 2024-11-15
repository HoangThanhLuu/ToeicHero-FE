import cv2

img = cv2.imread('logo-vnpay.webp', cv2.IMREAD_UNCHANGED)
img = cv2.resize(img, (50, 50), interpolation=cv2.INTER_AREA)

cv2.imwrite('logo-vnpay-rs.webp', img)
