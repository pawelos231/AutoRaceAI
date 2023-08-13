class Loader {
  public loadSound(soundUrl: string): Promise<HTMLAudioElement> {
    const audio: HTMLAudioElement = new Audio();

    return new Promise((resolve, reject) => {
      audio.addEventListener(
        "canplaythrough",
        (event: Event) => this.itemLoaded<Event>(event),
        false
      );
      audio.src = soundUrl;
      soundUrl.length !== 0
        ? resolve(audio)
        : reject("nie udało się wczytać pliku");
    });
  }

  private itemLoaded<T extends Event>(event: T): void {
    if (!event.target) return;
    event.target.removeEventListener(event.type, this.itemLoaded, false);
  }

  public loadImage(imageUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image: HTMLImageElement = new Image();
      image.src = imageUrl;
      image.addEventListener(
        "load",
        (event: Event) => this.itemLoaded<Event>(event),
        false
      );
      resolve(image);
    });
  }

  public loadMultipleImages(imagesUrl: string[]): Promise<unknown>[] {
    const ImagePromises: Promise<unknown>[] = [];

    imagesUrl.map((item: string) => {
      ImagePromises.push(
        new Promise((resolve, reject) => {
          const image: HTMLImageElement = new Image();
          image.src = item;
          image.addEventListener(
            "load",
            (event: Event) => this.itemLoaded<Event>(event),
            false
          );
          resolve(image);
        })
      );
    });

    return ImagePromises;
  }
}
export const loader: Loader = new Loader();
