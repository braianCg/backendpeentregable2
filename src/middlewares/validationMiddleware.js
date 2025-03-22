import { getProductsSchema } from '../validations/products.validations.js'
import {
  userCreateProfileImageSchema,
  userCreateSchema,
} from '../validations/template.validations.js'

export const validateCreateUserImage = (req, res, next) => {
  if (!req.files['profileImage']) {
    req.profileImage = null
    next()
  } else {
    const profileImage = req.files['profileImage'].slice(0, 1).pop()
    console.log(profileImage)
    const size = profileImage?.size

    const { error: errorProfileImage } = userCreateProfileImageSchema.validate({
      size,
    })
    if (errorProfileImage) {
      const errorMessage = errorProfileImage.details
        .map((detail) => detail.message)
        .join(', ')
      return res.status(400).json({ error: errorMessage })
    }
    req.profileImage = profileImage
    next()
  }
}

export const validateCreateUser = (req, res, next) => {
  const { error } = userCreateSchema.validate(req.body)
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(', ')
    return res.status(400).json({ error: errorMessage })
  }

  next()
}

export const validateGetProducts = (req, res, next) => {
  const { error } = getProductsSchema.validate(req.params)
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(', ')
    return res.status(400).json({ error: errorMessage })
  }

  next()
}
