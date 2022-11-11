const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = Router()
const config = require('config')
// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'invalid email').isEmail(),
    check('password', 'min lenght 6 symbol')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'incorect data with registration'
        })
      }
      const { email, password } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'this email is already registered' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()

      res.status(201).json({ message: 'user create' })

    } catch (e) {
      res.status(500).json({ messsage: 'server error! try again' })
    }
  })

router.post(
  '/login',
  [
check('email', 'write corect email').normalizeEmail().isEmail(),
check('password', 'write your password').exists()
  ],
    async (req, res) => {
      try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'incorect data with login'
          })
        }

        const { email, password } = req.body

        const user =  await User.findOne({ email })

        if (!user) {
          return res.status(400).json({message: 'user not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
          return res.status(400).json({message: 'invalid password!'})
        }

        const token = jwt.sign(
          {userId: user.id},
          config.get('jwtSecret'),
          {expiresIn: '1h'}
        )

        res.json({token, userId: user.id})

      } catch (e) {
        res.status(500).json({ messsage: 'server error! try again' })
      }
    }
  )


module.exports = router