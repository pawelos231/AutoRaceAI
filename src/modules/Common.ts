import { HIDDEN } from "../constants/classNames";
import { Logger } from "../types/CommonTypes";

type CommonElementIdType<T extends boolean> = T extends true
  ? HTMLElement
  : undefined;

export class Common<T extends boolean = false> {
  protected elementId: CommonElementIdType<T>;

  protected constructor(
    ...elementId: T extends true ? [string] : [undefined?]
  ) {
    if (elementId && elementId[0]) {
      this.elementId = this.bindElementById(
        elementId[0]
      ) as CommonElementIdType<T>;
    } else {
      this.elementId = undefined as CommonElementIdType<T>;
    }
  }

  protected bindElementById(elementToFindById: string): HTMLElement {
    const element: HTMLElement | null =
      document.getElementById(elementToFindById);

    if (!element)
      throw new Error(`Nie znaleziono elementu ${elementToFindById}`);

    return element;
  }

  protected bindElementByClass(elementToFindByClass: string): HTMLElement {
    const element: HTMLElement | null = document.documentElement.querySelector(
      "." + elementToFindByClass
    );

    if (!element)
      throw new Error(`Nie znaleziono elementu ${elementToFindByClass}`);

    return element;
  }

  protected changeVisbilityOfGivenElement(
    element: HTMLElement,
    flag: boolean
  ): void {
    flag ? element?.classList.remove(HIDDEN) : element?.classList.add(HIDDEN);
  }

  protected bindMultipleElements(elementsTobBind: string): NodeListOf<Element> {
    const elements: NodeListOf<Element> = document.querySelectorAll(
      "." + elementsTobBind
    );

    if (!elements)
      throw new Error(`Nie znaleziono elementu ${elementsTobBind}`);

    return elements;
  }

  protected displayMessageAtTheTopOfTheScreen(message: string, status: Logger) {
    if (status > 2 || status < 0)
      throw new Error(
        "Nieprawidłowy status wiadomości, wprowadź wartości z enuma Errors"
      );

    const messageNode: HTMLElement = this.bindElementByClass("MESSAGE");
    this.changeVisbilityOfGivenElement(messageNode, true);

    switch (status) {
      case Logger.Error:
        messageNode.style.color = "red";
        break;
      case Logger.Message:
        messageNode.style.color = "green";
        break;
      case Logger.Warn:
        messageNode.style.color = "orange";
        break;
    }

    this.changeVisbilityOfGivenElement(messageNode, true);
    setTimeout(() => {
      this.changeVisbilityOfGivenElement(messageNode, false);
    }, 1500);
    messageNode.textContent = message;
  }
}
