/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент не существует");
    }

    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const createIncomeBtn = this.element.querySelector(".create-income-button");
    const createExpenseBtn = this.element.querySelector(
      ".create-expense-button"
    );

    createIncomeBtn.addEventListener("click", () => {
      App.getModal("newIncome").open();
    });

    createExpenseBtn.addEventListener("click", () => {
      App.getModal("newExpense").open();
    });
  }
}
