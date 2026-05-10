import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart3, 
  Box, 
  LayoutDashboard, 
  Plus, 
  Settings, 
  History, 
  Search, 
  Filter, 
  LogOut,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Package,
  Tags,
  Menu,
  X,
  Edit2,
  Trash2,
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingCart,
  Languages,
  Sun,
  Moon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { cn, formatCurrency, validateProductCode, validateProductName } from './lib/utils';

// Mock Data
const INITIAL_CATEGORIES = [
  { id: '1', name: 'Electrónica' },
  { id: '2', name: 'Hogar' },
  { id: '3', name: 'Alimentos' },
  { id: '4', name: 'Ropa' },
];

const INITIAL_PRODUCTS = [
  {
    id: '1',
    code: 'AAA001',
    name: 'Teclado Mecánico RGB',
    category: 'Electrónica',
    basicPrice: 45,
    sellingPrice: 85,
    currency: 'USD',
    stock: 15,
    createdAt: '2026-04-01T08:30:00.000Z',
  },
  {
    id: '2',
    code: 'AAA002',
    name: 'Café Molido Premium',
    category: 'Alimentos',
    basicPrice: 500,
    sellingPrice: 750,
    currency: 'CUP',
    stock: 3,
    createdAt: '2026-04-02T09:10:00.000Z',
  },
  {
    id: '3',
    code: 'AAA003',
    name: 'Monitor 27" 4K',
    category: 'Electrónica',
    basicPrice: 200,
    sellingPrice: 350,
    currency: 'USD',
    stock: 8,
    createdAt: '2026-04-03T12:45:00.000Z',
  },
  {
    id: '4',
    code: 'AAA004',
    name: 'Mouse Inalámbrico',
    category: 'Electrónica',
    basicPrice: 15,
    sellingPrice: 35,
    currency: 'USD',
    stock: 25,
    createdAt: '2026-04-04T14:20:00.000Z',
  },
  {
    id: '5',
    code: 'AAA005',
    name: 'Lámpara LED Regulable',
    category: 'Hogar',
    basicPrice: 20,
    sellingPrice: 45,
    currency: 'USD',
    stock: 12,
    createdAt: '2026-04-05T10:50:00.000Z',
  },
  {
    id: '6',
    code: 'AAA006',
    name: 'Almohada Premium Memory Foam',
    category: 'Hogar',
    basicPrice: 30,
    sellingPrice: 75,
    currency: 'USD',
    stock: 7,
    createdAt: '2026-04-06T11:15:00.000Z',
  },
  {
    id: '7',
    code: 'AAA007',
    name: 'Té Oolong Orgánico',
    category: 'Alimentos',
    basicPrice: 800,
    sellingPrice: 1200,
    currency: 'CUP',
    stock: 20,
    createdAt: '2026-04-07T09:05:00.000Z',
  },
  {
    id: '8',
    code: 'AAA008',
    name: 'Chocolate Belga 70%',
    category: 'Alimentos',
    basicPrice: 8,
    sellingPrice: 18,
    currency: 'USD',
    stock: 30,
    createdAt: '2026-04-08T10:05:00.000Z',
  },
  {
    id: '9',
    code: 'AAA009',
    name: 'Camiseta Básica Blanca',
    category: 'Ropa',
    basicPrice: 5,
    sellingPrice: 15,
    currency: 'USD',
    stock: 50,
    createdAt: '2026-04-09T13:20:00.000Z',
  },
  {
    id: '10',
    code: 'AAA010',
    name: 'Jeans Azul Oscuro',
    category: 'Ropa',
    basicPrice: 1500,
    sellingPrice: 2500,
    currency: 'CUP',
    stock: 10,
    createdAt: '2026-04-10T14:45:00.000Z',
  },
  {
    id: '11',
    code: 'AAA011',
    name: 'Auriculares Bluetooth',
    category: 'Electrónica',
    basicPrice: 35,
    sellingPrice: 85,
    currency: 'USD',
    stock: 18,
    createdAt: '2026-04-11T15:40:00.000Z',
  },
  {
    id: '12',
    code: 'AAA012',
    name: 'Webcam HD 1080p',
    category: 'Electrónica',
    basicPrice: 25,
    sellingPrice: 60,
    currency: 'USD',
    stock: 14,
    createdAt: '2026-04-12T08:55:00.000Z',
  },
  {
    id: '13',
    code: 'AAA013',
    name: 'Cortinas Blackout',
    category: 'Hogar',
    basicPrice: 2000,
    sellingPrice: 3500,
    currency: 'CUP',
    stock: 6,
    createdAt: '2026-04-13T07:30:00.000Z',
  },
  {
    id: '14',
    code: 'AAA014',
    name: 'Espejo de Pared Circular',
    category: 'Hogar',
    basicPrice: 18,
    sellingPrice: 45,
    currency: 'USD',
    stock: 9,
    createdAt: '2026-04-14T16:10:00.000Z',
  },
  {
    id: '15',
    code: 'AAA015',
    name: 'Pasta Integral 500g',
    category: 'Alimentos',
    basicPrice: 150,
    sellingPrice: 250,
    currency: 'CUP',
    stock: 40,
    createdAt: '2026-04-15T09:25:00.000Z',
  },
  {
    id: '16',
    code: 'AAA016',
    name: 'Galletas de Trigo Integral',
    category: 'Alimentos',
    basicPrice: 200,
    sellingPrice: 350,
    currency: 'CUP',
    stock: 35,
    createdAt: '2026-04-16T10:35:00.000Z',
  },
  {
    id: '17',
    code: 'AAA017',
    name: 'Suéter de Lana Merino',
    category: 'Ropa',
    basicPrice: 40,
    sellingPrice: 95,
    currency: 'USD',
    stock: 11,
    createdAt: '2026-04-17T11:50:00.000Z',
  },
  {
    id: '18',
    code: 'AAA018',
    name: 'Medias de Algodón',
    category: 'Ropa',
    basicPrice: 200,
    sellingPrice: 400,
    currency: 'CUP',
    stock: 60,
    createdAt: '2026-04-18T14:00:00.000Z',
  },
  {
    id: '19',
    code: 'AAA019',
    name: 'Ventilador de Mesa Silencioso',
    category: 'Hogar',
    basicPrice: 25,
    sellingPrice: 55,
    currency: 'USD',
    stock: 13,
    createdAt: '2026-04-19T13:00:00.000Z',
  },
  {
    id: '20',
    code: 'AAA020',
    name: 'Cable HDMI 2.1',
    category: 'Electrónica',
    basicPrice: 5,
    sellingPrice: 12,
    currency: 'USD',
    stock: 100,
    createdAt: '2026-04-20T12:15:00.000Z',
  },
  {
    id: '21',
    code: 'AAA021',
    name: 'Almacenamiento USB 256GB',
    category: 'Electrónica',
    basicPrice: 20,
    sellingPrice: 50,
    currency: 'USD',
    stock: 22,
    createdAt: '2026-04-21T13:20:00.000Z',
  },
  {
    id: '22',
    code: 'AAA022',
    name: 'Bolsa de Dormir Premium',
    category: 'Hogar',
    basicPrice: 60,
    sellingPrice: 140,
    currency: 'USD',
    stock: 5,
    createdAt: '2026-04-22T12:40:00.000Z',
  },
];

