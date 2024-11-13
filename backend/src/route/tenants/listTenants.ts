import { RouteHandler, createRoute, z } from "@hono/zod-openapi";
import { Env } from "../..";
import { users } from "../../db/schema/tenants";
import { eq } from "drizzle-orm";


const ListTenantResponse = z.array(z.object({
    id: z.number(),
    username: z.string(),
    password: z.string(),
    active: z.boolean(),
    firstname: z.string(),
    lastname: z.string(),
}).openapi("TenantsInfo"))


export const listTenantRoute = createRoute({
    method: "get",
    path: "/tenants/list",
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: ListTenantResponse
                }
            },
            description: "List all of the Tenants (user table for now)"
        }
    }
})


export const listTenantHandler : RouteHandler<typeof listTenantRoute, Env> = async (c) => {
    const db = c.var.db

    const Tenants = await db.query.users.findMany({
        columns: {
            id: true,
            username: true,
            password: true,
            active: true, 
            firstname: true,
            lastname: true,
        },
    })


    return c.json(Tenants, 200)
}