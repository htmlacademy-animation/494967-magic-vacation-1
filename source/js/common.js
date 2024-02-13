import LoadingImages from "./modules/loading-images";

export default () => {
  document.body.onload = (event) => {
    document.body.classList.add(`loaded`);

    const loadingImage = new LoadingImages();
    loadingImage.preload();
  };
};
