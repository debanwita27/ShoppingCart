const express = require('express');
const { Item } = require('../models/Item');
const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const items = await Item.find();
        return res.status(200).json({
            message: "item retrieved successfully",
            items
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})

router.post("/", async (req, res) => {
    try {
        console.log('Reached the add route');
        const { title, author, price } = req.body;

        if (!title) {
            res.status(400).json({// 400 bad request
                message: 'Missing item Title'
            })
            return res.end()
        }

        if (!author) {
            res.status(400).json({// 400 bad request
                message: 'Missing item Author'
            })
            return res.end()
        }

        if (!price) {
            res.status(400).json({// 400 bad request
                message: 'Missing item Price'
            })
            return res.end()
        }

        const itemObj = req.body
        const item = new Item(itemObj);

        const savedItems = await item.save()
        res.json({
            message: "item saved successfully",
            result: savedItems
        })
        res.status(200);
        return res.end();
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedItem = req.body;
        await Item.updateOne({ _id: id }, updatedItem)

        return res.status(200).json({
            message: "data updated successfully",
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message: "something went wrong",
            error: err.message
        })
    }
})

router.get('/:title', async (req, res) => {
    try {
        const item = await Item.findOne({ title: req.params.title });
        res.status(200).json({
            message: "Data retrieved successfully",
            item
        })
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Data deleted",

        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})

module.exports = router;