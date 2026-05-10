

/**
 * @typedef {'CUP' | 'USD'} Currency
 */

/**
 * @typedef {Object} Movement
 * @property {string} id
 * @property {string} productId
 * @property {'IN' | 'OUT'} type
 * @property {number} quantity
 * @property {string} date
 * @property {string} reason
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} code
 * @property {string} name
 * @property {string} category
 * @property {number} basicPrice
 * @property {number} sellingPrice
 * @property {Currency} currency
 * @property {number} stock
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} AppSettings
 * @property {'simple' | 'fixed' | 'percent'} profitMethod
 * @property {number} fixedCost
 * @property {number} percentCost
 * @property {number} lowStockGlobal
 * @property {number} exchangeRate
 */

/**
 * Clase Product para representar un producto (Tema 2: OOP)
 */
export class Product {
  constructor(id, code, name, category, basicPrice, sellingPrice, currency, stock) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.category = category;
    this.basicPrice = basicPrice;
    this.sellingPrice = sellingPrice;
    this.currency = currency;
    this.stock = stock;
  }

  // Método para calcular la ganancia por unidad
  calculateProfit() {
    return this.sellingPrice - this.basicPrice;
  }

  // Método para verificar si el stock es bajo
  isLowStock(threshold) {
    return this.stock <= threshold;
  }

  // Método para obtener el valor total del inventario
  getTotalValue() {
    return this.sellingPrice * this.stock;
  }
}
