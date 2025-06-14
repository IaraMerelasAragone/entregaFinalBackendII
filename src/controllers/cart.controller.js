import CartModel from '../dao/models/cart.model.js'
import ProductModel from '../dao/models/product.model.js'
import TicketModel from '../dao/models/ticket.model.js'
import { v4 as uuidv4 } from 'uuid'

//crear un carrito vacio
export const createCart = async (req, res) => {
    try {
    const newCart = await CartModel.create({ products: [] })
    res.status(201).json({ status: 'success', cart: newCart })
    } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
    }
}

//agregar un producto al carrito
export const addProductToCart = async (req, res) => {
    try {
    const { cid, pid } = req.params
    const { quantity } = req.body

    const cart = await CartModel.findById(cid)
    if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' })
    }

    const product = await ProductModel.findById(pid)
    if (!product) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' })
    }

    const productIndex = cart.products.findIndex(p => p.product.equals(pid))

    if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity
    } else {
        cart.products.push({ product: pid, quantity })
    }

    await cart.save()
    res.json({ status: 'success', message: 'Producto agregado al carrito', cart })
    } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
    }
}

//comprar un carrito (generar ticket y verificar stock)
export const purchaseCart = async (req, res) => {
    try {
    const cartId = req.params.cid
    const cart = await CartModel.findById(cartId).populate('products.product')

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' })
    }

    const purchasedProducts = []
    const failedProducts = []

    for (const item of cart.products) {
        const product = item.product
        const quantity = item.quantity

        if (product.stock >= quantity) {
        product.stock -= quantity
        await product.save()

        purchasedProducts.push({
            product: product._id,
            quantity
        })
        } else {
        failedProducts.push({
            product: product._id,
            quantity
        })
        }
    }

    const totalAmount = purchasedProducts.reduce((total, item) => {
        const prod = cart.products.find(p => p.product._id.equals(item.product))
      return total + (prod.product.price * item.quantity)
    }, 0)

    let ticket = null

    if (purchasedProducts.length > 0) {
        ticket = await TicketModel.create({
        code: uuidv4(),
        amount: totalAmount,
        purchaser: req.user.email,
        products: purchasedProducts
        })
    }

    //mantener solo los productos que fallaron
    cart.products = cart.products.filter(p =>
        failedProducts.find(fp => fp.product.equals(p.product._id))
    )
    await cart.save()

    res.json({
        status: 'success',
        message: ticket
        ? 'Compra realizada parcialmente o completa'
        : 'No se pudo completar la compra',
        ticket,
        productosSinStock: failedProducts
    })
    } catch (err) {
    res.status(500).json({ error: err.message })
    }
}