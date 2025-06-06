import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}//Fin de handleValidationErrors

export const validateUserRequest = [
    body("name").isString()
                .notEmpty()
                .withMessage("El nombre debe ser string"),

    body("addressLine1").isString()
                        .notEmpty()
                        .withMessage("La dirección debe ser string"),       
                    
    body("city").isString()
                        .notEmpty()
                        .withMessage("La dirección debe ser string"),   
                        
    body("country").isString()
                        .notEmpty()
                        .withMessage("El encargado debe ser string"),
    handleValidationErrors                                       
];//Fin de validateUserRequest

export const validateRestauranteRequest = [
    body("restauranteName").notEmpty()
        .withMessage("El nombre del es requerido"),
    
    body("city").notEmpty()
        .withMessage("La dirección debe ser requerida"),

    body("country").notEmpty()
        .withMessage("El encargado es requerido"),

    body("deliveryPrice").isFloat({ min: 0 })
        .withMessage("El precio de entrega debe ser un número positivo"),
    
    body("estimatedDeliveryTime").isFloat({ min: 0 })
        .withMessage("El tiempo estimado de entrega debe ser un número positivo"),

    body("cuisines").isArray()
        .withMessage("Los platillos deben ser un arreglo")
        .not()
        .isEmpty()
        .withMessage("El tipo de tienda no puede estar vacío"),
        
    body("menuItems").isArray()
        .withMessage("Los platillos deben ser un arreglo"),

    body("menuItems.*.name").notEmpty()
        .withMessage("El nombre del producto es requerido"),
    body("menuItems.*.price").isFloat({ min: 0 })
        .withMessage("El precio del producto es requerido y debe ser un número positivo"),
    
    
    handleValidationErrors
];//Fin de validateRestauranteRequest