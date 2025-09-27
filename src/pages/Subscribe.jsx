import { Form, redirect, useActionData } from "react-router-dom";
import { createSubscription } from "../utils/api";

export async function action({ request }) {
  const formData = await request.formData();
  const res = await createSubscription(formData);
  if (res.ok) return { success: `Subscribed: ${res.email}` };
  return { error: "Failed" };
}

export default function Subscribe() {
  const data = useActionData();
  return (
    <div>
      <h1>Subscribe</h1>
      <Form method="post">
        <input type="email" name="email" placeholder="you@example.com" required style={{ padding: 8 }} />
        <button type="submit" style={{ marginLeft: 8 }}>Send</button>
      </Form>
      {data?.success && <p style={{ color: "green" }}>{data.success}</p>}
      {data?.error && <p style={{ color: "crimson" }}>{data.error}</p>}
    </div>
  );
}
