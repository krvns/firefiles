import { auth, firestore } from "@util/firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const token = req.headers.token as string;
		if (!token) return res.status(401).json({ error: "No token found" });
		const { uid } = await auth.verifyIdToken(token);

		const snapshot = await firestore.collection("buckets").where("userId", "==", uid).get();
		let buckets = [];

		for (let i = 0; i < snapshot.docs.length; i++) {
			buckets.push({ id: snapshot.docs[i].id, ...snapshot.docs[i].data() });
		}

		return res.status(200).json(buckets);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ error: err.message });
	}
};
