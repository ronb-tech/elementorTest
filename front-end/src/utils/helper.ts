import errorImg from "../layout/assets/images/errImg.png";

export const onImgError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = errorImg;
};
