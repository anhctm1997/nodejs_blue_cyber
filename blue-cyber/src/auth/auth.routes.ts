import { CommonRoutesConfig } from "../common/common.routes.config";
import { body } from "express-validator";
import express from "express";
import AuthController from "./controllers/auth.controller";
import authMiddleware from "./middleware/auth.middleware";
import authController from "./controllers/auth.controller";
export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AuthRoutes");
  }
  configureRoutes(): express.Application {
    this.app;
    // .route(`/cryto`)
    // .post(
    //     AuthController.inputKey
    // )
    // .get(
    //     AuthController.decode
    // );
    this.app.post(`/auth/register`, [
      body("email").isEmail(),
      body("password").isString(),
    ]);
    this.app
      .route(`/auth/login`)
      .post([
        authMiddleware.validateBodyReq,
        authMiddleware.verifyUserPassword,
        authMiddleware.enabled2fa,
        authController.createJWT,
      ]);
    this.app.post(`/auth/refresh-token`, []);
    return this.app;
  }
}
