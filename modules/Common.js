import { HIDDEN } from "../constants/classNames";
import { Logger } from "../types/CommonTypes";
export class Common {
    constructor(...elementId) {
        if (elementId && elementId[0]) {
            this.elementId = this.bindElementById(elementId[0]);
        }
        else {
            this.elementId = undefined;
        }
    }
    bindElementById(elementToFindById) {
        const element = document.getElementById(elementToFindById);
        if (!element)
            throw new Error(`Nie znaleziono elementu ${elementToFindById}`);
        return element;
    }
    bindElementByClass(elementToFindByClass) {
        const element = document.documentElement.querySelector("." + elementToFindByClass);
        if (!element)
            throw new Error(`Nie znaleziono elementu ${elementToFindByClass}`);
        return element;
    }
    changeVisbilityOfGivenElement(element, flag) {
        flag ? element === null || element === void 0 ? void 0 : element.classList.remove(HIDDEN) : element === null || element === void 0 ? void 0 : element.classList.add(HIDDEN);
    }
    bindMultipleElements(elementsTobBind) {
        const elements = document.querySelectorAll("." + elementsTobBind);
        if (!elements)
            throw new Error(`Nie znaleziono elementu ${elementsTobBind}`);
        return elements;
    }
    displayMessageAtTheTopOfTheScreen(message, status) {
        if (status > 2 || status < 0)
            throw new Error("Nieprawidłowy status wiadomości, wprowadź wartości z enuma Errors");
        const messageNode = this.bindElementByClass("MESSAGE");
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