const translations = {
  es: {
    // Navigation
    'Panel de Control': 'Panel de Control',
    'Inventario': 'Inventario',
    'Categorías': 'Categorías',
    'Estadísticas': 'Estadísticas',
    'Configuración': 'Configuración',
    
    // Search
    'Buscar en inventario...': 'Buscar en inventario...',
    
    // Dashboard
    'Stock Total': 'Stock Total',
    'Alertas Críticas': 'Alertas Críticas',
    'Ganancia (USD)': 'Ganancia (USD)',
    'Movimientos de inventario consolidados': 'Movimientos de inventario consolidados',
    'Tendencia de Almacén': 'Tendencia de Almacén',
    'Nuevo Producto': 'Nuevo Producto',
    'Historial Global': 'Historial Global',
    'Historial Global de Movimientos': 'Historial Global de Movimientos',
    
    // Inventory
    'Todo': 'Todo',
    'Stock Bajo': 'Stock Bajo',
    'Todas las Categorías': 'Todas las Categorías',
    'Añadido recientemente': 'Añadido recientemente',
    'Alfabéticamente': 'Alfabéticamente',
    'Por código': 'Por código',
    'Stock menor → mayor': 'Stock menor → mayor',
    'Añadir': 'Añadir',
    'ID/Cod': 'ID/Cod',
    'Precios': 'Precios',
    'Acciones': 'Acciones',
    'Venta:': 'Venta:',
    'Gana:': 'Gana:',
    '(BAJO)': '(BAJO)',
    'unidades globales': 'unidades globales',
    'productos bajo mínimo': 'productos bajo mínimo',
    'Ganancia Est. (USD)': 'Ganancia Est. (USD)',
    'Ganancia Est. (CUP)': 'Ganancia Est. (CUP)',
    'Productos Críticos': 'Productos Críticos',
    'Margen Promedio': 'Margen Promedio',
    'Valor por Categoría': 'Valor por Categoría',
    'Distribución de Stock': 'Distribución de Stock',
    'Suficiente': 'Suficiente',
    'Bajo Mínimo': 'Bajo Mínimo',
    'Stock Suficiente': 'Stock Suficiente',
    'Bajo Mínimo (Alerta)': 'Bajo Mínimo (Alerta)',
    'Productos críticos que requieren reabastecimiento. Cuentan con': 'Critical products requiring restock. They have',
    'Stock disponible:': 'Stock disponible:',
    'Confirmar Venta': 'Confirmar Venta',
    'Precio Base': 'Precio Base',
    'Venta realizada': 'Venta realizada',
    'Conectado': 'Conectado',
    
    // Updated labels
    'Actualizado hace unos segundos': 'Actualizado hace unos segundos',
    'Actualizado hace 1 min': 'Actualizado hace 1 min',
    'Actualizado hace': 'Actualizado hace',
    'min': 'min',
    
    // Categories
    'Nueva Categoría': 'Nueva Categoría',
    
    // Modals
    'Registrar Venta': 'Registrar Venta',
    'Eliminar producto?': 'Eliminar producto?',
    '¿Eliminar esta categoría?': '¿Eliminar esta categoría?',
    'Inventario Inicial': 'Inventario Inicial',
    'Venta': 'Venta',
    
    // Settings
    'Configuración del Sistema': 'Configuración del Sistema',
    'Personaliza el comportamiento y visualización de datos': 'Personaliza el comportamiento y visualización de datos',
    'Idioma': 'Idioma',
    'Modo del Sistema': 'Modo del Sistema',
    'Oscuro': 'Oscuro',
    'Claro': 'Claro',
    'Cálculo de Ganancias': 'Cálculo de Ganancias',
    'Método de cálculo': 'Método de cálculo',
    'Bruta': 'Bruta',
    'Venta - Compra': 'Venta - Compra',
    'Costo Fijo': 'Costo Fijo',
    'Neto - Fijo': 'Neto - Fijo',
    'Margen %': 'Margen %',
    'Neto - % Fee': 'Neto - % Fee',
    'Costo Operativo Fijo (USD/CUP)': 'Costo Operativo Fijo (USD/CUP)',
    'Ej: 0.50': 'Ej: 0.50',
    'Se restará un valor fijo a la ganancia de cada unidad en stock.': 'Se restará un valor fijo a la ganancia de cada unidad en stock.',
    'Margen de Costo (%)': 'Margen de Costo (%)',
    'Ej: 10': 'Ej: 10',
    'Se aplicará este porcentaje como costo sobre la ganancia bruta.': 'Se aplicará este porcentaje como costo sobre la ganancia bruta.',
    'Moneda y Tasas': 'Moneda y Tasas',
    'Tasa de Cambio (1 USD = X CUP)': 'Tasa de Cambio (1 USD = X CUP)',
    'Utilizado para calcular las estadísticas convertidas en USD y CUP.': 'Utilizado para calcular las estadísticas convertidas en USD y CUP.',
    'Alertas de Inventario': 'Alertas de Inventario',
    'Umbral de Stock Bajo Global': 'Umbral de Stock Bajo Global',
    'Usado como valor por defecto para nuevos productos.': 'Usado como valor por defecto para nuevos productos.',
    'Cambios aplicados instantáneamente': 'Cambios aplicados instantáneamente',
    
    // Product Modal
    'Nuevo': 'Nuevo',
    'Editar': 'Editar',
    'Producto': 'Producto',
    'Nombre': 'Nombre',
    'Código': 'Código',
    'Categoría': 'Categoría',
    'Moneda': 'Moneda',
    'Precio Básico': 'Precio Básico',
    'Precio de Venta': 'Precio de Venta',
    'Stock': 'Stock',
    'Ganancia': 'Ganancia',
    'Guardar': 'Guardar',
    'Cancelar': 'Cancelar',
    'ACTUALIZAR PRODUCTO': 'ACTUALIZAR PRODUCTO',
    'REGISTRAR PRODUCTO': 'REGISTRAR PRODUCTO',
    'GUARDAR CATEGORÍA': 'GUARDAR CATEGORÍA',
    'Ej: Teclado Mecánico': 'Ex: Mechanical Keyboard',
    'Ej: Accesorios': 'Ex: Accessories',
    'No hay movimientos registrados.': 'No movements recorded.',
    'Productos críticos que requieren reabastecimiento.': 'Critical products requiring restock.',
    'Cuentan con': 'They have',
    // Extra keys
    'Productos con inventario saludable.': 'Productos con inventario saludable.',
    'Tienen un stock mayor al umbral de': 'Tienen un stock mayor al umbral de',
    'unidades.': 'unidades.',
    'Nombre del Producto': 'Nombre del Producto',
    'Precio Costo': 'Precio Costo',
    'Precio Venta': 'Precio Venta',
    'Ganancia Unit. Estimada': 'Ganancia Unit. Estimada',
    'Nombre de la Categoría': 'Nombre de la Categoría',
    'Cantidad a Vender': 'Cantidad a Vender',
    'Tasa de Cambio: 1 USD =': 'Tasa de Cambio: 1 USD =',
    'No hay productos en estado de alerta.': 'No hay productos en estado de alerta.',
    'Ganancia Total USD': 'Ganancia Total USD',
    'Ganancia Total CUP': 'Ganancia Total CUP',
    'Ganancia Ventas': 'Ganancia Ventas',
    'Unidad': 'Unidad',
    'Añadir Categoría': 'Añadir Categoría',
    'Movimientos de': 'Movimientos de',
    'Producto Eliminado': 'Producto Eliminado',
    'Productos en Alerta Crítica': 'Productos en Alerta Crítica',
    'Detalle de Stock Total': 'Detalle de Stock Total',
    'Detalle de Ganancias': 'Detalle de Ganancias',
    'Estos productos tienen stock igual o menor al umbral de alerta.': 'Estos productos tienen stock igual o menor al umbral de alerta.',
    'Los productos con más unidades en inventario.': 'Los productos con más unidades en inventario.',
    'Productos con mayor ganancia estimada por unidad.': 'Productos con mayor ganancia estimada por unidad.',
    'uds': 'uds',
    'Entradas': 'Entradas',
    'Ventas': 'Ventas',
    'Nuevo nombre:': 'Nuevo nombre:',
    'No se puede eliminar una categoría con productos asociados.': 'No se puede eliminar una categoría con productos asociados.',
    // Reasons
    'Compra inicial': 'Compra inicial',
    'Abastecimiento': 'Abastecimiento',
    'Venta local': 'Venta local'
  },
  en: {
    // Navigation
    'Panel de Control': 'Dashboard',
    'Inventario': 'Inventory',
    'Categorías': 'Categories',
    'Estadísticas': 'Statistics',
    'Configuración': 'Settings',
    
    // Search
    'Buscar en inventario...': 'Search inventory...',
    
    // Dashboard
    'Stock Total': 'Total Stock',
    'Alertas Críticas': 'Critical Alerts',
    'Ganancia (USD)': 'Profit (USD)',
    'Movimientos de inventario consolidados': 'Consolidated inventory movements',
    'Tendencia de Almacén': 'Warehouse Trend',
    'Nuevo Producto': 'New Product',
    'Historial Global': 'Global History',
    'Historial Global de Movimientos': 'Global Movement History',
    
    // Inventory
    'Todo': 'All',
    'Stock Bajo': 'Low Stock',
    'Todas las Categorías': 'All Categories',
    'Añadido recientemente': 'Recently Added',
    'Alfabéticamente': 'Alphabetically',
    'Por código': 'By code',
    'Stock menor → mayor': 'Stock low → high',
    'Añadir': 'Add',
    'ID/Cod': 'ID/Code',
    'Precios': 'Prices',
    'Acciones': 'Actions',
    'Venta:': 'Sale:',
    'Gana:': 'Profit:',
    '(BAJO)': '(LOW)',
    'unidades globales': 'global units',
    'productos bajo mínimo': 'products below minimum',
    'Ganancia Est. (USD)': 'Est. Profit (USD)',
    'Ganancia Est. (CUP)': 'Est. Profit (CUP)',
    'Productos Críticos': 'Critical Products',
    'Margen Promedio': 'Average Margin',
    'Valor por Categoría': 'Value by Category',
    'Distribución de Stock': 'Stock Distribution',
    'Suficiente': 'Sufficient',
    'Bajo Mínimo': 'Below Minimum',
    'Stock Suficiente': 'Sufficient Stock',
    'Bajo Mínimo (Alerta)': 'Below Minimum (Alert)',
    'Productos críticos que requieren reabastecimiento. Cuentan con': 'Critical products requiring restock. They have',
    'Stock disponible:': 'Available stock:',
    'Confirmar Venta': 'Confirm Sale',
    'Precio Base': 'Base Price',
    'Venta realizada': 'Sale completed successfully!',
    'Conectado': 'Connected',
    
    // Updated labels
    'Actualizado hace unos segundos': 'Updated a few seconds ago',
    'Actualizado hace 1 min': 'Updated 1 min ago',
    'Actualizado hace': 'Updated',
    'min': 'min',
    'ago': 'ago',
    
    // Categories
    'Nueva Categoría': 'New Category',
    
    // Modals
    'Registrar Venta': 'Record Sale',
    'Eliminar producto?': 'Delete product?',
    '¿Eliminar esta categoría?': 'Delete this category?',
    'Inventario Inicial': 'Initial Inventory',
    'Venta': 'Sale',
    
    // Settings
    'Configuración del Sistema': 'System Configuration',
    'Personaliza el comportamiento y visualización de datos': 'Customize behavior and data visualization',
    'Idioma': 'Language',
    'Modo del Sistema': 'System Mode',
    'Oscuro': 'Dark',
    'Claro': 'Light',
    'Cálculo de Ganancias': 'Profit Calculation',
    'Método de cálculo': 'Calculation Method',
    'Bruta': 'Gross',
    'Venta - Compra': 'Sale - Purchase',
    'Costo Fijo': 'Fixed Cost',
    'Neto - Fijo': 'Net - Fixed',
    'Margen %': 'Margin %',
    'Neto - % Fee': 'Net - % Fee',
    'Costo Operativo Fijo (USD/CUP)': 'Fixed Operating Cost (USD/CUP)',
    'Ej: 0.50': 'Ex: 0.50',
    'Se restará un valor fijo a la ganancia de cada unidad en stock.': 'A fixed value will be subtracted from the profit of each unit in stock.',
    'Margen de Costo (%)': 'Cost Margin (%)',
    'Ej: 10': 'Ex: 10',
    'Se aplicará este porcentaje como costo sobre la ganancia bruta.': 'This percentage will be applied as a cost over the gross profit.',
    'Moneda y Tasas': 'Currency and Rates',
    'Tasa de Cambio (1 USD = X CUP)': 'Exchange Rate (1 USD = X CUP)',
    'Utilizado para calcular las estadísticas convertidas en USD y CUP.': 'Used to calculate statistics converted to USD and CUP.',
    'Alertas de Inventario': 'Inventory Alerts',
    'Umbral de Stock Bajo Global': 'Global Low Stock Threshold',
    'Usado como valor por defecto para nuevos productos.': 'Used as default value for new products.',
    'Cambios aplicados instantáneamente': 'Changes applied instantly',
    
    // Product Modal
    'Nuevo': 'New',
    'Editar': 'Edit',
    'Producto': 'Product',
    'Nombre': 'Name',
    'Código': 'Code',
    'Categoría': 'Category',
    'Moneda': 'Currency',
    'Precio Básico': 'Basic Price',
    'Precio de Venta': 'Selling Price',
    'Stock': 'Stock',
    'Ganancia': 'Profit',
    'Guardar': 'Save',
    'Cancelar': 'Cancel',
    'ACTUALIZAR PRODUCTO': 'UPDATE PRODUCT',
    'REGISTRAR PRODUCTO': 'REGISTER PRODUCT',
    'GUARDAR CATEGORÍA': 'SAVE CATEGORY',
    'Ej: Teclado Mecánico': 'Ex: Mechanical Keyboard',
    'Ej: Accesorios': 'Ex: Accessories',
    'No hay movimientos registrados.': 'No movements recorded.',
    'Productos críticos que requieren reabastecimiento.': 'Critical products requiring restock.',
    'Cuentan con': 'They have',
    // Extra keys
    'Productos con inventario saludable.': 'Products with healthy inventory.',
    'Tienen un stock mayor al umbral de': 'They have stock above the threshold of',
    'unidades.': 'units.',
    'Nombre del Producto': 'Product Name',
    'Precio Costo': 'Cost Price',
    'Precio Venta': 'Sale Price',
    'Ganancia Unit. Estimada': 'Est. Unit Profit',
    'Nombre de la Categoría': 'Category Name',
    'Cantidad a Vender': 'Quantity to Sell',
    'Tasa de Cambio: 1 USD =': 'Exchange Rate: 1 USD =',
    'No hay productos en estado de alerta.': 'No products in alert state.',
    'Ganancia Total USD': 'Total Profit USD',
    'Ganancia Total CUP': 'Total Profit CUP',
    'Ganancia Ventas': 'Sales Profit',
    'Unidad': 'Unit',
    'Añadir Categoría': 'Add Category',
    'Movimientos de': 'Movements of',
    'Producto Eliminado': 'Deleted Product',
    'Productos en Alerta Crítica': 'Critical Alert Products',
    'Detalle de Stock Total': 'Total Stock Detail',
    'Detalle de Ganancias': 'Profit Detail',
    'Estos productos tienen stock igual o menor al umbral de alerta.': 'These products have stock at or below the alert threshold.',
    'Los productos con más unidades en inventario.': 'Products with the most units in inventory.',
    'Productos con mayor ganancia estimada por unidad.': 'Products with highest estimated profit per unit.',
    'uds': 'units',
    'Entradas': 'Entries',
    'Ventas': 'Sales',
    'Nuevo nombre:': 'New name:',
    'No se puede eliminar una categoría con productos asociados.': 'Cannot delete a category with associated products.',
    // Reasons
    'Compra inicial': 'Initial Purchase',
    'Abastecimiento': 'Restocking',
    'Venta local': 'Local Sale'
  }
};

