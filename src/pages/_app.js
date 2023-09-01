import '@/styles/globals.css'
import Layout from '@/components/layout'
import Loading from '@/components/loading/loading';
import { useState, useEffect } from "react"; // Import useState and useEffect

function App({ Component, pageProps }) {
  // Initialize isLoading state to true
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds (replace with your actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when loading is complete
    }, 2000);

    return () => clearTimeout(timer);
  }, []); // Run this effect only once on initial render

  return (
    <Layout>
      {/* Render the Loading component conditionally */}
      {isLoading ? (
        <Loading />
      ) : (
        <Component {...pageProps} />
      )}
    </Layout>
  )
}

export default App;
