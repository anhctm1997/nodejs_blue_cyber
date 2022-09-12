import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import chacha20Helpers from "../../common/helpers/chacha20.helpers";
import TOTP from "../../common/helpers/tfa.helpers";
import userServices from "../../app/Services/user.services";
import { Status } from "../../common/StatusRes/status.dto";
class AuthController {
  async createJWT(req: express.Request, res: express.Response) {
    try {
      const refreshId = req.body.userId + process.env.SECRET_KEY;
      const salt = crypto.createSecretKey(crypto.randomBytes(16));
      const hash = crypto
        .createHmac("sha512", salt)
        .update(refreshId)
        .digest("base64");
      req.body.refreshKey = salt.export();
      const token = jwt.sign(req.body, process.env.SECRET_KEY || "", {
        expiresIn: "3m",
      });
      return res.status(200).json({
        username: req.body.username,
        isAdmin: req.body.isAdmin,
        id: req.body.id,
        accessToken: token,
        refreshToken: hash,
      });
    } catch (error) {
      console.log("createJWT error: %O", error);
      return res.status(500).json(new Status(500, "Server timeout", ""));
    }
  }
  async create2fa(req: express.Request, res: express.Response) {
    const secret = await TOTP.createSecret();
    const encryptSecret = await chacha20Helpers.encrypt(
      req.body.password,
      secret
    );
    const user = await userServices.addSecret(
      req.body.username,
      encryptSecret.toString("base64")
    );
  }
}

export default new AuthController();
