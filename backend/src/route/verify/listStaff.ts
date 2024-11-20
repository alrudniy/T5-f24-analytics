import { RouteHandler, createRoute, z } from "@hono/zod-openapi";
import { Env } from "../..";
import { staffs } from "../../db/schema/staff";
import { eq } from "drizzle-orm";


const ListStaffResponse = z.array(z.object({
    staffID: z.number(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string()
}).openapi("UnverifiedStaffInfo"))


export const listStaffRoute = createRoute({
    method: "get",
    path: "/verify/list",
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: ListStaffResponse
                }
            },
            description: "List all unverfied staff"
        }
    }
})


export const listUnverifedStaffHandler : RouteHandler<typeof listStaffRoute, Env> = async (c) => {
    const db = c.var.db

    const unverfiedStaffs = await db.query.staffs.findMany({
        columns: {
            staffID: true,
            email: true,
            firstName: true,
            lastName: true,
        },
        where: eq(staffs.verified, false)
    })


    return c.json(unverfiedStaffs, 200)
}