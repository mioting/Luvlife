import jwt from "./jwt";
import jwtSimple from "jwt-simple";
import express from "express";

import { Bearer } from "permit";
import { userService } from "../routes";

const permit = new Bearer({
  query: "access_token",
});

export async function isLoggedInApi(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = permit.check(req);
    if (!token) {
      return res.status(401).json({ msg: "Permission Denied" });
    }

    const payload = jwtSimple.decode(token, jwt.jwtSecret);
    const user = await userService.getProfileInfo(payload.id);
    if (user) {
      const { password, ...others } = user;
      req.user = others;
      return next();
    } else {
      return res.status(401).json({ msg: "Permission Denied" });
    }
  } catch (e) {
    return res.status(401).json({ msg: "Permission Denied" });
  }
}
