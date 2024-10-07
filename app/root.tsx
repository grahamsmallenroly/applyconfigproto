import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";

import { createEmptyContact, getContacts } from "./data";

import appStylesHref from "./app.css?url";
export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref }];

export const loader = async () => {
  const contacts = await getContacts();
  return json({ contacts });
};

export const action = async () => {
  const contact = await createEmptyContact();
  return json({ contact });
};

export default function App() {
  // const { contacts } = useLoaderData<{ contacts: Array<ContactRecord> }>();
  const { contacts } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div>Student Apply </div>
        <div id="detail">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
