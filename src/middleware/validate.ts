import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

//JOI validate
export const validateSchema = (
  schema: ObjectSchema,
  optSchema?: ObjectSchema
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema == commonModSchema)
        await schema.validateAsync(req.body.commonData);
      if (optSchema == holdSchema)
        await optSchema.validateAsync(
          req.body.holdData || req.body.createHoldData
        );
      next();
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }
  };
};

// commonMod schema validate
export const commonModSchema = Joi.object({
  orginal_project: Joi.string()
    .required()
    .min(3)
    .error(
      new Error(
        "Please enter a valid  orginal_project (  minimum 3 letters) "
      )
    ),
  additional_project: Joi.string()
    .required()
    .min(3)
    .max(35)
    .error(
      new Error(
        "please enter a valid  additional_project (  minimum 3 letters)"
      )
    ),
  project_type: Joi.string()
    .required()
    .min(3)
    .max(15)
    .error(
      new Error(
        "please enter a valid project type (  minimum 3 letters)"
      )
    ),
  job_name: Joi.string()
    .required()
    .min(3)
    .max(15)
    .error(
      new Error("please enter a valid jobname (  minimum 3 letters)")
    ),
  address: Joi.string()
    .required()
    .min(3)
    .max(30)
    .error(
      new Error("please enter a valid address (  minimum 3 letters)")
    ),
  unit: Joi.number()
    .required()
    .min(1)
    .error(new Error("please enter a valid unit ( minimum 1 value)")),
  zip_code: Joi.number()
    .required()
    .min(2)
    .error(new Error("please enter a valid zipcode ( atleast 2 number)")),
  city: Joi.string()
    .min(2)
    .required()
    .error(new Error("please enter a city name ( atleast 2 letters)")),
  state: Joi.string()
    .min(2)
    .required()
    .error(new Error("please enter a state name ( atleast 2 letters)")),
  country: Joi.string()
    .min(3)
    .required()
    .error(new Error("please enter a country name ( atleast 3 letters)")),
  phone_type: Joi.string()
    .min(2)
    .required()
    .error(new Error("please enter a phone type ( atleast 2 letters)")),
  phone: Joi.string()
    .required()
    .min(10)
    .max(10)
    .error(new Error("Please enter a valid phone number")),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .required()
    .error(new Error("Please enter a valid Email ID")),
  internal_print: Joi.string()
    .min(3)
    .required()
    .max(50)
    .error(new Error("please enter a internal print ( atleast 3 letters)")),
});

// holdSchema validate
export const holdSchema = Joi.object({
  hold_label: Joi.string()
    .required()
    .min(3)
    .error(new Error("please enter a hold label name ( atleast 3 letters)")),
  printed_notes: Joi.string()
    .required()
    .min(3)
    .error(new Error("please enter a printed notes ( atleast 3 letters)")),
  opportunity_id: Joi.number()
    .min(1)
    .optional()
    .error(new Error("please enter a opportunity_id ( atleast 1 number)")),
});
