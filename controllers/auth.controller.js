const bcrypt = require("bcryptjs")
const Admin = require("../models/Admin")
const jwt = require("jsonwebtoken")
const Customer = require("../models/Customer")
const { sendEmail } = require("../utils/email")

exports.registerAdmin = async (req, res) => {
    const { email, password } = req.body
    const result = await Admin.findOne({ email })
    if (result) {
        return res.status(409).json({ message: "email already registered" })
    }
    const hash = await bcrypt.hash(password, 10)
    await Admin.create({ ...req.body, password: hash })

    res.json({ message: "admin register success" })
}
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body
    const result = await Admin.findOne({ email })
    if (!result) {
        return res.status(401).json({ message: "invalid credentials email" })
    }

    const isVerify = await bcrypt.compare(password, result.password)
    if (!isVerify) {
        return res.status(401).json({ message: "invalid credentials password" })
    }

    const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET)

    res.cookie("admin", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        // secure: true
    })

    res.json({
        message: "admin login success", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
        }
    })
}
exports.logoutAdmin = async (req, res) => {
    res.clearCookie("admin")
    res.json({ message: "admin logout success" })
}

exports.registerCustomer = async (req, res) => {
    try {
        const { email, password } = req.body
    const result = await Customer.findOne({ email })
    if (result) {
        return res.status(409).json({ message: "email already registered" })
    }
    const hash = await bcrypt.hash(password, 10)
    await Customer.create({ ...req.body, password: hash })
    await sendEmail({to : email, subject : "welcome to flipkart-lite", message: "Lorem ipsum dolor sit amet. "})
    res.json({ message: "Customer register success" })
    } catch (error) {
        console.log(error);
        res.status(400).json({message : "unable to register custemor"})
    }
    
}
exports.loginCustomer = async (req, res) => {
    const { email, password } = req.body
    const result = await Customer.findOne({ email })
    if (!result) {
        return res.status(401).json({ message: "invalid credentials email" })
    }
    
    if (!result.isActive) {
        return res.status(401).json({ message: "your account is blocked " })
    }

    const isVerify = await bcrypt.compare(password, result.password)
    if (!isVerify) {
        return res.status(401).json({ message: "invalid credentials password" })
    }

    const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET)

    res.cookie("customer", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        // secure: true
    })

    res.json({
        message: "Customer login success", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
        }
    })
}

exports.logoutCustomer = async (req, res) => {
    res.clearCookie("customer")
    res.json({ message: "Customer logout success" })
}

