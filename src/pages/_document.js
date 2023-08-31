import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='h-screen bg-gradient-to-b from-gray-800 to-black text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
