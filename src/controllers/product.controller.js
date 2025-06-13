import ProductModel from '../dao/models/product.model.js';

//GET /api/products
export const getProducts = async (req, res) => {
    try {
    const products = await ProductModel.find();
    res.json({ status: 'success', products });
    } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
    }
};

//POST /api/products
export const createProduct = async (req, res) => {
    try {
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json({ status: 'success', product: newProduct });
    } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
    }
};

//PUT /api/products/:pid
export const updateProduct = async (req, res) => {
    try {
    const updated = await ProductModel.findByIdAndUpdate(req.params.pid, req.body, { new: true });
    if (!updated) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'success', product: updated });
    } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
    }
};

//DELETE /api/products/:pid
export const deleteProduct = async (req, res) => {
    try {
    const deleted = await ProductModel.findByIdAndDelete(req.params.pid);
    if (!deleted) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'success', message: 'Producto eliminado' });
    } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
    }
};