const INITIAL_MOVEMENTS = [
  { id: '1', productId: '1', type: 'IN', quantity: 15, date: '2026-04-10', reason: 'Compra inicial' },
  { id: '2', productId: '2', type: 'IN', quantity: 10, date: '2026-04-25', reason: 'Abastecimiento' },
  { id: '3', productId: '2', type: 'OUT', quantity: 7, date: '2026-05-05', reason: 'Venta local' },
  { id: '4', productId: '3', type: 'IN', quantity: 8, date: '2026-04-15', reason: 'Compra inicial' },
  { id: '5', productId: '4', type: 'IN', quantity: 25, date: '2026-04-18', reason: 'Compra inicial' },
  { id: '6', productId: '5', type: 'IN', quantity: 12, date: '2026-04-20', reason: 'Compra inicial' },
  { id: '7', productId: '6', type: 'IN', quantity: 7, date: '2026-04-22', reason: 'Compra inicial' },
  { id: '8', productId: '7', type: 'IN', quantity: 20, date: '2026-04-25', reason: 'Compra inicial' },
  { id: '9', productId: '8', type: 'IN', quantity: 30, date: '2026-04-26', reason: 'Compra inicial' },
  { id: '10', productId: '9', type: 'IN', quantity: 50, date: '2026-04-28', reason: 'Compra inicial' },
  { id: '11', productId: '10', type: 'IN', quantity: 10, date: '2026-04-29', reason: 'Compra inicial' },
  { id: '12', productId: '11', type: 'IN', quantity: 18, date: '2026-05-01', reason: 'Compra inicial' },
  { id: '13', productId: '12', type: 'IN', quantity: 14, date: '2026-05-01', reason: 'Compra inicial' },
  { id: '14', productId: '13', type: 'IN', quantity: 6, date: '2026-05-02', reason: 'Compra inicial' },
  { id: '15', productId: '14', type: 'IN', quantity: 9, date: '2026-05-02', reason: 'Compra inicial' },
  { id: '16', productId: '15', type: 'IN', quantity: 40, date: '2026-05-03', reason: 'Compra inicial' },
  { id: '17', productId: '16', type: 'IN', quantity: 35, date: '2026-05-03', reason: 'Compra inicial' },
  { id: '18', productId: '17', type: 'IN', quantity: 11, date: '2026-05-04', reason: 'Compra inicial' },
  { id: '19', productId: '18', type: 'IN', quantity: 60, date: '2026-05-04', reason: 'Compra inicial' },
  { id: '20', productId: '19', type: 'IN', quantity: 13, date: '2026-05-05', reason: 'Compra inicial' },
  { id: '21', productId: '20', type: 'IN', quantity: 100, date: '2026-05-05', reason: 'Compra inicial' },
  { id: '22', productId: '21', type: 'IN', quantity: 22, date: '2026-05-06', reason: 'Compra inicial' },
  { id: '23', productId: '22', type: 'IN', quantity: 5, date: '2026-05-06', reason: 'Compra inicial' },
  { id: '24', productId: '1', type: 'OUT', quantity: 3, date: '2026-05-01', reason: 'Venta' },
  { id: '25', productId: '3', type: 'OUT', quantity: 2, date: '2026-05-01', reason: 'Venta' },
  { id: '26', productId: '4', type: 'OUT', quantity: 5, date: '2026-05-02', reason: 'Venta' },
  { id: '27', productId: '5', type: 'OUT', quantity: 2, date: '2026-05-02', reason: 'Venta' },
  { id: '28', productId: '6', type: 'OUT', quantity: 1, date: '2026-05-02', reason: 'Venta' },
  { id: '29', productId: '8', type: 'OUT', quantity: 8, date: '2026-05-03', reason: 'Venta' },
  { id: '30', productId: '9', type: 'OUT', quantity: 10, date: '2026-05-03', reason: 'Venta' },
  { id: '31', productId: '11', type: 'OUT', quantity: 3, date: '2026-05-03', reason: 'Venta' },
  { id: '32', productId: '12', type: 'OUT', quantity: 2, date: '2026-05-04', reason: 'Venta' },
  { id: '33', productId: '14', type: 'OUT', quantity: 2, date: '2026-05-04', reason: 'Venta' },
  { id: '34', productId: '15', type: 'OUT', quantity: 6, date: '2026-05-04', reason: 'Venta' },
  { id: '35', productId: '16', type: 'OUT', quantity: 8, date: '2026-05-05', reason: 'Venta' },
  { id: '36', productId: '17', type: 'OUT', quantity: 2, date: '2026-05-05', reason: 'Venta' },
  { id: '37', productId: '18', type: 'OUT', quantity: 12, date: '2026-05-05', reason: 'Venta' },
  { id: '38', productId: '20', type: 'OUT', quantity: 15, date: '2026-05-06', reason: 'Venta' },
  { id: '39', productId: '21', type: 'OUT', quantity: 4, date: '2026-05-06', reason: 'Venta' },
];

