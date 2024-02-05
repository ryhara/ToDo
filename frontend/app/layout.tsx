"use client";
import { Providers } from "./providers";
import { fonts } from "./fonts";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <ApolloProvider client={client}>
          <Providers>{children}</Providers>
        </ApolloProvider>
      </body>
    </html>
  );
}
