import { PageProps } from "$fresh/server.ts";

export default function App({ Component, state }: PageProps) {
    return (
        <html>
            <body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <Component />
            </body>
        </html>
    );
}