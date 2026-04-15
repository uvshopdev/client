import z from "zod";

import { User } from "./users";

export const Referral = User.pick({ id: true, full_name: true, picture: true });
export const Referrals = z.array(Referral);

export type ReferralsType = z.infer<typeof Referrals>;
