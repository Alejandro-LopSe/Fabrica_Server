import { FreshContext } from "$fresh/server.ts";
import jwt from "jsonwebtoken";
import { MyState } from ".././types.ts";
export const handler = async (
  req: Request,
  ctx: FreshContext<MyState>,
) => {
  if (!ctx.route) {
    const headers = new Headers({ location: "/Portal" });
    return new Response("", {
      headers,
      status: 302,
    });
  }
  if (ctx.destination !== "route") {
    const res = await ctx.next();
    return res;
  }
  if (ctx.route === "/login") {
    const res = await ctx.next();
    return res;
  }
  const headers = req.headers;
  const cookie_raw = headers.get("cookie");
  if (!cookie_raw) {
    const headers = new Headers({ location: "/login" });
    return new Response("", {
      headers,
      status: 302,
    });
  }

  const cookie = cookie_raw.substring(5);
  if (!cookie) {
    const headers = new Headers({ location: "/login" });
    return new Response("", {
      headers,
      status: 302,
    });
  }
  const keygen = Deno.env.get("KEYGEN");
  const payload = jwt.verify(cookie, keygen);
  if (!payload) {
    const headers = new Headers({ location: "/login" });
    return new Response("", {
      headers,
      status: 302,
    });
  }
  ctx.state = {
    id_usuario: payload.id_usuario,
    Nombre: payload.Nombre,
    route: ctx.route,
  };

  const res = await ctx.next();
  return res;
};