// Components
function StatCard({ title, value, subValue, icon: Icon, trend, colorClass, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-card p-6 rounded-2xl border-l-4 relative overflow-hidden text-left transition-all",
        onClick ? "cursor-pointer hover:-translate-y-1 hover:shadow-xl" : ""
      )}
      style={{ borderLeftColor: colorClass }}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#988d9f]">{title}</span>
        <Icon className={cn("w-5 h-5")} style={{ color: colorClass }} />
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        {trend && (
          <span className={cn("text-xs font-bold mb-1", trend > 0 ? "text-secondary" : "text-tertiary")}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      <p className="text-xs text-[#988d9f] mt-1">{subValue}</p>
    </motion.button>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });
  const [movements, setMovements] = useState(() => {
    const saved = localStorage.getItem('movements');
    return saved ? JSON.parse(saved) : INITIAL_MOVEMENTS;
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(null);
  const [showHistory, setShowHistory] = useState(null);
  const [showGlobalHistory, setShowGlobalHistory] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStockLow, setFilterStockLow] = useState(false);
  const [inventorySort, setInventorySort] = useState('recent');
  const [settings, setSettings] = useState({
    profitMethod: 'simple',
    fixedCost: 0,
    percentCost: 0,
    lowStockGlobal: 5,
    exchangeRate: 540
  });
  const [statModal, setStatModal] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [now, setNow] = useState(new Date());
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'es');
  const darkMode = true;
  const t = (key) => translations[language]?.[key] || key;

  // Persistir datos en localStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('movements', JSON.stringify(movements));
  }, [movements]);

  useEffect(() => {
    setUpdatedAt(new Date());
  }, [products, categories, movements, settings]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Apply theme (always dark)
  useEffect(() => {
    document.documentElement.classList.remove('light-mode');
    document.documentElement.classList.add('dark-mode');
  }, []);

  const addCategory = (name) => {
    const newCat = { id: Date.now().toString(), name };
    setCategories([...categories, newCat]);
    setShowAddCategory(false);
  };

  const deleteCategory = (id) => {
    const catToDelete = categories.find(c => c.id === id);
    if (catToDelete && products.some(p => p.category === catToDelete.name)) {
      alert(t("No se puede eliminar una categoría con productos asociados."));
      return;
    }
    setCategories(categories.filter(c => c.id !== id));
  };

  // Modals state for forms
  const [showSaleModal, setShowSaleModal] = useState(null);
  const [saleQuantity, setSaleQuantity] = useState(1);

  // Automatic code generator (AAA001 -> AAB000, etc.)
  const generateProductCode = () => {
    const codes = products
      .map(p => p.code)
      .filter(c => /^[A-Z]{3}\d{3}$/.test(c))
      .sort();

    let result = 'AAA001';
    if (codes.length > 0) {
      const lastCode = codes[codes.length - 1];
      let letters = lastCode.substring(0, 3);
      let numbers = parseInt(lastCode.substring(3), 10);

      numbers++;
      if (numbers > 999) {
        numbers = 0;
        let chars = [letters.charCodeAt(0), letters.charCodeAt(1), letters.charCodeAt(2)];
        chars[2]++;
        if (chars[2] > 90) { // 'Z'
          chars[2] = 65; // 'A'
          chars[1]++;
          if (chars[1] > 90) {
            chars[1] = 65;
            chars[0]++;
          }
        }
        letters = String.fromCharCode(chars[0], chars[1], chars[2]);
      }

      result = `${letters}${numbers.toString().padStart(3, '0')}`;
    }

    return result;
  };

  const [productForm, setProductForm] = useState({
    name: '',
    code: '',
    category: INITIAL_CATEGORIES[0].name,
    currency: 'USD',
    basicPrice: 0,
    sellingPrice: 0,
    stock: 0,
  });

  const handleSaveProduct = () => {
    const isValid = productForm.name && productForm.code &&
      validateProductName(productForm.name) &&
      validateProductCode(productForm.code) &&
      !Number.isNaN(productForm.basicPrice) && productForm.basicPrice >= 0 &&
      !Number.isNaN(productForm.sellingPrice) && productForm.sellingPrice >= 0 &&
      !Number.isNaN(productForm.stock) && productForm.stock >= 0;

    if (!isValid) {
      alert('Datos del producto inválidos. Verifique nombre, código y valores numéricos positivos.');
      return;
    }

    if (showEditProduct) {
      setProducts(products.map(p => p.id === showEditProduct.id ? { ...p, ...productForm } : p));
    } else {
      const newProduct = {
        ...productForm,
        id: Date.now().toString(),
        createdAt: productForm.createdAt || new Date().toISOString(),
      };
      setProducts([...products, newProduct]);
      
      if (newProduct.stock > 0) {
        setMovements([...movements, {
          id: Date.now().toString(),
          productId: newProduct.id,
          type: 'IN',
          quantity: newProduct.stock,
          date: new Date().toISOString(),
          reason: 'Inventario Inicial'
        }]);
      }
    }
    
    setShowAddProduct(false);
    setShowEditProduct(null);
  };

  const openEditModal = (p) => {
    setProductForm(p);
    setShowEditProduct(p);
  };

  const openAddModal = () => {
    setProductForm({
      name: '',
      code: generateProductCode(),
      category: categories[0]?.name || '',
      currency: 'USD',
      basicPrice: 0,
      sellingPrice: 0,
      stock: 0,
      createdAt: new Date().toISOString(),
    });
    setShowAddProduct(true);
  };

  const openSaleModal = (p) => {
    setShowSaleModal(p);
    setSaleQuantity(1);
  };

  const handleSale = () => {
    if (!showSaleModal || saleQuantity <= 0) return;
    
    // Update product stock
    setProducts(products.map(p => 
      p.id === showSaleModal.id 
        ? { ...p, stock: p.stock - saleQuantity }
        : p
    ));

    // Add movement
    setMovements([...movements, {
      id: Date.now().toString(),
      productId: showSaleModal.id,
      type: 'OUT',
      quantity: saleQuantity,
      date: new Date().toLocaleString(),
      reason: `Venta`
    }]);

    setShowSaleModal(null);
  };

  const calculateProfit = (p) => {
    const gross = p.sellingPrice - p.basicPrice;
    let result = gross;
    if (settings.profitMethod === 'fixed') {
      result = gross - settings.fixedCost;
    } else if (settings.profitMethod === 'percent') {
      result = gross * (1 - settings.percentCost / 100);
    }
    return result;
  };

  // Stats Logic
  const stats = useMemo(() => {
    const totalInventoryValueUSD = products.reduce((acc, p) => {
      const val = p.sellingPrice * p.stock;
      return acc + (p.currency === 'USD' ? val : val / settings.exchangeRate);
    }, 0);
    
    const totalInventoryValueCUP = products.reduce((acc, p) => {
      const val = p.sellingPrice * p.stock;
      return acc + (p.currency === 'CUP' ? val : val * settings.exchangeRate);
    }, 0);
    
    const lowStockCount = products.filter(p => p.stock <= settings.lowStockGlobal).length;
    
    const avgMargin = products.length 
      ? (products.reduce((acc, p) => {
          const profit = calculateProfit(p);
          return acc + (profit / p.sellingPrice);
        }, 0) / products.length * 100).toFixed(1) 
      : 0;

    const totalGainUSD = products.reduce((acc, p) => {
       const profit = calculateProfit(p);
       const profitUSD = p.currency === 'USD' ? profit : profit / settings.exchangeRate;
       return acc + (profitUSD * p.stock);
    }, 0);
    
    const totalGainCUP = products.reduce((acc, p) => {
       const profit = calculateProfit(p);
       const profitCUP = p.currency === 'CUP' ? profit : profit * settings.exchangeRate;
       return acc + (profitCUP * p.stock);
    }, 0);

    const totalSalesProfitUSD = movements
      .filter(m => m.type === 'OUT' && m.reason.includes('Venta'))
      .reduce((acc, m) => {
        const p = products.find(prod => prod.id === m.productId);
        const profit = p ? calculateProfit(p) : 0;
        const profitUSD = p && p.currency === 'USD' ? profit : profit / settings.exchangeRate;
        return acc + (profitUSD * m.quantity);
      }, 0);

    const totalSalesProfitCUP = movements
      .filter(m => m.type === 'OUT' && m.reason.includes('Venta'))
      .reduce((acc, m) => {
        const p = products.find(prod => prod.id === m.productId);
        const profit = p ? calculateProfit(p) : 0;
        const profitCUP = p && p.currency === 'CUP' ? profit : profit * settings.exchangeRate;
        return acc + (profitCUP * m.quantity);
      }, 0);

    return {
      totalInventoryValueUSD,
      totalInventoryValueCUP,
      lowStockCount,
      avgMargin,
      totalGainUSD,
      totalGainCUP,
      totalSalesProfitUSD,
      totalSalesProfitCUP
    };
  }, [products, settings, movements]);

  const chartData = useMemo(() => {
    const grouped = movements.reduce((acc, m) => {
      const d = new Date(m.date);
      const dateStr = Number.isNaN(d.getTime()) ? m.date : d.toLocaleDateString();
      const time = Number.isNaN(d.getTime()) ? 0 : d.getTime();
      if (!acc[dateStr]) {
         acc[dateStr] = { date: dateStr, entradas: 0, ventas: 0, timestamp: time };
      }
      if (m.type === 'IN') acc[dateStr].entradas += m.quantity;
      if (m.type === 'OUT') acc[dateStr].ventas += m.quantity;
      return acc;
    }, {});
    
    return Object.values(grouped).sort((a, b) => a.timestamp - b.timestamp);
  }, [movements]);

  const lowStockProducts = products.filter(p => p.stock <= settings.lowStockGlobal);
  const topStockProducts = [...products].sort((a, b) => b.stock - a.stock).slice(0, 6);
  const stockByCategory = categories.map(category => ({
    name: category.name,
    total: products.filter(p => p.category === category.name).reduce((acc, p) => acc + p.stock, 0),
  }));
  const profitProducts = [...products]
    .map(p => {
      const profit = calculateProfit(p);
      return {
        ...p,
        profit,
        profitUSD: p.currency === 'USD' ? profit : profit / settings.exchangeRate,
        profitCUP: p.currency === 'CUP' ? profit : profit * settings.exchangeRate,
      };
    })
    .sort((a, b) => b.profitUSD - a.profitUSD)
    .slice(0, 6);

  const displayedProducts = useMemo(() => {
    const filtered = products
      .filter(p => {
        const query = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.code.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        );
      })
      .filter(p => !filterCategory || p.category === filterCategory)
      .filter(p => !filterStockLow || p.stock <= settings.lowStockGlobal);

    const sorted = [...filtered];
    if (inventorySort === 'alphabetical') {
      sorted.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
    } else if (inventorySort === 'code') {
      sorted.sort((a, b) => a.code.localeCompare(b.code));
    } else if (inventorySort === 'stock_asc') {
      sorted.sort((a, b) => a.stock - b.stock);
    } else if (inventorySort === 'recent') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return sorted;
  }, [products, searchQuery, filterCategory, filterStockLow, inventorySort, settings.lowStockGlobal]);

  const menuItems = useMemo(() => [
    { id: 'dashboard', label: t('Panel de Control'), icon: LayoutDashboard },
    { id: 'inventory', label: t('Inventario'), icon: Box },
    { id: 'categories', label: t('Categorías'), icon: Tags },
    { id: 'stats', label: t('Estadísticas'), icon: BarChart3 },
    { id: 'settings', label: t('Configuración'), icon: Settings },
  ], [language]);

  const diffMs = now - updatedAt;
  const diffMin = Math.floor(diffMs / 60000);
  const updatedLabel = diffMin === 0
    ? t('Actualizado hace unos segundos')
    : diffMin === 1
    ? t('Actualizado hace 1 min')
    : `${t('Actualizado hace')} ${diffMin} ${t('min')}`;

  return (
    <div className={cn("flex flex-col h-screen overflow-hidden", darkMode ? "bg-background text-on-background" : "bg-light-background text-light-on-background")}>
      {/* Encabezado con Navegación */}
      <header className="h-28 shrink-0 border-b border-outline-variant bg-surface/50 backdrop-blur-md flex items-center justify-between px-12 z-40">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl accent-gradient flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <Package className="w-9 h-9 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Stock<span className="text-indigo-400">Smart</span></h1>
              <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold">Admin Pro</p>
            </div>
          </div>

          <nav className="flex items-center gap-1 bg-slate-900/40 p-1.5 rounded-2xl border border-slate-700/50">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-xl transition-all font-bold text-sm whitespace-nowrap",
                  activeTab === item.id 
                    ? "accent-gradient text-white shadow-lg shadow-indigo-500/20" 
                    : "text-on-surface-variant hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input 
              type="text" 
              placeholder={t("Buscar en inventario...")}
              value={searchQuery}
              onChange={(e) => {
                const filteredValue = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9\s]/gu, '');
                setSearchQuery(filteredValue);
                if (filteredValue && activeTab !== 'inventory') {
                  setActiveTab('inventory');
                }
              }}
              className="bg-slate-900/50 border border-slate-700/80 rounded-full pl-12 pr-6 py-3 text-sm w-56 focus:w-72 transition-all focus:ring-2 focus:ring-primary outline-none text-white placeholder:text-slate-500 font-medium"
            />
          </div>
        </div>
      </header>

      {/* Área de Contenido Principal */}
      <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
        <div className="max-w-400 mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <StatCard
                    title={t("Stock Total")}
                    value={products.reduce((acc, p) => acc + p.stock, 0)}
                    subValue={t("unidades globales")}
                    icon={Package}
                    colorClass="#6366f1"
                    onClick={() => setStatModal('stock')}
                  />
                  <StatCard
                    title={t("Alertas Críticas")}
                    value={stats.lowStockCount}
                    subValue={t("productos bajo mínimo")}
                    icon={AlertTriangle}
                    colorClass="#f43f5e"
                    onClick={() => setStatModal('alert')}
                  />
                  <StatCard
                    title={t("Ganancia (USD)")}
                    value={`$${stats.totalSalesProfitUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                    subValue={`CUP: ${stats.totalSalesProfitCUP.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                    icon={DollarSign}
                    colorClass="#10b981"
                    onClick={() => setStatModal('profit')}
                  />
                </div>

                <div className="space-y-10">
                  <div className="glass-card rounded-[2.5rem] p-10 border border-outline-variant h-125">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{t("Tendencia de Almacén")}</h3>
                        <p className="text-sm text-on-surface-variant">{t("Movimientos de inventario consolidados")}</p>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickMargin={15} />
                        <YAxis stroke="#64748b" fontSize={12} tickMargin={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '1rem', border: '1px solid #334155', color: '#fff' }} />
                        <Legend />
                        <Line type="monotone" name={t('Entradas')} dataKey="entradas" stroke="#6366f1" strokeWidth={4} dot={{ r: 6, fill: '#6366f1', strokeWidth: 0 }} activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }} />
                        <Line type="monotone" name={t('Ventas')} dataKey="ventas" stroke="#f43f5e" strokeWidth={4} dot={{ r: 6, fill: '#f43f5e', strokeWidth: 0 }} activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <button onClick={openAddModal} className="glass-card rounded-[2.5rem] p-8 border border-outline-variant flex flex-col items-center justify-center text-center gap-6 hover:border-primary transition-all group">
                      <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="w-10 h-10 text-primary" />
                      </div>
                      <h4 className="font-bold text-white text-lg">{t("Nuevo Producto")}</h4>
                    </button>
                    <button onClick={() => setActiveTab('categories')} className="glass-card rounded-[2.5rem] p-8 border border-outline-variant flex flex-col items-center justify-center text-center gap-6 hover:border-secondary transition-all group">
                      <div className="w-20 h-20 rounded-3xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Tags className="w-10 h-10 text-secondary" />
                      </div>
                      <h4 className="font-bold text-white text-lg">{t("Categorías")}</h4>
                    </button>
                    <button onClick={() => setActiveTab('stats')} className="glass-card rounded-[2.5rem] p-8 border border-outline-variant flex flex-col items-center justify-center text-center gap-6 hover:border-tertiary transition-all group">
                      <div className="w-20 h-20 rounded-3xl bg-tertiary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <BarChart3 className="w-10 h-10 text-tertiary" />
                      </div>
                      <h4 className="font-bold text-white text-lg">{t("Estadísticas")}</h4>
                    </button>
                    <button onClick={() => setShowGlobalHistory(true)} className="glass-card rounded-[2.5rem] p-8 border border-outline-variant flex flex-col items-center justify-center text-center gap-6 hover:border-white/20 transition-all group">
                      <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <History className="w-10 h-10 text-white/40" />
                      </div>
                      <h4 className="font-bold text-white text-lg">{t("Historial Global")}</h4>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'inventory' && (
              <motion.div key="inventory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-xl border border-outline-variant">
                      <button 
                        onClick={() => setFilterStockLow(false)}
                        className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", !filterStockLow ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-white")}
                      >
                        {t("Todo")}
                      </button>
                      <button 
                        onClick={() => setFilterStockLow(true)}
                        className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", filterStockLow ? "bg-tertiary text-on-tertiary" : "text-on-surface-variant hover:text-white")}
                      >
                        {t("Stock Bajo")}
                      </button>
                    </div>
                    <select 
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="bg-surface-container-low border border-outline-variant rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-primary transition-all"
                    >
                      <option value="">{t("Todas las Categorías")}</option>
                      {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                    <select
                      value={inventorySort}
                      onChange={(e) => setInventorySort(e.target.value)}
                      className="bg-surface-container-low border border-outline-variant rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-primary transition-all"
                    >
                      <option value="recent">{t("Añadido recientemente")}</option>
                      <option value="alphabetical">{t("Alfabéticamente")}</option>
                      <option value="code">{t("Por código")}</option>
                      <option value="stock_asc">{t("Stock menor → mayor")}</option>
                    </select>
                  </div>
                  <button onClick={openAddModal} className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-xl flex items-center gap-2">
                    <Plus className="w-5 h-5" /> {t("Añadir")}
                  </button>
                </div>
                
                <div className="glass-card rounded-3xl border border-outline-variant overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-surface-container-low/50 font-bold text-xs uppercase text-outline">
                      <tr>
                        <th className="px-6 py-4">{t("ID/Cod")}</th>
                        <th className="px-6 py-4">{t("Nombre")}</th>
                        <th className="px-6 py-4">{t("Categoría")}</th>
                        <th className="px-6 py-4">{t("Precios")}</th>
                        <th className="px-6 py-4">{t("Stock")}</th>
                        <th className="px-6 py-4">{t("Acciones")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                      {displayedProducts.map(product => {
                           const grossProfit = product.sellingPrice - product.basicPrice;
                           const profit = calculateProfit(product);
                           
                           return (
                            <tr key={product.id} className={cn("hover:bg-white/2 group transition-colors", product.stock <= settings.lowStockGlobal && "low-stock-row")}>
                              <td className="px-6 py-4 text-xs font-mono text-on-surface-variant font-medium">{product.code}</td>
                              <td className="px-6 py-4 font-bold text-white">{product.name}</td>
                              <td className="px-6 py-4">
                                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] uppercase font-bold">{product.category}</span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col">
                                  <span className="text-xs text-on-surface-variant">Venta: {formatCurrency(product.sellingPrice, product.currency)}</span>
                                  <span className={cn("text-[10px] font-bold", profit > 0 ? "text-primary" : "text-tertiary")}>
                                    Gana: {profit.toFixed(2)} {product.currency}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <span className={cn("font-bold text-lg", product.stock <= settings.lowStockGlobal ? "text-tertiary italic" : "text-white")}>
                                    {product.stock} {product.stock <= settings.lowStockGlobal && t("(BAJO)")}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button title={t("Registrar Venta")} onClick={() => openSaleModal(product)} className="p-2 hover:text-emerald-400 transition-all"><ShoppingCart className="w-4 h-4"/></button>
                                  <button onClick={() => openEditModal(product)} className="p-2 hover:text-primary transition-all"><Edit2 className="w-4 h-4"/></button>
                                  <button onClick={() => setShowHistory(product)} className="p-2 hover:text-secondary transition-all"><History className="w-4 h-4"/></button>
                                  <button className="p-2 hover:text-tertiary transition-all" onClick={() => {
                                    if(confirm(t("¿Eliminar producto?"))) setProducts(products.filter(p => p.id !== product.id))
                                  }}><Trash2 className="w-4 h-4"/></button>
                                </div>
                              </td>
                            </tr>
                           );
                        })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'categories' && (
              <motion.div key="categories" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">{t("Categorías")}</h3>
                  <button onClick={() => setShowAddCategory(true)} className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-xl">{t("Nueva Categoría")}</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map(cat => (
                    <div key={cat.id} className="glass-card p-6 rounded-2xl border border-outline-variant flex justify-between items-center group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center"><Tags className="w-5 h-5 text-primary"/></div>
                        <h4 className="font-bold text-white">{cat.name}</h4>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button 
                          onClick={() => {
                            const newName = prompt(t("Nuevo nombre:"), cat.name);
                            if (newName) setCategories(categories.map(c => c.id === cat.id ? { ...c, name: newName } : c));
                          }}
                          className="p-2 hover:text-primary transition-colors"
                        >
                          <Edit2 className="w-4 h-4"/>
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm("¿Eliminar esta categoría?")) deleteCategory(cat.id);
                          }}
                          className="p-2 hover:text-tertiary transition-colors"
                        >
                          <Trash2 className="w-4 h-4"/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="glass-card p-6 rounded-2xl border border-outline-variant text-center" title={t("Ganancia estimada que se obtendría si se vendiera todo el stock actual")}>
                    <p className="text-[10px] font-bold text-outline uppercase mb-2 cursor-help border-b border-dashed border-outline-variant inline-block pb-0.5">{t("Ganancia Est. (USD)")}</p>
                    <h4 className="text-2xl font-bold text-secondary cursor-help">${stats.totalGainUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h4>
                  </div>
                  <div className="glass-card p-6 rounded-2xl border border-outline-variant text-center" title={t("Ganancia estimada convertida a CUP según la tasa de cambio")}>
                    <p className="text-[10px] font-bold text-outline uppercase mb-2 cursor-help border-b border-dashed border-outline-variant inline-block pb-0.5">{t("Ganancia Est. (CUP)")}</p>
                    <h4 className="text-2xl font-bold text-primary cursor-help">${stats.totalGainCUP.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h4>
                  </div>
                  <div className="glass-card p-6 rounded-2xl border border-outline-variant text-center" title={t("Cantidad de productos cuyo stock está igual o por debajo del umbral de alerta crítico")}>
                    <p className="text-[10px] font-bold text-outline uppercase mb-2 cursor-help border-b border-dashed border-outline-variant inline-block pb-0.5">{t("Productos Críticos")}</p>
                    <h4 className="text-2xl font-bold text-tertiary cursor-help">{stats.lowStockCount}</h4>
                  </div>
                  <div className="glass-card p-6 rounded-2xl border border-outline-variant text-center" title={t("El margen promedio de rentabilidad calculado dividiendo la ganancia entre el precio de venta")}>
                    <p className="text-[10px] font-bold text-outline uppercase mb-2 cursor-help border-b border-dashed border-outline-variant inline-block pb-0.5">{t("Margen Promedio")}</p>
                    <h4 className="text-2xl font-bold text-white cursor-help">{stats.avgMargin}%</h4>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="glass-card p-8 rounded-3xl border border-outline-variant">
                    <h4 className="font-bold text-white mb-6">{t("Valor por Categoría")}</h4>
                    <div className="h-100">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categories.map(c => ({ 
                          name: c.name, 
                          valor: products.filter(p => p.category === c.name).reduce((acc, p) => acc + (p.sellingPrice * p.stock), 0)
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                          <YAxis stroke="#64748b" fontSize={12} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                          <Bar dataKey="valor" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="glass-card p-8 rounded-3xl border border-outline-variant">
                    <h4 className="font-bold text-white mb-6 text-center">{t("Distribución de Stock")}</h4>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                      <div className="h-75 w-full lg:w-1/2">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: t('Suficiente'), value: products.filter(p => p.stock > settings.lowStockGlobal).length },
                                { name: t('Bajo Mínimo'), value: products.filter(p => p.stock <= settings.lowStockGlobal).length },
                              ]}
                              cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={8} dataKey="value"
                            >
                              <Cell fill="#10b981" />
                              <Cell fill="#f43f5e" />
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '1rem' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex flex-col gap-6 lg:w-1/2">
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/10 border border-secondary/20">
                          <div className="w-4 h-4 rounded-full mt-1 shrink-0 bg-secondary shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                          <div>
                            <h5 className="font-bold text-white">{t("Stock Suficiente")}</h5>
                            <p className="text-sm text-slate-300 mt-1">
                              {t("Productos con inventario saludable.")} {t("Tienen un stock mayor al umbral de")} <strong className="text-white">{settings.lowStockGlobal}</strong> {t("unidades.")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-tertiary/10 border border-tertiary/20">
                          <div className="w-4 h-4 rounded-full mt-1 shrink-0 bg-tertiary shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                          <div>
                            <h5 className="font-bold text-white">{t("Bajo Mínimo (Alerta)")}</h5>
                            <p className="text-sm text-slate-300 mt-1">
                              {t("Productos críticos que requieren reabastecimiento.")} {t("Cuentan con")} <strong className="text-white">{settings.lowStockGlobal}</strong> {t("unidades o menos.")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Settings className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{t('Configuración del Sistema')}</h3>
                    <p className="text-sm text-on-surface-variant">{t('Personaliza el comportamiento y visualización de datos')}</p>
                  </div>
                </div>

                {/* Top row: Idioma + Moneda + Alertas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Idioma */}
                  <div className="glass-card p-6 rounded-2xl border border-outline-variant space-y-4">
                    <div className="flex items-center gap-3 border-b border-outline-variant pb-4">
                      <Languages className="w-5 h-5 text-blue-400" />
                      <h4 className="font-bold text-white text-lg">{t('Idioma')}</h4>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setLanguage('es')}
                        className={cn(
                          "flex-1 px-4 py-3 rounded-xl border transition-all font-bold",
                          language === 'es'
                            ? "bg-primary text-on-primary border-primary"
                            : "bg-surface-container-low border-outline-variant text-on-surface-variant hover:border-primary"
                        )}
                      >
                        Español
                      </button>
                      <button
                        onClick={() => setLanguage('en')}
                        className={cn(
                          "flex-1 px-4 py-3 rounded-xl border transition-all font-bold",
                          language === 'en'
                            ? "bg-primary text-on-primary border-primary"
                            : "bg-surface-container-low border-outline-variant text-on-surface-variant hover:border-primary"
                        )}
                      >
                        English
                      </button>
                    </div>
                  </div>

                  {/* Moneda y Tasas */}
                  <div className="glass-card p-6 rounded-2xl border border-outline-variant space-y-4">
                    <div className="flex items-center gap-3 border-b border-outline-variant pb-4">
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                      <h4 className="font-bold text-white text-lg">{t('Moneda y Tasas')}</h4>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">{t("Tasa de Cambio (1 USD = X CUP)")}</label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={settings.exchangeRate}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/^0+(?=\d)/, '');
                          const numValue = parseFloat(value) || 0;
                          setSettings({ ...settings, exchangeRate: Math.max(0, numValue) });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                      <p className="text-[10px] text-slate-500 italic">{t('Utilizado para calcular las estadísticas convertidas en USD y CUP.')}</p>
                    </div>
                  </div>

                  {/* Alertas de Inventario */}
                  <div className="glass-card p-6 rounded-2xl border border-outline-variant space-y-4">
                    <div className="flex items-center gap-3 border-b border-outline-variant pb-4">
                      <AlertTriangle className="w-5 h-5 text-tertiary" />
                      <h4 className="font-bold text-white text-lg">{t('Alertas de Inventario')}</h4>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">{t('Umbral de Stock Bajo Global')}</label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={settings.lowStockGlobal}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/^0+(?=\d)/, '');
                          const numValue = parseFloat(value) || 0;
                          setSettings({ ...settings, lowStockGlobal: Math.max(0, numValue) });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                      />
                      <p className="text-[10px] text-slate-500 italic">{t('Usado como valor por defecto para nuevos productos.')}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom: Cálculo de Ganancias full width */}
                <div className="glass-card p-6 rounded-[2.5rem] border border-outline-variant space-y-6">
                  <div className="flex items-center gap-3 border-b border-outline-variant pb-6">
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                    <h4 className="font-bold text-white text-lg">{t('Cálculo de Ganancias')}</h4>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">{t('Método de cálculo')}</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: 'simple', label: t('Bruta'), desc: t('Venta - Compra') },
                          { id: 'fixed', label: t('Costo Fijo'), desc: t('Neto - Fijo') },
                          { id: 'percent', label: t('Margen %'), desc: t('Neto - % Fee') }
                        ].map(m => (
                          <button
                            key={m.id}
                            onClick={() => setSettings({ ...settings, profitMethod: m.id })}
                            className={cn(
                              "p-4 rounded-2xl border transition-all text-left group",
                              settings.profitMethod === m.id
                                ? "bg-primary/20 border-primary text-white"
                                : "bg-slate-900/50 border-slate-700/50 text-slate-400 hover:border-slate-500"
                            )}
                          >
                            <p className="font-bold text-sm">{m.label}</p>
                            <p className="text-[10px] opacity-60 font-medium group-hover:opacity-100">{m.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    {settings.profitMethod === 'fixed' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2 max-w-sm">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('Costo Operativo Fijo (USD/CUP)')}</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={settings.fixedCost}
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/^0+(?=\d)/, '');
                            const numValue = parseFloat(value) || 0;
                            setSettings({ ...settings, fixedCost: Math.max(0, numValue) });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                          placeholder={t('Ej: 0.50')}
                        />
                        <p className="text-[10px] text-slate-500 italic">{t('Se restará un valor fijo a la ganancia de cada unidad en stock.')}</p>
                      </motion.div>
                    )}
                    {settings.profitMethod === 'percent' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2 max-w-sm">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('Margen de Costo (%)')}</label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={settings.percentCost}
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/^0+(?=\d)/, '');
                            const numValue = parseFloat(value) || 0;
                            setSettings({ ...settings, percentCost: Math.max(0, numValue) });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                          placeholder={t('Ej: 10')}
                        />
                        <p className="text-[10px] text-slate-500 italic">{t('Se aplicará este porcentaje como costo sobre la ganancia bruta.')}</p>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-10">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
                     <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                     {t('Cambios aplicados instantáneamente')}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modals Implementation  */}
      <AnimatePresence>
        {(showAddProduct || showEditProduct) && (
          <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card w-full max-w-3xl rounded-[2.5rem] border border-outline-variant overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-outline-variant flex justify-between bg-surface-container-low px-10">
                <h3 className="text-2xl font-bold text-white">{showEditProduct ? t('Editar') : t('Nuevo')} Producto</h3>
                <button onClick={() => { setShowAddProduct(false); setShowEditProduct(null); }} className="hover:rotate-90 transition-transform"><X/></button>
              </div>
              <div className="p-10 max-h-[75vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("Nombre del Producto")}</label>
                      <input 
                        value={productForm.name} 
                        maxLength={30}
                        onChange={e => setProductForm({...productForm, name: e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9\s]/gu, '')})}
                        className="w-full bg-slate-900 border border-slate-700/50 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                        placeholder={t("Ej: Teclado Mecánico")}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("Código")}</label>
                        <input 
                          value={productForm.code} 
                          readOnly
                          className="w-full bg-slate-900 border border-slate-700/50 rounded-xl px-4 py-3 text-white outline-none font-mono opacity-60 cursor-not-allowed"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("Moneda")}</label>
                        <select 
                          value={productForm.currency}
                          onChange={e => setProductForm({...productForm, currency: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-700/50 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                        >
                          <option value="USD">USD</option>
                          <option value="CUP">CUP</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("Categoría")}</label>
                      <select 
                        value={productForm.category}
                        onChange={e => setProductForm({...productForm, category: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700/50 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                      >
                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("Precio Costo")}</label>
                        <input 
                          type="number"
                          min="0"
                          step="0.01"
                          value={productForm.basicPrice} 
                          onChange={e => {
                            let value = e.target.value;
                            value = value.replace(/^0+/, '');
                            const numValue = parseFloat(value) || 0;
                            setProductForm({...productForm, basicPrice: Math.max(0, numValue)});
                          }}
                          className="w-full bg-slate-900 border border-slate-700/50 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{t("Precio Venta")}</label>
                        <input 
                          type="number"
                          min="0"
                          step="0.01"
                          value={productForm.sellingPrice} 
                          onChange={e => {
                            let value = e.target.value;
                            value = value.replace(/^0+/, '');
                            const numValue = parseFloat(value) || 0;
                            setProductForm({...productForm, sellingPrice: Math.max(0, numValue)});
                          }}
                          className="w-full bg-slate-900 border border-indigo-500/50 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-400 transition-all font-bold"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("Stock")}</label>
                      <input 
                        type="number"
                        min="0"
                        step="1"
                        value={productForm.stock} 
                        onChange={e => {
                          let value = e.target.value;
                          value = value.replace(/^0+/, '');
                          const numValue = parseInt(value) || 0;
                          setProductForm({...productForm, stock: Math.max(0, numValue)});
                        }}
                        className="w-full bg-slate-900 border border-slate-700/50 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                      />
                    </div>
                    
                    <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 mt-4">
                       <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-0.5 text-center">{t("Ganancia Unit. Estimada")}</p>
                       <p className="text-lg font-bold text-white text-center">
                         {((productForm.sellingPrice || 0) - (productForm.basicPrice || 0)).toFixed(2)} {productForm.currency}
                       </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 border-t border-outline-variant bg-surface-container-low flex justify-end gap-6 px-10">
                <button onClick={() => { setShowAddProduct(false); setShowEditProduct(null); }} className="px-6 py-2 text-on-surface-variant hover:text-white transition-colors font-bold uppercase text-[10px] tracking-widest hover:bg-white/5 rounded-xl">{t("Cancelar")}</button>
                <button 
                  onClick={handleSaveProduct}
                  className="px-10 py-4 accent-gradient text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all text-sm"
                >
                  {showEditProduct ? t('ACTUALIZAR PRODUCTO') : t('REGISTRAR PRODUCTO')}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showHistory && (
          <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-card w-full max-w-xl rounded-3xl border border-outline-variant overflow-hidden">
              <div className="p-6 border-b border-outline-variant flex justify-between">
                <h3 className="text-xl font-bold text-white">{t('Movimientos de')} {showHistory.name}</h3>
                <button onClick={() => setShowHistory(null)}><X/></button>
              </div>
              <div className="p-8 space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar">
                {movements.filter(m => m.productId === showHistory.id).map(m => (
                  <div key={m.id} className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", m.type === 'IN' ? "bg-secondary/10 text-secondary" : "bg-tertiary/10 text-tertiary")}>
                      {m.type === 'IN' ? <ArrowDownLeft className="w-5 h-5"/> : <ArrowUpRight className="w-5 h-5"/>}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white">{t(m.reason)}</p>
                      <p className="text-xs text-outline">{m.date}</p>
                    </div>
                    <span className={cn("font-bold", m.type === 'IN' ? "text-secondary" : "text-tertiary")}>
                      {m.type === 'IN' ? '+' : '-'}{m.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {showGlobalHistory && (
          <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-card w-full max-w-2xl rounded-3xl border border-outline-variant overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-outline-variant bg-surface-container-low flex justify-between px-8">
                <h3 className="text-xl font-bold text-white">{t("Historial Global de Movimientos")}</h3>
                <button onClick={() => setShowGlobalHistory(false)}><X className="text-slate-400 hover:text-white transition-colors" /></button>
              </div>
              <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {movements.length === 0 ? (
                  <p className="text-center text-on-surface-variant py-4">{t("No hay movimientos registrados.")}</p>
                ) : (
                  movements.slice().reverse().map(m => {
                    const prod = products.find(p => p.id === m.productId);
                    return (
                      <div key={m.id} className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", m.type === 'IN' ? "bg-secondary/10 text-secondary" : "bg-tertiary/10 text-tertiary")}>
                          {m.type === 'IN' ? <ArrowDownLeft className="w-5 h-5"/> : <ArrowUpRight className="w-5 h-5"/>}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-white">
                            {prod ? prod.name : t('Producto Eliminado')} <span className="text-sm font-normal text-slate-400">- {t(m.reason)}</span>
                          </p>
                          <p className="text-xs text-outline">{m.date}</p>
                        </div>
                        <span className={cn("font-bold text-lg", m.type === 'IN' ? "text-secondary" : "text-tertiary")}>
                          {m.type === 'IN' ? '+' : '-'}{m.quantity}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}

        {statModal && (
          <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-card w-full max-w-3xl rounded-3xl border border-outline-variant overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-outline-variant bg-surface-container-low flex justify-between px-8">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {statModal === 'alert' ? t('Productos en Alerta Crítica') : statModal === 'stock' ? t('Detalle de Stock Total') : t('Detalle de Ganancias')}
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-2">
                    {statModal === 'alert' && t('Estos productos tienen stock igual o menor al umbral de alerta.')}
                    {statModal === 'stock' && t('Los productos con más unidades en inventario.')}
                    {statModal === 'profit' && t('Productos con mayor ganancia estimada por unidad.')}
                  </p>
                </div>
                <button onClick={() => setStatModal(null)}><X className="text-slate-400 hover:text-white transition-colors" /></button>
              </div>
              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {statModal === 'alert' && (
                  lowStockProducts.length === 0 ? (
                    <p className="text-on-surface-variant">{t("No hay productos en estado de alerta.")}</p>
                  ) : (
                    <div className="space-y-4">
                      {lowStockProducts.map(product => (
                        <div key={product.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                          <div>
                            <p className="font-bold text-white">{product.name}</p>
                            <p className="text-xs text-on-surface-variant">{product.category} · {product.code}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-tertiary">{product.stock} {t('uds')}</p>
                            <p className="text-xs text-slate-400">{formatCurrency(product.sellingPrice, product.currency)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}

                {statModal === 'stock' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {stockByCategory.map(category => (
                        <div key={category.name} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                          <p className="text-sm text-on-surface-variant">{category.name}</p>
                          <p className="text-2xl font-bold text-white">{category.total}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {topStockProducts.map(product => (
                        <div key={product.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                          <div>
                            <p className="font-bold text-white">{product.name}</p>
                            <p className="text-xs text-on-surface-variant">{product.category}</p>
                          </div>
                          <span className="font-bold text-primary">{product.stock} {t('uds')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {statModal === 'profit' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant text-center">
                        <p className="text-xs text-on-surface-variant">{t("Ganancia Total USD")}</p>
                        <p className="text-2xl font-bold text-secondary">${stats.totalGainUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant text-center">
                        <p className="text-xs text-on-surface-variant">{t("Ganancia Total CUP")}</p>
                        <p className="text-2xl font-bold text-secondary">${stats.totalGainCUP.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant text-center">
                        <p className="text-xs text-on-surface-variant">{t('Ganancia Ventas')}</p>
                        <p className="text-2xl font-bold text-secondary">${stats.totalSalesProfitUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {profitProducts.map(product => (
                        <div key={product.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                          <div>
                            <p className="font-bold text-white">{product.name}</p>
                            <p className="text-xs text-on-surface-variant">{product.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-secondary">{product.profit.toFixed(2)} {product.currency}</p>
                            <p className="text-[10px] text-slate-400">{t('Unidad')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {showAddCategory && (
          <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-card w-full max-w-md rounded-3xl border border-outline-variant overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-outline-variant bg-surface-container-low flex justify-between px-8">
                <h3 className="text-xl font-bold text-white">{t('Añadir Categoría')}</h3>
                <button onClick={() => setShowAddCategory(false)}><X/></button>
              </div>
              <div className="p-8 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("Nombre de la Categoría")}</label>
                  <input 
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addCategory(e.currentTarget.value);
                    }}
                    className="w-full bg-slate-900 border border-slate-700/50 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                    placeholder={t("Ej: Accesorios")}
                  />
                </div>
                <button 
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling?.querySelector('input');
                    if (input) addCategory(input.value);
                  }}
                  className="w-full py-4 accent-gradient text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20"
                >
                  {t("GUARDAR CATEGORÍA")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
        {showSaleModal && (
          <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card w-full max-w-sm rounded-3xl border border-outline-variant overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-outline-variant bg-surface-container-low flex justify-between px-8">
                <h3 className="text-xl font-bold text-white">{t("Registrar Venta")}</h3>
                <button onClick={() => setShowSaleModal(null)}><X className="text-slate-400 hover:text-white transition-colors" /></button>
              </div>
              <div className="p-8 space-y-6">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">{t("Producto")}</div>
                  <div className="text-center font-bold text-white text-lg">{showSaleModal.name}</div>
                  <div className="flex justify-center">
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold">{t("Stock disponible:")} {showSaleModal.stock}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("Cantidad a Vender")}</label>
                  <input 
                    type="number"
                    min="1"
                    max={showSaleModal.stock}
                    value={saleQuantity}
                    onChange={(e) => setSaleQuantity(Math.min(showSaleModal.stock, Math.max(1, Number(e.target.value))))}
                    className="w-full bg-slate-900 border border-slate-700/50 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500 transition-all text-center text-xl font-bold"
                  />
                </div>
                <div className="pt-2">
                  <button 
                    onClick={handleSale}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all active:scale-95"
                  >
                    {t("Confirmar Venta")}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer Status Bar */}
      <footer className="h-8 bg-slate-950 border-t border-slate-900 flex items-center px-6 justify-between text-[10px] text-slate-500 z-50">
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 
            {t("Conectado")}
          </span>
          <span>StockSmart v2.1</span>
        </div>
        <div className="flex gap-6 uppercase tracking-wider">
          <span>{t("Tasa de Cambio: 1 USD =")} {settings.exchangeRate} CUP</span>
          <span className="text-indigo-400 font-bold italic">{updatedLabel}</span>
        </div>
      </footer>
    </div>
  );
}