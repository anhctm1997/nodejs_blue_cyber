import express from "express";
import * as argon2 from "argon2";
import TotpHelper from "../../common/helpers/tfa.helpers";
import userServices from "../../services/user.services"; // <====== phân này hiệp sửa vào
import { Status } from "../../common/StatusRes/status.dto";
class AuthMiddleware {
  async validateBodyReq(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.username && req.body.password) {
      next();
    } else {
      res.status(400).json(new Status(400, "Error", ""));
    }
  }
  async validateIsAdmin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      res.locals.jwt.isAdmin === 1 ||
      res.locals.jwt.userId === req.params.userId
    ) {
      return next();
    }
    console.log(res.locals.jwt.userId);

    res.status(403).json(new Status(403, "You not a Admin", ""));
  }
  async verifyUserPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await usersService.getUserByUsernameWithPassword(
      req.body.username
    ); // <<======== gọi phương thức getUserByUsernameWithPassword truyền vào (req.body.username) để lấy được username + password(hashed) của người dùng
    if (user) {
      const passwordHashed = user.password; // gán password người dùng vào biến passwordhashed
      if (await argon2.verify(passwordHashed, req.body.password)) {
        // dùng argon2 để so sánh password đã hash và password req gửi lên
        req.body = {
          id: user._id,
          username: user.username,
          isAdmin: user.isAdmin,
          enable2fa: user.enable2fa,
          secret: user.secret,
        };
        return next(); // nếu đúng thì next
      } else {
        res.status(404).json(new Status(404, "Password is not valid", ""));
      }
    } else {
      res.status(404).json(new Status(404, "Username not found", ""));
    }
  }
  enabled2fa(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body.enable2fa) {
      res.status(200).json({
        login: true,
        enable2fa: true,
      });
    } else {
      next();
    }
  }
  async validate2fa(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const token = req.body.token;
      const password = req.body.password;
      const username = req.body.username;
      if (token && password && username) {
        const { secret } = userServices.getUserByUsername(username);
        const validated = await TotpHelper.validateToken(token, secret);
        if (validated) {
          return next();
        }
        res.status(401).json(new Status(401, "Token not validate", ""));
      }
    } catch (err) {
      res.status(400).json(new Status(400, "Time out validate Token", ""));
    }
  }
}
export default new AuthMiddleware();
