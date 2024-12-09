import { RouteHandler, createRoute, z } from "@hono/zod-openapi"
import { Env } from "../.."
import { staffs } from "../../db/schema/staff"
import { eq } from "drizzle-orm"

const VerifyStaffRequest = z
	.object({
		staffID: z.number().int().positive(),
	})
	.openapi("VerifyStaffRequest")

export const verifyStaffRoute = createRoute({
	method: "post",
	path: "/verify/staff",
	request: {
		body: {
			content: {
				"application/json": {
					schema: VerifyStaffRequest,
				},
			},
		},
	},
	responses: {
		204: {
			description: "Verify a staff member by ID",
		},

		404: {
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
					}),
				},
			},
			description: "Staff not found",
		},
	},
})

export const verifyStaffHandler: RouteHandler<
	typeof verifyStaffRoute,
	Env
> = async (c) => {
	const db = c.var.db
	const body = c.req.valid("json")

	const { staffID } = body

	// Check if the staff exists
	const staff = await db.query.staffs.findFirst({
		where: eq(staffs.staffID, staffID),
	})

	if (!staff) {
		return c.json(
			{
				message: "Staff not found!",
			},
			404,
		)
	}

	// Update the staff to verified
	await db
		.update(staffs)
		.set({ verified: true })
		.where(eq(staffs.staffID, staffID))

	return c.body(null, 204)
}
